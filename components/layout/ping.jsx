import { useState, useEffect } from "react";
import { useStore } from "@/store/user";

const PingComponent = () => {

    const [ping, setPing] = useState(999);

    const { socket, connect } = useStore();

    useEffect(() => {
        if (!socket) {
          connect();
        }
    }, []);
    
    useEffect(() => {
      if (!socket) return;
    
      const handleConnect = () => {
        const first = Date.now();
        socket.emit('ping', () => {
          setPing(Date.now() - first);
        });
      };
    
      socket.on("connect", handleConnect);
    
      const interval = setInterval(() => {
        const start = Date.now();
        socket.emit('ping', () => {
          setPing(Date.now() - start);
        });
      }, 5000);
    
      return () => {
        socket.off("connect", handleConnect);
        clearInterval(interval);
      };
    }, [socket]);
    
    return (
        <div className='ping' style={{ '--ping': ping > 250 ? '0, 100%, 50%' : ping > 100 ? '42, 100%, 50%' : '120, 100%, 30%' }}>
            <div />
            <p>{ping}ms</p>
        </div>
    )
}

export default PingComponent