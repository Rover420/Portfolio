import styles from '@/styles/navbar.module.css'
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import AnimatedTabs from './navbar/animatedtabs';
import Logo from './navbar/logo';

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
    <header className={styles.header}>
      <Logo className={styles.logo} />
      <AnimatedTabs />
      <button onClick={() => {theme === 'light' ? setTheme('dark') : setTheme('light')}} >
        Theme
      </button>
    </header>
  )
}

export default Navbar;