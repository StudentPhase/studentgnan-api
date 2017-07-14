'use strict';

//require statements
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');

//settings
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//App Version
process.env.AND_STUDENT_APP_VERSION = "1.0.0";

//controller definitions
var registrationController = require('./controllers/RegistrationController.js');
var loginController = require('./controllers/LoginController.js');

//non-secured routes
app.get('/', function(req, res) {
    res.send('StudentGnan, serving since 2017!!');
});

//API routes
app.get('/student', registrationController.getAllRegistrations);
app.post('/student', registrationController.addStudent);

//server start
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('Node server started on port: ' + port);
});