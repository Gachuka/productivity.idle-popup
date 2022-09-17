import './TypedText.scss'
import { useState, useEffect } from 'react'

function TypedText() {
  
  // const [ typed, setTyped ] = useState("")
  const [ firstString, setFirstString ] = useState("")
  const [ secondString, setSecondString ] = useState("")
  const [ thirdString, setThirdString ] = useState("")
  const [ fourthString, setFourthString ] = useState("")
  let typedString = ""

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
    return () => {
      window.removeEventListener("keydown", downHandler);
      // window.removeEventListener("keyup", upHandler);
    };
  }, []);

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