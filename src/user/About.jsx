import React from 'react';
import about from './../images/about.png';
import style from './../styles/About.module.css';

const About = () => {
  return (
    <div>
      <div className={style.about}>
        <div className={style.about_main}>
          <img src={about} alt='about' />
          <div className={style.about_text}>
            <h1>
              <span>Tentang</span>Kita
            </h1>
            <p>
              Nasi uduk bu neneng di dirikan pada tahun 20xx, dengan aneka
              masakan betawi seperti ayam semur, telur semur, telur balado,
              tempe kecap, tempe goreng, ikan tongkol, dan kentang balado. yang
              cocok buat kantong anak sekolahan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
