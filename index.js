import express from 'express';
import cors from 'cors';
import * as CommController from './src/controllers/comments.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { uploadPostImageDisk } from './src/middleware/upload.js';


const app = express();

const server = createServer(app); 

export const io = new Server(server,{
  cors: {
    origin: "*",
  }
});

io.sockets.on('connection', socket => {
    console.log('socket connection', socket.id);

    socket.on('disconnect', () => {
      console.log('socket disconnected', socket.id);
    });

    socket.on('sendMess', (arg) => {
      socket.emit('addMess', arg); 
      socket.broadcast.emit('addMess', arg);
    });
});


app.use(cors());

app.get('/comments', CommController.getAll);

app.get('/comments/:id', CommController.getOne);

app.post('/comments', express.json() , CommController.add);

server.listen(5000);