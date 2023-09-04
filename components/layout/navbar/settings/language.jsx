import styles from '@/styles/navbar.module.css'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import localeArr from '@/locale/localearr.json';
import { motion, AnimatePresence } from 'framer-motion';

const Language = ({ t }) => {

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { pathname, asPath, query, locale } = router

  const selectedLocale = localeArr.find((item) => item.id === locale);

  const switchLocale = async (lang) => {
    const Cookies = (await import('js-cookie')).default;
    Cookies.set('NEXT_LOCALE', lang);
    router.push({ pathname, query }, asPath, { locale: lang })
  }

  return (
    <div className={styles.wrapper}>
        <h4>{t?.lang ?? 'Language'}</h4>
        <div className={styles.localewrapper}>
          <div className={`${styles.localelist} ${isOpen ? styles.open : ''}`} onClick={() => {setIsOpen(prev => !prev)}}>
            <button>
              <div>
                <Image src={selectedLocale && selectedLocale.source} height={20} width={20} alt='Selected language' />
                <p>{selectedLocale && selectedLocale.lang}</p>
              </div>
              <motion.div animate={isOpen ? { rotate: 180 } : { rotate: 0 }}>
                <svg fill="none" width={20} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </motion.div>
            </button>
              <AnimatePresence>
                {isOpen && 
                  <motion.div className={styles.listwrapper} initial={{ height: 0 }} animate={isOpen ? {height: 'auto'} : { height: 0 }} exit={{ height: 0 }}>
                    {localeArr.map(item => {
                      if (item.id !== locale) {
                        return (
                          <button key={item.id} onClick={() => switchLocale(item.id)}>
                            <div>
                              <Image src={item.source} height={20} width={20} alt={`${item.lang} language`} />
                              <p>{item.lang}</p>
                            </div>
                          </button>
                        )
                      }
                    })}
                  </motion.div>}
              </AnimatePresence>
          </div>
        </div>
    </div>
  )
}

export default Language