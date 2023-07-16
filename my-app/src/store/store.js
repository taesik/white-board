import { configureStore } from "@reduxjs/toolkit";
import whiteboardSliceReducer from "../whiteboard/whiteboard.slice";
import cursorSliceReducer from '../CursorOverlay/cursorSlice';
export const store = configureStore({
  reducer: {
    whiteboard: whiteboardSliceReducer,
    cursor: cursorSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoreActions: ["whiteboard/setElements"],
          ignoredPaths: ["whiteboard.elements"],
        },
      }),
});

