import styles from '@/styles/navbar.module.css';
import { motion } from 'framer-motion';
import Close from '@/components/external/close';
import ThemeWrapper from './settings/themewrapper';
import Language from './settings/language';
import Currency from './settings/currency';

const Settings = ({ setIsOpen, t }) => {

    const handleClick = (e) => {
        e.stopPropagation();
    };
    
  return (
    <motion.div className={styles.settingswrapper} onClick={() => {setIsOpen(false)}}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className={styles.settings} initial={{ x: '100%' }} onClick={handleClick}
            animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: .2, ease: 'easeOut' }}>
            
            <div className={styles.heading}>
                <h3>{t?.heading ?? 'App Settings'}</h3>
                <Close setIsOpen={setIsOpen} />
            </div>

            <ThemeWrapper t={t} />

            <Language t={t} />

            <Currency t={t} />

        </motion.div>
    </motion.div>
  )
}

export default Settings