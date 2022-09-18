import './App.scss';
import TypedText from './component/TypedText/TypedText';
import axios from 'axios'
import { useState, useEffect } from 'react'

const API_URL = "http://localhost:7878"

function App() {

  const [ data, setData ] = useState()

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setData(response.data)
    }).catch((error) => {
      console.log(error)
    })
  },[])

  if(!data) {
    return <h1>... Loading ...</h1>
  }

  return (
    <div className="app__container">
      <h1>Things typed</h1>
      <TypedText data={data} />
    </div>
  );
}

export default App;
