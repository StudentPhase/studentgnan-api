'use strict';
var statusCodes = require('./StatusCodesController.js');
var database = require('../database_scripts/connection_string.js');
var notificationController = require('./NotificationCodesController.js');
var FCM = require('fcm-push');
var serverKey = 'AAAA6331WSI:APA91bHuCw_YhkcIkk73BLPzHBHvHB7Vih6zGleaxw3P7TpX4jnaI0JCVgBgd-x-1p_3InhvOXi27Ywua91KFOMa9--ySLSHrk84GzQe9ysApi2a3Wx7pEn1PDQAFw_-kj-ftQuPb60y';
var fcm = new FCM(serverKey);
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'studentphase',
    api_key: '873535484124748',
    api_secret: 'Qd_O1-gQ8B8SPagPT9u-yUm_Gqg'
});

module.exports = {
    getAllAvailableOffers: function(req, res) {
        var result = {};
        var queryString = 'SELECT * from Offer';
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
    getAllOffers: function(req, res) {
        var result = {};
        var queryString = 'SELECT * from Offer WHERE CategoryId = ' + req.params.CategoryId;
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
    addOffer: function(req, res) {
        var result = {};
        if (req.body.Name == "") {
            result.Code = statusCodes.errorCodes[1].Code;
            result.Message = statusCodes.errorCodes[1].Message;
            result.Data = null;
            res.send(result);
            return;
        } else {
            cloudinary.uploader.upload(req.body.ImageBytes, function(success) {
                delete req.body.ImageBytes;
                req.body.ImageURL = success.url;
                req.body.ImagePublicId = success.public_id;
                var queryString = 'INSERT INTO Offer SET ?';
                database.connectionString.query(queryString, req.body, function(err, rows) {
                    if (!err) {
                        if (rows.length == 0) {
                            result.Code = statusCodes.errorCodes[0].Code;
                            result.Message = statusCodes.errorCodes[0].Message;
                            result.Data = null;
                            res.send(result);
                        } else {
                            var deviceIds = [];
                            var queryString2 = 'SELECT DeviceId FROM Student';
                            database.connectionString.query(queryString2, function(err2, rows2) {
                                if (!err2) {
                                    if (rows2.length != 0) {
                                        for (var i = 0; i < rows2.length; i++) {
                                            if (rows2[i].DeviceId != null || rows2[i].DeviceId != 'null') {
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
                                            data: { //you can send only notification or only data(or include both)
                                                OfferId: rows.insertId
                                            },
                                            priority: "high"
                                        };
                                        fcm.send(message, function(error, response) {
                                            if (error) {
                                                result.Code = statusCodes.successCodes[0].Code;
                                                result.Message = statusCodes.successCodes[0].Message;
                                                result.Data = rows;
                                                res.send(result);
                                            } else {
                                                var queryString3 = 'INSERT INTO Notification(Id, Title, Description, ImageURL, VideoURL, NotificationCode, ArticleId) VALUES (null, "' + req.body.Title + '", "' + req.body.Description + '", "' + req.body.ImageURL + '", "' + req.body.VideoURL + '", "' + notificationController.notCodes[1] + '", ' + rows.insertId + ')';
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
                                        result.Data = rows;
                                        res.send(result);
                                    }
                                } else {
                                    res.send(err2);
                                }
                            });
                        }
                    } else {
                        res.send(err);
                    }
                });
            });
        }
    },
    sendOfferNotification: function(req, res) {
        var result = {};
        if (req.body.Id == "") {
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
                            if (rows2[i].DeviceId != null || rows2[i].DeviceId != 'null') {
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
                            data: { //you can send only notification or only data(or include both)
                                Id: req.body.Id
                            },
                            priority: "high"
                        };
                        fcm.send(message, function(error, response) {
                            if (error) {
                                result.Code = statusCodes.successCodes[0].Code;
                                result.Message = statusCodes.successCodes[0].Message;
                                result.Data = rows2;
                                res.send(result);
                            } else {
                                var queryString3 = 'INSERT INTO Notification(Id, Title, Description, ImageURL, VideoURL, NotificationCode, ArticleId) VALUES (null, "' + req.body.Title + '", "' + req.body.Description + '", "' + req.body.ImageURL + '", "' + req.body.VideoURL + '", "' + notificationController.notCodes[1] + '", ' + req.body.Id + ')';
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
                        result.Data = rows2;
                        res.send(result);
                    }
                } else {
                    res.send(err2);
                }
            });
        }
    },
    deleteOffer: function(req, res) {
        var result = {};
        var queryString = 'DELETE from Offer WHERE Id = ' + req.body.Id;
        database.connectionString.query(queryString, function(err, rows) {
            if (!err) {
                var queryString2 = 'DELETE from Notification WHERE ArticleId = ' + req.body.Id;
                database.connectionString.query(queryString2, function(err2, rows2) {
                    if (!err2) {
                        result.Code = statusCodes.successCodes[0].Code;
                        result.Message = statusCodes.successCodes[0].Message;
                        result.Data = rows;
                        res.send(result);
                    } else {
                        res.send(err2);
                    }
                });
            } else {
                res.send(err);
            }
        });
    }
};