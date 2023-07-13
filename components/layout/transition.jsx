import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const variants = {
    out: {
        opacity: 0,
        transition: {
          duration: 0.2
        }
    },
    in: {
        opacity: 1,
        transition: {
          duration: 0.2,
          delay: 0.2
        }
    }
};

const Transition = ({ children }) => {
	
    const { pathname } = useRouter();

    return (
		<div>
			<AnimatePresence initial={false} mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.div key={pathname} variants={variants} animate={'in'} initial={'out'} exit="out">
          <AnimatePresence initial={true} mode="sync">
            {children}
          </AnimatePresence>
	      </motion.div>
	    </AnimatePresence>
		</div>
	);
};

export default Transition