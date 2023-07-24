import styles from '@/styles/Home.module.css';
import { useState, useEffect } from 'react';
import { useStore } from '@/store/user';

const Clicks = ({ t, prevClicks }) => {
  
  const [clicks, setClicks] = useState(prevClicks ?? 0);

  console.log(clicks)
  console.log(prevClicks)

  const { socket } = useStore();

  useEffect(() => {
    const handleValue = (value) => {
      setClicks(value);
    };

    socket?.on("value", handleValue);

    return () => {
      socket?.off("value", handleValue);
    };
  }, [socket]);

  const handleDivClick = () => {
    try {
      socket.emit("click");
    } catch (e) {
      return
    }
  };


  return (
    <div onClick={handleDivClick} className={styles.clickswrapper}>
      <p>{t?.clicks || 'Current clicks:'}</p>
      <span>{clicks}</span>
    </div>
  )
}

export default Clicks