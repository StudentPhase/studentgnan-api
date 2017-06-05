var database = require('./connection_string.js');
var connection = database.connectionString;

var entities = [{
    name: "Student",
    attributes: [
        "Id INT NOT NULL",
        "Name VARCHAR(50) NOT NULL",
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
    connection.query(createStatements.join("; "), function (err, results) {
        if (err) throw err;
        addData();
    });
};

createTables();