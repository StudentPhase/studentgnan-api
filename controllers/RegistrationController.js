'use strict';
var statusCodes = require('./StatusCodesController.js');
var database = require('../database_scripts/connection_string.js');
var asyncLoop = require('node-async-loop');
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'studentphase',
    api_key: '873535484124748',
    api_secret: 'Qd_O1-gQ8B8SPagPT9u-yUm_Gqg'
});

module.exports = {
    getAllRegistrations: function(req, res) {
        var result = {};
        var queryString = 'SELECT * from Student';
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
    addStudent: function(req, res) {
        var result = {};
        if (req.body.Name == "") {
            result.Code = statusCodes.errorCodes[1].Code;
            result.Message = statusCodes.errorCodes[1].Message;
            result.Data = null;
            res.send(result);
            return;
        } else {
            cloudinary.uploader.upload(req.body.PassportImageBytes, function(success) {
                delete req.body.PassportImageBytes;
                req.body.PassportImageUrl = success.url;
                req.body.PassportPublicId = success.public_id;
                req.body.StudentGnanId = module.exports.getUniqueId();
                req.body.Role = "STUDENT";
                var queryString = 'INSERT INTO Student SET ?';
                database.connectionString.query(queryString, req.body, function(err, rows) {
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
            });
        }
    },
    getUniqueId: function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (var i = 0; i < 6; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    },
};