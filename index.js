var express = require ('express');
var app = express();
var mongoose = require ('mongoose');
var Student = require ('./student');

mongoose.connect ('mongodb://talkohen:password@ds013202.mlab.com:13202/students');
var conn = mongoose.connection;
var response = ' ';


conn.on ('error', function (err) {
    console.log ('connection error' + err);

});

conn.once('open',function(){
    find (app);
    console.log('opened a connection to database'); 
});

var port = process.env.PORT || 3000;
app.listen( process.env.PORT || 3000 );
console.log ("listening on port " +port);


function find (app) {

app.get ('/id/:userid', function (req,res) {

var user= req.params.userid;
console.log('finding by id...');

 Student.find({id : user},function(err,student){
            if(err) throw err;
            res.json(student);
        });
});


app.get ('/year/:year', function (req,res) {

var year= req.params.year;
console.log('finding by year...');

 Student.find({year : year},function(err,student){
            if(err) throw err;
            res.json(student);
        });
});


app.get ('/', function (req,res) {

   Student.find({},function(err,student){
            if(err) throw err;
            res.json(student);
        });

    console.log ('sending all students...')

});

}