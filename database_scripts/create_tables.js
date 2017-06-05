var database = require('./connection_string.js');
var connection = database.connectionString;

var entities = [{
    name: "Role",
    attributes: [
        "Id INT NOT NULL",
        "Name VARCHAR(50) NOT NULL",
        "RoleCode VARCHAR(50) NOT NULL PRIMARY KEY",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    ]
}, {
    name: "Package",
    attributes: [
        "Id INT NOT NULL",
        "Name VARCHAR(50) NOT NULL",
        "PackageCode VARCHAR(50) NOT NULL PRIMARY KEY",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    ]
}, {
    name: "State",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "Name VARCHAR(50) NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    ]
}, {
    name: "University",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "Name VARCHAR(50) NOT NULL",
        "StateId INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (StateId) REFERENCES State(Id) ON DELETE CASCADE"
    ]
}, {
    name: "College",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "Name VARCHAR(50) NOT NULL",
        "UniversityId INT NOT NULL",
        "StateId INT NOT NULL",
        "LogoImageURL VARCHAR(100)",
        "Address VARCHAR(500)",
        "PhoneNumber VARCHAR(15)",
        "PackageCode VARCHAR(15) NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (UniversityId) REFERENCES University(Id) ON DELETE CASCADE",
        "FOREIGN KEY (PackageCode) REFERENCES Package(PackageCode) ON DELETE CASCADE",
        "FOREIGN KEY (StateId) REFERENCES State(Id) ON DELETE CASCADE"
    ]
}, {
    name: "User",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "Name VARCHAR(50) NOT NULL",
        "DateOfBirth DATE NOT NULL",
        "Email VARCHAR(50) NOT NULL",
        "PhoneNumber VARCHAR(50) NOT NULL",
        "Address VARCHAR(300) NOT NULL",
        "City VARCHAR(50) NOT NULL",
        "State VARCHAR(50) NOT NULL",
        "Designation VARCHAR(50) NOT NULL",
        "ProfileImageURL VARCHAR(100)",
        "Role VARCHAR(15) NOT NULL",
        "Username VARCHAR(50) NOT NULL",
        "Password VARCHAR(50) NOT NULL",
        "CollegeId INT NOT NULL",
        "DeviceId VARCHAR(200)",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (Role) REFERENCES Role(RoleCode) ON DELETE CASCADE",
        "FOREIGN KEY (CollegeId) REFERENCES College(Id) ON DELETE CASCADE"
    ]
}, {
    name: "UserEducation",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "University VARCHAR(100) NOT NULL",
        "Degree VARCHAR(100) NOT NULL",
        "YearOfPassing VARCHAR(100) NOT NULL",
        "UserId INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (UserId) REFERENCES User(Id) ON DELETE CASCADE"
    ]
}, {
    name: "UserExperience",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "CollegeName VARCHAR(100) NOT NULL",
        "Designation VARCHAR(100) NOT NULL",
        "FromDate DATE NOT NULL",
        "ToDate DATE",
        "UserId INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (UserId) REFERENCES User(Id) ON DELETE CASCADE"
    ]
}, {
    name: "Course",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "Name VARCHAR(50) NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    ]
}, {
    name: "CollegeHasCourse",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "CollegeId INT NOT NULL",
        "CourseId INT NOT NULL",
        "UniversityId INT NOT NULL",
        "StateId INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (CollegeId) REFERENCES College(Id) ON DELETE CASCADE",
        "FOREIGN KEY (CourseId) REFERENCES Course(Id) ON DELETE CASCADE",
        "FOREIGN KEY (UniversityId) REFERENCES University(Id) ON DELETE CASCADE",
        "FOREIGN KEY (StateId) REFERENCES State(Id) ON DELETE CASCADE"
    ]
}, {
    name: "Branch",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "Name VARCHAR(50) NOT NULL",
        "CourseId INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (CourseId) REFERENCES Course(Id) ON DELETE CASCADE"
    ]
}, {
    name: "CollegeHasBranch",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "BranchId INT NOT NULL",
        "CollegeId INT NOT NULL",
        "CourseId INT NOT NULL",
        "UniversityId INT NOT NULL",
        "StateId INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (BranchId) REFERENCES Branch(Id) ON DELETE CASCADE",
        "FOREIGN KEY (CollegeId) REFERENCES College(Id) ON DELETE CASCADE",
        "FOREIGN KEY (CourseId) REFERENCES Course(Id) ON DELETE CASCADE",
        "FOREIGN KEY (UniversityId) REFERENCES University(Id) ON DELETE CASCADE",
        "FOREIGN KEY (StateId) REFERENCES State(Id) ON DELETE CASCADE"
    ]
}, {
    name: "Semester",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "SemesterNumber VARCHAR(50) NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    ]
}, {
    name: "BranchHasSemester",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "BranchId INT NOT NULL",
        "SemesterId INT NOT NULL",
        "CourseId INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (BranchId) REFERENCES Branch(Id) ON DELETE CASCADE",
        "FOREIGN KEY (SemesterId) REFERENCES Semester(Id) ON DELETE CASCADE",
        "FOREIGN KEY (CourseId) REFERENCES Course(Id) ON DELETE CASCADE"
    ]
}, {
    name: "Class",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "Name VARCHAR(50) NOT NULL",
        "BranchId INT NOT NULL",
        "SemesterId INT NOT NULL",
        "CollegeId INT NOT NULL",
        "CourseId INT NOT NULL",
        "UniversityId INT NOT NULL",
        "StateId INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (SemesterId) REFERENCES Semester(Id) ON DELETE CASCADE"
    ]
}, {
    name: "Subject",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "Name VARCHAR(50) NOT NULL",
        "CourseId INT NOT NULL",
        "BranchId INT NOT NULL",
        "SemesterId INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (CourseId) REFERENCES Course(Id) ON DELETE CASCADE",
        "FOREIGN KEY (SemesterId) REFERENCES Semester(Id) ON DELETE CASCADE",
        "FOREIGN KEY (BranchId) REFERENCES Branch(Id) ON DELETE CASCADE"
    ]
}, {
    name: "UserSubject",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "UserId INT NOT NULL",
        "CourseId INT NOT NULL",
        "BranchId INT NOT NULL",
        "SemesterId INT NOT NULL",
        "ClassId INT NOT NULL",
        "SubjectId INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (UserId) REFERENCES User(Id) ON DELETE CASCADE",
        "FOREIGN KEY (CourseId) REFERENCES Course(Id) ON DELETE CASCADE",
        "FOREIGN KEY (BranchId) REFERENCES Branch(Id) ON DELETE CASCADE",
        "FOREIGN KEY (SemesterId) REFERENCES Semester(Id) ON DELETE CASCADE",
        "FOREIGN KEY (ClassId) REFERENCES Class(Id) ON DELETE CASCADE",
        "FOREIGN KEY (SubjectId) REFERENCES Subject(Id) ON DELETE CASCADE"
    ]
}, {
    name: "ClassHasSubject",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "ClassId INT NOT NULL",
        "SubjectId INT NOT NULL",
        "SemesterId INT NOT NULL",
        "BranchId INT NOT NULL",
        "CourseId INT NOT NULL",
        "CollegeId INT NOT NULL",
        "UniversityId INT NOT NULL",
        "StateId INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (ClassId) REFERENCES Class(Id) ON DELETE CASCADE",
        "FOREIGN KEY (SubjectId) REFERENCES Subject(Id) ON DELETE CASCADE",
        "FOREIGN KEY (SemesterId) REFERENCES Semester(Id) ON DELETE CASCADE",
        "FOREIGN KEY (BranchId) REFERENCES Branch(Id) ON DELETE CASCADE",
        "FOREIGN KEY (CourseId) REFERENCES Course(Id) ON DELETE CASCADE",
        "FOREIGN KEY (CollegeId) REFERENCES College(Id) ON DELETE CASCADE",
        "FOREIGN KEY (UniversityId) REFERENCES University(Id) ON DELETE CASCADE",
        "FOREIGN KEY (StateId) REFERENCES State(Id) ON DELETE CASCADE"
    ]
}, {
    name: "Gender",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "Name VARCHAR(10) NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    ]
}, {
    name: "Admission",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "CollegeId INT NOT NULL",
        "Name VARCHAR(100) NOT NULL",
        "GenderId INT NOT NULL",
        "DateOfBirth DATETIME NOT NULL",
        "FatherName VARCHAR(100)",
        "MotherName VARCHAR(100)",
        "PhoneNumber VARCHAR(15)",
        "Address VARCHAR(500)",
        "Email VARCHAR(100)",
        "FatherOccupation VARCHAR(50)",
        "MotherOccupation VARCHAR(50)",
        "FatherPhoneNumber VARCHAR(15)",
        "MotherPhoneNumber VARCHAR(15)",
        "FatherDeviceId VARCHAR(200)",
        "MotherDeviceId VARCHAR(200)",
        "TotalFees VARCHAR(8)",
        "Remarks VARCHAR(200)",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (CollegeId) REFERENCES College(Id) ON DELETE CASCADE",
        "FOREIGN KEY (GenderId) REFERENCES Gender(Id) ON DELETE CASCADE",
    ]
}, {
    name: "Payment",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "AdmissionId INT NOT NULL",
        "PaymentMode VARCHAR(25) NOT NULL",
        "FeesPaid INT NOT NULL",
        "PaymentModeNumber VARCHAR(50)",
        "PaymentDate DATETIME NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (AdmissionId) REFERENCES Admission(Id) ON DELETE CASCADE"
    ]
}, {
    name: "Student",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "Name VARCHAR(100) NOT NULL",
        "PhoneNumber VARCHAR(50)",
        "IdCardImageURL VARCHAR(100)",
        "IdCardImagePublicId VARCHAR(50)",
        "FindInboxId VARCHAR(50) NOT NULL",
        "Password VARCHAR(50)",
        "CollegeId INT NOT NULL",
        "CourseId INT NOT NULL",
        "BranchId INT NOT NULL",
        "SemesterId INT NOT NULL",
        "ClassId INT NOT NULL",
        "Status INT NOT NULL DEFAULT 1",
        "AdmissionId INT NOT NULL",        
        "DeviceId VARCHAR(200)",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (CollegeId) REFERENCES College(Id) ON DELETE CASCADE",
        "FOREIGN KEY (CourseId) REFERENCES Course(Id) ON DELETE CASCADE",
        "FOREIGN KEY (BranchId) REFERENCES Branch(Id) ON DELETE CASCADE",
        "FOREIGN KEY (SemesterId) REFERENCES Semester(Id) ON DELETE CASCADE",
        "FOREIGN KEY (ClassId) REFERENCES Class(Id) ON DELETE CASCADE",
        "FOREIGN KEY (AdmissionId) REFERENCES Admission(Id) ON DELETE CASCADE"
    ]
}, {
    name: "Chapter",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "Name VARCHAR(100) NOT NULL",
        "SubjectId INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (SubjectId) REFERENCES Subject(Id) ON DELETE CASCADE"
    ]
}, {
    name: "Topic",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "Name VARCHAR(500) NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    ]
}, {
    name: "ChapterHasTopic",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "ChapterId INT NOT NULL",
        "TopicId INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (ChapterId) REFERENCES Chapter(Id) ON DELETE CASCADE",
        "FOREIGN KEY (TopicId) REFERENCES Topic(Id) ON DELETE CASCADE"
    ]
}, {
    name: "Attendance",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "AttendanceDate DATETIME NOT NULL",
        "IsPresent VARCHAR(10) NOT NULL",
        "TakenBy INT NOT NULL",
        "ClassId INT NOT NULL",
        "StudentId INT NOT NULL",
        "SubjectId INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (TakenBy) REFERENCES User(Id) ON DELETE CASCADE",
        "FOREIGN KEY (StudentId) REFERENCES Student(Id) ON DELETE CASCADE",
        "FOREIGN KEY (SubjectId) REFERENCES Subject(Id) ON DELETE CASCADE",
        "FOREIGN KEY (ClassId) REFERENCES Class(Id) ON DELETE CASCADE"
    ]
}, {
    name: "TopicsTaught",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "ChapterId INT NOT NULL",
        "TopicId INT NOT NULL",
        "ClassId INT NOT NULL",
        "SubjectId INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (ClassId) REFERENCES Class(Id) ON DELETE CASCADE",
        "FOREIGN KEY (SubjectId) REFERENCES Subject(Id) ON DELETE CASCADE",
        "FOREIGN KEY (ChapterId) REFERENCES Chapter(Id) ON DELETE CASCADE",
        "FOREIGN KEY (TopicId) REFERENCES Topic(Id) ON DELETE CASCADE"
    ]
}, {
    name: "Assignment",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "Name VARCHAR(50) NOT NULL",
        "Description VARCHAR(200) NOT NULL",
        "VideoURL VARCHAR(100)",
        "SubjectId INT NOT NULL",
        "ClassId INT NOT NULL",
        "GivenBy INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (SubjectId) REFERENCES Subject(Id) ON DELETE CASCADE",
        "FOREIGN KEY (ClassId) REFERENCES Class(Id) ON DELETE CASCADE",
        "FOREIGN KEY (GivenBy) REFERENCES User(Id) ON DELETE CASCADE"
    ]
}, {
    name: "AssignmentImage",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "AssignmentId INT NOT NULL",
        "ImageURL VARCHAR(100) NOT NULL",
        "PublicId VARCHAR(50) NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (AssignmentId) REFERENCES Assignment(Id) ON DELETE CASCADE"
    ]
}, {
    name: "StudentWritesAssignment",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "StudentId INT NOT NULL",
        "AssignmentId INT NOT NULL",
        "DateSubmitted DATETIME NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (AssignmentId) REFERENCES Assignment(Id) ON DELETE CASCADE",
        "FOREIGN KEY (StudentId) REFERENCES Student(Id) ON DELETE CASCADE"
    ]
}, {
    name: "AssignmentSubmittedImage",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "SubmittedAssignmentId INT NOT NULL",
        "ImageURL VARCHAR(100) NOT NULL",
        "PublicId VARCHAR(50) NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (SubmittedAssignmentId) REFERENCES StudentWritesAssignment(Id) ON DELETE CASCADE"
    ]
}, {
    name: "Test",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "Name VARCHAR(50) NOT NULL",
        "TestDate DATETIME",
        "MaxMarks VARCHAR(50) NOT NULL",
        "SubjectId INT NOT NULL",
        "ClassId INT NOT NULL",
        "GivenBy INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (SubjectId) REFERENCES Subject(Id) ON DELETE CASCADE",
        "FOREIGN KEY (ClassId) REFERENCES Class(Id) ON DELETE CASCADE",
        "FOREIGN KEY (GivenBy) REFERENCES User(Id) ON DELETE CASCADE"
    ]
}, {
    name: "StudentWritesTest",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "StudentId INT NOT NULL",
        "TestId INT NOT NULL",
        "MarksObtained VARCHAR(5) NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (TestId) REFERENCES Test(Id) ON DELETE CASCADE",
        "FOREIGN KEY (StudentId) REFERENCES Student(Id) ON DELETE CASCADE"
    ]
}, {
    name: "Event",
    attributes: [
        "Id Int NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "Name VARCHAR(50) NOT NULL",
        "Description VARCHAR(200) NOT NULL",
        "VideoURL VARCHAR(100)",
        "EventDate DATETIME NOT NULL",
        "CreatedBy INT NOT NULL",
        "CollegeId INT NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (CreatedBy) REFERENCES User(Id) ON DELETE CASCADE",
        "FOREIGN KEY (CollegeId) REFERENCES College(Id) ON DELETE CASCADE"
    ]
}, {
    name: "EventImage",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "EventId INT NOT NULL",
        "ImageURL VARCHAR(100) NOT NULL",
        "PublicId VARCHAR(50) NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (EventId) REFERENCES Event(Id) ON DELETE CASCADE"
    ]
}, {
    name: "PersonalMessage",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "StudentId INT NOT NULL",
        "UserId INT",
        "Message VARCHAR(500) NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (StudentId) REFERENCES Student(Id) ON DELETE CASCADE",
        "FOREIGN KEY (UserId) REFERENCES User(Id) ON DELETE CASCADE"
    ]
}, {
    name: "Enquiry",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "CollegeId INT NOT NULL",
        "Name VARCHAR(100) NOT NULL",
        "GenderId INT NOT NULL",
        "BranchId INT NOT NULL",
        "CourseId INT NOT NULL",
        "DateOfBirth DATETIME NOT NULL",
        "FatherName VARCHAR(100)",
        "MotherName VARCHAR(100)",
        "PhoneNumber VARCHAR(15) NOT NULL",
        "Address VARCHAR(500)",
        "Email VARCHAR(100)",
        "Source VARCHAR(100)",
        "EnquirySession VARCHAR(50) NOT NULL",
        "FatherOccupation VARCHAR(50)",
        "MotherOccupation VARCHAR(50)",
        "LikelyToJoin Varchar(6)",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (CollegeId) REFERENCES College(Id) ON DELETE CASCADE",
        "FOREIGN KEY (GenderId) REFERENCES Gender(Id) ON DELETE CASCADE",
        "FOREIGN KEY (BranchId) REFERENCES Branch(Id) ON DELETE CASCADE",
        "FOREIGN KEY (CourseId) REFERENCES Course(Id) ON DELETE CASCADE"
    ]
}, {
    name: "Expenses",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "CollegeId INT NOT NULL",
        "Amount INT NOT NULL",
        "Particulars VARCHAR(100) NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (CollegeId) REFERENCES College(Id) ON DELETE CASCADE"
    ]
}, {
    name: "Calendar",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "CollegeId INT NOT NULL",
        "EventStartDate DATE NOT NULL",
        "EventEndDate DATE NOT NULL",
        "EventName VARCHAR(100) NOT NULL",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (CollegeId) REFERENCES College(Id) ON DELETE CASCADE"
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
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    ]
}, {
    name: "NotificationLedger",
    attributes: [
        "Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY",
        "NotificationId INT NOT NULL",
        "StudentId INT",
        "UserId INT",
        "ArticleId INT",
        "CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        "UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        "FOREIGN KEY (NotificationId) REFERENCES Notification(Id) ON DELETE CASCADE",
        "FOREIGN KEY (StudentId) REFERENCES Student(Id) ON DELETE CASCADE",
        "FOREIGN KEY (UserId) REFERENCES User(Id) ON DELETE CASCADE"
    ]
}];

function addData() {
    var data = [
        //Roles
        'INSERT INTO Role(Id, Name, RoleCode) VALUES (1,"Admin", "ADMIN")',
        'INSERT INTO Role(Id, Name, RoleCode) VALUES (2,"Faculty", "FACULTY")',
        'INSERT INTO Role(Id, Name, RoleCode) VALUES (3,"Staff", "STAFF")',
        'INSERT INTO Role(Id, Name, RoleCode) VALUES (4,"Super Admin", "SUPERADMIN")',
        //Packages
        'INSERT INTO Package(Id, Name, PackageCode) VALUES (1,"Basic", "BASIC")',
        'INSERT INTO Package(Id, Name, PackageCode) VALUES (2,"Extended", "EXTENDED")',
        'INSERT INTO Package(Id, Name, PackageCode) VALUES (2,"Little Millennium", "LM")',
        //Genders
        'INSERT INTO Gender(Id, Name) VALUES (1, "Male")',
        'INSERT INTO Gender(Id, Name) VALUES (2, "Female")',
        //Semesters
        'INSERT INTO Semester(Id, SemesterNumber) VALUES(1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,"1 - Little Millennium"),(10,"1 - School"),(11,"PUC")',
        //FindInbox Data
        'INSERT INTO State(Id, Name) VALUES (1,"Karnataka")',
        'INSERT INTO University(Id, Name, StateId) VALUES (1, "FI University", 1)',
        'INSERT INTO College(Id, Name, UniversityId, StateId, PackageCode) VALUES (1, "FI College", 1, 1, "BASIC")',
        'INSERT INTO User(Id, Name, DateOfBirth, Email, PhoneNumber, Address, City, State, Designation, ProfileImageURL, Role, Username, Password, CollegeId) VALUES (NULL, "Abhijith Jain N", "1990-07-02", "abhijithjain@findinbox.com", "9591241474", "#", "#", "#", "CEO", "http://placehold.it/50x100", "SUPERADMIN", "abhijithjain@findinbox.com", "sonyMt15i", 1)',
        'INSERT INTO User(Id, Name, DateOfBirth, Email, PhoneNumber, Address, City, State, Designation, ProfileImageURL, Role, Username, Password, CollegeId) VALUES (NULL, "Ajith Simha T N", "1990-08-06", "ajithsimha@findinbox.com", "9739241152", "#", "#", "#", "CTO", "http://placehold.it/50x100", "SUPERADMIN", "ajithsimha@findinbox.com", "aJiTh!@#", 1)',
    ];
    connection.query(data.join("; "), function (err, results) {
        if (err) throw err;
        console.log('==========Data setup is completed==========');
        connection.end();
    });
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