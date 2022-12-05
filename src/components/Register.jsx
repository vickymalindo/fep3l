import axios from 'axios';
import { useState } from 'react';
import about from './../images/about.png';
import style from './../styles/Register.module.css';
import Nav from './Nav';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [fullname, setFullname] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://127.0.0.1:8000/api/auth/register', {
      email,
      firstname,
      lastname,
      fullname,
      password,
      address,
      gender,
      telephone,
    });
    if (res) {
      setMessage('Daftar Berhasil, Silahkan Login');
    } else {
      setMessage('Daftar Gagal Email Sudah digunakan');
    }
  };

  return (
    <>
      <Nav />
      <div className={style.register}>
        <div className={style.register_main}>
          <div className={style.register_image}>
            <img src={about} alt='about' />
          </div>
          <div className={style.right}>
            <h1
              className={
                message === 'Daftar Berhasil, Silahkan Login'
                  ? `${style.register_true}`
                  : message === 'Daftar Gagal Email Sudah digunakan'
                  ? `${style.register_false}`
                  : ''
              }>
              {message}
            </h1>
            <form onSubmit={handleRegister}>
              <div className={style.input}>
                <p>Firstname</p>
                <input
                  type='text'
                  placeholder='Masukkan Nama Awal'
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className={style.input}>
                <p>Lastname</p>
                <input
                  type='text'
                  placeholder='Masukkan Nama Akhir'
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className={style.input}>
                <p>Gender</p>
                <input
                  type='text'
                  placeholder='Masukan Jenis Kelamin'
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <div className={style.input}>
                <p>Fullname</p>
                <input
                  type='text'
                  placeholder='Masukkan Nama Lengkap'
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div className={style.input}>
                <p>Nomor Telephone</p>
                <input
                  type='text'
                  placeholder='08xxxxxxx'
                  onChange={(e) => setTelephone(e.target.value)}
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
              <div className={style.input}>
                <p>Email</p>
                <input
                  type='email'
                  placeholder='xxxxx@gmail.com'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={style.input}>
                <p>Alamat</p>
                <input
                  type='text'
                  placeholder='Masukkan Alamat Lengkap'
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <button type='submit' className={style.register_btn}>
                Daftar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
