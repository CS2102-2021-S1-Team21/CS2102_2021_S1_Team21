CREATE TABLE PCS_Administrator(
    email VARCHAR PRIMARY KEY,
    passwordDigest VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    deletedAt DATETIME,
)


CREATE TABLE Caretaker(
    email VARCHAR PRIMARY KEY,
    passwordDigest VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    deletedAt DATETIME,
    bio VARCHAR,
    phoneNumber INTEGER NOT NULL,
    address VARCHAR NOT NULL,
    postalCode VARCHAR NOT NULL,
    totalAverageRating INTEGER
)

CREATE TABLE Full_Time_Employee(
    email VARCHAR PRIMARY KEY REFERENCES Caretaker(email) ON DELETE CASCADE,
)

CREATE TABLE Part_Time_Employee(
    email VARCHAR PRIMARY KEY REFERENCES Caretaker(email) ON DELETE CASCADE,
)

/*
CREATE TABLE Full_Time_Employee(
    email VARCHAR PRIMARY KEY,
    passwordDigest VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    deletedAt DATETIME,
    bio VARCHAR,
    phoneNumber INTEGER NOT NULL,
    address VARCHAR NOT NULL,
    postalCode VARCHAR NOT NULL,
    totalAverageRating INTEGER
)

CREATE TABLE Part_Time_Employee(
    email VARCHAR PRIMARY KEY,
    passwordDigest VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    deletedAt DATETIME,
    bio VARCHAR,
    phoneNumber INTEGER NOT NULL,
    address VARCHAR NOT NULL,
    postalCode VARCHAR NOT NULL,
    totalAverageRating INTEGER
)
*/
CREATE TABLE Pet_Owner(
    email VARCHAR PRIMARY KEY,
    passwordDigest VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    deletedAt DATETIME,
    bio VARCHAR,
    phoneNumber INTEGER NOT NULL,
    address VARCHAR NOT NULL,
    postalCode VARCHAR NOT NULL,
)

CREATE TABLE Owns_Pets(
    email VARCHAR REFERENCES Pet_Owner(email) ON DELETE CASCADE,
    name VARCHAR,
    yearOfBirth YEAR,
    breed VARCHAR,
    deletedAt DATETIME,
    gender VARCHAR(1),
    PRIMARY KEY(email, name)
)

CREATE TABLE Credit_Card(
    number INTEGER PRIMARY KEY,
    name VARCHAR NOT NULL,
    expiryDate INTEGER NOT NULL,
    cvvCode INTEGER NOT NULL
)


/* check if this satisfy key constraints and total participation constraint */


CREATE TABLE Register(
    number INTEGER REFERENCES Credit_Card(number),
    email VARCAHR REFERENCES Pet_Owner(email),
    PRIMARY KEY(number, email)
)

CREATE TABLE Requires_Requirements(
    requirementType VARCHAR,
    description VARCAHR NOT NULL,
    name VARCHAR REFERENCES Pet(name) ON DELETE CASCADE,
    email VARCHAR REFERENCES Pet_Owner(email) ON DELETE CASCADE,
    PRIMARY KEY(requirementType, name, email)
)

CREATE TABLE Belongs_To(
    name VARCHAR REFERENCES Pet(name),
    categoryName VARCHAR REFERENCES Pet_Category(categoryName),
    PRIMARY KEY(name, categoryName)
)

CREATE TABLE Pet_Category(
    categoryName VARCHAR PRIMARY KEY
)

CREATE TABLE Service_Type(
    name VARCHAR PRIMARY KEY,
    description VARCHAR
)

CREATE TABLE Services(
    name VARCHAR REFERENCES Service_Type(name),
    categoryName VARCHAR REFERENCES Pet_Category(categoryName),
    dailyPrice DECIMAL(10,2),
    PRIMARY KEY(name, categoryName)
)

CREATE TABLE Provides(
    name VARCHAR REFERENCES Service_Type(name),
    categoryName VARCHAR REFERENCES Pet_Category(categoryName),
    email VARCHAR REFERENCES Caretaker(email),
    PRIMARY KEY(name, categoryName, email)
)
/*
'''
2 provides table. as no "Caretaker" table due to covering constriants
therefore can only reference FK from PT_employee and FT_employee separately
'''
'''
CREATE TABLE Provides_PT(
    name VARCHAR REFERENCES Service_Type(name),
    categoryName VARCHAR REFERENCES Pet_Category(categoryName),
    email VARCHAR REFERENCES Part_Time_Employee(email),
    PRIMARY KEY(name, categoryName, email)
)

CREATE TABLE Provides_FT(
    name VARCHAR REFERENCES Service_Type(name),
    categoryName VARCHAR REFERENCES Pet_Category(categoryName),
    email VARCHAR REFERENCES Full_Time_Employee(email),
    PRIMARY KEY(name, categoryName, email)
)
'''
*/

CREATE TABLE Records_Monthly_Summary(
    email VARCHAR REFERENCES Caretaker(email) ON DELETE CASCADE,
    monthYear INTEGER NOT NULL,
    totalNoJobs INTEGER NOT NULL,
    monthAverageRating DECIMAL NOT NULL,
    totalPetDays INTEGER NOT NULL,
    salary DECIAML(10,2) NOT NULL,
    PRIMARY KEY(email, monthYear)
)

/*
'''same issue as Provides'''
'''
CREATE TABLE Records_Monthly_Summary_PT(
    email VARCHAR REFERENCES Part_Time_Employee(email) ON DELETE CASCADE,
    monthYear INTEGER NOT NULL,
    totalNoJobs INTEGER NOT NULL,
    monthAverageRating DECIMAL NOT NULL,
    totalPetDays INTEGER NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(email, monthYear)
)

CREATE TABLE Records_Monthly_Summary_FT(
    email VARCHAR REFERENCES Full_Time_Employee(email) ON DELETE CASCADE,
    monthYear INTEGER NOT NULL,
    totalNoJobs INTEGER NOT NULL,
    monthAverageRating DECIMAL NOT NULL,
    totalPetDays INTEGER NOT NULL,
    salary DECIAML(10,2) NOT NULL,
    PRIMARY KEY(email, monthYear)
)
'''
*/

CREATE TABLE Indicates_Availability_Period(
    email VARCHAR REFERENCES Part_Time_Employee(email) ON DELETE CASCADE,
    startDate DATE,
    endDate DATE,
    PRIMARY KEY(email, startDate, endDate)
)

CREATE TABLE Applies_For_Leave_Period(
    email VARCHAR REFERENCES Full_Time_Employee(email) ON DELETE CASCADE,
    startDate DATE,
    endDate DATE,
    isEmergency BOOLEAN NOT NULL,
    isApproved BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(email, startDate, endDate)
)

CREATE TABLE Bidded_For_Job(
    petName VARCHAR REFERENCES Pet(name) ON DELETE CASCADE,
    PetOwnerEmail VARCHAR REFERENCES Pet_Owner(email) ON DELETE CASCADE,
    serviceName VARCHAR REFERENCES Service_Type(name) ON DELETE CASCADE,
    categoryName VARCHAR REFERENCES Pet_Category(categoryName) ON DELETE CASCADE,
    CaretakerEmail VARCHAR REFERENCES Caretaker(email) ON DELETE CASCADE,
    startDate DATE,
    endDate DATE,
    transferType VARCHAR,
    transferDateTime DATETIME,
    remarks VARCHAR,
    PRIMARY KEY(pet_name, email, serviceName, categoryName, email, startDate, endDate)
)
/*
'''same issue regarding the covering constraints'''
'''transferType, TransferDateTime and remarks need to be NOT NULL?'''
'''
CREATE TABLE Bidded_For_Job_PT(
    petName VARCHAR REFERENCES Pet(name) ON DELETE CASCADE,
    email VARCHAR REFERENCES Pet_Owner(email) ON DELETE CASCADE,
    serviceName VARCHAR REFERENCES Service_Type(name) ON DELETE CASCADE,
    categoryName VARCHAR REFERENCES Pet_Category(categoryName) ON DELETE CASCADE,
    email VARCHAR REFERENCES Part_Time_Employee(email) ON DELETE CASCADE,
    startDate DATE,
    endDate DATE,
    transferType VARCHAR,
    transferDateTime DATETIME,
    remarks VARCHAR,
    PRIMARY KEY(pet_name, email, serviceName, categoryName, email, startDate, endDate)
)

CREATE TABLE Bidded_For_Job_FT(
    petName VARCHAR REFERENCES Pet(name) ON DELETE CASCADE,
    email VARCHAR REFERENCES Pet_Owner(email) ON DELETE CASCADE,
    serviceName VARCHAR REFERENCES Service_Type(name) ON DELETE CASCADE,
    categoryName VARCHAR REFERENCES Pet_Category(categoryName) ON DELETE CASCADE,
    email VARCHAR REFERENCES Full_Time_Employee(email) ON DELETE CASCADE,
    startDate DATE,
    endDate DATE,
    transferType VARCHAR,
    transferDateTime DATETIME,
    remarks VARCHAR,
    PRIMARY KEY(pet_name, email, serviceName, categoryName, email, startDate, endDate)
)
'''
*/

CREATE TABLE Financed_By_Transaction(
    petName VARCHAR REFERENCES Pet(name) ON DELETE CASCADE,
    PetOwneremail VARCHAR REFERENCES Pet_Owner(email) ON DELETE CASCADE,
    serviceName VARCHAR REFERENCES Service_Type(name) ON DELETE CASCADE,
    categoryName VARCHAR REFERENCES Pet_Category(categoryName) ON DELETE CASCADE,
    CaretakerEmail VARCHAR REFERENCES Caretaker(email) ON DELETE CASCADE,
    startDate DATE REFERENCES Bidded_For_Job(startDate) ON DELETE CASCADE,
    endDate DATE REFERENCES Bidded_For_Job(endDate) ON DELETE CASCADE,
    transactionDateTime DATETIME,
    isVerified BOOLEAN DEFAULT FALSE,
    paymentMethod VARCHAR NOT NULL,
    totalAmount DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(petName, PetOwnerEmail, serviceName, categoryName, CaretakerEmail, startDate, endDate, transactionDateTime)
)

/*
'''dont know how to show key constraint of jobs here, same for tagged to review'''
'''
CREATE TABLE Financed_By_Transaction_PT(
    petName VARCHAR REFERENCES Pet(name) ON DELETE CASCADE,
    email VARCHAR REFERENCES Pet_Owner(email) ON DELETE CASCADE,
    serviceName VARCHAR REFERENCES Service_Type(name) ON DELETE CASCADE,
    categoryName VARCHAR REFERENCES Pet_Category(categoryName) ON DELETE CASCADE,
    email VARCHAR REFERENCES Part_Time_Employee(email) ON DELETE CASCADE,
    startDate DATE REFERENCES Bidded_For_Job_PT(startDate) ON DELETE CASCADE,
    endDate DATE REFERENCES Bidded_For_Job_PT(endDate) ON DELETE CASCADE,
    transactionDateTime DATETIME,
    isVerified BOOLEAN SET DEFAULT FALSE,
    paymentMethod VARCHAR NOT NULL,
    totalAmount DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(petName, email, serviceName, categoryName, email, startDate, endDate, transactionDateTime)
)

CREATE TABLE Financed_By_Transaction_FT(
    petName VARCHAR REFERENCES Pet(name) ON DELETE CASCADE,
    email VARCHAR REFERENCES Pet_Owner(email) ON DELETE CASCADE,
    serviceName VARCHAR REFERENCES Service_Type(name) ON DELETE CASCADE,
    categoryName VARCHAR REFERENCES Pet_Category(categoryName) ON DELETE CASCADE,
    email VARCHAR REFERENCES Full_Time_Employee(email) ON DELETE CASCADE,
    startDate DATE REFERENCES Bidded_For_Job_FT(startDate) ON DELETE CASCADE,
    endDate DATE REFERENCES Bidded_For_Job_FT(endDate) ON DELETE CASCADE,
    transactionDateTime DATETIME,
    isVerified BOOLEAN SET DEFAULT FALSE,
    paymentMethod VARCHAR NOT NULL,
    totalAmount DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(pet_name, email, serviceName, categoryName, email, startDate, endDate, transactionDateTime)
)
'''
*/

CREATE TABLE Tagged_To_Review(
    petName VARCHAR REFERENCES Pet(name) ON DELETE CASCADE,
    PetOwnerEmail VARCHAR REFERENCES Pet_Owner(email) ON DELETE CASCADE,
    serviceName VARCHAR REFERENCES Service_Type(name) ON DELETE CASCADE,
    categoryName VARCHAR REFERENCES Pet_Category(categoryName) ON DELETE CASCADE,
    CaretakerEmail VARCHAR REFERENCES Caretaker(email) ON DELETE CASCADE,
    startDate DATE REFERENCES Bidded_For_Job(startDate) ON DELETE CASCADE,
    endDate DATE REFERENCES Bidded_For_Job(endDate) ON DELETE CASCADE,
    transactionDateTime DATETIME REFERENCES Financed_By_Transaction(transactionDateTime) ON DELETE CASCADE,
    createdAt DATETIME,
    rating VARCHAR NOT NULL,
    comment VARCHAR,
    PRIMARY KEY(petName, PetOwnerEmail, serviceName, categoryName, CaretakerEmail, startDate, endDate, transactionDateTime, createdAt)
)

/*
'''
CREATE TABLE Tagged_To_Review_PT(
    petName VARCHAR REFERENCES Pet(name) ON DELETE CASCADE,
    email VARCHAR REFERENCES Pet_Owner(email) ON DELETE CASCADE,
    serviceName VARCHAR REFERENCES Service_Type(name) ON DELETE CASCADE,
    categoryName VARCHAR REFERENCES Pet_Category(categoryName) ON DELETE CASCADE,
    email VARCHAR REFERENCES Part_Time_Employee(email) ON DELETE CASCADE,
    startDate DATE REFERENCES Bidded_For_Job_PT(startDate) ON DELETE CASCADE,
    endDate DATE REFERENCES Bidded_For_Job_PT(endDate) ON DELETE CASCADE,
    transactionDateTime DATETIME REFERENCES Financed_By_Transaction_PT(transactionDateTime) ON DELETE CASCADE,
    createdAt DATETIME,
    rating VARCHAR NOT NULL,
    comment VARCHAR,
    PRIMARY KEY(petName, email, serviceName, categoryName, email, startDate, endDate, transactionDateTime, createdAt)
)

CREATE TABLE Tagged_To_Review_FT(
    petName VARCHAR REFERENCES Pet(name) ON DELETE CASCADE,
    email VARCHAR REFERENCES Pet_Owner(email) ON DELETE CASCADE,
    serviceName VARCHAR REFERENCES Service_Type(name) ON DELETE CASCADE,
    categoryName VARCHAR REFERENCES Pet_Category(categoryName) ON DELETE CASCADE,
    email VARCHAR REFERENCES Full_Time_Employee(email) ON DELETE CASCADE,
    startDate DATE REFERENCES Bidded_For_Job_FT(startDate) ON DELETE CASCADE,
    endDate DATE REFERENCES Bidded_For_Job_FT(endDate) ON DELETE CASCADE,
    transactionDateTime DATETIME REFERENCES Financed_By_Transaction_FT(transactionDateTime) ON DELETE CASCADE,
    createdAt DATETIME,
    rating VARCHAR NOT NULL,
    comment VARCHAR,
    PRIMARY KEY(petName, email, serviceName, categoryName, email, startDate, endDate, transactionDateTime, createdAt)
)
'''
*/