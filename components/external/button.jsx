import { useRef } from 'react';

const Button = ({ children, custom, setIsOpen, stop, color, ...props }) => {

    const containerRef = useRef(null);
    
    const handleClick = e => {

      !stop && e.stopPropagation();

      setIsOpen && setIsOpen(true)
        
      const container = containerRef.current;
      const size = container.offsetWidth;
      const pos = container.getBoundingClientRect();
      const x = e.clientX - pos.left - size / 2;
      const y = e.clientY - pos.top - size / 2;

      const ripple = document.createElement("div");
      ripple.className = `ripple ${color}`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      container.appendChild(ripple);

      setTimeout(() => {
        container.removeChild(ripple);
      }, 700);

    };

    const handleKey = e => {

      !stop && e.stopPropagation();

      if(e.key === 'Enter') {
        setIsOpen && setIsOpen(true)
        
        const container = containerRef.current;
        const size = container.offsetWidth;

        const ripple = document.createElement("div");
        ripple.className = `keyripple ${color}`;
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        container.appendChild(ripple);

        setTimeout(() => {
          container.removeChild(ripple);
        }, 700);
      }

    }

  return (
    <div onClick={handleClick} onKeyDown={handleKey} ref={containerRef} className={`ripplebtn ${custom}`} {...props}>
        {children}
    </div>
  )
}

export default Button