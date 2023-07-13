import Navbar from './navbar'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {

  const router = useRouter();

  return (
    <>
      <Navbar />
      <main id='main' style={{ WebkitTapHighlightColor: 'transparent', backgroundImage: router?.pathname === '/404' ? "url('/film_grain.png'), url('/white_grain.png')" : null }}>
        {children}
      </main>
    </>
  )
}

export default Layout