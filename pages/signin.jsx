import styles from '@/styles/login.module.css'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProviders, signIn } from "next-auth/react";

import Button from '@/components/external/button';
import axios from '@/hooks/axios';



const SignIn = ({ t, initialProviders }) => {

    const [providers, setProviders] = useState(initialProviders);

    const [selected, setSelected] = useState('');

    const [visible, setVisible] = useState(false);

    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [remember, setRemember] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        if(!providers || providers.length < 1) {
            const loadProviders = async () => {
                const res = await getProviders();
                const providersList = Object.keys(res).map((k) => res[k]);
                console.log(providersList)
                setProviders(providersList);
            };
            loadProviders();
        }
    }, []);

  return (
    <section className={styles.wrapper}>
        <div className={styles.container}>
            <h2>{t?.title ?? 'Sign in'}</h2>

            <div className={styles.selection}>
                <button type='button' onClick={() => {setSelected('')}} className={selected === '' ? styles.active : ''}>{t?.username ?? 'Username'}</button>
                <button type='button' onClick={() => {setSelected('email')}} className={selected === 'email' ? styles.active : ''}>E-Mail</button>
                <button type='button' onClick={() => {setSelected('pgp')}} className={selected === 'pgp' ? styles.active : ''}>PGP</button>
            </div>

            <form onSubmit={handleLogin}>
                
                <div className={styles.inputwrapper}>
                    <input type="text" id='username' name='username' value={username} onChange={(e) => {setUsername(e.target.value)}} />
                    <label htmlFor="username" className={username?.length >= 1 ? styles.hide : ''}>{t?.username ?? 'Username'}</label>
                    <button type='button' disabled={username?.length < 1} className={styles.delete} onClick={() => {setUsername('')}} onKeyDown={(e) => {e.key === 'Enter' ? setUsername('') : null}}>
                        <span />
                    </button>
                </div>
                
                <div className={styles.inputwrapper}>
                    <input type={visible ? 'text' : 'password'} id='pass' name='pass' onChange={(e) => {setPass(e.target.value)}} />
                    <label htmlFor="pass" className={pass?.length >= 1 ? styles.hide : ''}>{t?.pass ?? 'Password'}</label>
                    <button className={styles.showpass} type='button' onClick={() => {setVisible(prev => !prev)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>

                <div className={styles.providers}>
                    <button className={`${styles.provider} ${styles.metamask}`}>
                        <Image src={`/metamask.svg`} height={28} width={28} alt='MetaMask' />
                    </button>
                    {Object.values(providers).map((provider) => (
                        <button key={provider.name} className={`${styles.provider} ${styles[provider.id]}`} onClick={() => signIn(provider.id)}>
                            <Image src={`/${provider.id}.png`} height={28} width={28} alt={provider.name} />
                        </button>
                    ))}
                </div>
                
                <label htmlFor='remember' className={styles.customcheckbox}>
                    <input type="checkbox" name="remember" id='remember' checked={remember} onChange={(e) => {setRemember(e.target.checked)}} onKeyDown={(e) => {e.key === 'Enter' ? setRemember(prev => !prev) : null}} />
                    {t?.remember ?? 'Stay signed in'}
                </label>
                
                <Button custom={styles.outsidebtn} color='dark'>
                    <button type='submit' onClick={handleLogin}>{t?.submit ?? 'Sign up'}</button>
                </Button>
                
            </form>

            <Link href='/recover' className={styles.forgot}>{t?.forgot ?? 'Forgot your password?'}</Link>
            <p className={styles.gotacc}>{t?.noacc ?? "Don't have an account?"}</p>
            <Button color='dark' custom={styles.outsidebtn}>
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

    const initialProviders = await getProviders();
  
    return {
      props: { t, initialProviders: initialProviders ?? [] },
      revalidate: 60,
    };
}
  