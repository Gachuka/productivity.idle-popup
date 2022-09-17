import './TypedText.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = "http://localhost:7878"
console.log(API_URL)

function TypedText() {
  
  const [ typed, setTyped ] = useState("")
  const [ firstString, setFirstString ] = useState("")
  const [ secondString, setSecondString ] = useState("")
  const [ thirdString, setThirdString ] = useState("")
  const [ fourthString, setFourthString ] = useState("")
  let typedString = typed

  const downHandler = (event) => {
    typedString += event.key
    // setTyped(typedString)
    setFirstString(typedString.slice(-15))
    setSecondString(typedString.slice(-45, -15))
    setThirdString(typedString.slice(-75, -45))
    setFourthString(typedString.slice(-105, -75))
    console.log(typedString)
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    // window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup

    axios.get(API_URL).then((response) => {
      console.log('Axios Got')
      setTyped(response.data)
    }).then(() => {
      setFirstString(typedString.slice(-15))
      setSecondString(typedString.slice(-45, -15))
      setThirdString(typedString.slice(-75, -45))
      setFourthString(typedString.slice(-105, -75))
    });

    return () => {
      window.removeEventListener("keydown", downHandler);
      // window.removeEventListener("keyup", upHandler);
    };
  }, [typed]);

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