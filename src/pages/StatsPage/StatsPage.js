import './StatsPage.scss'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import numeral from 'numeral'

const API_URL = "http://localhost:7878"

function StatsPage() {

  const [ data, setData ] = useState(null)

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setData(response.data)
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })
  },[])

  if(!data) {
    return <h1>Loading</h1>
  }

  return (
    <section className='stats__container'>
      <h1 className='stats__header'>Stats</h1>
      <div className='stats__table table'>
        <div className='table__section table__total'>
          <span>Typed Total:</span>
          <span>{numeral(data.character_count).format('O,O')}</span>
        </div>
        <div className='table__section table__left'>
          <span>Typed Left:</span>
          <span>{numeral(data.character_left).format('O,O')}</span>
        </div>
        <div className='table__section table__upg1'>
          <span>Upgrade 1 Bought:</span>
          <span>{numeral(data.upgrade_1).format('O,O')}</span>
        </div>
        <div className='table__section table__upg2'>
          <span>Upgrade 2 Bought:</span>
          <span>{numeral(data.upgrade_2).format('O,O')}</span>
        </div>
        <div className='table__section table__upg3'>
          <span>Upgrade 3 Bought:</span>
          <span>{numeral(data.upgrade_3).format('O,O')}</span>
        </div>
        <div className='table__section table__input'>
          <span>Characters per Input:</span>
          <span>{numeral(data.add_per_input).format('O,O')}</span>
        </div>
      </div>
      <Link className='stats__back link' to='/'>Back</Link>
    </section>
  )
}

export default StatsPage;