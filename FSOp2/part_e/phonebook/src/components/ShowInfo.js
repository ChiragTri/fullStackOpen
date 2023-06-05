// Show Info component 

const ShowInfo = ({ person, delPerson }) => {
  return(
    <>
      {person.name} {person.number} 
      {" "}<button onClick={delPerson}>{"delete"}</button>
      <br></br>
    </>
  )
}

export default ShowInfo