import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Clicks from '@/components/main/home/clicks';

export default function Home({ t, prevClicks }) {

  console.log(prevClicks)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="all" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Clicks prevClicks={prevClicks} />
    </>
  )
}

export async function getStaticProps({ locale }) {

  const t = await require(`@/locale/${locale ?? 'en'}`);

  const getClicks = async () => {
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_NODE_URL}/clicks`);
      return data?.json();
    } catch (e) {
      console.log('error')
      return 0
    }
  }

  const prevClicks = await getClicks();

  console.log(prevClicks)

  return {
    props: { t, prevClicks: prevClicks ?? 0 },
    revalidate: 60,
  };
}
