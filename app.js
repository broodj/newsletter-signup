//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function(){
  console.log('server up @ port 3000');
});


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(){

});
