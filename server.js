var express = require('express');
var expobj = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');







var db=require('./Backendconfig/db');
var port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost:27017/contactlist',{useUnifiedTopology: true, useNewUrlParser:true});
mongoose.connection.on('connected',function(){
    console.log('connected to database mongoDB @27017');
});
mongoose.connection.on('err',function(err){
    if(err){
        console.log('error in DB connection:'+err);
    }
});
mongoose.connection.on('disconnected',function(){
    console.log('Disconncted from DB mongoDB');
});
process.on('SIGINT',function(){
    console.log('Disconnected from DB mongoDB through app Termination');
    process.exit(0);
});




expobj.use(bodyParser.json());
expobj.use(bodyParser.json({type:'application/vnd.api+json'}));
expobj.use(bodyParser.urlencoded({extended:true}));
expobj.use(methodOverride('X-HTTP-Method-Override'));
expobj.use(express.static(__dirname+'/public'));
require('./Backendapp/routes')(expobj);
expobj.listen(port);
console.log('\nNode server has been statrted');
console.log('\nTo check it open any browser and type "local:'+port+'"and see the magic');
exports =module.exports=expobj;





