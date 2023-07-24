import Navbar from './navbar'
import PingComponent from './ping'
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";


const variants = {
  out: {
    opacity: 0,
    transition: {

    }
  },
  in: {
    opacity: 1,
    transition: {
      delay: .3
    }
  }
};


const Layout = ({ children }) => {

  const { pathname } = useRouter();

  return (
    <>
      <Navbar />
        <AnimatePresence initial={false} mode="popLayout" onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth'})}>
          <motion.div key={pathname} variants={variants} animate={'in'} initial={'out'} exit="out">
            <AnimatePresence initial={true} mode="sync">
              <main id='main'>
                {children}
              </main>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      <PingComponent />
    </>
  )
}

export default Layout