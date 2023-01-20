import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import style from '../styles/Sidebar.module.css';

const Sidebar = () => {
  const [objList, setObjList] = useState({
    user: false,
    order: false,
    menu: false,
  });

  const handleClick = (list) => {
    setObjList((prev) => {
      if (list === 'user') {
        return {
          user: !prev[list],
          order: false,
          menu: false,
        };
      } else if (list === 'order') {
        return {
          user: false,
          order: !prev['order'],
          menu: false,
        };
      }
      return {
        user: false,
        order: false,
        menu: !prev['menu'],
      };
    });
  };

  return (
    <aside className={style.sidebar}>
      <div className={style.container}>
        <div className={style.title}>
          <h3>Dashboard Admin</h3>
        </div>
        <ul className={style.list}>
          <li className={style.list_item}>
            <div className={style.btn} onClick={() => handleClick('user')}>
              <span className={style.list_item_head}>User</span>
              <span>
                {objList.user ? (
                  <BsChevronDown className={style.icon} />
                ) : (
                  <BsChevronUp className={style.icon} />
                )}
              </span>
            </div>
            {objList.user && (
              <div className={style.dropdown}>
                <Link className={style.link} to='allUser'>
                  Semua
                </Link>
                <Link className={style.link} to='toAdmin'>
                  Jadikan Admin
                </Link>
              </div>
            )}
          </li>
          <li className={style.list_item}>
            <div className={style.btn} onClick={() => handleClick('menu')}>
              <span className={style.list_item_head}>Menu</span>
              <span>
                {objList.menu ? (
                  <BsChevronDown className={style.icon} />
                ) : (
                  <BsChevronUp className={style.icon} />
                )}
              </span>
            </div>
            {objList.menu && (
              <div className={style.dropdown}>
                <Link className={style.link} to='allMenu'>
                  Semua
                </Link>
                <Link className={style.link} to='addMenu'>
                  Tambah
                </Link>
                <Link className={style.link} to='delMenu'>
                  Hapus
                </Link>
              </div>
            )}
          </li>
          <li className={style.list_item}>
            <div className={style.btn} onClick={() => handleClick('order')}>
              <span className={style.list_item_head}>Pesanan</span>
              <span>
                {objList.order ? (
                  <BsChevronDown className={style.icon} />
                ) : (
                  <BsChevronUp className={style.icon} />
                )}
              </span>
            </div>
            {objList.order && (
              <div className={style.dropdown}>
                <Link className={style.link} to='allOrder'>
                  Semua
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
