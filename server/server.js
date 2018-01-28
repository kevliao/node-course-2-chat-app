// practice
const path = require('path');  // built in, does not need install
const http = require('http');  // built in; used by express to set up http server
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');  // this is path for express middleware
var port = process.env.PORT || 3000;

// console.log(publicPath);

const {generateMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app); // app.listen calls createServer as well
var io = socketIO(server); // this is web sockets server, for communicating between server and client

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('new user connected');

    // new user sees this
    // socket.emit('newMessage', {
    //     from: 'admin',
    //     text: 'welcome to the chat app from admin',
    //     createdAt: new Date().getTime()  
    // });
    socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app from admin'));

    // everyone else except new user above will see this
    // socket.broadcast.emit('newMessage', {
    //     from: 'admin',
    //     text: 'new user joined',
    //     createdAt: new Date().getTime()  
    // });
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'));

    // listen to client
    socket.on('createMessage', (newMessage)=>{
        console.log('received new message from client ', newMessage);
        // socket.emit emits event to single connection (like to user that just joined)
        // while io.emit emits event to every single connections
        // io.emit('newMessage', {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()  // to prevent spoofing
        // });  
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

        // socket being called will not get msg, everyone else will
        // socket.broadcast.emit('newMessage', {   // will send to everyone but the 'socket'
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()  
        // });
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
