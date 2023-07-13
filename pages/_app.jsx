import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/layout/layout';
import Transition from '@/components/layout/transition';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true}>
      <Head>
        <title>Portfolio</title>
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <Layout>
        <Transition>
          <Component {...pageProps} />
        </Transition>
      </Layout>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
      />
    </ThemeProvider>
  )
}
