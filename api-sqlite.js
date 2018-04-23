var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database');

db.serialize(function(){
    db.run("CREATE TABLE IF NOT EXISTS graffiti (location TEXT, description TEXT, date DATE)");
    db.run("DELETE FROM graffiti");
    db.run("INSERT INTO graffiti (location,description,date) VALUES ('shop','graffiti in the shop','10.01.2018')");
});

var express = require('express');
var restapi = express();

restapi.get('/graffiti', function(req,res){
    db.all("SELECT * FROM graffiti", function (err,rows){
        res.jsonp(rows);
    });
});
restapi.post('/graffiti',function(req,res){
    var location = req.body.location;
    var description = req.body.description;
    var date = req.body.date;
    db.run("INSERT INTO graffiti (location,description,date) VALUES (${location},${description},${date})", function(err,rows){
        res.jsonp("hi");
    });
})
restapi.listen(3000);