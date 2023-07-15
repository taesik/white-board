import React, {useLayoutEffect, useRef, useState} from 'react';
import Menu from "./Menu";
import rough from 'roughjs/bundled/rough.esm';
import {useDispatch, useSelector} from "react-redux";
import {actions, toolTypes} from "../constants";
import {adjustElementCoordinates, createElement, drawElement, updateElement} from "./utils";
import { updateElement as updateElementInStore} from './whiteboard.slice'
import {v4 as uuid} from 'uuid';
import {adjustmentRequired} from "./utils";



const Whiteboard = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef();
  const textAreaRef = useRef();
  const toolType = useSelector(state=>state.whiteboard.tool);
  const elements = useSelector((state) => state.whiteboard.elements);
  const [action, setAction] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');


    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);



    elements.forEach(element=>{
      drawElement({roughCanvas,context:ctx, element});
    })
    return () => {
    }
  },[elements]);

  function handleMouseDown (event) {
    const { clientX, clientY } = event;

    const element = createElement({
      x1: clientX,
      y1: clientY,
      x2: clientX,
      y2: clientY,
      toolType,
      id: uuid(),
    });

    switch (toolType) {
      case toolTypes.RECTANGLE:
      case toolTypes.LINE:
      case toolTypes.PENCIL:

        setAction(actions.DRAWING);
        break;
      case toolTypes.TEXT:
        setAction(actions.WRITING);
        break;
    }
    dispatch(updateElementInStore(element));


  }


  function handleMouseUp() {
    const selectedElementIndex = elements?.findIndex(el => el.id === selectedElement.id);

    if (selectedElementIndex !== -1) {
      if (action === actions.DRAWING) {
        if(adjustmentRequired(elements[selectedElementIndex].type)) {
          const {x1, y1, x2, y2} =
              adjustElementCoordinates(elements[selectedElementIndex])

          updateElement(
              {
                id: selectedElement.id,
                index: selectedElementIndex,
                x1,
                x2,
                y1,
                y2,
                type: elements[selectedElementIndex].type,
              },
              elements
          );
        }
      }
    }

    setAction(null);
    setSelectedElement(null);
  }

  function handleMouseMove(e) {
    const { clientX, clientY} = e;

    if (action === actions.DRAWING) {
      const index = elements.findIndex(el => el.id === selectedElement.id);
      if (index !== -1){
        updateElement({
          index,
          id:elements[index].id,
          x1:elements[index].x1,
          y1:elements[index].y1,
          x2:clientX,
          y2:clientY,
          type:elements[index].type,
        },elements)
      }
    }
  }
  function handleTextareaBlur(e){

  }
  return (
      <div>
        <Menu/>
        {action === actions.WRITING
            ? <textarea
                style={{
                  position: 'absolute',
                  top: selectedElement.y1 -3,
                  left: selectedElement.x1,
                  font: '24px sans-serif',
                  margin: 0,
                  padding: 0,
                  border: 0,
                  outline: 0,
                  resize: 'auto',
                  overflow: 'hidden',
                  whiteSpace:'pre',
                  background: 'transparent',
                }}
                onBlur={handleTextareaBlur}
                ref={textAreaRef}/>
            :null
        }
        <canvas
            onMouseUp={handleMouseUp}
            onMouseDown={(e)=>handleMouseDown(e)}
            onMouseMove={(e)=>handleMouseMove(e)}
            ref={canvasRef} width={window.innerWidth}
                height={window.innerHeight}/>
      </div>
  );
};

export default Whiteboard;
