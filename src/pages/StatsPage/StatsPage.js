import './StatsPage.scss'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = "http://localhost:7878"

function StatsPage() {

  const navigate = useNavigate()

  const [ data, setData ] = useState(null)

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setData(response.data)
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })
  },[])

  const handleBack = () => {
    navigate('/')
  }

  if(!data) {
    return <h1>Loading</h1>
  }

  return (
    <section className='stats__container'>
      <h1 className='stats__header'>Stats</h1>
      <div className='stats__table table'>
        <div className='table__section table__total'>
          <span>Typed Total:</span>
          <span>{data.character_count}</span>
        </div>
        <div className='table__section table__left'>
          <span>Typed Left:</span>
          <span>{data.character_left}</span>
        </div>
        <div className='table__section table__upg1'>
          <span>Upgrade 1 Bought:</span>
          <span>{data.upgrade_1}</span>
        </div>
        <div className='table__section table__upg2'>
          <span>Upgrade 2 Bought:</span>
          <span>{data.upgrade_2}</span>
        </div>
        <div className='table__section table__upg3'>
          <span>Upgrade 3 Bought:</span>
          <span>{data.upgrade_3}</span>
        </div>
        <div className='table__section table__input'>
          <span>Characters per Input:</span>
          <span>{data.add_per_input}</span>
        </div>
      </div>
      <div className='stats__back' onClick={handleBack}>Back</div>
    </section>
  )
}

export default StatsPage;