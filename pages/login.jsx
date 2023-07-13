import styles from '@/styles/login.module.css'
import { useState } from 'react';
import Link from 'next/link';

import Button from '@/components/external/button';

const Login = ({ t }) => {

    const [visible, setVisible] = useState(false);

    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [remember, setRemember] = useState(false);

    const signin = (e) => {
        e.preventDefault();
    }

    console.log(remember)

  return (
    <section className={styles.wrapper}>
        <div className={styles.container}>
            <h2>{t?.title ?? 'Sign in'}</h2>

            <form onSubmit={signin}>
                <div className={styles.inputwrapper}>
                    <input type="text" id='username' name='username' onChange={(e) => {setUsername(e.target.value)}} />
                    <label htmlFor="username" className={username?.length >= 1 ? styles.hide : ''}>{t?.username ?? 'Username'}</label>
                </div>
                <div className={styles.inputwrapper} style={{ marginTop: '1rem' }}>
                    <input type={visible ? 'text' : 'password'} id='pass' name='pass' onChange={(e) => {setPass(e.target.value)}} />
                    <label htmlFor="pass" className={pass?.length >= 1 ? styles.hide : ''}>{t?.pass ?? 'Password'}</label>
                    <svg tabIndex={0} onClick={() => {setVisible(prev => !prev)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <div>Other methods</div>
                <label htmlFor='remember' className={styles.customcheckbox}>
                    <input type="checkbox" name="remember" id='remember' checked={remember} onChange={(e) => {setRemember(e.target.checked)}} onKeyDown={(e) => {e.key === 'Enter' ? setRemember(prev => !prev) : null}} />
                    {t?.remember ?? 'Stay signed in'}
                </label>
                <button type='submit' onClick={signin}>{t?.title ?? 'Sign in'}</button>
            </form>

            <Link href='/recover'>{t?.forgot ?? 'Forgot your password?'}</Link>
            <p>{t?.noacc ?? "Don't have an account?"}</p>
            <Button custom={styles.outsidebtn}>
                <button type='button'>{t?.register ?? 'Create account'}</button>
            </Button>

        </div>
    </section>
  )
}

export default Login

export async function getStaticProps({ locale }) {

    const rawt = await require(`@/locale/${locale ?? 'en'}`);

    const t = rawt.login
  
    return {
      props: { t },
      revalidate: 60,
    };
  }
  