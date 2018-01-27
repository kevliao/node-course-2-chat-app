var socket = io();  // used to listecn to data from server, and to send info back

socket.on('connect', ()=>{
    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'client app kl',
        text: 'message from client app kl'
    });
})
// socket.on('connect', ()=>{
//     console.log('connected to server');

//     socket.emit('createEmail',  {  // send from C to S
//         to: 'server@hm.com',
//         text: 'this is test send meail'
//     });
// });

socket.on('disconnect', ()=>{
    console.log('disconnected from server');
});

// socket.on('newEmail', (email)=>{
//     console.log('new email from server ', email);
// });

socket.on('newMessage', (newMessage)=>{
    console.log('recieved msg from server ', newMessage);
});
