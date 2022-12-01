import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo_nasduk from './../images/logo_nasduk.png';
import style from './../styles/Nav.module.css';

const Nav = () => {
  const navigate = useNavigate();
  const data = localStorage.getItem('data');
  const dataParse = JSON.parse(data);

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/');
  };

  return (
    <header>
      <nav>
        <div className={style.logo}>
          <img src={logo_nasduk} alt='logo_nasduk' />
        </div>
        <ul>
          <li>
            <Link className={style.link} to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link className={style.link} to='/cart'>
              Keranjang
            </Link>
          </li>
          {dataParse ? (
            <li>
              <button
                onClick={handleLogout}
                className={dataParse ? `${style.block}` : `${style.hidden}`}>
                Keluar
              </button>
            </li>
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
