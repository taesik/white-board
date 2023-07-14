import React, {useRef} from 'react';
import Menu from "./Menu";

const Whiteboard = () => {
  const canvasRef = useRef()
  return (
      <div>
        <Menu/>
        <canvas ref={canvasRef} width={window.innerWidth}
                height={window.innerHeight}/>
      </div>
  );
};

export default Whiteboard;
