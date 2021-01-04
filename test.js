var mysql = require('mysql');

var con = mysql.createConnection('mysql://root:root@localhost:8889/db');


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
