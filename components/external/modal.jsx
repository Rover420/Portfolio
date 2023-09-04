import { motion } from 'framer-motion'

const Modal = ({ children, setIsOpen, full }) => {

  return (
    <motion.div className='modalwrapper' onClick={() => {setIsOpen(false)}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: 'none' }}
      transition={{ opacity: { duration: .2 } }} layout>
      <motion.div className={`modal ${full ? 'full' : ''}`} onClick={(e) => {e.stopPropagation()}}
        initial={{
          opacity: 0,
          scale: 0.75,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            ease: "easeOut",
            duration: 0.15,
          },
        }}
        exit={{
          opacity: 0,
          scale: 0.75,
          transition: {
            ease: "easeIn",
            duration: 0.15,
          },
        }} layout>
        <motion.button onClick={() => {setIsOpen(false)}} className='btn' aria-label='Close modal' layout>
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </motion.button>
        {children}
      </motion.div>
    </motion.div>
  )
}

export default Modal