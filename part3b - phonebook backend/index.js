// Part 3b - phonebook backend

// Notes:
// -start the application: $ npm start
// -start the application with nodemon: $ npm run dev

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()


// Middleware
// Note: middleware functions are called in the order that they're taken into use!
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
  res.json(persons)
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

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'name and/or number missing' 
    })
  }

  if (persons.some(person => person.name === body.name)) {
    return res.status(400).json({ 
      error: 'a contact with same name already exists' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000000)
  }

  persons = persons.concat(person)

  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})