const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

morgan.token('body', (req, _res) => {
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] -- :response-time ms -- :body'))
app.use(cors())

app.get('/info', (request, response) => {
    response.send(
        `<p>${new Date()}</p>
        <p>The phonebook has info for ${persons.length} people.</p>`
    )
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
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

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name and number are required'
        })
    }

    // TODO: Check if name already exists
    // ...

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name == 'CastError') {
        return response.status(400).send({
            error: 'id is incorrectly formatted'
        })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})