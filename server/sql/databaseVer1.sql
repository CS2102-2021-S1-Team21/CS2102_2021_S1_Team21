CREATE TABLE PCS_Administrator(
    username VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    passwordDigest VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    deletedAt TIMESTAMP,
);

CREATE TABLE User(
    username VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    passwordDigest VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    deletedAt TIMESTAMP,
    bio VARCHAR,
    phoneNumber VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    postalCode VARCHAR NOT NULL,
);

CREATE TABLE Pet_Owner(
    username VARCHAR PRIMARY KEY REFERENCES User(username)
);

CREATE TABLE Caretaker(
    username VARCHAR PRIMARY KEY REFERENCES User(username),
    totalAverageRating DECIMAL(2,1)
);

CREATE TABLE Full_Time_Employee(
    username VARCHAR PRIMARY KEY REFERENCES Caretaker(username) ON DELETE CASCADE,
);

CREATE TABLE Part_Time_Employee(
    username VARCHAR PRIMARY KEY REFERENCES Caretaker(username) ON DELETE CASCADE,
);

CREATE TYPE gender AS ENUM (
    'Male',
    'Female'
);

CREATE TABLE Pet(
    username VARCHAR REFERENCES Pet_Owner(username) ON DELETE CASCADE,
    name VARCHAR,
    yearOfBirth DATE,
    breed VARCHAR,
    deletedAt TIMESTAMP,
    gender gender,
    PRIMARY KEY(username, name)
);

CREATE TABLE Credit_Card(
    number VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    expiryDate DATE NOT NULL,
    cvvCode VARCHAR NOT NULL
);

CREATE TABLE Registers(
    number VARCHAR REFERENCES Credit_Card(number),
    username VARCHAR REFERENCES Pet_Owner(username),
    PRIMARY KEY(number, username)
);

CREATE TABLE Requirement(
    requirementType VARCHAR,
    description VARCHAR NOT NULL,
    petName VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    PRIMARY KEY(requirementType, petName, username),
    FOREIGN KEY(petName, username) REFERENCES Pet(name, username) ON DELETE CASCADE
);

CREATE TABLE Belongs_To(
    petName VARCHAR REFERENCES Pet(name),
    categoryName VARCHAR REFERENCES Pet_Category(categoryName),
    PRIMARY KEY(petName, categoryName)
);

CREATE TABLE Pet_Category(
    categoryName VARCHAR PRIMARY KEY
);

CREATE TABLE Service_Type(
    name VARCHAR PRIMARY KEY,
    description VARCHAR
);

CREATE TABLE Service(
    serviceType VARCHAR REFERENCES Service_Type(name),
    categoryName VARCHAR REFERENCES Pet_Category(categoryName),
    dailyPrice DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(name, categoryName),
);

CREATE TABLE Provides(
    serviceType VARCHAR,
    categoryName VARCHAR,
    username VARCHAR REFERENCES Caretaker(username),
    PRIMARY KEY(name, categoryName, username)
    FOREIGN KEY (serviceType, categoryName) REFERENCES Service(serviceType, categoryName)
);

CREATE TABLE Records_Monthly_Summary(
    username VARCHAR REFERENCES Caretaker(username) ON DELETE CASCADE,
    monthYear DATE NOT NULL,
    totalNoJobs INTEGER NOT NULL,
    monthAverageRating DECIMAL(2,1) NOT NULL,
    totalPetDays INTEGER NOT NULL,
    salary DECIAML(10,2) NOT NULL,
    PRIMARY KEY(username, monthYear)
);

CREATE TABLE Indicates_Availability_Period(
    username VARCHAR REFERENCES Part_Time_Employee(username) ON DELETE CASCADE,
    startDate DATE,
    endDate DATE,
    PRIMARY KEY(username, startDate, endDate)
);

CREATE TABLE Applies_For_Leave_Period(
    username VARCHAR REFERENCES Full_Time_Employee(username) ON DELETE CASCADE,
    startDate DATE,
    endDate DATE,
    isEmergency BOOLEAN NOT NULL,
    isApproved BOOLEAN SET DEFAULT FALSE,
    PRIMARY KEY(username, startDate, endDate)
);

CREATE TYPE STATUS AS ENUM (
    'Accepted',
    'Completed',
    'Pending',
    'Expired',
    'Rejected'
);

CREATE TABLE Bidded_For_Job(
    petName VARCHAR REFERENCES Pet(name) ON DELETE CASCADE,
    petOwnerEmail VARCHAR REFERENCES Pet(username) ON DELETE CASCADE,
    serviceType VARCHAR REFERENCES Service(serviceType) ON DELETE CASCADE,
    categoryName VARCHAR REFERENCES Service(categoryName) ON DELETE CASCADE,
    CaretakerEmail VARCHAR REFERENCES Caretaker(username) ON DELETE CASCADE,
    startDate DATE,
    endDate DATE,
    transferType VARCHAR NOT NULL,
    transferDateTime TIMESTAMP NOT NULL,
    remarks VARCHAR,
    dailyPrice DECIMAL(10,2) NOT NULL,
    status STATUS DEFAULT 'Pending',
    submittedAt TIMESTAMP,
    PRIMARY KEY(pet_name, petOwnerEmail, serviceType, categoryName, CaretakerEmail, startDate, endDate)
);

'''transferType, TransferDateTime and remarks need to be NOT NULL?'''
CREATE TABLE Financed_By_Transaction(
    petName VARCHAR REFERENCES Bidded_For_Job(petName) ON DELETE CASCADE,
    petOwnerEmail VARCHAR REFERENCES Bidded_For_Job(petOwnerEmail) ON DELETE CASCADE,
    serviceType VARCHAR REFERENCES Bidded_For_Job(serviceType) ON DELETE CASCADE,
    categoryName VARCHAR REFERENCES Bidded_For_Job(categoryName) ON DELETE CASCADE,
    CaretakerEmail VARCHAR REFERENCES Bidded_For_Job(CaretakerEmail) ON DELETE CASCADE,
    startDate DATE REFERENCES Bidded_For_Job(startDate) ON DELETE CASCADE,
    endDate DATE REFERENCES Bidded_For_Job(endDate) ON DELETE CASCADE,
    transactionDateTime TIMESTAMP,
    isVerified BOOLEAN SET DEFAULT FALSE,
    paymentMethod VARCHAR NOT NULL,
    totalAmount DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(petName, petOwnerEmail, serviceType, categoryName, CaretakerEmail, startDate, endDate)
);

'''dont know how to show key constraint of jobs here, same for tagged to review'''
CREATE TABLE Tagged_To_Review(
    petName VARCHAR REFERENCES Financed_By_Transaction(petName) ON DELETE CASCADE,
    petOwnerEmail VARCHAR REFERENCES Financed_By_Transaction(petOwnerEmail) ON DELETE CASCADE,
    serviceType VARCHAR REFERENCES Financed_By_Transaction(serviceType) ON DELETE CASCADE,
    categoryName VARCHAR REFERENCES Financed_By_Transaction(categoryName) ON DELETE CASCADE,
    caretakerEmail VARCHAR REFERENCES Financed_By_Transaction(CaretakerEmail) ON DELETE CASCADE,
    startDate DATE REFERENCES Financed_By_Transaction(startDate) ON DELETE CASCADE,
    endDate DATE REFERENCES Financed_By_Transaction(endDate) ON DELETE CASCADE,
    createdAt TIMESTAMP NOT NULL,
    rating INTEGER NOT NULL CHECK ((rating >= 1) AND (rating <=5)),
    comment VARCHAR,
    PRIMARY KEY(petName, petOwnerEmail, serviceType, categoryName, CaretakerEmail, startDate, endDate)
);
