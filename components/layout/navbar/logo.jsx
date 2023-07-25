import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";


const variants = {
    scale: { scale: [1, 0.85, 0.85, 1.05, 0.97, 1.02, 1] },
    initial: { scale: 1 }
};


const Logo = ({ ...args }) => {

    const [isAnimating, setIsAnimating] = useState(false);

    const router = useRouter();

    const handleLogo = () => {
        if(window?.scrollY > 10) {
          window?.scrollTo({ top: 0, behavior: 'smooth' });
        } else if(router.pathname !== '/') {
          router.push('/');
        }
    }

    return (
        <motion.button type='button'
            onMouseEnter={() => {setIsAnimating(true)}}
            onFocus={() => {setIsAnimating(true)}}
            variants={variants}
            onClick={handleLogo}
            alt={`Go to homepage`}
            aria-label={`Go to homepage`}
            animate={isAnimating ? 'scale' : 'initial'}
            onAnimationComplete={() => {setIsAnimating(false)}} {...args}>
                Logo
        </motion.button>
    );
}

export default Logo