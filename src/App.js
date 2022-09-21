import './App.scss';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import TypedText from './component/TypedText/TypedText';
import UpgradePage from './pages/UpgradePage/UpgradePage';


function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path='/' element={<TypedText />} />
        <Route path='/upgrade' element={<UpgradePage />} />
      </Routes>
    </MemoryRouter>
  );
}

export default App;
