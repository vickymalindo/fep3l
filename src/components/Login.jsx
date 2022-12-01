import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import about from './../images/about.png';
import style from './../styles/Login.module.css';
import Nav from './Nav';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/auth/login', {
        email,
        password,
      });
      const { access_token } = res.data;
      if (access_token) {
        const token = access_token;
        const user = await axios({
          method: 'POST',
          url: 'http://127.0.0.1:8000/api/auth/me',
          headers: { Authorization: `Bearer${token}` },
        });
        const { level } = user.data;
        if (level === 'admin') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
        const { data } = user;
        localStorage.setItem('data', JSON.stringify(data));
        localStorage.setItem('token', JSON.stringify(access_token));
      }
    } catch (error) {
      setMessage('Email atau Password Salah');
    }
  };

  return (
    <>
      <Nav />
      <div className={style.login}>
        <div className={style.login_main}>
          <div className={style.login_image}>
            <img src={about} alt='about' />
          </div>
          <div className={style.right}>
            <h1
              className={
                message ? `${style.error_true}` : `${style.error_false}`
              }>
              {message}
            </h1>
            <form onSubmit={handleLogin}>
              <div className={style.input}>
                <p>Email</p>
                <input
                  type='email'
                  placeholder='Masukan Email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={style.input}>
                <p>Password</p>
                <input
                  type='password'
                  placeholder='Masukkan Password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type='submit' className={style.login_btn}>
                Masuk
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
