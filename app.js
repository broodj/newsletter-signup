//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function(){
  console.log('server up @ port 3000');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/failure', function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get('/success', function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res){

  var forename = req.body.forename;
  var surname = req.body.surname;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        //Object to store user first + last name;
        merge_fields: {
          FNAME: forename,
          LNAME: surname,
        },
      }
    ],
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/b279dc372d",
    method: "POST",
    //Include API key
    headers: {
      "Authorization": "brody eeabd9081dfd4149eb61565b35f89f49-us20"
    },
    // body: jsonData
  };

  request(options, function(error, response, body){
    if(error){

      res.sendFile(__dirname + '/failure.html');
    } else {

      if (response.statusCode === 200) {
        res.sendFile(__dirname + '/success.html');
      } else {
        res.sendFile(__dirname + '/failure.html');
      }

    }

  });

});









// API Key
//


// List ID
// b279dc372d
