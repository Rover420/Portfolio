import dynamic from "next/dynamic";

const Homepage = dynamic(() => import("@/components/main/main"));

export default function Home({ t }) {

  return (
    <Homepage t={t} />
  )
}

export async function getStaticProps({ locale }) {

  const rawt = await require(`@/locale/${locale ?? 'en'}`);

  const t = rawt.home;

  return {
    props: { t },
    revalidate: 60,
  };
}
