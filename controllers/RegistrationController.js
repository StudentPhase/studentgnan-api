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
    getAllRegistrations: function (req, res) {
        var result = {};
        var queryString = 'SELECT * from Student';
        database.connectionString.query(queryString, function (err, rows) {
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
    addStudent: function (req, res) {
        var result = {};
        if (req.body.Name == "") {
            result.Code = statusCodes.errorCodes[1].Code;
            result.Message = statusCodes.errorCodes[1].Message;
            result.Data = null;
            res.send(result);
            return;
        } else {
            var images = [];
            images.push(req.body.PictureURL);
            images.push(req.body.PassportImageURL);
            images.push(req.body.VisaImageURL);
            images.push(req.body.RegionalPermitImageURL);
            req.body.PictureURL = "";
            req.body.PassportImageURL = "";
            req.body.VisaImageURL = "";
            req.body.RegionalPermitImageURL = "";
            var count = 0;
            asyncLoop(images, function (item, next) {
                cloudinary.uploader.upload(item, function (success) {
                    if (count == 0) {
                        req.body.PictureURL = success.url;
                        req.body.PicturePublicId = success.public_id;
                    } else if (count == 1) {
                        req.body.PassportImageURL = success.url;
                        req.body.PassportPublicId = success.public_id;
                    } else if (count == 2) {
                        req.body.VisaImageURL = success.url;
                        req.body.VisaPublicId = success.public_id;
                    } else {
                        req.body.RegionalPermitImageURL = success.url;
                        req.body.RPPublicId = success.public_id;

                        req.body.StudentGnanId = module.exports.getUniqueId();

                        var queryString = 'INSERT INTO Student SET ?';
                        database.connectionString.query(queryString, req.body, function (err, rows) {
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
                    count++;
                });
                next();
            }, function (err) {
                if (err) {
                    res.send(err);
                    return;
                }
            });
        }
    },
    getUniqueId: function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (var i = 0; i < 6; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    },
};