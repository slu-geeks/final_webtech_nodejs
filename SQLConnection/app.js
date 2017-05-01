var mysql = require('mysql');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use(express.static('resources'));

 var connection = mysql.createConnection({
 host:'localhost',
 user:'root',
 password:'',
 database:'webtek-final',
     multipleStatements: true
 });
connection.connect();


app.get('/adminMonitor', function(req, res){
        connection.query("SELECT * FROM service_request ORDER BY start_servicing DESC; " +
            "SELECT * FROM feedback ORDER BY feedback_date DESC;", [1, 2],function(err, rows, fields) {
            if (err)
                alert("...");
            else {
                res.render('adminMonitor', {data: rows[0], data2: rows[1]});
            }
        });
});

app.post('/adminMonitor', urlencodedParser, function(req, res){
    var data = req.body;
    connection.query("SELECT * FROM service_request WHERE start_servicing BETWEEN '"+data.from +"' AND '"+data.to+"' " +
        "ORDER BY start_servicing DESC; " +
        "SELECT * FROM feedback WHERE feedback_date BETWEEN '"+data.fromF +"' AND '"+data.toF+"' " +
        "ORDER BY feedback_date DESC;", function(err, rows, fields) {
        if (err)
            alert("...");
        else {
            res.render('adminMonitor', {data: rows[0], data2: rows[1]});
        }
    });
});






app.listen(3000);


/*
 var d = new Date(rows[0].start_servicing);
 console.log(d.getFullYear()+'-'+d.getMonth()+01+'-'+d.getDate()); // Hours
res.render('adminMonitor', data);
res.render('monitor-success', result);*/
