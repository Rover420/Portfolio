import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Clicks from '@/components/main/home/clicks';

export default function Home({ t }) {

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="all" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ display: 'flex', height: '100svh', justifyContent: 'center', alignItems: 'center' }}>
        <Clicks />
      </div>
    </>
  )
}

export async function getStaticProps({ locale }) {

  const t = await require(`@/locale/${locale ?? 'en'}`);

  return {
    props: { t },
    revalidate: 60,
  };
}
