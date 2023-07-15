import React from 'react';
import Whiteboard from "./whiteboard/Whiteboard";
import {connectWithSocketServer} from "./socketConn/socketConn";
import {useEffect} from "react";

function App() {
  useEffect(() => {
    connectWithSocketServer()


  }, []);


  return (
    <div className="App">
      <Whiteboard/>
    </div>
  );
}

export default App;
