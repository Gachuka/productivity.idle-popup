import './ButtonComponent.scss'
import { useState } from 'react'

function ButtonComponent({value, onClickHandler}) {

  const [ pulse, setPulse ] = useState(false)

  const clickHandler = () => {
    onClickHandler()
    setPulse(true)
    console.log('clicked')
    setTimeout(() => {setPulse(false)}, 160)
  }

  return (
    <button className={`button-component ${pulse ? 'pulse' : ''}`} onClick={clickHandler}>{value}</button>
  )
}

export default ButtonComponent;