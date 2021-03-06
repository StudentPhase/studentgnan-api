'use strict';
var statusCodes = require('./StatusCodesController.js');
var database = require('../database_scripts/connection_string.js');
var notificationController = require('./NotificationCodesController.js');
var FCM = require('fcm-push');
var serverKey = 'AAAA6331WSI:APA91bHuCw_YhkcIkk73BLPzHBHvHB7Vih6zGleaxw3P7TpX4jnaI0JCVgBgd-x-1p_3InhvOXi27Ywua91KFOMa9--ySLSHrk84GzQe9ysApi2a3Wx7pEn1PDQAFw_-kj-ftQuPb60y';
var fcm = new FCM(serverKey);

module.exports = {
    getAllNotifications: function(req, res) {
        var result = {};
        var queryString = 'SELECT * FROM Notification';
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
    customNotification: function(req, res) {
        var result = {};
        if (req.body.Title == "" || req.body.Description == "") {
            result.Code = statusCodes.errorCodes[1].Code;
            result.Message = statusCodes.errorCodes[1].Message;
            result.Data = null;
            res.send(result);
            return;
        } else {
            var deviceIds = [];
            var queryString2 = 'SELECT DeviceId FROM Student';
            database.connectionString.query(queryString2, function(err2, rows2) {
                if (!err2) {
                    if (rows2.length != 0) {
                        for (var i = 0; i < rows2.length; i++) {
                            if (rows2[i].DeviceId != 'null') {
                                deviceIds.push(rows2[i].DeviceId);
                            }
                        }
                        var title = req.body.Title;
                        var description = req.body.Description;
                        var message = {
                            registration_ids: deviceIds,
                            notification: {
                                title: title,
                                body: description,
                                sound: "default",
                                color: "#009e60",
                                icon: "fcm_push_icon",
                                click_action: "FCM_PLUGIN_ACTIVITY"
                            },
                            priority: "high"
                        };
                        fcm.send(message, function(error, response) {
                            if (error) {
                                console.log(error);
                                result.Code = statusCodes.successCodes[0].Code;
                                result.Message = statusCodes.successCodes[0].Message;
                                result.Data = null;
                                res.send(result);
                            } else {
                                var queryString3 = 'INSERT INTO Notification(Id, Title, Description, ImageURL, VideoURL, NotificationCode, ArticleId) VALUES (null, "' + req.body.Title + '", "' + req.body.Description + '", null, null, "' + notificationController.notCodes[0] + '", null)';
                                database.connectionString.query(queryString3, function(err3, rows3) {
                                    if (!err3) {
                                        result.Code = statusCodes.successCodes[0].Code;
                                        result.Message = statusCodes.successCodes[0].Message;
                                        result.Data = rows3;
                                        res.send(result);
                                    } else {
                                        res.send(err3);
                                    }
                                });
                            }
                        });
                    } else {
                        result.Code = statusCodes.successCodes[0].Code;
                        result.Message = statusCodes.successCodes[0].Message;
                        result.Data = null;
                        res.send(result);
                    }
                } else {
                    res.send(err2);
                }
            });
        }
    }
};