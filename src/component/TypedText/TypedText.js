import './TypedText.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'

const notLogged = ["Space", "Enter", "Backspace", "Control", "Alt", "Shift", "Tab", "Meta", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "NumLock", "CapsLock", "Escape", "MediaTrackNext", "MediaTrackPrevious", "MediaStop", "MediaPlayPause","AudioVolumeMute", "AudioVolumeDown", "AudioVolumeUp", "LaunchApplication2", "Delete", "Insert", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "PageDown", "PageUp", "Home", "End"]
const API_URL = "http://localhost:7878"
const timerInterval = 5000

function TypedText({data}) {
  
  const [ dataString, setDataString ] = useState("")
  const [ dataChrCount, setDataChrCount ] = useState()

  const [ gameReady, setGameReady ] = useState(false)
  const [ timerReady, setTimerReady ] = useState(false)
  // const [ typedString, setTypedString ] = useState("")
  const [ firstString, setFirstString ] = useState("")
  const [ secondString, setSecondString ] = useState("")
  const [ thirdString, setThirdString ] = useState("")
  const [ fourthString, setFourthString ] = useState("")
  let typedStr = data.text_typed
  let typedStringThisSave = ''
  let characterCount = data.character_count
  let characterCountThisSave = 0

  const downHandler = (event) => {

    console.log(gameReady)
    if(!gameReady) {
      console.log('gameReady is now True')
      setGameReady(true)
    }

    if (notLogged.some(string => event.key === string)) {
      console.log("Not Logged");
      return;
    };

    // ADD CHARACTER OR COUNT TO VARIABLES
    typedStr = localStorage.getItem('typed_string') + event.key;
    typedStringThisSave = localStorage.getItem('typed_string_this_save') + event.key
    characterCount = Number(localStorage.getItem('character_count')) + 1
    characterCountThisSave = Number(localStorage.getItem('character_count_this_save')) + 1

    // LOG DYNAMICALLY AS USER TYPE
    localStorage.setItem('key', event.key);
    localStorage.setItem('typed_string', typedStr)
    localStorage.setItem('typed_string_this_save', typedStringThisSave);
    localStorage.setItem('character_count', characterCount)
    localStorage.setItem('character_count_this_save', characterCountThisSave)

    // SETTING VISUAL VALUES
    setFirstString(typedStr.slice(-15))
    setSecondString(typedStr.slice(-45, -15))
    setThirdString(typedStr.slice(-75, -45))
    setFourthString(typedStr.slice(-105, -75))
    setDataChrCount(characterCount)
  }

  // AXIOS PUT FUNCTION
  const axiosPUT = async () => {
    
    // GRAB MOST RECENT DATA IN SAVE
    const getData = await axios.get(API_URL)
    const textTypedBody = getData.data.text_typed + localStorage.getItem('typed_string_this_save');
    const characterCountBody = getData.data.character_count + Number(localStorage.getItem('character_count_this_save'));
    localStorage.setItem('typed_string', textTypedBody);

    // CREATE PUT BODY
    const putBody = {
      text_typed: textTypedBody,
      character_count: characterCountBody
    }

    // AXIOS PUT REQUEST
    axios.put(API_URL, putBody).then((response) => {
      console.log("Success:", response.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  // SAVE FUNCTION WITH TIMER
  const savePeriod = async () => {

    // AXIOS PUT TO EXECUTE SAVE
    await axiosPUT()
    console.log('Game Saved')
    
    // LOG CURRENT SAVE COUNTER AND RESET
    console.log(typedStringThisSave)
    console.log(characterCountThisSave)
    typedStringThisSave = ''
    characterCountThisSave = 0
    localStorage.setItem('typed_string_this_save', typedStringThisSave);
    localStorage.setItem('character_count_this_save', characterCountThisSave);

    // RESET TIMER
    setTimeout(() => {savePeriod()}, timerInterval)
  }

  useEffect(() => {
    console.log('remounted')
    window.addEventListener("keydown", downHandler);
    window.addEventListener("beforeunload", axiosPUT);
    // window.addEventListener("keyup", upHandler);

    setDataString(data.text_typed)
    setDataChrCount(data.character_count)
    console.log(data.character_count)
    localStorage.setItem('typed_string', data.text_typed)
    localStorage.setItem('typed_string_this_save', '')
    localStorage.setItem('character_count', data.character_count)
    localStorage.setItem('character_count_this_save', 0)

    setFirstString(dataString.slice(-15))
    setSecondString(dataString.slice(-45, -15))
    setThirdString(dataString.slice(-75, -45))
    setFourthString(dataString.slice(-105, -75))

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("beforeunload", axiosPUT);
      // window.removeEventListener("keyup", upHandler);
    };
  }, [gameReady,dataString]);

  // if(!firstString || !secondString || !thirdString || !fourthString) {
  //   return <h1> What </h1>
  // }

  if(!timerReady) {
    if(gameReady) {
      console.log('Starting Save Interval Timer');
      setTimerReady(true);
      setTimeout(savePeriod, timerInterval);
    };
  };

  return (
    <div className='typed__container'>
      {/* <div>{typed}</div> */}
      <div>{fourthString}</div>
      <div>{thirdString}</div>
      <div>{secondString}</div>
      <div>{firstString}</div>
      <div>{dataChrCount}</div>
    </div>
  )
}

export default TypedText;