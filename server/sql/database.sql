-- psql -U postgres cs2102 < server/node_modules/connect-pg-simple/table.sql

------------------------------------------ DROPS ALL TABLES (EXCEPT ENUMS) ------------------------------------------
DO $$ DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
    CONTINUE WHEN r.tablename = 'session';
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

-- Triggers for leave application
CREATE OR REPLACE FUNCTION leave_consecutive() RETURNS TRIGGER AS $$
DECLARE 
total_set INTEGER;
BEGIN
    WITH dates(date) AS (
    -- This table contains all the distinct date 
    -- instances in the data set
    select (generate_series('2020-01-01', '2020-12-31', '1 day'::interval))::date
    EXCEPT
    -- EXCEPT the insert of new row here
    select (generate_series(NEW.startdate, NEW.enddate, '1 day'::interval))::date
    EXCEPT
    -- DATA that are already existing in the table beforehand
    select generate_series(
        startdate, enddate, '1 day') FROM applies_for_leave_period where caretakerusername = NEW.caretakerusername
    ),
    -- Generate "groups" of dates by subtracting the
    -- date's row number (no gaps) from the date itself
    -- (with potential gaps). Whenever there is a gap,
    -- there will be a new group
    groups AS (
        SELECT
        ROW_NUMBER() OVER (ORDER BY date) AS rn,
        date + (-ROW_NUMBER() OVER (ORDER BY date)) * INTERVAL '1 day' AS grp,
        date
        FROM dates
    )

    SELECT sum(sets) INTO total_set FROM (
        SELECT
        COUNT(*) / 150 AS sets
        FROM groups
        GROUP BY grp
    ) AS consecutive;

    IF (total_set = 2) THEN RETURN NEW;
    ELSE RAISE exception 'You cannot take this leave because you will not be able to fulfill minimum requirements of consecutive working days';
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION leave_care_no_pet() RETURNS TRIGGER AS $$
DECLARE 
pet_under_care INTEGER;
BEGIN
    -- Check that caretaker currently not taking care of any pets
    WITH overlap(date) AS (
        select (generate_series(NEW.startdate, NEW.enddate, '1 day'::interval))::date
        INTERSECT
        select generate_series(
        startdate, enddate, '1 day') FROM Bids where caretakerusername = NEW.caretakerusername AND status = 'Accepted'
    )

    SELECT COUNT(*) INTO pet_under_care FROM overlap;

    IF pet_under_care > 0 THEN
        RAISE EXCEPTION 'You cannot apply leave you are / will be in charge of one or more pets during the leave';
    ELSE RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION leave_overlapping_date() RETURNS TRIGGER AS $$
DECLARE 
overlapping_date INTEGER;
BEGIN
    WITH overlap(date) AS (
        select (generate_series(NEW.startdate, NEW.enddate, '1 day'::interval))::date
        INTERSECT
        select generate_series(
        startdate, enddate, '1 day') FROM applies_for_leave_period where caretakerusername = NEW.caretakerusername
    )

    SELECT COUNT(*) INTO overlapping_date FROM overlap;
  
    IF overlapping_date > 0 THEN
        RAISE EXCEPTION 'You cannot apply for overlapping leaves';
    ELSE RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_leave_consecutive
BEFORE INSERT ON applies_for_leave_period
FOR EACH ROW EXECUTE PROCEDURE leave_consecutive();

CREATE TRIGGER check_leave_care_no_pet
BEFORE INSERT ON applies_for_leave_period
FOR EACH ROW EXECUTE PROCEDURE leave_care_no_pet();

CREATE TRIGGER check_leave_overlap
BEFORE INSERT ON applies_for_leave_period
FOR EACH ROW EXECUTE PROCEDURE leave_overlapping_date();

-- -- Triggers for availability application
CREATE OR REPLACE FUNCTION availability_overlapping_date() RETURNS TRIGGER AS $$
DECLARE 
overlapping_date INTEGER;
BEGIN
    WITH overlap(date) AS (
        select (generate_series(NEW.startdate, NEW.enddate, '1 day'::interval))::date
        INTERSECT
        select generate_series(
        startdate, enddate, '1 day') FROM indicates_availability_period where caretakerusername = NEW.caretakerusername
    )

    SELECT COUNT(*) INTO overlapping_date FROM overlap;
  
    IF overlapping_date > 0 THEN
        RAISE EXCEPTION 'You cannot indicate overlapping availability periods';
    ELSE RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_availability_overlap
BEFORE INSERT ON indicates_availability_period
FOR EACH ROW EXECUTE PROCEDURE availability_overlapping_date();
