import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Admin from './pages/admin';
import Login from './pages/login';
import Hospital from './pages/hospital';
import Traffic from './pages/traffic';
import Ambulance from './pages/ambulance';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />{' '}
        <Route path="/" element={<Login />} />{' '}
        <Route path="/hospital" element={<Hospital />} />{' '}
        <Route path="/ambulance-driver" element={<Ambulance />} />
        <Route path="/traffic-police" element={<Traffic />} />
      </Routes>{' '}
    </BrowserRouter>
  );
}

export default App;
