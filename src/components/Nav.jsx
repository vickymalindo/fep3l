import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo_nasduk from './../images/logo_nasduk.png';
import style from './../styles/Nav.module.css';

const Nav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const data = localStorage.getItem('data');
  const dataParse = JSON.parse(data);
  let level;
  if (dataParse) {
    level = dataParse.level;
  }

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/');
  };

  const handleClick = (nav) => {
    if (!dataParse) {
      navigate('/login');
    } else {
      if (nav === 'cart') {
        navigate('/cart');
      } else {
        navigate('/payment');
      }
    }
  };

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <div className={style.logo}>
          <img src={logo_nasduk} alt='logo_nasduk' />
        </div>
        <FaBars
          className={style.bars}
          onClick={() => setOpen((prev) => !prev)}
        />
        <ul className={open ? `${style.open}` : ''}>
          <li className={level === 'admin' ? `${style.hidden}` : ''}>
            <Link className={style.link} to='/'>
              Home
            </Link>
          </li>
          <li className={level === 'admin' ? `${style.hidden}` : ''}>
            <button className={style.link} onClick={() => handleClick('cart')}>
              Keranjang
            </button>
          </li>
          {dataParse ? (
            <>
              <li className={level === 'admin' ? `${style.hidden}` : ''}>
                <button
                  className={style.link}
                  to='/payment'
                  onClick={() => handleClick('pay')}>
                  Bayar
                </button>
              </li>
              <li>
                {level === 'admin' ? (
                  <p className={style.name}>{dataParse.firstname}</p>
                ) : (
                  ''
                )}
                <button
                  onClick={handleLogout}
                  className={
                    dataParse
                      ? `${style.block} ${style.btn_logout}`
                      : `${style.hidden}`
                  }>
                  Keluar
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className={style.link} to='/login'>
                  Masuk
                </Link>
              </li>
              <li>
                <Link className={style.link} to='/register'>
                  Daftar
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
