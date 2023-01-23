import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from './../../styles/PageTable.module.css';

const ToAdmin = () => {
  const [data, setData] = useState([]);

  const toAdmin = async (id) => {
    const res = await axios.put(
      `https://bep3l.uloy.dev/api/auth/toAdmin/${id}`
    );
    const { status } = res.data;
    if (status === 200) {
      getUsers();
    }
  };

  const getUsers = async () => {
    const res = await axios.get('https://bep3l.uloy.dev/api/auth/users');
    const { data } = res.data;
    setData(data);
  };

  useEffect(() => {
    let filled = false;
    if (!filled) {
      getUsers();
    }
    return () => {
      filled = true;
    };
  }, []);

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Jadikan Admin</h1>
      <div className={style.wrapper_table}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Lengkap</th>
              <th>Alamat</th>
              <th>No. Telepon</th>
              <th>Jenis Kelamin</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, index) => {
              return (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{user.fullname}</td>
                  <td>{user.address}</td>
                  <td>{user.telephone}</td>
                  <td>{user.gender}</td>
                  <td>
                    <button
                      className={style.btn_admin}
                      onClick={() => toAdmin(user.id)}>
                      Admin
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

export default ToAdmin;
