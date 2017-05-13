var mysql = require('mysql');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use(express.static('resources'));
app.use(session({secret: 'shhhhh'}));


 var connection = mysql.createConnection({
 host:'localhost',
 user:'root',
 password:'',
 database:'webtek-final',
     multipleStatements: true
 });
connection.connect();

var user = '';
var sess;



app.get('/login', function(req, res){
    res.render('Login');
});


app.post('/Login', urlencodedParser, function(req, res){
    sess = req.session;
    var data = req.body;
    connection.query("SELECT * FROM user_account WHERE role_id = '3' and username = '"+data.usernames+"' and password = '"+data.passwords+"'; ", function(err, rows, fields) {
        if (err)
            console.log(err);
        else if (rows == '')
            res.render('error');
        else {
            sess.email= data.usernames;
            res.redirect('adminMonitor');
        }
    });
});





app.get('/adminMonitor', function(req, res){
    sess = req.session;
    if(sess.email){
        connection.query("SELECT request_id, start_servicing, end_servicing, " +
            "IF(request_status = '01', 'Not Checked'," +
            "IF((request_status= '02'), 'Checked'," +
            "IF((request_status = '03'), 'Servicing'," +
            "IF(request_status = '04', 'Done',1)))) as request_status" +
            ", p.service_name, concat(u.last_name,', ', u.first_name) as 'HomeOwner'" +
            "FROM service_request s inner join pet_service p USING(service_id) inner join user_account u using(account_id) " +
            "ORDER BY request_id; " +

            "SELECT feedback_id, ranking, contacting_phone_number, feedback_messages,  concat(u.last_name,', ', u.first_name) as 'USER', checked_description, feedback_date, consideration_date, " +
            "IF(feedback_status = '01', 'Not Checked'," +
            "IF((feedback_status = '02'), 'Checked'," +
            "IF(feedback_status = '03', 'Checked and contact customer',1))) as feedback_status" +
            ", request_id FROM feedback f inner join user_account u using(account_id) " +
            "ORDER BY feedback_id;", [1, 2],function(err, rows, fields) {
            if (err)
                alert("...");
            else {
                res.render('adminMonitor', {data: rows[0], data2: rows[1], username: sess.email});
            }
        });
    }
    else{
        res.render('error');
    }
});

app.post('/adminMonitor', urlencodedParser, function(req, res){
    sess = req.session;
    var data = req.body;
    connection.query("SELECT request_id, start_servicing, end_servicing, " +
        "IF(request_status = '01', 'Not Checked'," +
        "IF((request_status= '02'), 'Checked'," +
        "IF((request_status = '03'), 'Servicing'," +
        "IF(request_status = '04', 'Done',1)))) as request_status" +
        ", p.service_name, concat(u.last_name,', ', u.first_name) as 'HomeOwner'" +
        "FROM service_request s inner join pet_service p USING(service_id) inner join user_account u using(account_id) " +
        "WHERE start_servicing BETWEEN '"+data.from +"' AND '"+data.to+"' " +
        "ORDER BY start_servicing DESC; " +

        "SELECT feedback_id, ranking, contacting_phone_number, feedback_messages,  concat(u.last_name,', ', u.first_name) as 'USER', checked_description, feedback_date, consideration_date, " +
        "IF(feedback_status = '01', 'Not Checked'," +
        "IF((feedback_status = '02'), 'Checked'," +
        "IF(feedback_status = '03', 'Checked and contact customer',1))) as feedback_status" +
        ", request_id FROM feedback f inner join user_account u using(account_id) " +
        "WHERE feedback_date BETWEEN '"+data.fromF +"' AND '"+data.toF+"' " +
        "ORDER BY feedback_date DESC;", function(err, rows, fields) {
        if (err)
            alert("...");
        else {
            res.render('adminMonitor', {data: rows[0], data2: rows[1], username: user});
        }
    });
});

app.get('/Logout',function(req,res){
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.render('Out');
        }
    });
});




var row;
var sukat;

app.get('/adminApproval', function(req, res){
    connection.query("SELECT * from user_account where status = '01';", function(err, rows) {
        if (err)
            console.log(err);
        else {
            res.render('adminApproval', {data: rows});
            sukat = rows.length;
            row = rows;
        }
    });
});


app.post('/adminApproval',urlencodedParser, function(req, res){
    var data = req.body;
    var arr = data.samplesss;

    for(var i=0; i < arr.length; i++) {
        connection.query("UPDATE user_account SET status = '"+arr[i]+"' WHERE last_name = '"+row[i].last_name+"'; ", function(err, rows){
        });
    }

});


app.listen(3000);









