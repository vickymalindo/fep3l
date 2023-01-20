import { BsFacebook, BsInstagram, BsTwitter, BsWhatsapp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import style from './../styles/Footer.module.css';

const Footer = () => {
  const token = localStorage.getItem('token');
  const login = JSON.parse(token);

  return (
    <footer>
      <div className={style.content}>
        <div className={style.left}>
          <h3 className={style.title}>Nasi Uduk</h3>
          <h4>Bu Neneng</h4>
        </div>
        <div className={style.middle}>
          <h3 className={style.title}>Ikuti Kami</h3>
          <BsWhatsapp className={style.socmed} />
          <BsFacebook className={style.socmed} />
          <BsTwitter className={style.socmed} />
          <BsInstagram className={style.socmed} />
        </div>
        <div className={style.right}>
          <h3 className={style.title}>Navigasi</h3>
          <ul>
            <li>
              <Link className={style.link} to='/'>
                Home
              </Link>
            </li>
            <li>
              <Link className={style.link} to='cart'>
                Keranjang
              </Link>
            </li>
            <li>
              <Link className={style.link} to='login'>
                {login ? 'Keluar' : 'Masuk'}
              </Link>
            </li>
            <li>
              <Link className={login ? style.hidden : style.link} to='register'>
                Daftar
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={style.copyright}>
        <hr />
        <p>Copyright &copy; 2022 by Nasi Uduk Bu Neneng</p>
      </div>
    </footer>
  );
};

export default Footer;
