import { useStore } from "@/store/user"
import styles from '@/styles/navbar.module.css'
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const CurrencyModal = dynamic(() => import("./currencymodal"));

const Currency = ({ t }) => {

    const { currency } = useStore();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.wrapper}>
            <h4>{t?.currency ?? 'Currency'}</h4>
            <div className={styles.selectedcurrency}>
                <button onClick={() => {setIsOpen(prev => !prev)}}>
                    <div>
                        <Image src={currency?.url} height={20} width={20} alt='Selected currency' />
                        <p>{currency?.name} — ({currency?.symbol})</p>
                    </div>
                    <svg fill="none" width={20} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Currency