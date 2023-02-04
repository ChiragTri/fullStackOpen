// main App

import { useState, useEffect } from 'react'
import axios from 'axios'

// components
import Content from "./components/ContentDisplayed"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [filteredCountries, setFilteredCountries] = useState([])

  const hook = () => {
    console.log('country - effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('country - promise fulfilled')
        const countryData = response.data
        setCountries(countryData)
        setFilteredCountries(countryData)
      })
  }
  useEffect(hook, []) // trigger effect once

  // deals with the input in the form box
  const handleInputChange = (event) =>{
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  // changes filtered countries state
  const handleFilteredCountries = () => {
    if (filter === ''){
      setFilteredCountries(countries)
      return
    }

    const newCountries = countries.filter(country => nameFilter(country) === true)
    setFilteredCountries(newCountries)
    console.log()
  }

  // filters names of countries
  const nameFilter = (country) => {
    const filterCharsFormat = filter.toLowerCase().replace(/\s+/g, "")
    const formattedName = country.name.common.toLowerCase().replace(/\s+/g, "")

    return (formattedName.includes(filterCharsFormat))
  }

  // hook for updating filtered countries
  useEffect(()=>{
    handleFilteredCountries()
  }, [filter]) // triggers when filter changes

  // logs changes to countries
  useEffect(() => {
    console.log('current countries: ', countries.length)
    console.log('supposed filtered countries: ', filteredCountries.length)
  }, [filteredCountries]) // triggers when filteredCountries changes

  return (
    <div>
      <form>
        <>find countries: <input value={filter} onChange={handleInputChange}/></>
      </form>
      <br/>
      <Content filter={filter} countries={filteredCountries} setFilter={setFilter}/>
    </div>
  )
}

export default App