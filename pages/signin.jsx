import styles from '@/styles/login.module.css'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProviders, signIn } from "next-auth/react";

import Button from '@/components/external/button';



const SignIn = ({ t, providers }) => {

    const [visible, setVisible] = useState(false);

    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [remember, setRemember] = useState(false);

    const login = (e) => {
        e.preventDefault();
    }

    console.log(providers)

  return (
    <section className={styles.wrapper}>
        <div className={styles.container}>
            <h2>{t?.title ?? 'Sign in'}</h2>

            <form onSubmit={login}>
                <div className={styles.inputwrapper}>
                    <input type="text" id='username' name='username' value={username} onChange={(e) => {setUsername(e.target.value)}} />
                    <label htmlFor="username" className={username?.length >= 1 ? styles.hide : ''}>{t?.username ?? 'Username'}</label>
                    <button type='button' className={`${styles.delete} ${username?.length >= 1 ? styles.shown : ''}`} onClick={() => {setUsername('')}} onKeyDown={(e) => {e.key === 'Enter' ? setUsername('') : null}}>
                        <span />
                    </button>
                </div>
                <div className={styles.inputwrapper} style={{ marginTop: '1rem' }}>
                    <input type={visible ? 'text' : 'password'} id='pass' name='pass' onChange={(e) => {setPass(e.target.value)}} />
                    <label htmlFor="pass" className={pass?.length >= 1 ? styles.hide : ''}>{t?.pass ?? 'Password'}</label>
                    <svg tabIndex={0} onClick={() => {setVisible(prev => !prev)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <div className={styles.providers}>
                    {Object.values(providers).map((provider) => (
                        <button key={provider.name} className={`${styles.provider} ${styles[provider.id]}`} onClick={() => signIn(provider.id)}>
                            <Image src={`/${provider.id}.png`} height={24} width={24} alt={provider.name} />
                        </button>
                    ))}
                </div>
                <label htmlFor='remember' className={styles.customcheckbox}>
                    <input type="checkbox" name="remember" id='remember' checked={remember} onChange={(e) => {setRemember(e.target.checked)}} onKeyDown={(e) => {e.key === 'Enter' ? setRemember(prev => !prev) : null}} />
                    {t?.remember ?? 'Stay signed in'}
                </label>
                <button type='submit' onClick={login}>{t?.title ?? 'Sign in'}</button>
            </form>

            <Link href='/recover' className={styles.forgot}>{t?.forgot ?? 'Forgot your password?'}</Link>
            <p>{t?.noacc ?? "Don't have an account?"}</p>
            <Button custom={styles.outsidebtn}>
                <Link href='/register' className={styles.switch}>{t?.register ?? 'Create account'}</Link>
            </Button>

        </div>
    </section>
  )
}

export default SignIn

export async function getStaticProps({ locale }) {

    const rawt = await require(`@/locale/${locale ?? 'en'}`);

    const t = rawt.login

    const providers = await getProviders();
  
    return {
      props: { t, providers: providers ?? [] },
      revalidate: 60,
    };
}
  