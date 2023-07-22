import styles from '@/styles/Home.module.css';
import { useState, useEffect } from 'react';
import { useStore } from '@/store/user';

const Clicks = () => {
  
  const [clicks, setClicks] = useState(0);

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
    socket.emit("click");
  };


  return (
    <div onClick={handleDivClick} className={styles.clickswrapper}>
      <p>Current clicks:</p>
      <span>{clicks}</span>
    </div>
  )
}

export default Clicks