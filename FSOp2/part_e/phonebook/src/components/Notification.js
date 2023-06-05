// success prompt notifcation component

const Notification = ({ person }) => {
  
  console.log(`this is being passed to notification prompt: ${person}`)
  
  const spStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (person === null) {
    console.log('Notification component returned null')
    return null
  }
  
  return (
    <div style={spStyle}>
      <br/>
      Added/Updated {person.name} {console.log('Notification component returned with MESSAGE')}
    </div>
  )
}

export default Notification