import { useState } from "react"

const Button = ({handleClick, text}) => (<button onClick={handleClick}>{text}</button>)

function getRandomFunc(max) {
  return Math.floor(Math.random()*(max));
}

var arr = new Array(5).fill(0)

const App = () => {
  const anecdotes =[
    "Adding manpower to a late software project makes it later!",
    "The best way to get a project done faster is to start sooner",
    "Before software can be reusable it first has to be usable.",
    "Even the best planning is not so omniscient as to get it right the first time.",
    "How does a project get to be a year late?... One day at a time."
  ]

  const [clicks, setClicks] = useState({
    index: 0,
    voteArr: [...arr]
  })

  const handleSelected = () => {
    const newClicks = {
      index: getRandomFunc(5),
      voteArr: [...clicks.voteArr]
    }
    setClicks(newClicks)
  }

  const handleVote = () => {
    const newArr = [...clicks.voteArr]
    newArr[clicks.index] += 1    
    
    const newClicks = {
      index: clicks.index,
      voteArr: newArr
    }
    setClicks(newClicks)
  }

  const mostVotesIndex = clicks.voteArr.indexOf(Math.max(...clicks.voteArr)) 

  return(
    <div>
      <h1>Anecdote of the day</h1>
      <font size="4">
        {anecdotes[clicks.index]} <br></br>
        has {clicks.voteArr[clicks.index]} votes <br></br>
      </font>
      <Button handleClick = {handleVote} text = "vote"/>
      <Button handleClick = {handleSelected} text = "next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <font size="4">
        {anecdotes[mostVotesIndex]} <br></br>
        has {clicks.voteArr[mostVotesIndex]} votes <br></br>
      </font>
    </div>
  )
}

export default App
