'use strict';
var statusCodes = require('./StatusCodesController.js');
var database = require('../database_scripts/connection_string.js');
var FCM = require('fcm-push');
var serverKey = 'AAAA6331WSI:APA91bHuCw_YhkcIkk73BLPzHBHvHB7Vih6zGleaxw3P7TpX4jnaI0JCVgBgd-x-1p_3InhvOXi27Ywua91KFOMa9--ySLSHrk84GzQe9ysApi2a3Wx7pEn1PDQAFw_-kj-ftQuPb60y';
var fcm = new FCM(serverKey);

module.exports = {
    getAllStudents: function(req, res) {
        var result = {};
        var queryString = 'SELECT * from Student WHERE Role = "STUDENT"';
        database.connectionString.query(queryString, function(err, rows) {
            if (!err) {
                if (rows.length == 0) {
                    result.Code = statusCodes.errorCodes[0].Code;
                    result.Message = statusCodes.errorCodes[0].Message;
                    result.Data = null;
                } else {
                    result.Code = statusCodes.successCodes[0].Code;
                    result.Message = statusCodes.successCodes[0].Message;
                    result.Data = rows;
                }
                res.send(result);
            } else {
                res.send(err);
            }
        });
    },
    getStudentById: function(req, res) {
        var result = {};
        var queryString = 'SELECT * from Student WHERE Id = ' + req.params.StudentId;
        database.connectionString.query(queryString, function(err, rows) {
            if (!err) {
                if (rows.length == 0) {
                    result.Code = statusCodes.errorCodes[0].Code;
                    result.Message = statusCodes.errorCodes[0].Message;
                    result.Data = null;
                } else {
                    result.Code = statusCodes.successCodes[0].Code;
                    result.Message = statusCodes.successCodes[0].Message;
                    result.Data = rows;
                }
                res.send(result);
            } else {
                res.send(err);
            }
        });
    }
};