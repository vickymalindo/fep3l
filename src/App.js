import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './admin/Admin';
import AddMenu from './admin/menus/AddMenu';
import AllMenu from './admin/menus/AllMenu';
import DeleteMenu from './admin/menus/DeleteMenu';
import AllOrder from './admin/order/AllOrder';
import AllUser from './admin/users/AllUser';
import ToAdmin from './admin/users/ToAdmin';
import ForgotPass from './components/ForgotPass';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './user/Cart';
import Payment from './user/Payment';
import User from './user/User';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<User />} />
          <Route path='user' element={<User />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='admin' element={<Admin />}>
            <Route path='allUser' element={<AllUser />} />
            <Route path='toAdmin' element={<ToAdmin />} />
            <Route path='allMenu' element={<AllMenu />} />
            <Route path='delMenu' element={<DeleteMenu />} />
            <Route path='allOrder' element={<AllOrder />} />
            <Route path='addMenu' element={<AddMenu />} />
          </Route>
          <Route path='payment' element={<Payment />} />
          <Route path='cart' element={<Cart />} />
          <Route path='forgotpass' element={<ForgotPass />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
