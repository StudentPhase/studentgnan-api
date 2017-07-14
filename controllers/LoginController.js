'use strict';
var statusCodes = require('./StatusCodesController.js');
var database = require('../database_scripts/connection_string.js');
var jwt = require('jsonwebtoken');

module.exports = {
    loginStudent: function(req, res) {
        var result = {};
        var queryString = 'SELECT * FROM Student WHERE Student.PhoneNumber = "' + req.body.PhoneNumber + '" AND Student.Password = "' + req.body.Password + '"';
        database.connectionString.query(queryString, function(err, rows) {
            if (!err) {
                if (rows.length == 0) {
                    result.Code = statusCodes.errorCodes[2].Code;
                    result.Message = statusCodes.errorCodes[2].Message;
                    result.Data = null;
                    res.send(result);
                } else {
                    if (process.env.AND_STUDENT_APP_VERSION == req.body.AppVersion) {
                        var queries = [];
                        for (var i = 0; i < rows.length; i++) {
                            var query = 'UPDATE Student SET DeviceId = "' + req.body.DeviceId + '" WHERE Id = ' + rows[i].Id;
                            queries.push(query);
                        }
                        database.connectionString.query(queries.join("; "), function(err2, rows2) {
                            if (!err2) {
                                var token = jwt.sign(req.body, process.env.SECRET_KEY, {
                                    expiresIn: 100000
                                });
                                result.Code = statusCodes.successCodes[0].Code;
                                result.Message = statusCodes.successCodes[0].Message;
                                var response = rows;
                                for (var i = 0; i < response.length; i++) {
                                    response[i].Token = token;
                                }
                                result.Data = response;
                                res.send(result);
                            } else {
                                res.send(err2);
                            }
                        });
                    } else {
                        result.Code = statusCodes.errorCodes[3].Code;
                        result.Message = statusCodes.errorCodes[3].Message;
                        result.Data = null;
                        res.send(result);
                    }
                }
            } else {
                res.send(err);
            }
        });
    }
};