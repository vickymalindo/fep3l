import axios from 'axios';
import { useEffect, useState } from 'react';
import style from './../../styles/PageTable.module.css';

const AllUser = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let filled = false;
    const getUsers = async () => {
      const res = await axios.get('https://bep3l.uloy.dev/api/auth/users');
      const { data } = res.data;
      setData(data);
    };
    if (!filled) {
      getUsers();
    }
    return () => {
      filled = true;
    };
  }, []);

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Semua User</h1>
      <div className={style.wrapper_table}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Lengkap</th>
              <th>Alamat</th>
              <th>No. Telepon</th>
              <th>Jenis Kelamin</th>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
