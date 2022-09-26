import './UpgradePage.scss'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import numeral from 'numeral'
import ButtonComponent from '../../component/ButtonComponent/ButtonComponent'

const API_URL = "http://localhost:7878"

function UpgradePage() {

  const [ data, setData ] = useState(null)
  const [ upgrade1, setUpgrade1 ] = useState(0)
  const [ upgrade1Cost, setUpgrade1Cost ] = useState(0)
  const [ upgrade1Bought, setUpgrade1Bought ] = useState(false)
  const [ upgrade2, setUpgrade2 ] = useState(0)
  const [ upgrade2Cost, setUpgrade2Cost ] = useState(0)
  const [ upgrade2Bought, setUpgrade2Bought ] = useState(0)
  const [ upgrade3, setUpgrade3 ] = useState(0)
  const [ upgrade3Cost, setUpgrade3Cost ] = useState(0)
  const [ upgrade3Bought, setUpgrade3Bought ] = useState(0)
  const [ reload, setReload ] = useState(0)

  const localCharLeft = Number(localStorage.getItem('character_left'))

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setData(response.data)
      console.log(response.data)
      setUpgrade1(response.data.upgrade_1)
      setUpgrade1Cost(Math.round(500 * Math.pow(1.5, response.data.upgrade_1)))
      setUpgrade2(response.data.upgrade_2)
      setUpgrade2Cost(Math.round(1000 * Math.pow(2.75, response.data.upgrade_2)))
      setUpgrade3(response.data.upgrade_3)
      setUpgrade3Cost(Math.round(750 * Math.pow(1.5, response.data.upgrade_3)))
    }).catch((error) => {
      console.log(error)
    })
  },[reload])

  const handleUpgrade1 = async () => {
    // console.log('Upgrade One Clicked')
    if (localCharLeft <= upgrade1Cost - 1) {
      console.log('Can not be bought')
      return 
    }
    console.log('Can be bought')
    localStorage.setItem('character_left', localCharLeft - upgrade1Cost)
    await axios.put(API_URL, {upgrade_1: upgrade1 + 1}).then(() => {
      setReload(Date.now())
      setUpgrade1Bought(true)
      setTimeout(() => {setUpgrade1Bought(false)}, 300)
    }).catch(error => console.log(error.message))
  }
  const handleUpgrade2 = async () => {
    // console.log('Upgrade Two Clicked')
    if (localCharLeft <= upgrade2Cost - 1) {
      console.log('Can not be bought')
      return 
    }
    console.log('Can be bought')
    localStorage.setItem('character_left', localCharLeft - upgrade2Cost)
    await axios.put(API_URL, {upgrade_2: upgrade2 + 1}).then(() => {
      setReload(Date.now())
      setUpgrade2Bought(true)
      setTimeout(() => {setUpgrade2Bought(false)}, 300)
    }).catch(error => console.log(error.message))
  }
  const handleUpgrade3 = async () => {
    // console.log('Upgrade Three Clicked')
    if (localCharLeft <= upgrade3Cost - 1) {
      console.log('Can not be bought')
      return 
    }
    console.log('Can be bought')
    localStorage.setItem('character_left', localCharLeft - upgrade3Cost)
    await axios.put(API_URL, {upgrade_3: upgrade3 + 1}).then(() => {
      setReload(Date.now())
      setUpgrade3Bought(true)
      setTimeout(() => {setUpgrade3Bought(false)}, 300)
    }).catch(error => console.log(error.message))
  }
  
  if (!data) {
    return <h1>Loading</h1>
  }

  return (
    <section className='upgrade__container'>
      <h1 className='upgrade__header'>Upgrades</h1>
      <div className='upgrade__options option'>
        <div className='option__container'>
          <div className='option__cta'>
            <span>Magic Finger:</span>
            <span className={`option__bought ${upgrade1Bought ? 'bought' : ''}`}>{upgrade1}</span>
            <ButtonComponent value={upgrade1Cost} onClickHandler={handleUpgrade1} /> 
          </div>
          <p>Add one extra letter per input</p>
        </div>
        <div className='option__container'>
          <div className='option__cta'>
            <span>Magic Double:</span>
            <span className={`option__bought ${upgrade2Bought ? 'bought' : ''}`}>{upgrade2}</span>
            <ButtonComponent value={upgrade2Cost} onClickHandler={handleUpgrade2} /> 
          </div>
          <p>Doubles every input</p>
        </div>
        <div className='option__container'>
          <div className='option__cta'>
            <span>Type Bot:</span>
            <span className={`option__bought ${upgrade3Bought ? 'bought' : ''}`}>{upgrade3}</span>
            <ButtonComponent value={upgrade3Cost} onClickHandler={handleUpgrade3} /> 
          </div>
          <p>Types one input every Xs</p>
        </div>
      </div>
      <div className='upgrade__currency'>
        <span>Characters left:</span>
        <span className='upgrade__currency-num'>{data.character_left < 10000 ? data.character_left : numeral(data.character_left).format('O.0a')}</span>
      </div>
      <Link className='upgrade__back link' to='/'>Back</Link>
    </section>
  )
}

export default UpgradePage;