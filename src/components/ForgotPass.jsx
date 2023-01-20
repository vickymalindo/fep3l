import axios from 'axios';
import React, { useState } from 'react';
import about from './../images/about.png';
import style from './../styles/Login.module.css';
import Nav from './Nav';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleForgot = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `http://127.0.0.1:8000/api/auth/forgot/${email}`,
      {
        email,
        newPassword,
      }
    );
    const { message } = res.data;
    if (message !== 'Email not found') {
      setMessage('Password berhasil di ubah');
    } else {
      setMessage('Email tidak ditemuakan');
    }
  };

  return (
    <>
      <Nav />
      <div className={style.login}>
        <h2 className={style.title}>LUPA PASSWORD</h2>
        <div className={style.login_main}>
          <div className={style.login_image}>
            <img src={about} alt='about' />
          </div>
          <div className={style.right}>
            <h1
              className={
                message === 'Password berhasil di ubah'
                  ? `${style.error_false}`
                  : message === 'Email tidak ditemuakan'
                  ? `${style.error_true}`
                  : ''
              }>
              {message}
            </h1>
            <form onSubmit={handleForgot}>
              <div className={style.input}>
                <p>Email</p>
                <input
                  type='email'
                  placeholder='Masukan Email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={style.input}>
                <p>Password Baru</p>
                <input
                  type='password'
                  placeholder='Masukkan Password'
                  onChange={(e) => setNewPassword(e.target.value)}
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

export default ForgotPass;
