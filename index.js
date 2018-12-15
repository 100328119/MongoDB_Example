//require nesseary package
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// set express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static(__dirname + '/public'));
//use() function is used to call middleware
//get post body
app.use(bodyParser.json());
//initialize routes
app.use('/api',require('./routers/api'));
//error handling mw
app.use(function(err,req,res,next){
  console.log(err.message);
  res.status(422).send({error:err.message});
});

//listen for request
app.listen(process.env.PORT||4000,function(){
   console.log('able to get request ctrl+c terminate');
});

//router section
// app.get('/',function(req, res){
//   //send() function to response request
//   res.send({name:'kun'});
//   //end() function finish incoming request
//   res.end();
// });
