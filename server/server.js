// practice
const path = require('path');  // built in, does not need install
const http = require('http');  // built in; used by express to set up http server
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');  // this is path for express middleware
var port = process.env.PORT || 3000;

// console.log(publicPath);



var app = express();
var server = http.createServer(app); // app.listen calls createServer as well
var io = socketIO(server); // this is web sockets server, for communicating between server and client

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('new user connected');

    // socket.emit('newMessage', {
    //     from: 'server',
    //     text: 'hello from server',
    //     createdAt: 'server local'
    // });

    // listen to client
    socket.on('createMessage', (newMessage)=>{
        console.log('received new message from client ', newMessage);
        // socket.emit emits event to single connection, whiel io.emit emits event to every single connections
        io.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()  // to prevent spoofing
        });    
    });

    socket.on('disconnect', ()=>{
        console.log('user was disconnected')
    })
})

// io.on('connection', (socket)=>{ // socket from index.html, register event listener, when client connects to server
//     console.log('new user connected');

//     socket.emit('newEmail', {  // send data from server to client in real time, not possible w/ HTTP
//         from: 'kevliao@hm.com',
//         text: 'test msg',
//         createAt: 123
//     });  // newEmail from client side, has to be same

//     socket.on('createEmail', (newEmail)=>{  // from C to S
//         console.log('createEmail', newEmail)
//     })

//     socket.on('disconnect', ()=>{
//         console.log('user was disconnected')
//     })
// })  


server.listen(port, ()=>{
    console.log(`Server up on ${port}`);
})
