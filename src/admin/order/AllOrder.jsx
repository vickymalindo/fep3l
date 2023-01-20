import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from './../../styles/PageTable.module.css';

const AllOrder = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let filled = false;
    const getOrder = async () => {
      const res = await axios.get(
        'http://127.0.0.1:8000/api/purchase/get/admin'
      );
      const { data } = res.data;
      setData(data);
    };
    if (!filled) {
      getOrder();
    }
    return () => {
      filled = true;
    };
  }, []);

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Semua Pesanan</h1>
      <div className={style.wrapper_table}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Barang</th>
              <th>No. Telepon</th>
              <th>Total Harga</th>
              <th>Bukti Pembayaran</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((order) => {
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.user_fullname}</td>
                  <td>{order.user_address}</td>
                  <td>{order.list_product}</td>
                  <td>{order.user_phone}</td>
                  <td>{order.total_price}</td>
                  <td>
                    <a href={order.payment} target='_blank' rel='noreferrer'>
                      <img
                        className={style.img}
                        src={order.payment}
                        alt='bukti tf'
                      />
                    </a>
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

export default AllOrder;
