var database = require('./connection_string.js');
var connection = database.connectionString;

var entities = [{
    name: "Student",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "Name VARCHAR(200) NOT NULL",
        "Role VARCHAR(20)",
        "PhoneNumber VARCHAR(15)",
        "DateOfBirth Date",
        "College VARCHAR(100)",
        "Course VARCHAR(100)",
        "PassportNumber VARCHAR(10)",
        "PassportImageURL VARCHAR(200)",
        "PassportPublicId VARCHAR(100)",
        "PictureURL VARCHAR(200)",
        "PicturePublicId VARCHAR(100)",
        "StudentGnanId VARCHAR(10)",
        "Password VARCHAR(50)",
        "DeviceId VARCHAR(200)",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    ]
}, {
    name: "Category",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "Name VARCHAR(200) NOT NULL",
        "LogoURL VARCHAR(200)",
        "LogoPublicId VARCHAR(50)",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    ]
}, {
    name: "EmergencyContact",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "Name VARCHAR(200) NOT NULL",
        "PhoneNumber VARCHAR(15)",
        "Address VARCHAR(100)",
        "Area VARCHAR(50)",
        "CategoryId INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (CategoryId) REFERENCES Category(Id) ON DELETE CASCADE"
    ]
}, {
    name: "Offer",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "OfferCode VARCHAR(30) NOT NULL",
        "Title VARCHAR(200) NOT NULL",
        "Description VARCHAR(1000) NOT NULL",
        "ImageURL VARCHAR(300)",
        "ImagePublicId VARCHAR(50)",
        "VideoURL VARCHAR(100)",
        "PhoneNumber VARCHAR(15)",
        "Website VARCHAR(50)",
        "Address VARCHAR(100)",
        "CategoryId INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (CategoryId) REFERENCES Category(Id) ON DELETE CASCADE"
    ]
}, {
    name: "Notification",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "Title VARCHAR(100) NOT NULL",
        "Description VARCHAR(500) NOT NULL",
        "ImageURL VARCHAR(100)",
        "VideoURL VARCHAR(100)",
        "NotificationCode VARCHAR(10)",
        "ArticleId VARCHAR(10)",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    ]
}];

function addData() {
    console.log('==========Data setup is completed==========');
    connection.end();
};

function createTables() {
    connection.connect();
    var createStatements = [];
    for (var i = 0; i < entities.length; i++) {
        var stmt = "CREATE TABLE IF NOT EXISTS " + entities[i].name + "(" + entities[i].attributes.join(", ") + ")ENGINE=INNODB";
        createStatements.push(stmt);
    }
    connection.query(createStatements.join("; "), function(err, results) {
        if (err) throw err;
        addData();
    });
};

createTables();