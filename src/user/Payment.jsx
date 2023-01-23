import axios from 'axios';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import style from './../styles/Payment.module.css';

const Payment = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [transfer, setTransfer] = useState(null);

  // https://bep3l.uloy.dev/api/purchase/delivered/{id}

  const handleDelivered = async (id) => {
    const res = await axios.put(
      `https://bep3l.uloy.dev/api/purchase/delivered/${id}`
    );
    const { status } = res.data;
    if (status === 200) {
      alert('Berhasil diterima');
    } else {
      alert('Gagal');
    }
  };

  const handlePay = async (id) => {
    const user = localStorage.getItem('data');
    const userParse = JSON.parse(user);
    const { id: userId } = userParse;
    const formData = new FormData();
    formData.append('payment', transfer);
    const res = await axios.post(
      `https://bep3l.uloy.dev/api/purchase/payment/${userId}/${id}`,
      formData
    );
    console.log(res);
    if (res.data.status === 200) {
      alert('Berhasil, barangmu sedang disiapkan dan diantar');
      getPay();
    } else {
      alert('Gagal');
    }
  };

  const getPay = async () => {
    const user = localStorage.getItem('data');
    const userParse = JSON.parse(user);
    const { id } = userParse;
    const res = await axios.get(
      `https://bep3l.uloy.dev/api/purchase/get/${id}`
    );
    const { purchases } = res.data.data;
    console.log(purchases);
    if (purchases.length === 0) {
      setMessage('Data kosong atau belum melakukan pemesanan');
    } else {
      setData(purchases);
    }
  };

  useEffect(() => {
    let filled = false;
    if (!filled) {
      getPay();
    }
    return () => {
      filled = true;
    };
  }, []);

  return (
    <div>
      <Nav />
      <div className={style.container}>
        <div className={style.head}>
          <h4>Menu & Kuantitas</h4>
          <h4>Harga</h4>
          <h4 className={style.transfer}>Bukti Pembayaran</h4>
          <h4 className={style.action}>Aksi</h4>
        </div>
        {message === '' ? (
          data?.map((item) => {
            return (
              <div className={style.list} key={item.id}>
                <h5 className={style.menu}>{item.list_product}</h5>
                <h5 className={style.price}>{item.total_price}</h5>
                <input
                  type='file'
                  className={style.input}
                  onChange={(e) => setTransfer(e.target.files[0])}
                />
                {item.payment === '' ? (
                  <button
                    className={style.bayar}
                    onClick={() => handlePay(item.id)}>
                    Bayar
                  </button>
                ) : (
                  <button
                    className={style.bayar}
                    onClick={() => handleDelivered(item.id)}>
                    Diterima
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div className={style.empty}>
            <p>{message}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
