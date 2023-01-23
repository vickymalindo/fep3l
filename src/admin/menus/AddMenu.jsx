import axios from 'axios';
import React, { useState } from 'react';
import addMenu from './../../images/addMenu.png';
import style from './../../styles/AddMenu.module.css';

const AddMenu = () => {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('code', code);
    formData.append('title', title);
    formData.append('image', image);
    formData.append('price', price);

    try {
      const res = await axios.post(
        'https://bep3l.uloy.dev/api/menus/menu',
        formData
      );
      console.log(res);
      const { status } = res.data;
      if (status === 200) {
        alert('Berhasil tambah menu');
      }
    } catch (error) {
      alert('Kode Produk Tidah Boleh Sama');
    }
  };

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Tambah Menu</h1>
      <div className={style.content}>
        <img src={addMenu} alt='gambar tambah menu' className={style.img} />
        <form onSubmit={handelSubmit}>
          <div className={style.form_control}>
            <label className={style.label}>Kode Menu</label>
            <input
              className={style.input}
              type='text'
              placeholder='Masukan kode menu'
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className={style.form_control}>
            <label className={style.label}>Judul Menu</label>
            <input
              className={style.input}
              type='text'
              placeholder='Masukan judul menu'
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={style.form_control}>
            <label className={style.label}>Gambar Menu</label>
            <input
              className={style.input}
              type='file'
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className={style.form_control}>
            <label className={style.label}>Harga Menu</label>
            <input
              className={style.input}
              type='text'
              placeholder='Masukan harga menu'
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <button className={style.btn} type='submit'>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
