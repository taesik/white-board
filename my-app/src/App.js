import React from 'react';
import Whiteboard from "./whiteboard/Whiteboard";
import {connectWithSocketServer} from "./socketConn/socketConn";
import {useEffect} from "react";
import CursorOverlay from './CursorOverlay/CursorOverlay';

function App() {
  useEffect(() => {
    connectWithSocketServer()


  }, []);


  return (
    <div className="App">
      <Whiteboard/>
      <CursorOverlay />
    </div>
  );
}

export default App;
