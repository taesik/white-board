import React, {useLayoutEffect, useRef, useState} from 'react';
import Menu from "./Menu";
import rough from 'roughjs/bundled/rough.esm';
import {useSelector} from "react-redux";
import {actions, toolTypes} from "../constants";
import {createElement} from "./utils";
import {v4 as uuid} from 'uuid';
const Whiteboard = () => {
  const canvasRef = useRef();
  const toolType = useSelector(state=>state.whiteboard.tool)
  const [action, setAction] = useState(null);
  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    const rc = rough.canvas(canvas);


    rc.rectangle(10,10,200,200);
    return () => {
    }
  },[]);

  function handleMouseDown (e) {
    const { clientX, clientY} = e;


    if (toolType === toolTypes.RECTANGLE){
      setAction(actions.DRAWING);
    }


    const element = createElement(
        {
          x1:clientX,
          y1:clientY,
          x2:clientX,
          y2:clientY,
          toolType,
          id:uuid(),
        }
    );
    console.log(element);

  }

  return (
      <div>
        <Menu/>
        <canvas
            onMouseDown={(e)=>handleMouseDown(e)}
            ref={canvasRef} width={window.innerWidth}
                height={window.innerHeight}/>
      </div>
  );
};

export default Whiteboard;
