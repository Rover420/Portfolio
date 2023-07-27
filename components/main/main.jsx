import Clicks from "./home/clicks"

export default function Main({ t, prevClicks }) {

    return (
      <>
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Clicks t={t} prevClicks={prevClicks} />
        </div>
        <div style={{ height: '300vh' }} />
      </>
    )
}