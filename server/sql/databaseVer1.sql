-- psql -U postgres cs2102 < server/node_modules/connect-pg-simple/table.sql

------------------------------------------ DROPS ALL TABLES (EXCEPT ENUMS) ------------------------------------------
DO $$ DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
    EXECUTE 'DROP TABLE ' || quote_ident(r.tablename) || ' CASCADE';
  END LOOP;
END $$;

CREATE TABLE PCS_Administrator(
    username VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    passwordDigest VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    deletedAt TIMESTAMP
);

CREATE TABLE App_User(
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
    petOwnerUsername VARCHAR PRIMARY KEY REFERENCES App_User(username)
);

CREATE TABLE Caretaker(
    caretakerUsername VARCHAR PRIMARY KEY REFERENCES App_User(username),
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
    CHECK (startDate <= endDate),
    CONSTRAINT overlapping_date EXCLUDE USING GIST (daterange(startDate, endDate) WITH &&),
    PRIMARY KEY(caretakerUsername, startDate, endDate)
);

CREATE TABLE Applies_For_Leave_Period(
    caretakerUsername VARCHAR REFERENCES Full_Time_Employee(caretakerUsername) ON DELETE CASCADE,
    startDate DATE,
    endDate DATE,
    isEmergency BOOLEAN NOT NULL,
    isApproved BOOLEAN DEFAULT FALSE,
    CHECK (startDate <= endDate),
    CONSTRAINT overlapping_date2 EXCLUDE USING GIST (daterange(startDate, endDate) WITH &&),
    PRIMARY KEY(caretakerUsername, startDate, endDate)
);

CREATE TYPE STATUS AS ENUM (
    'Accepted',
    'Completed',
    'Pending',
    'Expired',
    'Rejected'
);

CREATE TYPE PAYMENT_METHOD AS ENUM (
    'Cash',
    'Credit Card'
);

CREATE TYPE TRANSFER_TYPE AS ENUM (
    'Delivery',
    'Pick-up',
    'On-site transfer'
);

CREATE TABLE Bids(
    petName VARCHAR,
    petOwnerUsername VARCHAR,
    caretakerUsername VARCHAR REFERENCES Caretaker(caretakerUsername) ON DELETE CASCADE,
    dailyPrice DECIMAL(10,2) NOT NULL,
    status STATUS DEFAULT 'Pending',
    submittedAt TIMESTAMP,
    startDate DATE,
    endDate DATE,
    transferType TRANSFER_TYPE NOT NULL,
    remarks VARCHAR,
    transactionDateTime TIMESTAMP,
    paymentMethod PAYMENT_METHOD,
    totalAmount DECIMAL(10,2),
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment VARCHAR,
    reviewDateTime TIMESTAMP,
    CONSTRAINT statusAccepted CHECK(status IN ('Accepted','Completed') OR (transactionDateTime IS NULL AND paymentMethod IS NULL AND totalAmount IS NULL)),
    CONSTRAINT transactionCompleted CHECK((transactionDATEtIME IS NOT NULL AND status = 'Completed') OR (rating IS NULL AND comment IS NULL AND reviewDateTime IS NULL)),
    PRIMARY KEY(petName, petOwnerUsername, caretakerUsername, submittedAt, startDate, endDate),
    FOREIGN KEY(petName, petOwnerUsername) REFERENCES Pet(name, petOwnerUsername) ON DELETE CASCADE
);


-------------------------------------------- TRIGGERS ------------------------------------------
-- CREATE TRIGGER tr_check_leave()
-- BEFORE INSERT ON applies_for_leave_period
-- EXECUTE PROCEDURE check_leave_validity;

-- CREATE OR REPLACE FUNCTION check_leave_validity()
-- RETURNS TRIGGER as $$ BEGIN

--     EXEC('CREATE VIEW with_new AS (
--         SELECT startDate, endDate FROM applies_for_leave_period leave
--         WHERE NEW.caretakerusername = leave.caretakerusername
--         ORDER BY startDate
--         UNION 
--         SELECT * FROM NEW
--         '
--     )

--     WITH addRowNumber AS
--     SELECT ROW_NUMBER() OVER (), *
--         FROM with_new
    
--     WITH consecutive_working AS 
--     SELECT w1.startDate, w1.endDate, w2.startDate, w2.startDate - w1.endDate AS consecutive_working_days
--     FROM with_new w1 INNER JOIN with_new w2 ON w1.ROW_NUMBER = w2.ROW_NUMBER - 1

    
    -- select (generate_series('2020-01-01', '2020-12-31', '1 day'::interval))::date, count(*)
    -- EXCEPT
    -- select (generate_series(
    --     (select startdate from applies_for_leave_period where caretakerusername = 'wincent'),
    --     (select enddate from applies_for_leave_period where caretakerusername = 'wincent'),
    --      '1 day'::interval))::date, count(*);