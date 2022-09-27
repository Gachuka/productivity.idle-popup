import './TypedText.scss'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getSave, putSave } from '../../utilities/utilities';
import UserCurrentStat from '../UserCurrentStat/UserCurrentStat'
import numeral from 'numeral'

const notLogged = ["Space", "Enter", "Backspace", "Control", "Alt", "Shift", "Tab", "Meta", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "NumLock", "CapsLock", "Escape", "MediaTrackNext", "MediaTrackPrevious", "MediaStop", "MediaPlayPause","AudioVolumeMute", "AudioVolumeDown", "AudioVolumeUp", "LaunchApplication2", "Delete", "Insert", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "PageDown", "PageUp", "Home", "End"]
const randomInput = ["a","A","b","B","c","C","d","D","e","E","f","F","g","G","h","H","i","I","j","J","k","K","l","L","m","M","n","N","o","O","p","P","q","Q","r","R","s","S","t","T","u","U","v","V","w","W","x","X","y","Y","z","Z",0,1,2,3,4,5,6,7,8,9,"!","@","#","$","%","^","&","*","(",")","-","_","+","=","|","\\","{","}","[","]",`'`,`"`,"`","~",":",";","<",">",",",".","?","/"]
const timerInterval = 5000
let botTimer

function TypedText() {

  const [ saveData, setSaveData ] = useState([])
  const [ textString, setTextString ] = useState('')
  const [ characterCurrent, setCharacterCurrent ] = useState(0)
  const [ characterLeftCount, setCharacterLeftCount ] = useState(0)
  const [ inputedAnim, setInputedAnim ] = useState(false)
  const [ botTypes, setBotTypes ] = useState(0)

  // ACTION ON EVERY KEY PRESS
  const downHandler = (event) => {
    if (notLogged.some(string => event.key === string)) {
      return;
    };
    inputHandler(event.key)
  }

  // INPUT HANDLER
  const inputHandler = (input) => {
    setInputedAnim(true)
    setTimeout(() => {
      setInputedAnim(false)
    },60)
    
    const typedAdded = localStorage.getItem('typed_string') + input
    const typedThisSave = localStorage.getItem('typed_string_this_save') + input
    const countAdded = Number(localStorage.getItem('character_count')) + Number(localStorage.getItem('add_per_input'))
    const countThisSave = Number(localStorage.getItem('character_count_this_save')) + Number(localStorage.getItem('add_per_input'))
    const countLeftAdded = Number(localStorage.getItem('character_left')) + Number(localStorage.getItem('add_per_input'))
    setTextString(typedAdded)
    setCharacterCurrent(countAdded)
    setCharacterLeftCount(countLeftAdded)
    
    localStorage.setItem('typed_string', typedAdded)
    localStorage.setItem('typed_string_this_save', typedThisSave)
    localStorage.setItem('character_count', countAdded)
    localStorage.setItem('character_count_this_save', countThisSave)
    localStorage.setItem('character_left', countLeftAdded)
  }

  // FIRST GET AND SET DATA
  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    // window.addEventListener('keyup', upHandler)
    window.onunload = () => {
      localStorage.setItem('is_saving', false);
      localStorage.setItem('bot_running', false);
    };

    getSave().then((response) => {
      setSaveData(response.data)
      setTextString(response.data.text_typed)
      setCharacterCurrent(response.data.character_count)
      setCharacterLeftCount(response.data.character_left)
      setBotTypes(response.data.upgrade_3)

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
      window.removeEventListener('keydown', downHandler);
      savePeriod();
      clearInterval(botTimer)
      localStorage.setItem('bot_running', false);
    };
  },[]);

  // SAVE FUNCTION
  const savePeriod = () => {
    getSave().then((response) => {
      const putBody = {
        text_typed: localStorage.getItem('typed_string_this_save'),
        character_count: response.data.character_count + Number(localStorage.getItem('character_count_this_save'))
      };
      return putSave(putBody);
    }).then((response) => {
      localStorage.setItem('character_count_this_save', 0);
      localStorage.setItem('typed_string_this_save', '');
      return getSave();
    }).then((response) => {
      setTextString(response.data.text_typed);
      setCharacterLeftCount(response.data.character_left);
    }).catch((error) => {
      console.log(error);
    })
  }

  // BOT INPUT FUNCTION
  const botPeriod = () => {
    const rdmInput = randomInput[Math.floor(Math.random()*randomInput.length)]
    inputHandler(rdmInput)
  }

  // DO CHECK IF THERE IS DATA AND TIMER NOT STARTED YET
  if (localStorage.getItem('is_saving') === 'false' && saveData) {
    setInterval(savePeriod, timerInterval);
    localStorage.setItem('is_saving', true);
  };

  if (localStorage.getItem('bot_running') === 'false' && botTypes > 0) {
    botTimer = setInterval(botPeriod, (botTypes*5000))
    localStorage.setItem('bot_running', true)
  }
  
  // LOADING STATE WHEN THERE IS NO DATA
  if(textString === undefined) {
    return <h1>Loading</h1>
  };

  return (
    <div className='typed__container'>
      <div className='typed__buttons'>
        <Link className='typed__upgrade link' to='/upgrade'>Upgrades</Link>
        <Link className='typed__stats link' to='/stats'>Stats</Link>
      </div>
      <UserCurrentStat chrCountExp={characterCurrent} chrCountDisplay={characterLeftCount}/>
      <div className='typed__box'>
        <pre className='typed__area5'>{textString.slice(-135,-105)}</pre>
        <pre className='typed__area4'>{textString.slice(-105,-75)}</pre>
        <pre className='typed__area3'>{textString.slice(-75,-45)}</pre>
        <pre className='typed__area2'>{textString.slice(-45,-15)}</pre>
        <div className='typed__last-line'>
          <pre className='typed__area1'>{textString.slice(-15,-1)}</pre>
          <pre className={`typed__area ${inputedAnim ? 'input' : ''}`}>{textString.slice(-1)}</pre>
          <span className='typed__cursor'></span>
          <span className='typed__spacer'></span>
        </div>
      </div>
      <span className='typed__keystroke'>Multiplier: x{numeral(localStorage.getItem('add_per_input')).format('O,O')}</span>
    </div>
  );
};

export default TypedText;