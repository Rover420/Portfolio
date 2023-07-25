import Head from "next/head"
import Clicks from "./home/clicks"

export default function Main({ t, prevClicks }) {

    return (
      <>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="all" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Clicks t={t} prevClicks={prevClicks} />
      </>
    )
}