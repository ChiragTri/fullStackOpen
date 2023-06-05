import { useState, useEffect } from 'react'
import ShowInfo from "./components/ShowInfo"
import personService from "./services/persons"
import Notification from "./components/Notification"
import Error from "./components/Error"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newInfo, setNewInfo] = useState({
    name:"", number:""
  })
  const [filterName, setFilterName] = useState("")
  const [personAdded, setPersonAdd] = useState(null)
  const [errPrompt, setErrPrompt] = useState(null)

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
    const nameMatch = x => x.name === newInfo.name
    const found = persons.find(nameMatch)
    if (typeof(found) !== "undefined"){
      if (window.confirm(`${newInfo.name} is already added to phonebook, replace ` +
                         `the old number with a new one?`)) {
        console.log(`OK button was selected, changing number of ${newInfo.name}`)
        const personIndex = persons.findIndex(nameMatch)
        const changedPerson = persons[personIndex]
        changedPerson.number = newInfo.number
        personService
          .update(persons[personIndex].id, changedPerson)
          .then(returnedChangedPerson => {
            // returns copy of an adjusted persons array
            setPersons(persons.toSpliced(personIndex, 1, returnedChangedPerson))
            console.log(`changed ${returnedChangedPerson.name}'s number to "${returnedChangedPerson.number}"`)
            setPersonAdd(returnedChangedPerson)
            setTimeout(() => {
              setPersonAdd(null)
            }, 3000)
          })
          .catch(err => {
            setErrPrompt(changedPerson)
            // updating persons rednered by pulling from database
            personService
              .getAll()
              .then(dbPersons => {
                console.log('updating page to match DB after catching error')
                setPersons(dbPersons)
              })
            setTimeout(() => {
              setErrPrompt(null)
            }, 5000)
          })
      }
      else{
        // do nothing
      }
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
          setPersonAdd(returnedNewPerson)
          setTimeout(() => {
            setPersonAdd(null)
          }, 3000)
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
          console.log(`soon to update state and delete name: "${name}"`)
          // find the index of the person
          const personIndex = persons.findIndex(person => person.id === id)
          console.log(`index of ${name} is ${personIndex}`)
          // toSpliced returns a modified copy of the persons array. The copy contains the deleted entry of the person
          setPersons(persons.toSpliced(personIndex, 1))
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
      {console.log(`in app component, this is being passed to errPrompt: ${personAdded}`)}
      <Error person={errPrompt}/>
      {console.log(`in app component, this is personAdded: ${personAdded}`)}
      <Notification person={personAdded}/>
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
