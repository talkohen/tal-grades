var express = require ('express');
var app = express();
var bodyParser = require ('body-parser');
var grades= require ('./grades.json');
var jsonQuery = require ('json-query');
var port = process.env.PORT || 3000;

app.use (bodyParser.json());
app.use (bodyParser.urlencoded ({extended:true}));


app.get ('/:userid', function (req,res,next) {

    var user= req.params.userid;

// iterate over each element in the array
for (var i = 0; i < grades.length; i++){
  // look for the entry with a matching `code` value
  if (grades[i].id == user){
res.json (grades[i]);
console.log ("sending json with the id : "+user);

  }

}

req.next ();
    
});

app.get ('/:year', function (req,res) {

    console.log ("Starting search by year function...");
    var year= req.params.year;
    var json = '' ;
    var counter =0;

// iterate over each element in the array
for (var i = 0; i < grades.length; i++){
  // look for the entry with a matching `code` value
  if (grades[i].year == year&&counter>1) 
  {
    console.log ("found another object in year : "+ year);
    json+= ','+JSON.stringify(grades[i]);
  }

  else if (grades[i].year == year&&counter==1){
    console.log ("found another object in year : "+ year);
    temp=json;
    json='['+temp+',';
    json+= JSON.stringify(grades[i]);
    counter++;
  }
 else if (grades[i].year == year&&counter==0){
    console.log ("found first object in year : "+ year);
    json+= JSON.stringify(grades[i]);
    counter++;
 }

}

if (counter >1) {
json+=']';
}


 res.send (json);
    
});


app.all ('*', function (req,res,next) {

   console.log ("sending json with all grades...");
    req.next ();
});

app.get ('/', function (req,res) {

res.json (grades);

});



app.listen( process.env.PORT || 3000 );
console.log ("listening on port " +port);