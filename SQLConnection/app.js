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


var user = '';







app.get('/Login', function(req, res){
    res.render('Login');
});


app.post('/Login', urlencodedParser, function(req, res){
    var data = req.body;
    connection.query("SELECT * FROM user_account WHERE username = '"+data.usernames+"' and password = '"+data.passwords+"' ; ", function(err, rows, fields) {
        if (err)
            alert('...');
        else if (rows == '')
            res.render('error');
        else {
            user = data.usernames;
            res.redirect('adminMonitor');
        }
    });
});










app.get('/adminMonitor', function(req, res){
    if(user){
        connection.query("select request_id, start_servicing, end_servicing, request_status, p.service_name, concat(u.last_name,', ', u.first_name) as USER " +
            "from service_request s inner join pet_service p USING(service_id) inner join user_account u using(account_id) " +
            "ORDER BY request_id; " +
            "SELECT feedback_id, ranking, contacting_phone_number, feedback_messages,  concat(u.last_name,', ', u.first_name) as USER, feedback_date, feedback_status FROM feedback f inner join user_account u using(account_id) ORDER BY feedback_id;", [1, 2],function(err, rows, fields) {
            if (err)
                alert("...");
            else {
                res.render('adminMonitor', {data: rows[0], data2: rows[1], username: user});
            }
        });
    }
    else{
        res.render('error');
    }
});

app.post('/adminMonitor', urlencodedParser, function(req, res){
    var data = req.body;
    connection.query("select request_id, start_servicing, end_servicing, request_status, p.service_name, concat(u.last_name,', ', u.first_name) as USER " +
        "FROM service_request s inner join pet_service p USING(service_id) inner join user_account u using(account_id) " +
        "WHERE start_servicing BETWEEN '"+data.from +"' AND '"+data.to+"' " +
        "ORDER BY start_servicing DESC; " +

        "SELECT feedback_id, ranking, contacting_phone_number, feedback_messages,  concat(u.last_name,', ', u.first_name) as USER, feedback_date, feedback_status " +
        "FROM feedback f inner join user_account u using(account_id) " +
        "WHERE feedback_date BETWEEN '"+data.fromF +"' AND '"+data.toF+"' " +
        "ORDER BY feedback_date DESC;", function(err, rows, fields) {
        if (err)
            alert("...");
        else {
            res.render('adminMonitor', {data: rows[0], data2: rows[1], username: user});
        }
    });
});






app.listen(3000);

/*
 var d = new Date(rows[0].start_servicing);
 console.log(d.getFullYear()+'-'+d.getMonth()+01+'-'+d.getDate()); // Hours
 res.render('adminMonitor', data);
 res.render('monitor-success', result);*/


/* app.get('/adminApproval', function(req, res){
 connection.query("SELECT * FROM service_request ORDER BY start_servicing DESC; " +
 "SELECT * FROM feedback ORDER BY feedback_date DESC;", [1, 2],function(err, rows, fields) {
 if (err)
 alert("...");
 else {
 res.render('adminMonitor', {data: rows[0], data2: rows[1]});
 }
 });
 });

 app.post('/adminApproval', urlencodedParser, function(req, res){
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
 */



/*
 var d = new Date(rows[0].start_servicing);
 console.log(d.getFullYear()+'-'+d.getMonth()+01+'-'+d.getDate()); // Hours
res.render('adminMonitor', data);
res.render('monitor-success', result);*/
