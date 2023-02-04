import { useState } from 'react'
import ShowInfo from "./components/ShowInfo"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newInfo, setNewInfo] = useState({
    name:"", number:""
  })
  const [filterName, setFilterName] = useState("")

  const addInfo = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    // check to see if person already exists in phonebook
    const found = persons.find(x => x.name === newInfo.name)
    if (typeof(found) !== "undefined"){
      window.alert(`${newInfo.name} is already added to phonebook`)
    }
    else{
      const newPerson = {
        name: newInfo.name,
        number: newInfo.number
      }
    
      setPersons(persons.concat(newPerson))
      setNewInfo({
        name:'', number:''
      })
      console.log("persons", persons.concat(newPerson))
    }
  }

  const handleInfoInputChange = (event) => {
    console.log(event.target.value)

    var newName = newInfo.name
    var newNumber = newInfo.number

    if (event.target.id === "name"){
      newName = event.target.value
    }
    else {
      newNumber = event.target.value
    }

    const newText = {
      name: newName, number: newNumber
    }

    setNewInfo(newText)
  }

  const handleFilterInputChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  const filteringFunction = (persons) => {
    if (filterName.length === 0) {
      return (persons)
    }
    else{
      const shown = persons.filter(person => filteringFunctionPerson(person) === true)
      return (shown)
    }

  }

  const filteringFunctionPerson = ({ name, number, id }) => {
    // this is an array of all the char in the search bar
    // TODO: duplicate letters
    const filterChars = filterName.toLowerCase().replace(/\s+/g, "").split('')
    const formattedName = name.toLowerCase().replace(/\s+/g, "")
    
    // returns true if char is incluided in name
    const personNameTest = (char) => (formattedName.includes(char))
    
    // iterates through every char (value) in filterChars (array) to check if x char is in name
    const filteredPerson = filterChars.every(personNameTest)

    // returns true if all chars in filter search in name
    return (filteredPerson)
  }
  
  const personsToShow = filteringFunction(persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>filter shown with: <input value={filterName} onChange={handleFilterInputChange}/></div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addInfo}>
        <div>name: <input id="name" value={newInfo.name} onChange={handleInfoInputChange} placeholder="Enter new name" /></div>
        <div>number: <input id="number" value={newInfo.number} onChange={handleInfoInputChange} placeholder="Enter number" /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(x => 
        <ShowInfo key={x.name} person={x} />  
      )}
    </div>
  )
}

export default App