const express = require('express');

const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');

const server = http.createServer(app);

app.use(cors());


let elements = [];
const io = new Server(server,{
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

io.on('connection', (socket)=>{
  console.log('user connected');
  io.to(socket.id).emit('whiteboard-state',elements);

  socket.on('element-update',(elementData)=>{
    updateElementInElements(elementData);

    socket.broadcast.emit('element-update',elementData);
  });
});
app.get('/',(req,res)=>{
  res.send('Hello server is working');

});

const PORT = process.env.PORT || 3003;

server.listen(PORT, ()=>{
  console.log('Hello server is listening on port ',PORT)
});

function updateElementInElements(elementData) {
  const index = elements.findIndex(el=> el.id === elementData.id);

  if (index === -1) {
    return elements.push(elementData);
  }

  elements[index] = elementData;
}