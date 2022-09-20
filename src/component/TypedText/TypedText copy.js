import './TypedText.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserCurrentStat from '../UserCurrentStat/UserCurrentStat'

const notLogged = ["Space", "Enter", "Backspace", "Control", "Alt", "Shift", "Tab", "Meta", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "NumLock", "CapsLock", "Escape", "MediaTrackNext", "MediaTrackPrevious", "MediaStop", "MediaPlayPause","AudioVolumeMute", "AudioVolumeDown", "AudioVolumeUp", "LaunchApplication2", "Delete", "Insert", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "PageDown", "PageUp", "Home", "End"]
const API_URL = "http://localhost:7878"
const timerInterval = 5000

function TypedText({data, setCallGet}) {

  const navigate = useNavigate()

  const [ dataString, setDataString ] = useState("")
  const [ dataChrCount, setDataChrCount ] = useState()

  // const [addPer,setAddPer]=useState()

  const [ gameReady, setGameReady ] = useState(false)
  const [ timerReady, setTimerReady ] = useState(false)
  // const [ typedString, setTypedString ] = useState("")
  const [ firstString, setFirstString ] = useState("")
  const [ secondString, setSecondString ] = useState("")
  const [ thirdString, setThirdString ] = useState("")
  const [ fourthString, setFourthString ] = useState("")
  const [ chrCountDisplay, setChrCountDisplay ] = useState()

  let typedStr = data.text_typed
  let typedStringThisSave = ''
  let characterCount = data.character_count
  let characterCountThisSave = 0
  let characterLeftCount = data.character_left
  let addPerInput = 0

  const downHandler = (event) => {
    
    if(localStorage.getItem('timer_started') === 'false') {
      console.log('gameReady is now True')
      setGameReady(true)
      localStorage.setItem('timer_started', true)
    }

    if (notLogged.some(string => event.key === string)) {
      console.log("Not Logged");
      return;
    };

    // ADD CHARACTER OR COUNT TO VARIABLES
    typedStr = localStorage.getItem('typed_string') + event.key;
    typedStringThisSave = localStorage.getItem('typed_string_this_save') + event.key
    // characterCount = Number(localStorage.getItem('character_count')) + addPer
    // characterCountThisSave = Number(localStorage.getItem('character_count_this_save')) + addPer
    // characterLeftCount = Number(localStorage.getItem('character_left')) + addPer
    characterCount = Number(localStorage.getItem('character_count')) + addPerInput
    characterCountThisSave = Number(localStorage.getItem('character_count_this_save')) + addPerInput
    characterLeftCount = Number(localStorage.getItem('character_left')) + addPerInput
    
    // LOG DYNAMICALLY AS USER TYPE
    localStorage.setItem('key', event.key);
    localStorage.setItem('typed_string', typedStr)
    localStorage.setItem('typed_string_this_save', typedStringThisSave);
    localStorage.setItem('character_count', characterCount)
    localStorage.setItem('character_count_this_save', characterCountThisSave)
    localStorage.setItem('character_left', characterLeftCount)
    
    // SETTING VISUAL VALUES
    setFirstString(typedStr.slice(-15))
    setSecondString(typedStr.slice(-45, -15))
    setThirdString(typedStr.slice(-75, -45))
    setFourthString(typedStr.slice(-105, -75))
    setChrCountDisplay(characterLeftCount)
  }

  // AXIOS PUT FUNCTION
  const axiosPUT = async () => {
    
    // GRAB MOST RECENT DATA IN SAVE
    const getData = await axios.get(API_URL)
    console.log('got data:',getData)
    // const textTypedBody = getData.data.text_typed + localStorage.getItem('typed_string_this_save');
    // const characterCountBody = getData.data.character_count + Number(localStorage.getItem('character_count_this_save'));
    const textTypedBody = getData.data.text_typed + localStorage.getItem('typed_string_this_save');
    const characterCountBody = getData.data.character_count + Number(localStorage.getItem('character_count_this_save'));
    localStorage.setItem('typed_string', textTypedBody);

    // // CREATE PUT BODY
    const putBody = {
      text_typed: textTypedBody,
      character_count: characterCountBody
    }

    // AXIOS PUT REQUEST
    await axios.put(API_URL, putBody).then((response) => {
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
 
    // RECALL UPDATED SAVEFILE
    await setCallGet(Date.now())
    
    // LOG CURRENT SAVE COUNTER AND RESET
    typedStringThisSave = ''
    characterCountThisSave = 0
    localStorage.setItem('typed_string_this_save', typedStringThisSave);
    localStorage.setItem('character_count_this_save', characterCountThisSave);

    // RESET TIMER
    setTimeout(() => {savePeriod()}, timerInterval)
  }

  // RUN ON MOUNT
  useEffect(() => {
    // console.log('remounted')
    window.addEventListener("keydown", downHandler);
    window.addEventListener("beforeunload", axiosPUT);
    // window.addEventListener("keyup", upHandler);
    
    // SETTING SOME DATA
    setDataString(data.text_typed)
    setDataChrCount(data.character_left)
    // setAddPer(data.character_left)
    addPerInput = data.add_per_input
    localStorage.setItem('typed_string', data.text_typed)
    localStorage.setItem('typed_string_this_save', '')
    localStorage.setItem('character_count', data.character_count)
    localStorage.setItem('character_count_this_save', 0)
    localStorage.setItem('character_left', data.character_left)

    setFirstString(dataString.slice(-15))
    setSecondString(dataString.slice(-45, -15))
    setThirdString(dataString.slice(-75, -45))
    setFourthString(dataString.slice(-105, -75))
    setChrCountDisplay(dataChrCount)

    // Remove event listeners on cleanup
    return () => {
      // console.log('unmounted')
      window.removeEventListener("keydown", downHandler);
      // window.removeEventListener("beforeunload", axiosPUT);
      // window.removeEventListener("keyup", upHandler);
    };
  }, [data,dataString]);

  // USE EFFECT TO START TIMER, RELOAD FOR GAME READY AND DATA REFRESH
  useEffect(() => {
    console.log('uf 2')
    if(!timerReady) {
      if(gameReady) {
        console.log('Starting Save Interval Timer');
        setTimerReady(true);
        setTimeout(savePeriod, timerInterval);
        localStorage.setItem('timer_started', true)
      };
    };

    window.onunload = () => {
      localStorage.setItem('timer_started', false);
      axiosPUT();
    }
    setDataChrCount(data.character_left)
    // setAddPer(data.add_per_input)
    // addPerInput = data.adda_per_input

    console.log('Total character count:', data.character_count)
    console.log('Input amount:', data.add_per_input)
    console.log(addPerInput)

  },[data,gameReady])

  const handleClick = () => {
    navigate('/upgrade')
  }

  // if(!firstString || !secondString || !thirdString || !fourthString) {
  //   return <h1> What </h1>
  // }

  return (
    <div className='typed__container'>
      <div className='typed__buttons'>
        <div className='typed__upgrade' onClick={handleClick}>Upgrades</div>
      </div>
      <UserCurrentStat chrCountDisplay={chrCountDisplay}/>
      {/* <div>{typed}</div> */}
      <div className='typed__box'>
        <div>{fourthString}</div>
        <div>{thirdString}</div>
        <div>{secondString}</div>
        <div>{firstString}</div>
      </div>
      <div>{chrCountDisplay}</div>
    </div>
  )
}

export default TypedText;