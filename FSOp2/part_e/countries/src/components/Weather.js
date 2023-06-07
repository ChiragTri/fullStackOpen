// Weather Component
// shows weather info for the capital of country

import { useState, useEffect } from 'react'
import axios from 'axios'

// defined in .env file
// key is found in home.openweathermap.org/api_keys after member account is created
const api_key = process.env.REACT_APP_API_KEY

const Weather = ({ country }) => {
  const [weatherData, setWeatherData] = useState()
  const [lat,lon] = country.capitalInfo.latlng

  console.log('component render, current data', weatherData)

  const hook = () => {
    console.log('hook effect')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
      .then(response => {
        console.log('initial weather - promise fulfilled')
        setWeatherData(response.data)
        console.log('promise response: ', response.data)
      })
  }
  useEffect(hook, []) // trigger effect once

  if (weatherData === undefined) {
    return(
      <>
        <br/>Loading Weather...
      </>
    )
  }

  return(
    <>
      <br/>
      <h2>Weather in {country.capital[0]}</h2>
      <p>temperature {weatherData.main.temp} Celcius</p>
      <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={`weather icon`}/>
      <p>wind {weatherData.wind.speed} m/s</p>
    </>
  )
}

export default Weather