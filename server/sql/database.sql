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

INSERT INTO Caretaker VALUES ('asdfasdf@gmail.com', 'asdfasdf', 'nameasdf', FALSE, 'im a weird caretaker', 98798787, 'orchard', '123123', 3);
INSERT INTO Caretaker VALUES ('wincent@gmail.com', 'Caretaker2', 'wincent', FALSE, 'im awesome', 89712322, 'orchard', '543123', 5);

INSERT INTO Full_Time_Employee VALUES ('asdfasdf@gmail.com');
INSERT INTO Full_Time_Employee VALUES ('wincent@gmail.com');

INSERT INTO applies_for_leave_period VALUES ('wincent@gmail.com', '10/10/2020', '11/10/2020', FALSE);
INSERT INTO applies_for_leave_period VALUES ('asdfasdf@gmail.com', '10/10/2020' ,'11/10/2020', FALSE);

CREATE TABLE Tagged_To_Review(
    petName VARCHAR,
    petOwnerEmail VARCHAR,
    serviceType VARCHAR,
    categoryName VARCHAR,
    caretakerEmail VARCHAR,
    startDate DATE,
    endDate DATE,
    createdAt TIMESTAMP NOT NULL,
    rating INTEGER NOT NULL CHECK ((rating >= 1) AND (rating <=5)),
    comment VARCHAR,
    PRIMARY KEY(petName, petOwnerEmail, serviceType, categoryName, caretakerEmail, startDate, endDate), 
    -- FOREIGN KEY(petName, petOwnerEmail, serviceType, categoryName, caretakerEmail, startDate, endDate) 
        -- REFERENCES Financed_By_Transaction(petName, petOwnerEmail, serviceType, categoryName, caretakerEmail, startDate, endDate) ON DELETE CASCADE
);

INSERT INTO Tagged_To_Review VALUES(
  'doggo', 'coconut@gmail.com', 'feed doggo', 'dogs', 'wincent@gmail.com','1/1/2020', '1/1/2020', '1/1/2020', 5, 'pretty nice') ON conflict DO nothing;
INSERT INTO Tagged_To_Review VALUES(
  'doggo', 'banana@gmail.com', 'feed doggo', 'dogs', 'wincent@gmail.com', '1/1/2020', '1/1/2020', '1/1/2020', 4, 'pretty okay') ON conflict DO nothing;
INSERT INTO Tagged_To_Review VALUES(
  'cat', 'coconut@gmail.com', 'feed cat', 'cats', 'wincent@gmail.com', '1/1/2020', '1/1/2020', '1/2/2020', 3, 'pretty okay') ON conflict DO nothing;
INSERT INTO Tagged_To_Review VALUES(
  'cat', 'coconut@gmail.com', 'feed cat', 'cats', 'wincent@gmail.com', '1/1/2020', '1/1/2020', '1/2/2020', 4, 'pretty good') ON conflict DO nothing;
INSERT INTO Tagged_To_Review VALUES(
  'cat', 'ginger@gmail.com', 'feed cat', 'cats', 'wincent@gmail.com', '1/1/2020', '1/1/2020', '1/3/2020', 4, 'pretty good') ON conflict DO nothing;
INSERT INTO Tagged_To_Review VALUES(
  'cat', 'apple@gmail.com', 'feed cat', 'cats', 'wincent@gmail.com', '1/1/2020', '1/1/2020', '1/3/2020', 4, 'pretty good') ON conflict DO nothing;
  
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

