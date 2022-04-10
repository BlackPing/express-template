console.log('################### Module Set');
const express = require('express');
const ServerInfo = require('../Config/ServerInfo');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const jwt = require('jsonwebtoken');

const app = express();
console.log('################### Router Set');
ServerInfo.setAPI(app).then((err) => {
	if(err) {
		throw err;
	}
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(cookieParser());
	
	const token = jwt.sign({
		data: 'foobar'
	}, 'secret', { expiresIn: '10s' });
	
	console.log(token);
	
	jwt.verify(token, 'secret', function(err, decoded) {
		console.log(decoded) // bar
	});
	
	// setInterval(() => {
	//   jwt.verify(token, 'secret', function(err, decoded) {
	//     console.log(decoded) // bar
	//   });
	// }, 1500);
	
	console.time('Server On Time');
	
	app.use('*', (req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept"
			);
		next();
	});
		
	app.get('/', (req, res) => {
			fs.readFile(ServerInfo.ViewPath + `index.html`, 'utf-8', (err, data) => {
				if (err) throw err;
				res.writeHead(200, {'Content-Type':'text/html'});
				res.end(data);
			});
	});
	
	
	app.post('/test', (req, res) => {
		var array = [];
		var object = {};
	
		object.name = "testman";
		object.age = 27;
	
		array.push(object);
	
		res.send(JSON.stringify(array));
	});
	
	app.get('/test3', (req, res) => {
		res.send('Hello World!2');
	});
	
	app.use('/', express.static(ServerInfo.ViewPath));
	
	app.listen(ServerInfo.port, ServerInfo.ip, () => {
			console.log(`app Server Info ${ServerInfo.ip}:${ServerInfo.port}`);
			console.timeEnd('Server On Time');
	});
})
