import './UpgradePage.scss'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = "http://localhost:7878"

function UpgradePage({data}) {

  let upgrade1Number = data.upgrade_1
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

  const handleUpgrade1 = () => {
    console.log('Upgrade One Clicked')
    axios.put(API_URL, {upgrade_1: upgrade1Number += 1})
  }
  const handleUpgrade2 = () => {
    console.log('Upgrade Two Clicked')
  }
  const handleUpgrade3 = () => {
    console.log('Upgrade Three Clicked')
  }

  return (
    <section className='upgrade__container'>
      <h1>UpgradePage</h1>
      <div className='upgrade__options option'>
        <div className='option__1' onClick={handleUpgrade1}>500</div>
        <div className='option__2' onClick={handleUpgrade2}>1000</div>
        <div className='option__3' onClick={handleUpgrade3}>750</div>
      </div>
      <div className='upgrade__back' onClick={handleBack}>Back</div>
    </section>
  )
}

export default UpgradePage;