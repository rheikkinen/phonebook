const express = require('express')
const app = express()

app.use(express.json())

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

app.get('/info', (request, response) => {
    response.send(
        `<p>${new Date()}</p>
        <p>The phonebook has info for ${persons.length} people.</p>`
    )
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})