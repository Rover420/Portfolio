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
    
        const handlePong = (value) => {
          const endTime = new Date().getTime();
          setPing(endTime - value.startTime);
        };

        socket.on('pong', handlePong);
    
        return () => {
          socket.off('pong', handlePong);
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