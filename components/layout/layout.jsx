import Navbar from './navbar'

const Layout = ({ children }) => {

  return (
    <>
      <Navbar />
      <main id='main'>
        {children}
      </main>
    </>
  )
}

export default Layout