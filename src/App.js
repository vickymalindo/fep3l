import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './admin/Admin';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './user/Cart';
import User from './user/User';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<User />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='admin' element={<Admin />} />
          <Route path='cart' element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
