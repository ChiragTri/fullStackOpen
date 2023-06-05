// error prompt componenet

const Error = ({ person }) => {
  
  console.log(`this is being passed to error prompt: ${person}`)
  
  const epStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (person === null) {
    console.log('error component returned null')
    return null
  }
  
  return (
    <div style={epStyle}>
      <br/>
      Information of {person.name} has already been removed from the server {console.log('error component returned with MESSAGE')}
    </div>
  )
}

export default Error