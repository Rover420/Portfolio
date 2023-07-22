import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const variants = {
    out: {
        opacity: 0,
        x: 50,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20,
        }
    },
    in: {
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: .35
        }
    }
};

const Transition = ({ children }) => {
	
    const { pathname } = useRouter();

    return (
			<AnimatePresence initial={false} mode="popLayout" onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth'})}>
        <motion.div key={pathname} variants={variants} animate={'in'} initial={'out'} exit="out">
          <AnimatePresence initial={true} mode="sync">
            <main id='main'>
              {children}
            </main>
          </AnimatePresence>
	      </motion.div>
	    </AnimatePresence>
	  );
};

export default Transition