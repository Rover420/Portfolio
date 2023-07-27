import styles from '@/styles/navbar.module.css'
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import Logo from './navbar/logo';
import Settingsbtn from './navbar/settingsbtn';
import Link from 'next/link';

const Navbar = () => {

  const { theme, setTheme } = useTheme();
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
      <ul style={{ display: 'flex', gap: '16px' }}>
        <li><Link href='/'>Homepage</Link></li>
        <li><Link href='/register'>Register</Link></li>
        <li><Link href='/signin'>Sign In</Link></li>
        <li><Link href='/profile'>Profile</Link></li>
      </ul>
      <div className='flex'>
        <Settingsbtn />
        <button onClick={() => {theme === 'light' ? setTheme('dark') : setTheme('light')}} >
          Theme
        </button>
      </div>
    </header>
  )
}

export default Navbar;