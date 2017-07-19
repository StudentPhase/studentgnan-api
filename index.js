'use strict';

//require statements
var express = require('express');
var app = express();
var authenticatedRoutes = express.Router();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');

//settings
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/secure', authenticatedRoutes);

//Token Generation
authenticatedRoutes.use(function(req, res, next) {
    var token = req.body.token || req.headers['authorization'];
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function(err, decode) {
            if (err) {
                res.status(500).send("Invalid token");
            } else {
                next();
            }
        })
    } else {
        res.send("Please send token")
    }
});

//App Secret
process.env.SECRET_KEY = 'studentgnan';

//App Version
process.env.AND_STUDENT_APP_VERSION = "1.0.0";

//controller definitions
var registrationController = require('./controllers/RegistrationController.js');
var loginController = require('./controllers/LoginController.js');
var emergencyContactController = require('./controllers/EmergencyContactController.js');
var categoryController = require('./controllers/CategoryController.js');
var offerController = require('./controllers/OfferController.js');

//non-secured routes
app.get('/', function(req, res) {
    res.send('StudentGnan, serving since 2017!!');
});

//API routes
app.post('/student', registrationController.addStudent);
app.post('/studentLogin', loginController.loginStudent);

//Authenticated Routes
authenticatedRoutes.route('/student')
    .get(registrationController.getAllRegistrations);

authenticatedRoutes.route('/emergencyContact')
    .get(emergencyContactController.getAllEmergencyContacts)
    .post(emergencyContactController.addEmergencyContact);

authenticatedRoutes.route('/category')
    .get(categoryController.getAllCategories);

authenticatedRoutes.route('/offer')
    .get(offerController.getAllOffers)
    .post(offerController.addOffer);

//server start
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('Node server started on port: ' + port);
});