import Navbar from './navbar'
import PingComponent from './ping'

const Layout = ({ children }) => {

  return (
    <>
      <Navbar />
      {children}
      <PingComponent />
    </>
  )
}

export default Layout