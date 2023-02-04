// Course component 

const Courses = ({ courses }) => {
  return(
    <div>
      <h1>
        Web development curriculum
      </h1>
      {courses.map(x =>
        <Course key={x.id} course={x} />
      )}
    </div>
  )
}


const Course = ({ course }) => {
  return (
    <div>
      <h2>
        {course.name}
      </h2>
      {course.parts.map(x => 
        <Part key={x.id} part={x} />  
      )}
      <SumOfParts parts={course.parts} />
    </div>
  )
}

const Part = ({ part }) => {
  return(
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const SumOfParts = ({ parts }) => {
  return(
    <b>
      total of {parts.reduce((prev, current) => prev + current.exercises, 0)} exercises
    </b>
  )
}

export default Courses