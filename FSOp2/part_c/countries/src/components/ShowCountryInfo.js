// Show Country Info component 
// shows inforrmation about specific country

import Weather from "./Weather"

const CountryInfo = ({ country }) => {
  return(
    <>
      <h1>{country.name.common}</h1>
      <p>
        capital {country.capital} <br/>
        area {country.area} <br/>
      </p>
      <strong>languages:</strong><br/>
      <ul>
        {Object.values(country.languages).map((lang) => 
          <li key={lang}>{lang}</li>
        )}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`}/>
      <Weather country={country}/>
    </>
  )
}

export default CountryInfo
