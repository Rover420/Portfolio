import styles from '@/styles/login.module.css'
import { useState, useEffect, useRef } from 'react'
import { getProviders, signIn } from 'next-auth/react';
import Link from 'next/link';
import axios from '@/hooks/axios';
import Image from 'next/image';

import { encryptData } from '@/hooks/serverEncrypt';
import Button from '@/components/external/button';


const USER_REGEX = /^.{4,50}$/;
const PWD_REGEX = /^.{8,50}$/;

const RegisterPage = ({ t, initialProviders }) => {

    const [providers, setProviders] = useState(initialProviders);

    const [selected, setSelected] = useState('');

    const userRef = useRef();

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');




    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2 || pwd !== matchPwd) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const data = await encryptData(JSON.stringify({ username: user, pass: pwd }));
            const response = await axios.post('/register',
                JSON.stringify({ data }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            console.log(err)
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
        }
    }

    const handleMetamask = async () => {
        const metamaskAuthModule = await (import('@/hooks/metamaskAuth'));
        const metamaskAuth = metamaskAuthModule.default; // Access the default export
        metamaskAuth();
    }



    useEffect(() => {
        userRef?.current?.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])


    useEffect(() => {
        const loadProviders = async () => {
            const res = await getProviders();
            const providersList = Object.keys(res).map((k) => res[k]);
            setProviders(providersList);
        };
        loadProviders();
    }, []);

  return (
    <section className={styles.wrapper}>
        <div className={styles.container}>

            <h2>{t?.title ?? 'Registration'}</h2>

            <div className={styles.selection}>
                <button type='button' onClick={() => {setSelected('')}} className={selected === '' ? styles.active : ''}>{t?.username ?? 'Username'}</button>
                <button type='button' onClick={() => {setSelected('email')}} className={selected === 'email' ? styles.active : ''}>E-Mail</button>
                <button type='button' onClick={() => {setSelected('pgp')}} className={selected === 'pgp' ? styles.active : ''}>PGP</button>
            </div>

            <form onSubmit={handleSubmit}>
                
                <div className={user !== '' && !validName && !userFocus ? styles.error : ''}>
                    <div className={styles.inputwrapper}>
                        <input 
                            type="text" 
                            ref={userRef} 
                            autoComplete='off' 
                            required 
                            id='username' 
                            name='username' 
                            value={user} 
                            onChange={(e) => {setUser(e.target.value)}}
                            aria-invalid={validName ? "false" : 'true'}
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)} />
                        <label htmlFor="username" className={user?.length >= 1 ? styles.hide : ''}>{t?.username ?? 'Username'}</label>
                        <button type='button' disabled={user?.length < 1} className={styles.delete} onClick={() => {setUser('')}} onKeyDown={(e) => {e.key === 'Enter' ? setUser('') : null}} aria-label="Clear username">
                            <span />
                        </button>
                    </div>

                    <span className={styles.errmsg}>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        {t?.usererr ?? '4 to 50 characters.'}
                    </span>
                </div>

                <div className={pwd !== '' && !pwdFocus && !validPwd ? styles.error : ''}>
                    <div className={styles.inputwrapper}>
                        <input type={visible1 ? 'text' : 'password'} 
                            id='pass' 
                            name='pass' 
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)} />
                        <label htmlFor="pass" className={pwd?.length >= 1 ? styles.hide : ''}>{t?.pass ?? 'Password'}</label>
                        <button className={styles.showpass} type='button' onClick={() => {setVisible1(prev => !prev)}} aria-label={visible1 ? 'Hide password' : 'Show password'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>

                    <span className={styles.errmsg}>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        {t?.passerr ?? '6 to 30 characters.'}
                    </span>
                </div>

                <div className={matchPwd !== '' && pwd !== '' && !validMatch && !matchFocus ? styles.error : ''}>
                    <div className={styles.inputwrapper}>
                        <input type={visible2 ? 'text' : 'password'} 
                            id='repeat' 
                            name='repeat' 
                            value={matchPwd} 
                            onChange={(e) => {setMatchPwd(e.target.value)}} 
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)} />
                        <label htmlFor="repeat" className={matchPwd?.length >= 1 ? styles.hide : ''}>{t?.repeat ?? 'Confirm password'}</label>
                        <button className={styles.showpass} type='button' onClick={() => {setVisible2(prev => !prev)}} aria-label={visible2 ? 'Hide match password' : 'Show match password'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>

                    <span className={styles.errmsg}>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        {t?.repeaterr ?? 'Passwords must match.'}
                    </span>
                </div>

                <Button custom={styles.outsidebtn} color='dark' style={{ marginTop: '2rem' }}>
                    <button type='submit' onClick={handleSubmit}>{t?.submit ?? 'Sign up'}</button>
                </Button>
                
            </form>

            <p className={styles.signwith}>{t?.providers ?? 'You can also create an account with'}</p>

            <div className={styles.providers}>
                <button type='button' onClick={handleMetamask} className={`${styles.provider} ${styles.metamask}`}>
                    <Image src={`/metamask.svg`} height={28} width={28} alt='MetaMask' priority />
                </button>
                {Object.values(providers).map((provider) => (
                    <button key={provider.name} className={`${styles.provider} ${styles[provider.id]}`} onClick={() => signIn(provider.id)}>
                        <Image src={`/${provider.id}.png`} height={28} width={28} alt={provider.name} priority />
                    </button>
                ))}
            </div>

            <p className={styles.gotacc}>{t?.gotacc ?? "Already have an account?"}</p>
            <Button color='dark' custom={styles.outsidebtn}>
                <Link href='/signin' className={styles.switch}>{t?.signin ?? 'Sign in'}</Link>
            </Button>
            
        </div>
    </section>
  )
}

export default RegisterPage