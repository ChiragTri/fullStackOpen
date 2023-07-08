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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
