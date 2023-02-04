const Header = (val) => {
  console.log(val)
  return(
    <>
      <h1>{val.x}</h1>
    </>
  )

}
const Part = (val2) =>{
  console.log(val2)
  return(
    <>
      <p>{val2.x} {val2.y}</p>
    </>
  )
}
const Content = (val) => {
  console.log(val)
  return(
    <>
      <p>
        <Part x={val.x1} y={val.y1}/>
        <Part x={val.x2} y={val.y2}/>
        <Part x={val.x3} y={val.y3}/>
      </p>
    </>
  )
}
const Total = (val) => {
  console.log(val)
  return(
    <>
      <p>Number of exercises {val.x+val.y+val.z}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10  
      },  
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header x={course.name}/>
      <Content x1={course.parts[0].name} y1={course.parts[0].exercises} x2={course.parts[1].name} y2={course.parts[1].exercises} x3={course.parts[2].name} y3={course.parts[2].exercises}/>
      <Total x={course.parts[0].exercises} y={course.parts[1].exercises} z={course.parts[2].exercises}/>
    </div>
  )
}

export default App