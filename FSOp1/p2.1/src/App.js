import { useState } from "react"
import "./minimal-table.css"

const Button = ({handleClick, text}) => (<button onClick={handleClick}>{text}</button>)

const StatisticLine = (props) => {
  return(
    <table>  
      <tbody>
        <tr>
          <td align="left">{props.text}</td>
          {props.text == "positive" ? 
            (<td align="right">{props.value.toFixed(2)} %</td>):
            (props.text == "average" ?
              (<td align="right">{props.value.toFixed(3)}</td>):
              (<td align="right">{props.value}</td>)
            )
          }
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = (props) => {
  const sum = () => (props.clickGood + props.clickNeutral + props.clickBad)
  const average = () => (props.clickGood - props.clickBad) / sum()
  const percentPos = () => ((props.clickGood)*100 / sum()) 
  
  if (sum() == 0){
    return(
      <div>
        <h1>
          statistics
        </h1>
        No feedback given
      </div>
    );
  }
  else{
    return(
      <div>
        <h1>
          statistics
        </h1>
        <StatisticLine text="good" value={props.clickGood}/>
        <StatisticLine text="neutral" value={props.clickNeutral}/>
        <StatisticLine text="good" value={props.clickBad}/>
        <StatisticLine text="all" value={sum()}/>
        <StatisticLine text="average" value={average()}/>
        <StatisticLine text="positive" value={percentPos()}/>
      </div>
    );
  }
}

const App = () => {
  const [clicks, setClicks] = useState({good:0, neutral:0, bad:0})

  const handleGood = () => {setClicks({...clicks, good: clicks.good + 1})}
  const handleNeutral = () => {setClicks({...clicks, neutral: clicks.neutral + 1})}
  const handleBad = () => {setClicks({...clicks, bad: clicks.bad + 1})}
  

  return(
    <div>
      <h1>
        give feedback
      </h1>
      <Button handleClick = {handleGood} text = "good"/>
      <Button handleClick = {handleNeutral} text = "neutral"/>
      <Button handleClick = {handleBad} text = "bad"/>
      <br></br>
      <Statistics clickGood = {clicks.good} clickBad = {clicks.bad} clickNeutral = {clicks.neutral} />
    </div>
  )
}

export default App