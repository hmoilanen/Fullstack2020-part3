// Part 3c - phonebook database

// Notes:
// -start the application: $ npm start
// -start the application with nodemon: $ npm run dev

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
const Contact = require('./models/contact')

const password = 'td4AUzQAckaeswPb33fefoiTfw9RZ7' //MOVE ELSEWHERE!
const dbName = 'phonebook-app'
const url = `mongodb+srv://Fullstack2020:${password}@cluster0.jfyg6.mongodb.net/${dbName}?retryWrites=true&w=majority`

// Note: middleware functions are called in the order that they're taken into use!
app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('posted', function (req, res) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  } else return null
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :posted'))

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  res.send(`
    <h4>Phonebook has info of ${persons.length} people</h4>
    <p>${new Date()}</p>
  `)
})

app.get('/api/persons', (req, res) => {
  Contact.find({})
    .then(contacts => {
      res.json(contacts)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    res.json(person)
  } else {
    res.status(400).end()
  }
})

app.delete('/api/persons/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})




app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'name and/or number missing' 
    })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
    date: new Date(),
    important: false
  })

  contact.save()
    .then(savedContact => {
      console.log(`Added name: ${body.name} and number: ${body.number} to ${dbName}`);
      //persons = persons.concat(savedContact)
      res.json(savedContact)
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})