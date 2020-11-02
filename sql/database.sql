-- psql -U postgres cs2102 < node_modules/connect-pg-simple/table.sql

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
    deletedAt TIMESTAMP,
    createdAt DATE NOT NULL
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
    postalCode VARCHAR NOT NULL,
    createdAt DATE NOT NULL
);

CREATE TABLE Pet_Owner(
    ccNumber VARCHAR,
    ccName VARCHAR,
    ccExpiryDate DATE,
    ccCvvCode VARCHAR,
    petOwnerUsername VARCHAR PRIMARY KEY REFERENCES App_User(username) ON DELETE CASCADE
);

CREATE TABLE Caretaker(
    caretakerUsername VARCHAR PRIMARY KEY REFERENCES App_User(username) ON DELETE CASCADE
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
    FOREIGN KEY(petName, petOwnerUsername) REFERENCES Pet(name, petOwnerUsername) ON DELETE CASCADE ON UPDATE CASCADE
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
    -- Latest leave application is end of next year
    CHECK (extract(year from endDate) <= extract(year from current_date) + 1),
    PRIMARY KEY(caretakerUsername, startDate, endDate)
);

CREATE TABLE Applies_For_Leave_Period(
    caretakerUsername VARCHAR REFERENCES Full_Time_Employee(caretakerUsername) ON DELETE CASCADE,
    startDate DATE,
    endDate DATE,
    isEmergency BOOLEAN NOT NULL,
    isApproved BOOLEAN DEFAULT FALSE,
    CHECK (startDate <= endDate),
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
    status STATUS,
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
    CONSTRAINT transactionCompleted CHECK((transactionDateTime IS NOT NULL AND status = 'Completed') OR (rating IS NULL AND comment IS NULL AND reviewDateTime IS NULL)),
    PRIMARY KEY(petName, petOwnerUsername, caretakerUsername, submittedAt, startDate, endDate),
    FOREIGN KEY(petName, petOwnerUsername) REFERENCES Pet(name, petOwnerUsername) ON DELETE CASCADE ON UPDATE CASCADE
);

-------------------------------------------- FUNCTIONS ------------------------------------------

-- Get overall average rating of a Caretaker
CREATE OR REPLACE FUNCTION average_rating (ctusername VARCHAR)
RETURNS NUMERIC AS $avg$
declare 
  avg NUMERIC;
BEGIN 
    SELECT COALESCE(AVG(rating),0) into avg
    FROM bids b
    WHERE ctusername = b.caretakerusername
    GROUP BY b.caretakerusername;
    RETURN avg;
END; 
$avg$
LANGUAGE plpgsql;

-- For convenience during development
CREATE OR REPLACE FUNCTION delete_user(VARCHAR) RETURNS VARCHAR AS $$
BEGIN
    DELETE FROM pet_owner P WHERE P.petownerusername = $1;
    DELETE FROM cares_for CF WHERE CF.caretakerusername = $1;
    DELETE FROM caretaker C WHERE C.caretakerusername = $1;
    DELETE FROM App_User A WHERE A.username = $1;
    RETURN $1;
END;
$$ LANGUAGE plpgsql;

-- Create a new user: Pet Owner, Care Taker, or both
CREATE OR REPLACE FUNCTION insert_new_user(
    newUsername VARCHAR, newEmail VARCHAR, passwordDigest VARCHAR, newName VARCHAR, 
    bio VARCHAR, phoneNumber VARCHAR, address VARCHAR, postalCode VARCHAR, 
    newCCNumber VARCHAR, ccName VARCHAR, ccExpiryDate DATE, ccCvvCode VARCHAR,
    newCategories VARCHAR[], accountType VARCHAR, caretakerType VARCHAR) 
    -- Return enough data to verify insertion
    RETURNS TABLE (username VARCHAR, email VARCHAR, name VARCHAR, ccNumber VARCHAR, categories VARCHAR[]) AS $$
DECLARE 
    categoryName VARCHAR;
BEGIN 

IF accountType NOT IN ('petOwner', 'caretaker', 'both') THEN
    RAISE EXCEPTION 'A user must be either a pet owner or a caretaker or both';
END IF;

IF accountType != 'petOwner' AND (caretakerType IS NULL OR caretakerType NOT IN ('fullTime', 'partTime')) THEN
    RAISE EXCEPTION 'A care taker must be either a full-time or a part-time employee';
END IF;

INSERT INTO App_User VALUES (newUsername, newEmail, passwordDigest, newName, NULL, bio, phoneNumber, address, postalCode, NOW());
IF accountType = 'petOwner' OR accountType = 'both' THEN
    INSERT INTO Pet_Owner VALUES (newCCNumber, ccName, ccExpiryDate, ccCvvCode, newUsername);
END IF;
IF accountType = 'caretaker' OR accountType = 'both' THEN
    INSERT INTO Caretaker VALUES (newUsername);

    IF caretakerType = 'fullTime' THEN
        INSERT INTO Full_Time_Employee VALUES (newUsername);
    ELSIF caretakerType = 'partTime' THEN
        INSERT INTO Part_Time_Employee VALUES (newUsername);
    END IF;

    FOREACH categoryName IN ARRAY newCategories 
    LOOP
        INSERT INTO Cares_For VALUES(categoryName, newUsername);
    END LOOP;
END IF;

RETURN QUERY 
    SELECT U.username, U.email, U.name, P.ccNumber, ARRAY_AGG(CF.categoryName)
    FROM App_User U LEFT JOIN Pet_Owner P ON P.petOwnerUsername = U.username 
        LEFT JOIN Caretaker C ON C.caretakerUsername = U.username
        LEFT JOIN Cares_For CF ON CF.caretakerUsername = C.caretakerUsername
    WHERE U.username = newUsername
    GROUP BY U.username, P.petOwnerUsername, C.caretakerUsername;
END;
$$ LANGUAGE plpgsql;


-------------------------------------------- TRIGGERS ------------------------------------------

-- Triggers for leave application
CREATE OR REPLACE FUNCTION leave_constraints() RETURNS TRIGGER AS $$
DECLARE 
overlapping_date INTEGER;
pet_under_care INTEGER;
total_set INTEGER;
BEGIN
    -- Check no overlapping date of leave
    SELECT COUNT(*) INTO overlapping_date FROM (
        SELECT (generate_series(NEW.startdate, NEW.enddate, '1 day'::interval))::date
        INTERSECT
        SELECT generate_series(startdate, enddate, '1 day') 
        FROM applies_for_leave_period where caretakerusername = NEW.caretakerusername) AS intersect_dates;
  
    IF overlapping_date > 0 THEN
        RAISE EXCEPTION 'You cannot apply for overlapping leaves';
    END IF;

    -- Check no pet under care
    SELECT COUNT(*) INTO pet_under_care FROM (
        SELECT (generate_series(NEW.startdate, NEW.enddate, '1 day'::interval))::date
        INTERSECT
        SELECT generate_series(startdate, enddate, '1 day') 
        FROM Bids WHERE caretakerusername = NEW.caretakerusername AND status = 'Accepted') AS pet_being_cared;

    IF pet_under_care > 0 THEN
        RAISE EXCEPTION 'You cannot apply leave you are / will be in charge of one or more pets during the leave';
    END IF;

    -- Check caretaker can still fulfill 2x150 working days criteria starting from when account is registered
    -- Generate "consecutive_leave_groups" of dates by subtracting the
    -- date's row number (no gaps) from the date itself
    -- (with potential gaps). Whenever there is a gap,
    -- there will be a new group
    WITH dates(date) AS (
        -- This table contains all the distinct date 
        -- instances in the data set
        select (generate_series(concat(extract(year from current_date)::text, substring(createdAt::text from 5))::date,
        concat((extract(year from current_date) + 1)::text, substring(createdAt::text from 5))::date,
        '1 day'::interval))::date
        FROM App_User WHERE username = NEW.caretakerusername
        EXCEPT
        -- EXCEPT the insert of new row here
        select (generate_series(NEW.startdate, NEW.enddate, '1 day'::interval))::date
        EXCEPT
        -- DATA that are already existing in the table beforehand
        select generate_series(
            startdate, enddate, '1 day') FROM applies_for_leave_period where caretakerusername = NEW.caretakerusername
    )

    SELECT sum(sets) INTO total_set FROM (
        SELECT
        COUNT(*) / 150 AS sets
        FROM (
            SELECT
            ROW_NUMBER() OVER (ORDER BY date) AS rn,
            date + (-ROW_NUMBER() OVER (ORDER BY date)) * INTERVAL '1 day' AS grp,
            date
            FROM dates  
        ) AS groups
        GROUP BY grp
    ) AS consecutive;

    IF (total_set <> 2) THEN
        RAISE exception 'You cannot take this leave because you will not be able to fulfill minimum requirements of consecutive working days';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_leave_constraints
BEFORE INSERT ON applies_for_leave_period
FOR EACH ROW EXECUTE PROCEDURE leave_constraints();

-- -- Triggers for availability application
CREATE OR REPLACE FUNCTION availability_overlapping_date() RETURNS TRIGGER AS $$
DECLARE 
overlapping_date INTEGER;
BEGIN
    SELECT COUNT(*) INTO overlapping_date FROM (
        SELECT (generate_series(NEW.startdate, NEW.enddate, '1 day'::interval))::date
        INTERSECT
        SELECT generate_series(startdate, enddate, '1 day') 
        FROM indicates_availability_period WHERE caretakerusername = NEW.caretakerusername) AS dates;
  
    IF overlapping_date > 0 THEN
        RAISE EXCEPTION 'You cannot indicate overlapping availability periods';
    ELSE RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_availability_overlap
BEFORE INSERT ON indicates_availability_period
FOR EACH ROW EXECUTE PROCEDURE availability_overlapping_date();

-- Triggers for non-overlapping ISA relationship admin/ user
CREATE OR REPLACE FUNCTION not_admin()
RETURNS TRIGGER AS $$
DECLARE isAdmin NUMERIC;
BEGIN
    SELECT COUNT(*) INTO isAdmin FROM PCS_Administrator A
    WHERE NEW.username = A.username;
    IF isAdmin > 0 THEN 
        RAISE EXCEPTION 'Username is already used, please use a different username.';
    ELSE 
    RETURN NEW;
    END IF; END;
$$ LANGUAGE plpgsql; 

CREATE TRIGGER check_not_admin
BEFORE INSERT ON App_User
FOR EACH ROW EXECUTE PROCEDURE not_admin();


CREATE OR REPLACE FUNCTION not_user()
RETURNS TRIGGER AS $$
DECLARE app_user NUMERIC;
BEGIN
    SELECT COUNT(*) INTO app_user FROM App_User A
    WHERE NEW.username = A.username;
    IF app_user > 0 THEN 
        RAISE EXCEPTION 'Username is already used, please use a different username.';
    ELSE 
    RETURN NEW;
    END IF; END;
$$ LANGUAGE plpgsql; 

CREATE TRIGGER check_not_user
BEFORE INSERT ON PCS_Administrator
FOR EACH ROW EXECUTE PROCEDURE not_user();


-- Triggers for part time employee
CREATE OR REPLACE FUNCTION not_full_time_employee()
RETURNS TRIGGER AS $$
DECLARE full_time NUMERIC;
BEGIN
    SELECT COUNT(*) INTO full_time FROM Full_Time_Employee F
    WHERE NEW.caretakerusername = F.caretakerusername;
    IF full_time > 0 THEN 
        RAISE EXCEPTION 'You cannot apply for Part Time Employment if you are a Full timer';
    ELSE 
    RETURN NEW;
    END IF; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_not_full_time_employee
BEFORE INSERT ON Part_Time_Employee
FOR EACH ROW EXECUTE PROCEDURE not_full_time_employee();

-- Triggers for full time employee
CREATE OR REPLACE FUNCTION not_part_time_employee()
RETURNS TRIGGER AS $$
DECLARE part_time NUMERIC;
BEGIN
    SELECT COUNT(*) INTO part_time FROM Part_Time_Employee P
    WHERE NEW.caretakerusername = P.caretakerusername;
    IF part_time > 0 THEN 
        RAISE EXCEPTION 'You cannot apply for Full Time Employment if you are a Part timer';
    ELSE 
    RETURN NEW;
    END IF; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_not_part_time_employee
BEFORE INSERT ON Full_Time_Employee
FOR EACH ROW EXECUTE PROCEDURE not_part_time_employee();

-- Triggers for Bids
CREATE OR REPLACE FUNCTION bids_constraint()
RETURNS TRIGGER AS $$
DECLARE max_jobs INTEGER;
BEGIN
    SELECT MAX(n) INTO max_jobs FROM (
        SELECT caretakerusername, as_of_date, COUNT(*) AS n
        FROM (SELECT d::date AS as_of_date FROM generate_series(NEW.startdate::date, NEW.enddate::date, '1 day') d) as dates
        INNER JOIN Bids ON dates.as_of_date BETWEEN Bids.startdate AND Bids.enddate
        WHERE Bids.status = 'Accepted'
        GROUP BY caretakerusername, as_of_date) T WHERE NEW.caretakerusername = T.caretakerusername;
    -- All caretakers can have a maximum of 5 pets at one time
    IF max_jobs >= 5 THEN
        RAISE EXCEPTION 'Caretaker is unable to receive more pets during this period';
    -- Part timer can hold up to 2 or 5 pets depending on rating
    ELSEIF (NEW.caretakerusername IN (SELECT P.caretakerusername FROM Part_Time_Employee P) 
        AND ((SELECT totalAverageRating FROM Caretaker WHERE Caretakerusername = NEW.caretakerusername) <= 4) AND max_jobs >= 2) THEN
            RAISE EXCEPTION 'Part time Caretaker is unable to receive more pets during this period';
    END IF;

    IF (NEW.caretakerusername IN (SELECT F.caretakerusername FROM Full_Time_Employee F)) THEN
      NEW.status = 'Accepted';  
    ELSEIF (NEW.caretakerusername IN (SELECT caretakerusername FROM Part_Time_Employee)) THEN
      NEW.status = 'Pending';
    END IF;
    RETURN NEW;
    END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER check_bids_constraint
BEFORE INSERT ON Bids
FOR EACH ROW 
EXECUTE PROCEDURE bids_constraint();

-- Trigger condition: On any updates on Bids table that changes status from Pending to Accepted
-- Action: Reject all other bids with the same pet, petowner and overlapping time period.
CREATE OR REPLACE FUNCTION reject_conflicting_bids()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE bids SET status = 'Rejected'
    WHERE bids.status = 'Pending' AND bids.caretakerusername != NEW.caretakerusername AND bids.petownerusername = NEW.petownerusername AND bids.petname = NEW.petname AND 
        (bids.startdate BETWEEN NEW.startdate AND NEW.enddate OR bids.enddate BETWEEN NEW.startdate AND NEW.enddate);
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_conflict_bids_constraint
AFTER UPDATE ON Bids
FOR EACH ROW
WHEN  (OLD.status = 'Pending' AND NEW.status = 'Accepted')
EXECUTE PROCEDURE reject_conflicting_bids();


-------------------------------------------- VIEWS ------------------------------------------

-------------------------------------------- VIEWS ------------------------------------------

-- View for Admin Dashboard
CREATE OR REPLACE VIEW leaderboard AS (
  SELECT * FROM 
    (SELECT *, rank() OVER (PARTITION BY role ORDER BY totalScore desc) AS rank
    FROM (
        SELECT *, satisfactionscore + efficiencyscore + popularityscore AS totalScore
        FROM (
            SELECT *, COALESCE(ROUND(averageRating * 10),0) AS satisfactionscore,
                  COALESCE(ROUND(jobCount * 25 / avgJobCount),0) AS efficiencyscore,
                  COALESCE(ROUND(bidCount * 25 / avgBidCount),0) AS popularityscore
            FROM (
              SELECT *, AVG(jobCount) over (partition by role) AS avgJobCount, AVG(bidCount) over (partition by role) AS avgBidCount FROM 
              (
                SELECT COALESCE(caretakerusername, caretakerusername2) AS caretakerusername, COALESCE(role, role2) AS role, jobcount, averageRating, bidcount
                FROM (
                    (SELECT caretakerusername, 
                        CASE WHEN caretakerusername IN (SELECT * FROM part_time_employee ) THEN 'PT'
                            WHEN caretakerusername IN (SELECT * FROM full_time_employee ) THEN 'FT'
                        ELSE 'null'
                        END AS role,
                    COUNT(*) AS jobCount, AVG(rating) AS averageRating
                    FROM bids
                    WHERE status = 'Completed' AND 
                      enddate BETWEEN date_trunc('month', CURRENT_DATE - interval '1' month) AND date_trunc('month', CURRENT_DATE)
                    GROUP BY caretakerusername) t1
                    FULL OUTER JOIN
                    (SELECT caretakerusername AS caretakerusername2, 
                        CASE WHEN caretakerusername IN (SELECT * FROM part_time_employee ) THEN 'PT'
                        WHEN caretakerusername IN (SELECT * FROM full_time_employee ) THEN 'FT'
                        ELSE 'null'
                        END AS role2,
                        count(*) as bidCount
                    FROM bids
                    WHERE  
                      submittedat BETWEEN date_trunc('month', CURRENT_DATE - interval '1' month) AND date_trunc('month', CURRENT_DATE)
                    GROUP BY caretakerusername) t2
                    ON t1.caretakerusername = t2.caretakerusername2
                ) AS t3
              ) AS t4
            ) AS t5
        ) AS t6
    ) AS t7
  ) AS t8
  WHERE rank BETWEEN 1 AND 5
  ORDER BY role, rank, totalScore, efficiencyscore, popularityscore, satisfactionscore
); 
