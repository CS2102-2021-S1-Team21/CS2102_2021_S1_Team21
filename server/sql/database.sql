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

<<<<<<< HEAD
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

=======
<<<<<<< HEAD
INSERT INTO Caretaker VALUES ('asdfasdf@gmail.com', 'asdfasdf', 'nameasdf', FALSE, 'im a weird caretaker', 98798787, 'orchard', '123123', 3);
INSERT INTO Caretaker VALUES ('wincent@gmail.com', 'Caretaker2', 'wincent', FALSE, 'im awesome', 89712322, 'orchard', '543123', 5);

INSERT INTO Full_Time_Employee VALUES ('asdfasdf@gmail.com');
INSERT INTO Full_Time_Employee VALUES ('wincent@gmail.com');

INSERT INTO applies_for_leave_period VALUES ('wincent@gmail.com', '10/10/2020', '11/10/2020', FALSE);
INSERT INTO applies_for_leave_period VALUES ('asdfasdf@gmail.com', '10/10/2020' ,'11/10/2020', FALSE);
=======
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

>>>>>>> master
>>>>>>> 7a6e5f9bb230edfc0654102abbfc81142b327c38
