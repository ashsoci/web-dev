//import express module
var express = require('express');
var parser = require('body-parser');
var mysql = require('mysql');

//create an express app
var app = express();

var ejs = require('ejs');

app.use(parser.json());
app.use(parser.urlencoded());

const path = require('path');
app.use(express.static('public'));

//var con;


/*con = mysql.createConnection ({
host: "remotemysql.com",
user: "DBup3IIEtj",
password: "DFMEGHwP81",
database: "DBup3IIEtj",
port: 3306
});
connection.on('error', connectDb());*/

const con = mysql.createPool({
	host: "remotemysql.com",
	user: "DBup3IIEtj",
	password: "DFMEGHwP81",
	database: "DBup3IIEtj",
	port: 3306
});

/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});*/

var products = getProducts();



//add a callback function to handle 
//get request on the root
app.get('/', function(req, res) {  
    //res.sendFile(path.join(__dirname+'/html/home.ejs'));
	let data = {
		
	}
	
	products = getProducts();
	
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
	
	let data = {
		products
	}
		
	products = getProducts();
	
	ejs.renderFile('./html/products.ejs', data, null, function(err, str){
		res.send(str);
	})
});

app.get('/product', function(req, res) {  
    //res.sendFile(path.join(__dirname+'/html/admin.ejs'));
	
	let data = {
		
	}
	
	ejs.renderFile('./html/product-old.ejs', data, null, function(err, str){
		res.send(str);
	})
});

app.get('/products/:name', function(req , res){
	
	console.log(req.params.name);
	
	var prod = [];
	
	for(var p in products)
	{
		console.log("Checking", products[p].title, "with", req.params.name)
		
		if (products[p].title == req.params.name)
		{
			prod = products[p];
			break;
		}
	}
	
	if(prod.published == 0)
	{
		return;
	}
	
	console.log(prod);
	
	let data = {
		prod
	}
	
	products = getProducts();
		
	ejs.renderFile('./html/product.ejs', data, null, function(err, str){
		res.send(str);
	})
});





	/*---Admin---*/

app.get('/admin/admin-homepage', function(req, res) {  
    //res.sendFile(path.join(__dirname+'/html/admin.ejs'));
	
	let data = {
		
	}
	
	ejs.renderFile('./html/admin/admin-homepage.ejs', data, null, function(err, str){
		res.send(str);
	})
});

app.get('/admin/admin-about', function(req, res) {  
    //res.sendFile(path.join(__dirname+'/html/admin.ejs'));
	
	let data = {
		
	}
	
	ejs.renderFile('./html/admin/admin-about.ejs', data, null, function(err, str){
		res.send(str);
	})
});

app.get('/admin/admin-products', function(req, res) {  
    //res.sendFile(path.join(__dirname+'/html/admin.ejs'));
	
	let data = {
		products
	}
	
	ejs.renderFile('./html/admin/admin-products.ejs', data, null, function(err, str){
		res.send(str);
	})
});

app.get('/admin/admin-contact', function(req, res) {  
    //res.sendFile(path.join(__dirname+'/html/admin.ejs'));
	
	let data = {
		
	}
	
	ejs.renderFile('./html/admin/admin-contact.ejs', data, null, function(err, str){
		res.send(str);
	})
});

app.get('/admin/admin-products/:name', function(req , res){
	
	console.log(req.params.name);
	
	var prod = [];
	
	for(var p in products)
	{
		console.log("Checking", products[p].title, "with", req.params.name)
		
		if (products[p].title == req.params.name)
		{
			prod = products[p];
			break;
		}
	}
	
	console.log(prod);
	
	let data = {
		prod
	}
	
	products = getProducts();
		
	ejs.renderFile('./html/admin/admin-product.ejs', data, null, function(err, str){
		res.send(str);
	})
});

/*---Form Receiving Functions---*/
app.post('/update-product', function(req, res){
	console.log("Posted");
	console.log(req.body);
	
	con.query("UPDATE products SET name = ?, thumbnail = ?, banner = ?, slide1 = ?, slide2 = ?, slide3 = ?, slide4 = ?, slide5 = ?, header1 = ?, header2 = ?, header3 = ?, feature1 = ?, feature2 = ?, feature3 = ?, windows = ?, mac = ?, linux = ?, ram = ?, hdd = ?, published = ? WHERE productID = ?", [req.body.title, req.body.pathToImg, req.body.productBanner, req.body.productSlide1, req.body.productSlide2, req.body.productSlide3, req.body.productSlide4, req.body.productSlide5, req.body.productHeader1, req.body.productHeader2, req.body.productHeader3, req.body.productFeature1, req.body.productFeature2, req.body.productFeature3, req.body.windows, req.body.mac, req.body.linux, req.body.productRam, req.body.productHdd, req.body.published, req.body.id], function(err, res) {
		if(err) {
            console.log("error: ", err);
            //result(null, err);
        }
        else {   
            //result(null, res);
			        }
	}); //INSERT REQ.BODY DATA
	res.status(201);
	res.end(JSON.stringify({message:"we recieved your message"}));
});

/*function pushChanges(id, )
{
	
}*/

function convertToUpdate(table, body)
{
	var updateQuery = "UPDATE "+ table + " SET ";
	for(var dat in body)
	{
		//updateQuery += dat
	}
}

function getProducts()
{
	var prodList = []
	con.query("SELECT * FROM products", function (err, result, fields) {
		for (var i in result) 
		{
			//console.log("pushing " + result[i].name);
			prodList.push({
				id:result[i].productID,
				title:result[i].name, 
				pathToImg:result[i].thumbnail,
				productBanner:result[i].banner,
				productSlide1:result[i].slide1,
				productSlide2:result[i].slide2,
				productSlide3:result[i].slide3,
				productSlide4:result[i].slide4,
				productSlide5:result[i].slide5,
				productHeader1:result[i].header1,
				productHeader2:result[i].header2,
				productHeader3:result[i].header3,
				productFeature1:result[i].feature1,
				productFeature2:result[i].feature2,
				productFeature3:result[i].feature3,
				windows:result[i].windows,
				mac:result[i].mac,
				linux:result[i].linux,
				productRam:result[i].ram,
				productHdd:result[i].hdd,
				published:result[i].published
			})
		}
	});
	
	return prodList;
}

var port = process.env.PORT || 3000;

//run the server on port 3000
app.listen(port);