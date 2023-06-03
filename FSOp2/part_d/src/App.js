import { useState, useEffect } from 'react'
import axios from 'axios'
import ShowInfo from "./components/ShowInfo"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newInfo, setNewInfo] = useState({
    name:"", number:""
  })
  const [filterName, setFilterName] = useState("")

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(dbPersons => {
        console.log('get all promise fulfilled')
        setPersons(dbPersons)
      })
  }
  // initial load
  useEffect(hook, []) // trigger effect once
  
  // how many persons are rendered
  console.log('render', persons.length, 'persons')
  // type of persons that are rendered
  console.log('all persons:', persons)

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
      
      personService
        .create(newPerson)
        .then(returnedNewPerson => {
          setPersons(persons.concat(returnedNewPerson))
          setNewInfo({
            name:"", number:""
          })
        })
      console.log("persons", persons.concat(newPerson))
    }
  }

  const handleInfoInputChange = (event) => {
    console.log(event.target.value)

    var newName = newInfo.name
    var newNumber = newInfo.number

    if (event.target.id === "name"){ newName = event.target.value }
    else { newNumber = event.target.value }

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

  const delPerson = ({ name, id, number }) => {
    console.log(`are you sure you want to delete ${name} with number ${number}?`)
    // confirmation prompt
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        // deleting person from backend
        .del(id)
        // after promise is executed, update the state
        .then(() =>{
          console.log(`delete button hit`)
          console.log(`soon to update state and delete name: \"${name}\"`)
          // find the index of the person
          const personIndex = persons.findIndex(person => person.id === id)
          console.log(`index of ${name} is ${personIndex}`)
          // toSpliced returns a modified copy of the persons array. The copy contains the deleted entry of the person
          setPersons(persons.toSpliced(personIndex, 1))
          console.log('setPersons was called (rerender)')
        })
    }
    else {
      // do nothing
      return
    }
  }

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
        <ShowInfo 
        key={x.name} 
        person={x}
        delPerson={() => delPerson(x)}/>  
      )}
    </div>
  )
}

export default App