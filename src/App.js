import './App.scss';
import TypedText from './component/TypedText/TypedText';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UpgradePage from './pages/UpgradePage/UpgradePage';

const API_URL = "http://localhost:7878"

function App() {

  const [ data, setData ] = useState()
  const [ callGet, setCallGet ] = useState()

  useEffect(() => {
    console.log('app axios')
    // setCallGet(false)
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
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TypedText data={data} setCallGet={setCallGet} />} />
        <Route path='/upgrade' element={<UpgradePage data={data} setCallGet={setCallGet} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
