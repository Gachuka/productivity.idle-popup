import './UpgradePage.scss'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = "http://localhost:7878"

function UpgradePage() {

  const [ upgrade1, setUpgrade1 ] = useState(0)
  const [ upgrade2, setUpgrade2 ] = useState(0)
  const [ reload, setReload ] = useState(0)

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setUpgrade1(response.data.upgrade_1)
      setUpgrade2(response.data.upgrade_2)
    }).catch((error) => {
      console.log(error)
    })
  },[reload])
  

  // let upgrade1Number = data.upgrade_1
  // let upgrade2Number = data.upgrade_2
  // let upgrade3Number = data.upgrade_3
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

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
  // const handleUpgrade3 = () => {
  //   console.log('Upgrade Three Clicked')
  //   axios.put(API_URL, {upgrade_3: upgrade3Number += 1})
  // }

  return (
    <section className='upgrade__container'>
      <h1 className='upgrade__header'>UpgradePage</h1>
      <div className='upgrade__options option'>
        <div className='option__container'>
          <div className='option__cta'>
            <span>Magic Finger:</span>
            <div className='option__btn' onClick={handleUpgrade1}>500</div>
          </div>
          <p>Add one extra letter per input</p>
        </div>
        <div className='option__container'>
          <div className='option__cta'>
            <span>Magic Double:</span>
            <div className='option__2' onClick={handleUpgrade2}>1000</div>
          </div>
          <p>Doubles every input</p>
        </div>
        <div className='option__container'>
          <div className='option__cta'>
            <span>Type Bot:</span>
            <div className='option__3' >750</div>
          </div>
          <p>Types one letter per interval</p>
        </div>
        
      </div>
      <div className='upgrade__back' onClick={handleBack}>Back</div>
    </section>
  )
}

export default UpgradePage;