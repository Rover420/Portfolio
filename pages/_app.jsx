import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/layout/layout';

export default function App({ Component, pageProps }) {

  return (
    <ThemeProvider>
      <Head>
        <title>Portfolio</title>
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
        <meta name="description" content="Rover420's personal portfolio" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
      />
    </ThemeProvider>
  )
}
