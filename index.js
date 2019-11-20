//import express module
var express = require('express');
//create an express app
var app = express();

const path = require('path');
app.use(express.static('public'));

//add a callback function to handle 
//get request on the root
app.get('/', function(req, res) {  
    res.sendFile(path.join(__dirname+'/html/home.html'));
});

app.get('/admin', function(req, res) {  
    res.sendFile(path.join(__dirname+'/html/admin.html'));
});

app.get('/products', function(req, res) {  
    res.sendFile(path.join(__dirname+'/html/products.html'));
});

var port = process.env.PORT || 3000;

//run the server on port 3000
app.listen(port);
