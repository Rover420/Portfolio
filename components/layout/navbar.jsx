import styles from '@/styles/navbar.module.css'
import { useTheme } from 'next-themes';

const Navbar = () => {

  const { theme, setTheme } = useTheme();
  
  return (
    <header className={styles.header}>
      <button onClick={() => {theme === 'light' ? setTheme('dark') : setTheme('light')}} 
      onKeyDown={(e) => {e.key === 'Enter' ? theme === 'light' ? setTheme('dark') : setTheme('light') : null}}>
        Theme
      </button>
    </header>
  )
}

export default Navbar;