import dynamic from "next/dynamic";

const Homepage = dynamic(() => import("@/components/main/main"));

export default function Home({ t, prevClicks }) {

  return (
    <Homepage t={t} prevClicks={prevClicks} />
  )
}

export async function getStaticProps({ locale }) {

  const rawt = await require(`@/locale/${locale ?? 'en'}`);

  const t = rawt.home;

  try {
    const rawClicks = await fetch(`${process.env.NEXT_PUBLIC_NODE_URL}/clicks`);
    const prevClicks = await rawClicks.json();
    
    return {
      props: { t, prevClicks },
      revalidate: 60,
    };
  } catch (e) {

    console.error('Error fetching clicks data: ', error.message);

    return {
      props: { t, prevClicks: 0 },
      revalidate: 60,
    };
  }
}
