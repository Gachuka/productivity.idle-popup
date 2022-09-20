import './App.scss';
import TypedText from './component/TypedText/TypedText';
import axios from 'axios'
import { useState, useEffect } from 'react'

const API_URL = "http://localhost:7878"

function App() {

  const [ data, setData ] = useState()
  const [ callGet, setCallGet ] = useState()

  useEffect(() => {
    // setCallGet(false)
    axios.get(API_URL).then((response) => {
      setData(response.data)
    }).catch((error) => {
      console.log(error)
    })
  },[callGet])

  if(!data) {
    return <h1>... Loading ...</h1>
  }

  return (
    <div className="app__container">
      <div className='app__buttons'>
        
      </div>
      <div className="app__placeholder">Placeholder Box</div>
      <TypedText data={data} setCallGet={setCallGet} />
    </div>
  );
}

export default App;
