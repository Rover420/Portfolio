import styles from '@/styles/navbar.module.css'
import { useState, useEffect } from 'react';
import Logo from './navbar/logo';
import Settingsbtn from './navbar/settingsbtn';
import Link from 'next/link';
import ProfileMenu from './navbar/profilemenu';

const Navbar = ({ t }) => {

  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScroll(scrollPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header className={`${styles.header} ${scroll > 10 ? styles.scrolled : ''}`}>
      <Logo className={styles.logo} />
      <ul>
        <li><Link href='/'>{t?.navbar?.home ?? 'Homepage'}</Link></li>
        <li><Link href='/register'>{t?.navbar?.register ?? 'Register'}</Link></li>
        <li><Link href='/signin'>{t?.navbar?.signin ?? 'Sign In'}</Link></li>
        <li><Link href='/profile'>{t?.navbar?.profile ?? 'Profile'}</Link></li>
      </ul>
      <div className='flex'>
        <Settingsbtn t={t?.settings} />
        <ProfileMenu t={t?.profilemenu} />
      </div>
    </header>
  )
}

export default Navbar;