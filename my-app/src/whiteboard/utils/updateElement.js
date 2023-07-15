import {toolTypes} from "../../constants";
import {createElement} from "./createElement";
import {store} from "../../store/store";
import {setElements} from "../whiteboard.slice";

export const updateElement = ({id, x1, y1, x2, y2, type,index},elements) => {
  const elementsCopy = [...elements];

  switch(type) {
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
      break;
    default:
      throw new Error( 'sth went wrong when updating element')
  }
}