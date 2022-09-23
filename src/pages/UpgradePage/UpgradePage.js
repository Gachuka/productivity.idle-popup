import './UpgradePage.scss'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ButtonComponent from '../../component/ButtonComponent/ButtonComponent'

const API_URL = "http://localhost:7878"

function UpgradePage() {

  const [ upgrade1, setUpgrade1 ] = useState(0)
  const [ upgrade2, setUpgrade2 ] = useState(0)
  const [ upgrade3, setUpgrade3 ] = useState(0)
  const [ reload, setReload ] = useState(0)

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setUpgrade1(response.data.upgrade_1)
      setUpgrade2(response.data.upgrade_2)
      setUpgrade3(response.data.upgrade_3)
    }).catch((error) => {
      console.log(error)
    })
  },[reload])
  
  const handleUpgrade1 = () => {
    console.log('Upgrade One Clicked')
    axios.put(API_URL, {upgrade_1: upgrade1 + 1})
    setReload(Date.now())
  }
  const handleUpgrade2 = () => {
    console.log('Upgrade Two Clicked')
    axios.put(API_URL, {upgrade_2: upgrade2 + 1})
    setReload(Date.now())
  }
  const handleUpgrade3 = () => {
    console.log('Upgrade Three Clicked')
    axios.put(API_URL, {upgrade_3: upgrade3 + 1})
    setReload(Date.now())
  }

  return (
    <section className='upgrade__container'>
      <h1 className='upgrade__header'>Upgrades</h1>
      <div className='upgrade__options option'>
        <div className='option__container'>
          <div className='option__cta'>
            <span>Magic Finger:</span>
            <ButtonComponent value='500' onClickHandler={handleUpgrade1} /> 
          </div>
          <p>Add one extra letter per input</p>
        </div>
        <div className='option__container'>
          <div className='option__cta'>
            <span>Magic Double:</span>
            <ButtonComponent value='1000' onClickHandler={handleUpgrade2} /> 
          </div>
          <p>Doubles every input</p>
        </div>
        <div className='option__container'>
          <div className='option__cta'>
            <span>Type Bot:</span>
            <ButtonComponent value='750' onClickHandler={handleUpgrade3} /> 
          </div>
          <p>Types one letter per interval</p>
        </div>
      </div>
      <Link className='upgrade__back link' to='/'>Back</Link>
    </section>
  )
}

export default UpgradePage;