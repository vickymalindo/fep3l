import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from './../../styles/PageTable.module.css';

const DeleteMenu = () => {
  const [data, setData] = useState([]);

  const handleDelete = async (id) => {
    const res = await axios.delete(
      `https://bep3l.uloy.dev/api/menus/menu/${id}`
    );
    const { status } = res.data;
    if (status === 200) {
      getMenus();
    }
  };

  const getMenus = async () => {
    const res = await axios.get('https://bep3l.uloy.dev/api/menus/all');
    const { data } = res.data;
    setData(data);
  };

  useEffect(() => {
    let filled = false;
    if (!filled) {
      getMenus();
    }
    return () => {
      filled = true;
    };
  }, []);

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Hapus Menu</h1>
      <div className={style.wrapper_table}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>No</th>
              <th>Kode Produk</th>
              <th>Nama Produk</th>
              <th>Gambar</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((menu) => {
              return (
                <tr key={menu.id}>
                  <td>{menu.id}</td>
                  <td>{menu.code}</td>
                  <td>{menu.title}</td>
                  <td>
                    <img
                      className={style.img}
                      src={menu.image}
                      alt={menu.code}
                    />
                  </td>
                  <td>{menu.price}</td>
                  <td>
                    <button
                      className={style.btn_delete}
                      onClick={() => handleDelete(menu.id)}>
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteMenu;
