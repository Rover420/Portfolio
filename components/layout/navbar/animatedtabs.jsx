import styles from '@/styles/navbar.module.css';
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from 'next/router';


const AnimatedTabs = () => {
    const { pathname } = useRouter();

    let tabs = [
        { id: "home", label: "Homepage", url: `/` },
        { id: "register", label: "Register", url: `/register` },
        { id: "signin", label: "Sign In", url: `/signin` },
        { id: "profile", label: "Profile", url: `/profile` },
    ];

    return (
        <div className={styles.tabs}>
            {tabs.map((tab) => (
                <Link
                    href={tab.url}
                    key={tab.id}
                    className={pathname === tab.url ? "" : styles.hoverTab}>

                    {pathname === tab.url && (
                        <motion.span layoutId="bubble" className={styles.activeTab}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}

                    {tab.label}
                    
                </Link>
            ))}
        </div>
    )
}

export default AnimatedTabs