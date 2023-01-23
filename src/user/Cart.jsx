import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import style from './../styles/Cart.module.css';

const Cart = () => {
  const [checkouts, setCheckouts] = useState([]);
  const [message, setMessage] = useState('');

  const handleMinus = (id) => {
    setCheckouts(
      checkouts.map((item) => {
        return item.id === id
          ? { ...item, count: item.count - 1 === 0 ? 1 : item.count - 1 }
          : item;
      })
    );
  };

  const handlePlus = (id) => {
    setCheckouts(
      checkouts.map((item) => {
        return item.id === id ? { ...item, count: item.count + 1 } : item;
      })
    );
  };

  const handleClick = (id) => {
    setCheckouts(
      checkouts.map((item) => {
        return item.id === id
          ? { ...item, check: item.check === false ? true : false }
          : item;
      })
    );
  };

  const getTotal = () => {
    let total = 0;
    checkouts.map((item) => {
      return item.check === true
        ? (total += item.count * item.product_price)
        : item;
    });
    return total;
  };

  const clickAllCheckbox = (e) => {
    const { checked } = e.target;
    const input = document.querySelectorAll('.checkbox');
    if (checked) {
      setCheckouts(
        checkouts.map((item) => {
          return { ...item, check: true };
        })
      );
      input.forEach((item) => {
        item.checked = true;
      });
    } else {
      setCheckouts(
        checkouts.map((item) => {
          return { ...item, check: false };
        })
      );
      input.forEach((item) => {
        item.checked = false;
      });
    }
  };

  const onClickDelete = async () => {
    const item = checkouts.find((val) => {
      return val.check === true;
    });
    const id = item?.id;
    const res = await axios.delete(
      `https://bep3l.uloy.dev/api/checkout/delete/${id}`
    );
    console.log(res);
    const { status } = res.data;
    if (status === 200) {
      alert('Hapus berhasil');
      getCheckouts();
    } else {
      alert('Gagal hapus data');
    }
  };

  const onClickCheckout = async () => {
    const user_data = localStorage.getItem('data');
    const parseData = JSON.parse(user_data);
    const {
      id: user_id,
      address: user_address,
      fullname: user_fullname,
      telephone: user_phone,
    } = parseData;
    const total_price = getTotal() + 10000;

    let list_product = '';
    const items = checkouts.filter((item) => {
      return item.check === true;
    });
    items.map((item) => {
      return (list_product += item.product_code + ' ' + item.count + ' ');
    });

    const res = await axios.post(
      `https://bep3l.uloy.dev/api/purchase/create/${user_id}`,
      {
        user_id,
        user_address,
        user_fullname,
        total_price,
        list_product,
        user_phone,
      }
    );
    const { status } = res.data;
    if (status === 200) {
      alert('Pesan berhasil');
    } else {
      alert('Pesan gagal');
    }
  };

  const getCheckouts = async () => {
    const user_data = localStorage.getItem('data');
    const parseData = JSON.parse(user_data);
    const id = parseData.id;
    const res = await axios.get(
      `https://bep3l.uloy.dev/api/checkout/get/${id}`
    );
    const { checkouts } = res.data.data;
    if (checkouts.length !== 0) {
      const data = checkouts.map((item) => {
        return { ...item, check: false, count: 1 };
      });
      console.log(data);
      setCheckouts(data);
    } else {
      setMessage('Keranjang kosong');
    }
  };

  useEffect(() => {
    let filled = false;
    if (!filled) {
      getCheckouts();
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
          <input type='checkbox' className={style.head_input} />
          <h4 className={style.head_img}>Gambar</h4>
          <h4 className={style.head_code}>Kode</h4>
          <h4 className={style.head_product}>Menu</h4>
          <h4 className={style.head_price}>Harga Satuan</h4>
          <h4 className={style.head_qty}>Kuantitas</h4>
          <h4 className={style.head_total}>Total Harga</h4>
        </div>
        {message === '' ? (
          checkouts?.map((item) => {
            return (
              <div key={item.id} className={style.cart}>
                <input
                  type='checkbox'
                  className={`${style.input} checkbox`}
                  onClick={() => handleClick(item.id)}
                />
                <img
                  src={item.product_image}
                  alt={item.product_code}
                  className={style.img}
                />
                <h5 className={style.code}>{item.product_code}</h5>
                <h5 className={style.title}>{item.product_name}</h5>
                <h5 className={style.price}>Rp. {item.product_price}</h5>
                <div className={style.btn_wrapper}>
                  <button onClick={() => handleMinus(item.id)}>-</button>
                  <span>{item.count}</span>
                  <button onClick={() => handlePlus(item.id)}>+</button>
                </div>
                <span className={style.total_item}>
                  Rp. {item.product_price * item.count}
                </span>
              </div>
            );
          })
        ) : (
          <div className={style.empty}>
            <p>{message}</p>
          </div>
        )}
        <p className={style.note}>
          Seluruh total harga sudah ditambah ongkir: Rp. 10.000
        </p>
        <div className={style.lower}>
          <input
            type='checkbox'
            className={style.input}
            onClick={clickAllCheckbox}
          />
          <FaRegTrashAlt className={style.trash} onClick={onClickDelete} />
          <div>
            <p>Seluruh total harga :</p>
            <span>{getTotal() === 0 ? '0' : getTotal() + 10000}</span>
          </div>
          <button onClick={onClickCheckout} className={style.pesan}>
            Pesan
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
