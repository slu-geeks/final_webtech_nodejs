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



app.get('/Login', function(req, res){
    sess = req.session;
    var data = req.query["usernames"];
    var data2 = req.query["passwords"];

    if(data && data2){
        sess = req.session;
        connection.query("SELECT * FROM user_account WHERE role_id = '3' and username = '"+data+"' and password = '"+data2+"'; ", function(err, rows, fields) {
            if (err)
                console.log(err);
            else if (rows == '')
                res.render('error');
            else {
                sess.email= data2;
                res.redirect('adminMonitor');
            }
        });
    }else{
        res.render('Login');
    }
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
        connection.query("SELECT request_id, start_servicing, end_servicing, IF(request_status = '01', 'Not Checked', IF((request_status= '02'), 'Checked', IF((request_status = '03'), 'Servicing', IF(request_status = '04', 'Done',1)))) as request_status ,  serv.service_name, concat(home_owner.last_name,', ', home_owner.first_name) as 'HomeOwner', concat(serv_prov.last_name,', ', serv_prov.first_name) AS 'ServiceProvider' " +
            "FROM service_request s INNER JOIN pet_service serv USING(service_id) INNER JOIN user_account AS home_owner USING (account_id) INNER JOIN user_account AS serv_prov ON s.sp_id = serv_prov.account_id " +
            "ORDER BY request_id LIMIT 10;" +

            "SELECT feedback_id, ranking, contacting_phone_number, feedback_messages, checked_description, feedback_date, consideration_date, IF(feedback_status = '01', 'Not Checked', IF((feedback_status = '02'), 'Checked', IF(feedback_status = '03', 'Checked and contact customer',1))) as feedback_status, concat(cust.last_name,', ',cust.first_name) AS 'HomeOwner',  concat(sp.last_name,', ',sp.first_name) AS 'ServiceProvider' " +
            "FROM feedback f INNER JOIN service_request s using(request_id) INNER JOIN user_account sp ON s.sp_id = sp.account_id INNER JOIN user_account cust ON s.account_id = cust.account_id " +
            "ORDER BY feedback_id LIMIT 10;", [1, 2],function(err, rows, fields) {
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
    if(!(data.from)) {

        if (data.Page) {
            connection.query("SELECT request_id, start_servicing, end_servicing, IF(request_status = '01', 'Not Checked', IF((request_status= '02'), 'Checked', IF((request_status = '03'), 'Servicing', IF(request_status = '04', 'Done',1)))) as request_status ,  serv.service_name, concat(home_owner.last_name,', ', home_owner.first_name) as 'HomeOwner', concat(serv_prov.last_name,', ', serv_prov.first_name) AS 'ServiceProvider' " +
                "FROM service_request s INNER JOIN pet_service serv USING(service_id) INNER JOIN user_account AS home_owner USING (account_id) INNER JOIN user_account AS serv_prov ON s.sp_id = serv_prov.account_id " +
                "ORDER BY request_id limit 0, 10;" +

                "SELECT feedback_id, ranking, contacting_phone_number, feedback_messages, checked_description, feedback_date, consideration_date, IF(feedback_status = '01', 'Not Checked', IF((feedback_status = '02'), 'Checked', IF(feedback_status = '03', 'Checked and contact customer',1))) as feedback_status, concat(cust.last_name,', ',cust.first_name) AS 'HomeOwner',  concat(sp.last_name,', ',sp.first_name) AS 'ServiceProvider' " +
                "FROM feedback f INNER JOIN service_request s using(request_id) INNER JOIN user_account sp ON s.sp_id = sp.account_id INNER JOIN user_account cust ON s.account_id = cust.account_id " +
                "ORDER BY feedback_id LIMIT 0, 10;", function (err, rows, fields) {
                if (err)
                    alert("...");
                else {
                    res.render('adminMonitor', {data: rows[0], data2: rows[1], username: user});
                }
            });
        } else if (data.PageUno) {
            connection.query("SELECT request_id, start_servicing, end_servicing, IF(request_status = '01', 'Not Checked', IF((request_status= '02'), 'Checked', IF((request_status = '03'), 'Servicing', IF(request_status = '04', 'Done',1)))) as request_status ,  serv.service_name, concat(home_owner.last_name,', ', home_owner.first_name) as 'HomeOwner', concat(serv_prov.last_name,', ', serv_prov.first_name) AS 'ServiceProvider' " +
                "FROM service_request s INNER JOIN pet_service serv USING(service_id) INNER JOIN user_account AS home_owner USING (account_id) INNER JOIN user_account AS serv_prov ON s.sp_id = serv_prov.account_id " +
                "ORDER BY request_id LIMIT 10, 10;" +

                "SELECT feedback_id, ranking, contacting_phone_number, feedback_messages, checked_description, feedback_date, consideration_date, IF(feedback_status = '01', 'Not Checked', IF((feedback_status = '02'), 'Checked', IF(feedback_status = '03', 'Checked and contact customer',1))) as feedback_status, concat(cust.last_name,', ',cust.first_name) AS 'HomeOwner',  concat(sp.last_name,', ',sp.first_name) AS 'ServiceProvider' " +
                "FROM feedback f INNER JOIN service_request s using(request_id) INNER JOIN user_account sp ON s.sp_id = sp.account_id INNER JOIN user_account cust ON s.account_id = cust.account_id " +
                "ORDER BY feedback_id LIMIT 10, 10;", function (err, rows, fields) {
                if (err)
                    alert("...");
                else {
                    res.render('adminMonitor', {data: rows[0], data2: rows[1], username: user});
                }
            });
        }
        else {
            connection.query("SELECT request_id, start_servicing, end_servicing, IF(request_status = '01', 'Not Checked', IF((request_status= '02'), 'Checked', IF((request_status = '03'), 'Servicing', IF(request_status = '04', 'Done',1)))) as request_status ,  serv.service_name, concat(home_owner.last_name,', ', home_owner.first_name) as 'HomeOwner', concat(serv_prov.last_name,', ', serv_prov.first_name) AS 'ServiceProvider' " +
                "FROM service_request s INNER JOIN pet_service serv USING(service_id) INNER JOIN user_account AS home_owner USING (account_id) INNER JOIN user_account AS serv_prov ON s.sp_id = serv_prov.account_id " +
                "ORDER BY request_id limit 20,10;" +

                "SELECT feedback_id, ranking, contacting_phone_number, feedback_messages, checked_description, feedback_date, consideration_date, IF(feedback_status = '01', 'Not Checked', IF((feedback_status = '02'), 'Checked', IF(feedback_status = '03', 'Checked and contact customer',1))) as feedback_status, concat(cust.last_name,', ',cust.first_name) AS 'HomeOwner',  concat(sp.last_name,', ',sp.first_name) AS 'ServiceProvider' " +
                "FROM feedback f INNER JOIN service_request s using(request_id) INNER JOIN user_account sp ON s.sp_id = sp.account_id INNER JOIN user_account cust ON s.account_id = cust.account_id " +
                "ORDER BY feedback_id LIMIT 20,10;", function (err, rows, fields) {
                if (err)
                    alert("...");
                else {
                    res.render('adminMonitor', {data: rows[0], data2: rows[1], username: user});
                }
            });
        }

    }
    else{
        connection.query("SELECT request_id, start_servicing, end_servicing, IF(request_status = '01', 'Not Checked', IF((request_status= '02'), 'Checked', IF((request_status = '03'), 'Servicing', IF(request_status = '04', 'Done',1)))) as request_status ,  serv.service_name, concat(home_owner.last_name,', ', home_owner.first_name) as 'HomeOwner', concat(serv_prov.last_name,', ', serv_prov.first_name) AS 'ServiceProvider' " +
            "FROM service_request s INNER JOIN pet_service serv USING(service_id) INNER JOIN user_account AS home_owner USING (account_id) INNER JOIN user_account AS serv_prov ON s.sp_id = serv_prov.account_id " +
            "WHERE start_servicing BETWEEN '"+data.from +"' AND '"+data.to+"' " +
            "ORDER BY request_id;" +

            "SELECT feedback_id, ranking, contacting_phone_number, feedback_messages, checked_description, feedback_date, consideration_date, IF(feedback_status = '01', 'Not Checked', IF((feedback_status = '02'), 'Checked', IF(feedback_status = '03', 'Checked and contact customer',1))) as feedback_status, concat(cust.last_name,', ',cust.first_name) AS 'HomeOwner',  concat(sp.last_name,', ',sp.first_name) AS 'ServiceProvider' " +
            "FROM feedback f INNER JOIN service_request s using(request_id) INNER JOIN user_account sp ON s.sp_id = sp.account_id INNER JOIN user_account cust ON s.account_id = cust.account_id " +
            "WHERE feedback_date BETWEEN '"+data.fromF +"' AND '"+data.toF+"' " +
            "ORDER BY feedback_id;", function(err, rows, fields) {
            if (err)
                alert("...");
            else {
                res.render('adminMonitor', {data: rows[0], data2: rows[1], username: user});
            }
        });
    }

});



var row;
var sukat;

app.get('/adminApproval', function(req, res){
    sess = req.session;
    if(sess.email) {
        connection.query("SELECT * from user_account where status = '01';", function (err, rows) {
            if (err)
                console.log(err);
            else {
                res.render('adminApproval', {data: rows});
                sukat = rows.length;
                row = rows;
            }
        });
    }else{
        res.render('error');
    }
});




app.post('/adminApproval',urlencodedParser, function(req, res){
    var data = req.body;
    var arr = data.samplesss;

    for(var i=0; i < arr.length; i++) {
        connection.query("UPDATE user_account SET status = '"+arr[i]+"' WHERE last_name = '"+row[i].last_name+"'; ", function(err, rows){
        });
    }
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



app.listen(3000);
