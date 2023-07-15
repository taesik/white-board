import {configureStore} from '@reduxjs/toolkit';
import whiteboardReducer from '../whiteboard/whiteboard.slice';


export const store = configureStore({
  reducer: {
    whiteboard:whiteboardReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ['whiteboard/setElements'],
        ignorePaths: ['whiteboard/elements'],
      }
    });
  },
});
