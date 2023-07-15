import rough from 'roughjs/bundled/rough.esm';
import {toolTypes} from "../../constants";


const generator = rough.generator();

function generateRectangle ({x1, y1, x2, y2 }) {
  return generator.rectangle(x1,y1,x2-x1,y2-y1);
}

export const createElement = ({ x1, y1, x2, y2, toolType,id}) => {
  let roughElement;

  switch (toolType) {
    case toolTypes.RECTANGLE:
      roughElement = generateRectangle();

      return {
        id,
        roughElement,
        type: toolType,
        x1,
        y1,
        x2,
        y2,

      };
    default :
      throw new Error('sth went wrong');
  }
}