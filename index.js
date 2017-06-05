'use strict';

//require statements
var express = require('express');
var app = express();
var authenticatedRoutes = express.Router();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var jwt = require('jsonwebtoken');

//non-secured routes
app.get('/', function (req, res) {
    res.send('StudentGnan, serving since 2017!!');
});

//server start
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Node server started on port: ' + port);
});