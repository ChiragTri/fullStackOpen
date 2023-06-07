// Show Countries component 
// shows multiple countries

const Countries = ({ country, setFilter }) => {
  return(
    <>
      {country.name.common}
      <button value={country.name.common} onClick={(event) => setFilter(event.target.value)}>show</button>
      <br/>
    </>
  )
}

export default Countries