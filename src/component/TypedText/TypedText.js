import './TypedText.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserCurrentStat from '../UserCurrentStat/UserCurrentStat'

const notLogged = ["Space", "Enter", "Backspace", "Control", "Alt", "Shift", "Tab", "Meta", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "NumLock", "CapsLock", "Escape", "MediaTrackNext", "MediaTrackPrevious", "MediaStop", "MediaPlayPause","AudioVolumeMute", "AudioVolumeDown", "AudioVolumeUp", "LaunchApplication2", "Delete", "Insert", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "PageDown", "PageUp", "Home", "End"]
const API_URL = "http://localhost:7878"
const timerInterval = 5000

function TypedText() {

  const [ saveData, setSaveData ] = useState(null)

  const [ textString, setTextString ] = useState('')
  // const [ characterCountThisSave, setCharacterCountThisSave ] = useState(0)
  const [ characterLeftCount, setCharacterLeftCount ] = useState(0)
  // const [ addPerInput, setAddPerInput ] = useState(0)
  // const [ firstString, setFirstString ] = useState('')
  // const [ secondString, setSecondString ] = useState('')
  // const [ thirdString, setThirdString ] = useState('')
  // const [ fourthString, setFourthString ] = useState('')

  const navigate = useNavigate()

  const downHandler = (event) => {

    if (notLogged.some(string => event.key === string)) {
      console.log("Not Logged");
      return;
    };

    console.log(event.key)
    const typedAdded = localStorage.getItem('typed_string') + event.key
    const typedThisSave = localStorage.getItem('typed_string_this_save') + event.key
    const countAdded = Number(localStorage.getItem('character_count')) + Number(localStorage.getItem('add_per_input'))
    const countThisSave = Number(localStorage.getItem('character_count_this_save')) + Number(localStorage.getItem('add_per_input'))
    const countLeftAdded = Number(localStorage.getItem('character_left')) + Number(localStorage.getItem('add_per_input'))
    setTextString(typedAdded)
    setCharacterLeftCount(countLeftAdded)

    localStorage.setItem('typed_string', typedAdded)
    localStorage.setItem('typed_string_this_save', typedThisSave)
    localStorage.setItem('character_count', countAdded)
    localStorage.setItem('character_count_this_save', countThisSave)
    localStorage.setItem('character_left', countLeftAdded)
  }

  useEffect(() => {
    console.log('mounted')
    window.addEventListener('keydown', downHandler)
    window.onunload = () => {
      localStorage.setItem('is_saving', false);
    }

    axios.get(API_URL).then((response) => {
      console.log(response.data)

      setSaveData(response.data)
      setTextString(response.data.text_typed)
      setCharacterLeftCount(response.data.character_left)
      // setAddPerInput(response.data.add_per_input)

      localStorage.setItem('typed_string', response.data.text_typed)
      localStorage.setItem('typed_string_this_save', '')
      localStorage.setItem('character_count', response.data.character_count)
      localStorage.setItem('character_count_this_save', 0)
      localStorage.setItem('character_left', response.data.character_left)
      localStorage.setItem('add_per_input', response.data.add_per_input)

    }).then(() => {
    }).catch((error) => {
      console.log(error)
    })

    return () => {
      console.log('unmounted')
      window.removeEventListener('keydown', downHandler)
      // localStorage.setItem('is_saving', false);
    }
  },[])

  const savePeriod = () => {
    console.log('saved')
    axios.get(API_URL).then((response) => {
      console.log('first Get')
      const putBody = {
        text_typed: response.data.text_typed + localStorage.getItem('typed_string_this_save'),
        character_count: response.data.character_count + Number(localStorage.getItem('character_count_this_save'))
      }
      return axios.put(API_URL, putBody)
    }).then((response) => {
      console.log(response.data)
      localStorage.setItem('character_count_this_save', 0)
      localStorage.setItem('typed_string_this_save', '')
      return axios.get(API_URL)
    }).then((response) => {
      console.log('got recent save data')
      setTextString(response.data.text_typed)
      console.log(response.data.text_typed)
      setCharacterLeftCount(response.data.character_left)
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    console.log('Reload')
  },[textString, characterLeftCount])

  const handleClick = () => {
    navigate('/upgrade')
  }

  if (localStorage.getItem('is_saving') === 'false') {
    setInterval(savePeriod, timerInterval)
    localStorage.setItem('is_saving', true)
  }

  return (
    <div className='typed__container'>
      <div className='typed__buttons'>
        <div className='typed__upgrade' onClick={handleClick}>Upgrades</div>
      </div>
      <UserCurrentStat chrCountDisplay={characterLeftCount}/>
      {/* <div>{typed}</div> */}
      <div className='typed__box'>
        <div>{textString.slice(-105,-75)}</div>
        <div>{textString.slice(-75,-45)}</div>
        <div>{textString.slice(-45,-15)}</div>
        <div>{textString.slice(-15)}</div>
      </div>
      <div>{characterLeftCount}</div>
    </div>
  )
}

export default TypedText;