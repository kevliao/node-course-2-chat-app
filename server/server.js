// practice
const path = require('path');  // built in, does not need install
const express = require('express');

const publicPath = path.join(__dirname, '../public');  // this is path for express middleware
var port = process.env.PORT || 3000;

// console.log(publicPath);



var app = express();


app.use(express.static(publicPath));

app.listen(port, ()=>{
    console.log(`Server up on ${port}`);
})
