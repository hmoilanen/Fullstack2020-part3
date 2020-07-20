// Part 3c - phonebook database

// Notes:
// -start the application: $ npm start
// -start the application with nodemon: $ npm run dev

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const Contact = require('./models/contact')

const dbName = 'phonebook-app'
const url = process.env.MONGODB_URI
console.log('process.env.PORT', process.env.PORT);

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

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res, next) => {
  Contact.find({})
    .then(results => {
      res.send(`
        <h4>Phonebook has info of ${results.length} people</h4>
        <p>${new Date()}</p>
      `)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
  Contact.find({})
    .then(contacts => {
      res.json(contacts)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Contact.find({ _id: req.params.id })
    .then(results => {
      if (results[0]) {
        res.json(results[0])
      } else {
        res.status(400).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'name and/or number missing' 
    })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
    date: new Date(),
    important: false,
  })

  contact.save()
    .then(savedContact => {
      console.log(`Added name: ${body.name} and number: ${body.number} to ${dbName}`);
      res.json(savedContact)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  Contact.find({ _id: req.params.id })
    .then(results => {
      results[0].number = req.body.number
      results[0].save()
        .then(updatedResult => {
          res.json(updatedResult)
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  //console.log('error.name', error.name);
  //console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(403).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})