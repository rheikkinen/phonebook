require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}
const url = process.env.MONGO_URI
mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]

if (!name && !number) {
    // Get all phonebook entries from the database
    Person.find({}).then(result => {
        console.log('Phonebook:\n')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else if (name && number) {
    // Add new phonebook entry to the database
    const newPerson = new Person({
        name: name,
        number: number
    })

    newPerson.save().then(() => {
        console.log(`${name} number ${number} successfully added!`)
        mongoose.connection.close()
    })
}
