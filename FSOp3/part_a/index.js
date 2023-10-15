// index.js

const dedent = require('dedent')
const express = require('express')
const app = express()

app.unsubscribe(express.json())

let phonebookPersons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(phonebookPersons)
})

app.get('/info', (request, response) =>{
  const currentDate = new Date()
  const infoSent = dedent `<p>Phonebook has info for ${phonebookPersons.length} people</p>
                          <p>${currentDate}</p>`
  response.send(
    infoSent
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = phonebookPersons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phonebookPersons = phonebookPersons.filter(person => person.id !== id)

  response.status(204).end()
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = {
    id: Math.floor(Math.random() * 100000000),
    name: "test",
    number: 1234567890,
    
  }

  phonebookPersons = phonebookPersons.concat(person)

  response.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


