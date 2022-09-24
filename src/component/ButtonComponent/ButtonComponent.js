import './ButtonComponent.scss'
import { useState } from 'react'
import numeral from 'numeral'

function ButtonComponent({value, onClickHandler}) {

  const [ pulse, setPulse ] = useState(false)

  const clickHandler = () => {
    onClickHandler()
    setPulse(true)
    setTimeout(() => {setPulse(false)}, 160)
  }

  return (
    <button className={`button-component ${pulse ? 'pulse' : ''}`} onClick={clickHandler}>{numeral(value).format('O.Oa')}</button>
  )
}

export default ButtonComponent;