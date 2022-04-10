const express = require('express');
const router = express.Router();

router.use('*', (req, res, next) => {
	console.log('api middle');
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

router.post('/_test', (req, res) => {
  const data = {a:1234, b:'string'}
	res.send(data)
});

router.get('/_test', (req, res) => {
  const data = {a:1234, b:'string'}
	res.send(data)
});


module.exports = router;