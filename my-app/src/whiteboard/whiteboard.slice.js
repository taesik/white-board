import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  tool: null,
  elements: [],
}

const whiteboardSlice = createSlice({
  name: 'whiteboard',
  initialState,
  reducers: {
    setToolType: (state, action) => {
      state.tool = action.payload;
    },
    updateElement: (state, action) => {
      const {id} = action.payload;

      const index = state.elements.findIndex((el)=> el.id ===id)

      if( index ===-1) {
        state.elements.push(action.payload);
      } else {

      }
    },
    setElements: (state, action) => {
      state.elements = action.payload;
    }

  }
});
export const {setElements,setToolType,updateElement} = whiteboardSlice.actions;

export default whiteboardSlice.reducer;