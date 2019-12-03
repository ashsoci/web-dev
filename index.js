//import express module
var express = require('express');
var parser = require('body-parser');
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var session = require('express-session');

//create an express app
var app = express();

var ejs = require('ejs');

app.use(cookieParser());
app.use(session({secret: "Your secret key"}));

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
var team = getTeam();
var homepage = getHomepage();
var messages = getMessages();


//add a callback function to handle 
//get request on the root
app.get('/', function(req, res) {  
	let data = {
		homepage
	}
	products = getProducts();
	
	ejs.renderFile('./html/home.ejs', data, null, function(err, str){
		res.send(str);
	})
});

app.get('/about', function(req, res) {  
	let data = {
		team,
		homepage
	}
	console.log(team);
	
	team = getTeam();
	
	
	
	ejs.renderFile('./html/about.ejs', data, null, function(err, str){
		res.send(str);
	})
});

app.get('/admin', function(req, res) {  
	
	if(req.session.user)
	{
		let data = {
			homepage
		}
		
		ejs.renderFile('./html/admin.ejs', data, null, function(err, str){
			res.send(str);
		})
	}
    else
	{
        res.redirect('/login')
    }
});

app.get('/products', async function(req, res) {  
	
	let data = {
		products,
		homepage
	}
		
	products = getProducts();
	
	ejs.renderFile('./html/products.ejs', data, null, function(err, str){
		res.send(str);
	})
});

app.get('/product', function(req, res) {  
	
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
		prod,
		homepage
	}
	
	products = getProducts();
		
	ejs.renderFile('./html/product.ejs', data, null, function(err, str){
		res.send(str);
	})
});

app.get('/contact', function(req, res) {  
	
	let data = {
		homepage
	}
	
	ejs.renderFile('./html/contact.ejs', data, null, function(err, str){
		res.send(str);
	})
});

	/*---Admin---*/

app.get('/admin/admin-homepage', function(req, res) {  

	if(req.session.user)
	{
        let data = {
			homepage
		}
		
		homepage = getHomepage();
		
		ejs.renderFile('./html/admin/admin-homepage.ejs', data, null, function(err, str){
			res.send(str);
		})
    }
    else
	{
        res.redirect('/login')
    }
});

app.get('/admin/admin-about', function(req, res) {  

	if(req.session.user)
	{
		let data = {
			team,
			homepage
		}
		
		ejs.renderFile('./html/admin/admin-about.ejs', data, null, function(err, str){
			res.send(str);
		})
	}
    else
	{
        res.redirect('/login')
    }
});

app.get('/admin/admin-products', function(req, res) {  

	if(req.session.user)
	{
		let data = {
			products,
			homepage
		}
		
		ejs.renderFile('./html/admin/admin-products.ejs', data, null, function(err, str){
			res.send(str);
		})
	}
    else
	{
        res.redirect('/login')
    }
});

app.get('/admin/admin-contact', function(req, res) {  

	if(req.session.user)
	{
		let data = {
			messages,
			homepage
		}
		
		ejs.renderFile('./html/admin/admin-contact.ejs', data, null, function(err, str){
			res.send(str);
		})
	}
    else
	{
        res.redirect('/login')
    }
});

app.get('/admin/admin-contact/:id', function(req , res){
	if(req.session.user)
	{
		console.log(req.params.id);
		
		var message = [];
		
		for(var m in messages)
		{
			console.log("Checking", messages[m].id, "with", req.params.id)
			
			if (messages[m].id == req.params.id)
			{
				message = messages[m];
				break;
			}
		}
		
		console.log(message);
		
		let data = {
			message,
			homepage
		}
		
		messages = getMessages();
			
		ejs.renderFile('./html/admin/admin-contact-message-details.ejs', data, null, function(err, str){
			res.send(str);
		})
	}
    else
	{
        res.redirect('/login')
    }
});

app.get('/admin/admin-products/:name', function(req , res){
	if(req.session.user)
	{
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
			prod,
			homepage
		}
		
		products = getProducts();
			
		ejs.renderFile('./html/admin/admin-product.ejs', data, null, function(err, str){
			res.send(str);
		})
	}
    else
	{
        res.redirect('/login')
    }
});

app.get('/admin/admin-about/:name', function(req , res){
	if(req.session.user)
	{
		console.log(req.params.name);
		
		var te = [];
		
		for(var t in team)
		{
			console.log("Checking", team[t].name, "with", req.params.name)
			
			if (team[t].name == req.params.name)
			{
				te = team[t];
				break;
			}
		}
		
		console.log(te);
		
		let data = {
			te,
			homepage
		}
		
		team = getTeam();
			
		ejs.renderFile('./html/admin/admin-team.ejs', data, null, function(err, str){
			res.send(str);
		})
	}
    else
	{
        res.redirect('/login')
    }
});

function updateDatabases()
{
	products = getProducts();
	team = getTeam();
	homepage = getHomepage();
	messages = getMessages();
    setTimeout(updateDatabases, 5000);
}
updateDatabases();

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
            products = getProducts();
			        }
	});
	
	products = getProducts();
	
	res.status(201);
	res.end(JSON.stringify({message:"Product Updated"}));
});

app.post('/update-team', function(req, res){
	console.log("Posted");
	console.log(req.body);
	
	con.query("UPDATE team SET name = ?, bio = ?, photo = ? WHERE teamID = ?", [req.body.name, req.body.bio, req.body.photo, req.body.id], function(err, res) {
		if(err) {
            console.log("error: ", err);
            //result(null, err);
        }
        else {   
            team = getTeam();
			        }
	});
	
	team = getTeam();
	
	res.status(201);
	res.end(JSON.stringify({message:"Team Member Updated"}));
});

app.post('/delete-team', function(req, res){
	console.log("Posted");
	console.log(req.body);
	
	con.query("DELETE FROM team WHERE teamID = ?", [req.body.id], function(err, res) {
		if(err) {
            console.log("error: ", err);
            //result(null, err);
        }
        else {   
            team = getTeam();
			        }
	});
	
	team = getTeam();
	
	res.status(201);
	res.end(JSON.stringify({message:"Team Member Deleted"}));
});

app.post('/delete-product', function(req, res){
	console.log("Posted");
	console.log(req.body);
	
	con.query("DELETE FROM products WHERE productID = ?", [req.body.id], function(err, res) {
		if(err) {
            console.log("error: ", err);
            //result(null, err);
        }
        else {   
            products = getProducts();
			        }
	});
	
	products = getProducts();
	
	res.status(201);
	res.end(JSON.stringify({message:"Product Deleted"}));
});

app.post('/update-homepage', function(req, res){
	console.log("Posted");
	console.log(req.body);
	
	con.query("UPDATE homepage SET logo = ?, slide1 = ?, slide2 = ?, slide3 = ?, slide4 = ?, slide5 = ?, jumbotitle = ?, jumbotext = ?, trititle1 = ?, trititle2 = ?, trititle3 = ?, tritext1 = ?, tritext2 = ?, tritext3 = ?", [req.body.logo, req.body.slide1, req.body.slide2, req.body.slide3, req.body.slide4, req.body.slide5, req.body.jumbotitle, req.body.jumbotext, req.body.trititle1, req.body.trititle2, req.body.trititle3, req.body.tritext1, req.body.tritext2, req.body.tritext3], function(err, res) {
		if(err) {
            console.log("error: ", err);
            //result(null, err);
        }
        else {   
            team = getTeam();
			        }
	});
	
	homepage = getHomepage();
	
	res.status(201);
	res.end(JSON.stringify({message:"Homepage Updated"}));
});

app.post('/create-product', function(req, res){
	console.log("Creating");
	
	con.query("INSERT INTO products(name) VALUES ('New Product')", function(err, res) {
		if(err) {
            console.log("error: ", err);
            //result(null, err);
        }
        else {   
            //result(null, res);
			        }
	});
	
	products = getProducts();
	
	res.status(201);
	res.end(JSON.stringify({message:"Product Created"}));
});

app.post('/submit-contact', function(req, res){
	console.log("Creating");
	
	con.query("INSERT INTO messages(firstname, surname, email, subject, message) VALUES (?, ?, ?, ?, ?)", [req.body.firstname, req.body.surname, req.body.email, req.body.subject, req.body.message], function(err, res) {
		if(err) {
            console.log("error: ", err);
            //result(null, err);
        }
        else {   
            //result(null, res);
			        }
	});
	
	products = getProducts();
	
	res.status(201);
	res.end(JSON.stringify({message:"Product Created"}));
});

app.post('/create-team', function(req, res){
	console.log("Creating");
	
	con.query("INSERT INTO team(name) VALUES ('New Team Member')", function(err, res) {
		if(err) {
            console.log("error: ", err);
            //result(null, err);
        }
        else {   
            //result(null, res);
			        }
	});
	
	team = getTeam();
	
	res.status(201);
	res.end(JSON.stringify({message:"Team Member Created"}));
});

app.get('/login', function (req,res){

    res.sendFile(path.join(__dirname+'/html/login.html'))
});

app.post('/authenticate', function(req, res){

    console.log(req.body)
    let loginData = {
        username : req.body.username,
        password : req.body.password
    }

    con.query('SELECT * FROM users WHERE username = \'' + loginData.username + '\' AND password = \'' + loginData.password + '\'' , function (err, result) {

        if(err){
			console.log(err);
        }
        else{
            if(result && result.length > 0)
			{
				console.log("Got result");
                req.session.user = result[0];
                res.redirect('/admin');
            }
            else
            {
				console.log("Bad login");
                res.redirect('/login');
            }
        }
    })

});

app.get('/logout', function (req,res){

    req.session.user = undefined;

    res.redirect('/');

})

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

function getTeam()
{
	var teamList = []
	con.query("SELECT * FROM team", function (err, result, fields) {
		for (var i in result) 
		{
			teamList.push({
				id:result[i].teamID,
				name:result[i].name,
				bio:result[i].bio,
				photo:result[i].photo
			})
		}
	});
	
	return teamList;
}

function getHomepage()
{
	var hp = []
	con.query("SELECT * FROM homepage", function (err, result, fields) {
				
		for (var i in result) 
		{
			hp.push({
				logo:result[i].logo,
				slide1:result[i].slide1,
				slide2:result[i].slide2,
				slide3:result[i].slide3,
				slide4:result[i].slide4,
				slide5:result[i].slide5,
				jumbotitle:result[i].jumbotitle,
				jumbotext:result[i].jumbotext,
				trititle1:result[i].trititle1,
				trititle2:result[i].trititle2,
				trititle3:result[i].trititle3,
				tritext1:result[i].tritext1,
				tritext2:result[i].tritext2,
				tritext3:result[i].tritext3
			})
		}
	});
	
	return hp;
}

function getMessages()
{
	var mes = []
	con.query("SELECT * FROM messages", function (err, result, fields) {
				
		for (var i in result) 
		{
			mes.push({
				id:result[i].messageID,
				firstname:result[i].firstname,
				surname:result[i].surname,
				email:result[i].email,
				subject:result[i].subject,
				message:result[i].message
			})
		}
	});
	
	return mes;
}

var port = process.env.PORT || 3000;

//run the server on port 3000
app.listen(port);