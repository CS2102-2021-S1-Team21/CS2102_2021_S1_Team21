CREATE DATABASE cs2102;

CREATE TABLE Caretaker(
    email VARCHAR PRIMARY KEY,
    passwordDigest VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    deletedAt BOOLEAN DEFAULT FALSE,
    bio VARCHAR,
    phoneNumber INTEGER NOT NULL,
    address VARCHAR NOT NULL,
    postalCode INTEGER NOT NULL,
    totalAverageRating INTEGER
);

CREATE TABLE Full_Time_Employee
(
  email VARCHAR PRIMARY KEY REFERENCES Caretaker(email) ON DELETE CASCADE
);

CREATE TABLE Applies_For_Leave_Period(
    email VARCHAR REFERENCES Full_Time_Employee(email) ON DELETE CASCADE,
    startDate DATE,
    endDate DATE,
    isEmergency BOOLEAN NOT NULL,
    isApproved BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(email, startDate, endDate)
);

CREATE TABLE AppUser
(
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

