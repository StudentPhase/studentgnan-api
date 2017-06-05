'use strict';
var mysql = require('mysql');

//local
// module.exports.connectionString = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'sg-dev',
//     multipleStatements: true
// });

//dev
module.exports.connectionString = mysql.createConnection({
    host: 'd6vscs19jtah8iwb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'vx5xs7b1ypl0wr5c',
    password: 'n7g0su30lxlzyqco',
    database: 'jg1a6uswqriozle4',
    multipleStatements: true
});

//staging

//prod
// module.exports.connectionString = mysql.createConnection({
//     host: 'd6vscs19jtah8iwb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//     user: 'kst9anlfs1a6990y',
//     password: 'f1a4roh5p99zdaxx',
//     database: 'sckr1eyim57sm24l',
//     multipleStatements: true
// });