import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from './../styles/Menus.module.css';

const Menus = () => {
  // TODO: buat menus yang harus yang mau di jual
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const getMenus = async () => {
      const res = await axios.get('http://127.0.0.1:8000/api/menus/all');
      const { data } = res.data;
      setMenus(data);
    };

    getMenus();
  }, []);

  return (
    <div className={style.menu}>
      <h1>Menu</h1>
      <div className={style.menu_box}>
        {menus.map((item) => {
          return (
            <div className={style.menu_card} key={item.id}>
              <div className={style.menu_image}>
                <img src={item.image} alt={item.title} />
              </div>
              <div className={style.menu_info}>
                <h2>{item.title}</h2>
                <h3>Rp. {item.price}</h3>
                <button className={style.menu_btn}>Tambah keranjang</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menus;
