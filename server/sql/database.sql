CREATE DATABASE cs2102;

/**
CREATE TABLE here
**/

/* 
 * This is a dummy table for demo purposes. `psql < database.sql`
 */
CREATE TABLE pet_owners
(
  email VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL
);
INSERT INTO pet_owners VALUES ('notaphoenix@gmail.com', 'mushu');
INSERT INTO pet_owners VALUES ('theexplorer@gmail.com', 'dora');

CREATE TABLE Caretaker
(
  email VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL
);
INSERT INTO Caretaker VALUES ('asdfasdf@gmail.com', 'Caretaker1');
INSERT INTO Caretaker VALUES ('wincent@gmail.com', 'Caretaker2');

CREATE TABLE Full_Time_Employee
(
  email VARCHAR PRIMARY KEY REFERENCES Caretaker(email) ON DELETE CASCADE
);
INSERT INTO Full_Time_Employee VALUES ('asdfasdf@gmail.com');
INSERT INTO Full_Time_Employee VALUES ('wincent@gmail.com');

CREATE TABLE applies_for_leave_period
(
  email VARCHAR PRIMARY KEY,
  startDate VARCHAR,
  endDate VARCHAR,
);
INSERT INTO applies_for_leave_period VALUES ('wincent@gmail.com', '10/10/2020', '11/10/2020');
INSERT INTO applies_for_leave_period VALUES ('asdfasdf@gmail.com', '10/10/2020', '11/10/2020');

