const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())

morgan.token('body', (req, _res) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] -- :response-time ms -- :body'))

let persons = [
    {
        id: 1,
        name: 'Jaakko Jaakkonen',
        number: '123-456-7890'
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5566778'
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: 4,
        name: 'Mary Poppendick',
        number: '041-234567890'
    }
]

const generateId = () => {
    return Math.floor(Math.random() * 999_999)
}

app.get('/info', (request, response) => {
    response.send(
        `<p>${new Date()}</p>
        <p>The phonebook has info for ${persons.length} people.</p>`
    )
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name and number are required'
        })
    }
    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'Name already exists'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !==  id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})