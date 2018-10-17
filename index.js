var express = require("express");
var path = require("path")
var app = express();
var ip = process.env.IP || '0.0.0.0';
var port = process.env.PORT || 8080;
var compression =require ('compression');

/* eslint-disable no-console */


app.use(compression());

app.use('/images', express.static(path.join( __dirname, './images')));

app.use(express.static('dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(port,function(err){
	console.log("Bodha App started",port)
});
