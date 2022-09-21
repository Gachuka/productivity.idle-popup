import './App.scss';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import TypedText from './component/TypedText/TypedText';
import UpgradePage from './pages/UpgradePage/UpgradePage';
import StatsPage from './pages/StatsPage/StatsPage';


function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path='/' element={<TypedText />} />
        <Route path='/upgrade' element={<UpgradePage />} />
        <Route path='/stats' element={<StatsPage />} />
      </Routes>
    </MemoryRouter>
  );
}

export default App;
