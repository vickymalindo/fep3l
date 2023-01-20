import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './../styles/Menus.module.css';

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  const addToCart = async (item) => {
    const {
      code: product_code,
      title: product_name,
      price,
      image: product_image,
    } = item;
    const user_data = localStorage.getItem('data');
    const parseData = JSON.parse(user_data);
    if (!parseData) {
      navigate('/login');
    } else {
      const user_id = '' + parseData.id;
      const product_price = '' + price;
      const res = await axios.post(
        `http://127.0.0.1:8000/api/checkout/add/${user_id}/${product_code}`,
        {
          user_id,
          product_code,
          product_name,
          product_image,
          product_price,
        }
      );
      const { message } = res.data;
      if (message === 'Data already in cart') {
        alert('Data sudah ada di keranjang');
      } else {
        alert('Menambahkan ke keranjang');
      }
    }
  };

  useEffect(() => {
    const getMenus = async () => {
      const res = await axios.get('http://127.0.0.1:8000/api/menus/all');
      const { data } = res.data;
      setMenus(data);
    };
    let filled = false;
    if (!filled) {
      getMenus();
    }
    return () => {
      filled = true;
    };
  }, []);

  return (
    <div className={style.menu}>
      <h1>Menu</h1>
      <div className={style.menu_box}>
        {menus?.map((item) => {
          return (
            <div className={style.menu_card} key={item.id}>
              <div className={style.menu_image}>
                <img src={item.image} alt={item.title} />
              </div>
              <div className={style.menu_info}>
                <h2>{item.title}</h2>
                <h3 className={style.code}>{item.code}</h3>
                <h3>Rp. {item.price}</h3>
                <button
                  onClick={() => addToCart(item)}
                  className={style.menu_btn}>
                  Tambah keranjang
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menus;
