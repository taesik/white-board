import {configureStore} from '@reduxjs/toolkit';
import whiteboardReducer from '../whiteboard/whiteboard.slice';


export const store = configureStore({
  reducer: {
    whiteboard:whiteboardReducer,
  },
});
