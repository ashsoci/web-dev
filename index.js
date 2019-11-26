//import express module
var express = require('express');

var mysql = require('mysql');

//create an express app
var app = express();

var ejs = require('ejs');

const path = require('path');
app.use(express.static('public'));

var con = mysql.createConnection ({
	host: "remotemysql.com",
	user: "DBup3IIEtj",
	password: "DFMEGHwP81",
	database: "DBup3IIEtj",
	port: 3306
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//add a callback function to handle 
//get request on the root
app.get('/', function(req, res) {  
    //res.sendFile(path.join(__dirname+'/html/home.ejs'));
	let data = {
		
	}
	
	ejs.renderFile('./html/home.ejs', data, null, function(err, str){
		res.send(str);
	})
});

app.get('/admin', function(req, res) {  
    //res.sendFile(path.join(__dirname+'/html/admin.ejs'));
	
	let data = {
		
	}
	
	ejs.renderFile('./html/admin.ejs', data, null, function(err, str){
		res.send(str);
	})
});

app.get('/products', async function(req, res) {  
    //res.sendFile(path.join(__dirname+'/html/products.ejs'));
	
	var products = [];
	
	getProducts.then(function(value){
		products = value;
		console.log("promised prodlist:", products)
	
	
	console.log("external prodlist:",products)
	
	if(products == [])
	{
		products = []
		console.log("prodList null")
	}
	
	let data = {
		products
	}
	
	ejs.renderFile('./html/products.ejs', data, null, function(err, str){
		res.send(str);
	})
	})
});

app.get('/product', function(req, res) {  
    //res.sendFile(path.join(__dirname+'/html/admin.ejs'));
	
	let data = {
		
	}
	
	ejs.renderFile('./html/product.ejs', data, null, function(err, str){
		res.send(str);
	})
});

var getProducts = new Promise(function(resolve, reject){
	setTimeout(function() {
		//resolve('foo');
		var prodList = []
		con.query("SELECT name, thumbnail FROM products", 
		function (err, result, fields) {
			for (var i in result) 
			{
				console.log("pushing " + result[i].name);
				prodList.push({title:result[i].name, pathToImg:"./images/"+result[i].thumbnail})
			}
		});
		resolve(prodList);
	}, 300);
})

function getProducts2()
{
	var prodList = []
	con.query("SELECT name, thumbnail FROM products", 
	function (err, result, fields) {
		if (err) throw err;
		
		for (var i in result) 
		{
			console.log("pushing " + result[i].name);
			prodList.push({title:result[i].name, pathToImg:result[i].thumbnail})
		}
	});
	return prodList;
}

var port = process.env.PORT || 3000;

//run the server on port 3000
app.listen(port);
