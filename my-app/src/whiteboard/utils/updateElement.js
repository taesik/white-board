import {toolTypes} from "../../constants";
import {createElement} from "./createElement";
import {store} from "../../store/store";
import {setElements} from "../whiteboard.slice";
import {emitElementUpdate} from "../../socketConn/socketConn";

export const updateElement = ({id, x1, y1, x2, y2, type,index},elements) => {
  const elementsCopy = [...elements];

  switch(type) {
    case toolTypes.LINE:
    case toolTypes.RECTANGLE:
      const updateElement = createElement({
        id,
        x1,
        y1,
        x2,
        y2,
        toolType: type,
      });

      elementsCopy[index] = updateElement;

      store.dispatch(setElements(elementsCopy));

      emitElementUpdate(updateElement);
      break;
    case toolTypes.PENCIL:
      elementsCopy[index] = {
        ...elementsCopy[index],
        points:[
            ...elementsCopy[index].points,
          {
            x:x2,
            y:y2,
          }
        ]
      }
      const updatedPencilElement = elementsCopy[index];

      store.dispatch(setElements(elementsCopy[index]));

      emitElementUpdate(updatedPencilElement);
    default:
      throw new Error( 'sth went wrong when updating element')
  }
}