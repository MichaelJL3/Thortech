
/**
 * @file connect.js
 * @author Michael Laucella
 * @desc establishes a promisified mysql connection
 */

const bluebird = require('bluebird');
const mysql = require('mysql');

//grab the sql config
const SQLConfig = require('../configs/config').SQL;

//promisify the connection
const connection = bluebird.promisifyAll(
    mysql.createConnection(SQLConfig));

//check for connection success
connection.connect((err)=>{
    if(err) console.log(err);
    else console.log("Connection to DB successful");
});

module.exports=connection;