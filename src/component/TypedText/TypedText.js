import './TypedText.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserCurrentStat from '../UserCurrentStat/UserCurrentStat'

const notLogged = ["Space", "Enter", "Backspace", "Control", "Alt", "Shift", "Tab", "Meta", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "NumLock", "CapsLock", "Escape", "MediaTrackNext", "MediaTrackPrevious", "MediaStop", "MediaPlayPause","AudioVolumeMute", "AudioVolumeDown", "AudioVolumeUp", "LaunchApplication2", "Delete", "Insert", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "PageDown", "PageUp", "Home", "End"]
const API_URL = "http://localhost:7878"
const timerInterval = 5000

function TypedText() {

  console.log('TypedText Mounted')
  const [ saveData, setSaveData ] = useState([])
  const [ textString, setTextString ] = useState('')
  const [ characterLeftCount, setCharacterLeftCount ] = useState(0)
  const navigate = useNavigate()

  // ACTION ON EVERY KEY PRESS
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

  // FIRST GET AND SET DATA
  useEffect(() => {
    console.log('mounted')
    window.addEventListener('keydown', downHandler)
    window.onunload = () => {
      localStorage.setItem('is_saving', false);
    }

    axios.get(API_URL).then((response) => {
      console.log(response)
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

    }).catch((error) => {
      console.log(error)
    });

    return () => {
      console.log('unmounted');
      window.removeEventListener('keydown', downHandler);
    };
  },[]);

  // SAVE FUNCTION
  const savePeriod = () => {
    console.log('saved');
    axios.get(API_URL).then((response) => {
      console.log('first Get');
      const putBody = {
        text_typed: localStorage.getItem('typed_string_this_save'),
        character_count: response.data.character_count + Number(localStorage.getItem('character_count_this_save'))
      };
      console.log(putBody)
      return axios.put(API_URL, putBody);
    }).then((response) => {
      console.log(response);
      localStorage.setItem('character_count_this_save', 0);
      localStorage.setItem('typed_string_this_save', '');
      return axios.get(API_URL);
    }).then((response) => {
      setTextString(response.data.text_typed);
      console.log(response.data.text_typed);
      setCharacterLeftCount(response.data.character_left);
    }).catch((error) => {
      console.log(error);
    })
  }

  // USEEFFECT TO CHECK RELOAD
  useEffect(() => {
    console.log('Reload');
  },[textString, characterLeftCount]);

  // PAGE CHANGE
  const handleUpgrade = () => {
    navigate('/upgrade');
  };
  const handleStats = () => {
    navigate('/stats');
  };

  // DO CHECK IF THERE IS DATA AND TIMER NOT STARTED YET
  if (localStorage.getItem('is_saving') === 'false' && saveData) {
    setInterval(savePeriod, timerInterval);
    localStorage.setItem('is_saving', true);
  };

  // LOADING STATE WHEN THERE IS NO DATA
  if(textString === undefined) {
    return <h1>Loading</h1>
  };

  console.log(saveData)

  return (
    <div className='typed__container'>
      <div className='typed__buttons'>
        <div className='typed__upgrade' onClick={handleUpgrade}>Upgrades</div>
        <div className='typed__stats' onClick={handleStats}>Stats</div>
      </div>
      <UserCurrentStat chrCountDisplay={characterLeftCount}/>
      {/* <div>{typed}</div> */}
      <div className='typed__box'>
        <div className='typed__area4' dir='rtl'>{textString.slice(-105,-75)}</div>
        <div className='typed__area3' dir='rtl'>{textString.slice(-75,-45)}</div>
        <div className='typed__area2' dir='rtl'>{textString.slice(-45,-15)}</div>
        <div className='typed__area1' dir='rtl'>{textString.slice(-15)}</div>
        <div className='typed__cursor'></div>
        <div className='typed__spacer'></div>
      </div>
      <div>{characterLeftCount}</div>
    </div>
  );
};

export default TypedText;