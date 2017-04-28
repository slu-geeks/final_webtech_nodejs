var parser = require('./parser');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');

 var connection = mysql.createConnection({
 host:'localhost',
 user:'root',
 password:'',
 database:'webtek-final'
 });
connection.connect();



app.get('/adminMonitor', function(req, res){
    res.render('adminMonitor');
});

app.post('/adminMonitor', urlencodedParser, function(req, res){
    var data = req.body;
    var ret = [];
    connection.query('SELECT request_name, date from service_request WHERE date BETWEEN "'+data.from+'" AND "'+data.to+'"', function(err, rows, fields) {
        if (err)
            alert("...");
        else {
            ret = JSON.stringify(rows);
            res.render('monitor-success');
        }
        console.log(ret);
    });
});



app.listen(3000);


/*

res.render('monitor-success', result);*/
