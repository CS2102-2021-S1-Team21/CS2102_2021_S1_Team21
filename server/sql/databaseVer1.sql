CREATE TABLE PCS_Administrator(
    username VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    passwordDigest VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    deletedAt TIMESTAMP
);

CREATE TABLE AppUser(
    username VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    passwordDigest VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    deletedAt TIMESTAMP,
    bio VARCHAR,
    phoneNumber VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    postalCode VARCHAR NOT NULL
);

CREATE TABLE Pet_Owner(
    ccNumber VARCHAR,
    ccName VARCHAR,
    ccExpiryDate DATE,
    ccCvvCode VARCHAR,
    petOwnerUsername VARCHAR PRIMARY KEY REFERENCES AppUser(username)
);

CREATE TABLE Caretaker(
    caretakerUsername VARCHAR PRIMARY KEY REFERENCES AppUser(username),
    totalAverageRating DECIMAL(2,1)
);

CREATE TABLE Full_Time_Employee(
    caretakerUsername VARCHAR PRIMARY KEY REFERENCES Caretaker(caretakerUsername) ON DELETE CASCADE
);

CREATE TABLE Part_Time_Employee(
    caretakerUsername VARCHAR PRIMARY KEY REFERENCES Caretaker(caretakerUsername) ON DELETE CASCADE
);

CREATE TYPE GENDER AS ENUM (
    'Male',
    'Female'
);

CREATE TABLE Pet_Category(
    categoryName VARCHAR PRIMARY KEY,
    dailyPrice DECIMAL(10,2) NOT NULL
);

CREATE TABLE Pet(
    petOwnerUsername VARCHAR REFERENCES Pet_Owner(petOwnerUsername) ON DELETE CASCADE,
    name VARCHAR,
    yearOfBirth DATE NOT NULL,
    breed VARCHAR NOT NULL,
    deletedAt TIMESTAMP,
    gender GENDER NOT NULL,
    categoryName VARCHAR NOT NULL REFERENCES Pet_Category(categoryName),
    PRIMARY KEY(petOwnerUsername, name)
);

CREATE TABLE Requirement(
    requirementType VARCHAR,
    description VARCHAR NOT NULL,
    petName VARCHAR,
    petOwnerUsername VARCHAR,
    PRIMARY KEY(requirementType, petName, petOwnerUsername),
    FOREIGN KEY(petName, petOwnerUsername) REFERENCES Pet(name, petOwnerUsername) ON DELETE CASCADE
);

CREATE TABLE Cares_For(
    categoryName VARCHAR REFERENCES Pet_Category(categoryName),
    caretakerUsername VARCHAR REFERENCES Caretaker(caretakerUsername),
    PRIMARY KEY(categoryName, caretakerUsername)
);

CREATE TABLE Records_Monthly_Summary(
    caretakerUsername VARCHAR REFERENCES Caretaker(caretakerUsername) ON DELETE CASCADE,
    monthYear DATE NOT NULL,
    totalNoJobs INTEGER NOT NULL,
    monthAverageRating DECIMAL(2,1) NOT NULL,
    totalPetDays INTEGER NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(caretakerUsername, monthYear)
);

CREATE TABLE Indicates_Availability_Period(
    caretakerUsername VARCHAR REFERENCES Part_Time_Employee(caretakerUsername) ON DELETE CASCADE,
    startDate DATE,
    endDate DATE,
    PRIMARY KEY(caretakerUsername, startDate, endDate)
);

CREATE TABLE Applies_For_Leave_Period(
    caretakerUsername VARCHAR REFERENCES Full_Time_Employee(caretakerUsername) ON DELETE CASCADE,
    startDate DATE,
    endDate DATE,
    isEmergency BOOLEAN NOT NULL,
    isApproved BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(caretakerUsername, startDate, endDate)
);

CREATE TYPE STATUS AS ENUM (
    'Accepted',
    'Completed',
    'Pending',
    'Expired',
    'Rejected'
);

CREATE TABLE Bidded_For_Job(
    petName VARCHAR,
    petOwnerUsername VARCHAR,
    caretakerUsername VARCHAR REFERENCES Caretaker(caretakerUsername) ON DELETE CASCADE,
    dailyPrice DECIMAL(10,2) NOT NULL,
    status STATUS DEFAULT 'Pending',
    submittedAt TIMESTAMP,
    startDate DATE,
    endDate DATE,
    transferType VARCHAR NOT NULL,
    remarks VARCHAR,
    transactionIsVerified BOOLEAN DEFAULT FALSE,
    transactionDateTime TIMESTAMP,
    paymentMethod VARCHAR,
    totalAmount DECIMAL(10,2),
    rating INTEGER CHECK ((rating >= 1) AND (rating <=5)),
    comment VARCHAR,
    reviewDateTime TIMESTAMP,
    PRIMARY KEY(petName, petOwnerUsername, caretakerUsername, submittedAt, startDate, endDate),
    FOREIGN KEY(petName, petOwnerUsername) REFERENCES Pet(name, petOwnerUsername) ON DELETE CASCADE
);
