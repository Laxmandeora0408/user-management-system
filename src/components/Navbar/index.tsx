import { Link, useLocation, useNavigate } from 'react-router-dom';
import { linksData } from '../../data/linksData';
import { TbMenuDeep } from 'react-icons/tb';
import styles from './styles.module.scss';
import { Logo } from '@assets/images';
import { useRef } from 'react';

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const navRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const toggleButton = () => {
    if (navRef.current) {
      navRef.current.classList.toggle(`${styles.toggle}`);
    }
  };

  return (
    <nav className={styles.container}>
      <div className={styles.content}>
        <div className={styles.titleContainer} onClick={() => navigate('/')}>
          <img src={Logo} alt="logo" />
          <h1 className={styles.title}>User Dashboard</h1>
        </div>

        <div ref={navRef} className={styles.navContainer}>
          {linksData.map(({ link, name }, index) => (
            <Link
              key={index}
              to={`/${link}`}
              onClick={toggleButton}
              className={`hover:text-gray-800 ${
                pathname === `/${link}` ? 'text-blue-500' : ''
              }`}
            >
              {name}
            </Link>
          ))}
        </div>
        <TbMenuDeep className={styles.btnMenu} onClick={toggleButton} />
      </div>
    </nav>
  );
};

export default Navbar;
