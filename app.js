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
      "Authorization": "brody 4b719bcf4483436b2fb934cf7d428f3a-us20"
    },
    body: jsonData
  };

  request(options, function(error, response, body){
    if(error){
      console.log(error);
    } else {
      console.log(response.statusCode);
    }
  });
});







// API Key
//


// List ID
// b279dc372d
