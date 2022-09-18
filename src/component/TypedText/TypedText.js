import './TypedText.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = "http://localhost:7878"
console.log(API_URL)

function TypedText({data}) {
  
  const [ dataString, setDataString ] = useState("")
  const [ gameReady, setGameReady ] = useState(false)
  const [ timerReady, setTimerReady ] = useState(false)
  // const [ typedString, setTypedString ] = useState("")
  const [ firstString, setFirstString ] = useState("")
  const [ secondString, setSecondString ] = useState("")
  const [ thirdString, setThirdString ] = useState("")
  const [ fourthString, setFourthString ] = useState("")
  let typedStr = data

  const downHandler = (event) => {

    if(!gameReady) {
      console.log('gameReady is now True')
      setGameReady(true)
    }
    
    typedStr += event.key
    console.log(event.key)

    localStorage.setItem('typed_string', typedStr)

    setFirstString(typedStr.slice(-15))
    setSecondString(typedStr.slice(-45, -15))
    setThirdString(typedStr.slice(-75, -45))
    setFourthString(typedStr.slice(-105, -75))
  }

  const savePeriod = () => {
    const postBody = {
      text_typed: localStorage.getItem('typed_string')
    }
    axios.put(API_URL, postBody)
    console.log('Game Saved')

    setTimeout(() => {savePeriod()}, 10000)
  }

  useEffect(() => {
    console.log('remounted')
    window.addEventListener("keydown", downHandler);
    // window.addEventListener("keyup", upHandler);

    console.log(data.character_count)
    setDataString(data.text_typed)
    localStorage.setItem('typed_string', data.text_typed)
    setFirstString(dataString.slice(-15))
    setSecondString(dataString.slice(-45, -15))
    setThirdString(dataString.slice(-75, -45))
    setFourthString(dataString.slice(-105, -75))

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      // window.removeEventListener("keyup", upHandler);
      const postBody = {
        text_typed: localStorage.getItem("typed_string")
      }
      axios.put(API_URL, postBody)
    };
  }, [gameReady, dataString]);

  // if(!firstString || !secondString || !thirdString || !fourthString) {
  //   return <h1> What </h1>
  // }

  if(!timerReady) {
    if(gameReady) {
      console.log('Starting Save Interval Timer')
      setTimerReady(true)
      savePeriod()
    }
  }

  return (
    <>
      {/* <div>{typed}</div> */}
      <div>{fourthString}</div>
      <div>{thirdString}</div>
      <div>{secondString}</div>
      <div>{firstString}</div>
    </>
  )
}

export default TypedText;