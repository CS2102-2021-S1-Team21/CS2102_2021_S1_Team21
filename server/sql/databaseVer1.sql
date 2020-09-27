CREATE TABLE PCS_Administrator(
    email VARCHAR PRIMARY KEY,
    passwordDigest VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    deletedAt TIMESTAMP,
)

CREATE TABLE Caretaker(
    email VARCHAR PRIMARY KEY,
    passwordDigest VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    deletedAt TIMESTAMP,
    bio VARCHAR,
    phoneNumber INTEGER NOT NULL,
    address VARCHAR NOT NULL,
    postalCode INTEGER NOT NULL,
    totalAverageRating INTEGER
)

CREATE TABLE Full_Time_Employee(
    email VARCHAR PRIMARY KEY REFERENCES Caretaker(email) ON DELETE CASCADE,
)

CREATE TABLE Part_Time_Employee(
    email VARCHAR PRIMARY KEY REFERENCES Caretaker(email) ON DELETE CASCADE,
)

CREATE TABLE Pet_Owner(
    email VARCHAR PRIMARY KEY,
    passwordDigest VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    deletedAt TIMESTAMP,
    bio VARCHAR,
    phoneNumber INTEGER NOT NULL,
    address VARCHAR NOT NULL,
    postalCode INTEGER NOT NULL,
)

CREATE TABLE Owns_Pets(
    email VARCHAR REFERENCES Pet_Owner(email) ON DELETE CASCADE,
    name VARCHAR,
    yearOfBirth YEAR,
    breed VARCHAR,
    deletedAt TIMESTAMP,
    gender VARCHAR(1),
    PRIMARY KEY(email, name)
)

CREATE TABLE Credit_Card(
    number INTEGER PRIMARY KEY,
    name VARCHAR NOT NULL,
    expiryDate INTEGER NOT NULL,
    cvvCode INTEGER NOT NULL
)

CREATE TABLE Register(
    number INTEGER REFERENCES Credit_Card(number),
    email VARCAHR REFERENCES Pet_Owner(email),
    PRIMARY KEY(number, email)
)

CREATE TABLE Requires_Requirements(
    requirementType VARCHAR,
    description VARCAHR NOT NULL,
    name VARCHAR REFERENCES Owns_Pets(name) ON DELETE CASCADE,
    email VARCHAR REFERENCES Owns_Pets(email) ON DELETE CASCADE,
    PRIMARY KEY(requirementType, name, email)
)

CREATE TABLE Belongs_To(
    name VARCHAR REFERENCES Owns_Pets(name),
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
    name VARCHAR REFERENCES Services(name),
    categoryName VARCHAR REFERENCES Services(categoryName),
    email VARCHAR REFERENCES Caretaker(email),
    PRIMARY KEY(name, categoryName, email)
)

CREATE TABLE Records_Monthly_Summary(
    email VARCHAR REFERENCES Caretaker(email) ON DELETE CASCADE,
    monthYear INTEGER NOT NULL,
    totalNoJobs INTEGER NOT NULL,
    monthAverageRating DECIMAL NOT NULL,
    totalPetDays INTEGER NOT NULL,
    salary DECIAML(10,2) NOT NULL,
    PRIMARY KEY(email, monthYear)
)

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
    isApproved BOOLEAN SET DEFAULT FALSE,
    PRIMARY KEY(email, startDate, endDate)
)

CREATE TABLE Bidded_For_Job(
    petName VARCHAR REFERENCES Owns_Pets(name) ON DELETE CASCADE,
    PetOwnerEmail VARCHAR REFERENCES Owns_Pets(email) ON DELETE CASCADE,
    serviceName VARCHAR REFERENCES Services(name) ON DELETE CASCADE,
    categoryName VARCHAR REFERENCES Services(categoryName) ON DELETE CASCADE,
    CaretakerEmail VARCHAR REFERENCES Caretaker(email) ON DELETE CASCADE,
    startDate DATE,
    endDate DATE,
    transferType VARCHAR,
    transferDateTime TIMESTAMP,
    remarks VARCHAR,
    PRIMARY KEY(pet_name, PetOwnerEmail, serviceName, categoryName, CaretakerEmail, startDate, endDate)
)

'''transferType, TransferDateTime and remarks need to be NOT NULL?'''
CREATE TABLE Financed_By_Transaction(
    petName VARCHAR REFERENCES Bidded_For_Job(petName) ON DELETE CASCADE,
    PetOwneremail VARCHAR REFERENCES Bidded_For_Job(PetOwnerEmail) ON DELETE CASCADE,
    serviceName VARCHAR REFERENCES Bidded_For_Job(serviceName) ON DELETE CASCADE,
    categoryName VARCHAR REFERENCES Bidded_For_Job(categoryName) ON DELETE CASCADE,
    CaretakerEmail VARCHAR REFERENCES Bidded_For_Job(CaretakerEmail) ON DELETE CASCADE,
    startDate DATE REFERENCES Bidded_For_Job(startDate) ON DELETE CASCADE,
    endDate DATE REFERENCES Bidded_For_Job(endDate) ON DELETE CASCADE,
    transactionDateTime TIMESTAMP,
    isVerified BOOLEAN SET DEFAULT FALSE,
    paymentMethod VARCHAR NOT NULL,
    totalAmount DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(petName, PetOwnerEmail, serviceName, categoryName, CaretakerEmail, startDate, endDate, transactionDateTime)
)

'''dont know how to show key constraint of jobs here, same for tagged to review'''
CREATE TABLE Tagged_To_Review(
    petName VARCHAR REFERENCES Financed_By_Transaction(petName) ON DELETE CASCADE,
    PetOwneremail VARCHAR REFERENCES Financed_By_Transaction(PetOwnerEmail) ON DELETE CASCADE,
    serviceName VARCHAR REFERENCES Financed_By_Transaction(serviceName) ON DELETE CASCADE,
    categoryName VARCHAR REFERENCES Financed_By_Transaction(categoryName) ON DELETE CASCADE,
    CaretakerEmail VARCHAR REFERENCES Financed_By_Transaction(CaretakerEmail) ON DELETE CASCADE,
    startDate DATE REFERENCES Financed_By_Transaction(startDate) ON DELETE CASCADE,
    endDate DATE REFERENCES Financed_By_Transaction(endDate) ON DELETE CASCADE,
    transactionDateTime TIMESTAMP REFERENCES Financed_By_Transaction(transactionDateTime) ON DELETE CASCADE,
    createdAt TIMESTAMP,
    rating VARCHAR NOT NULL,
    comment VARCHAR,
    PRIMARY KEY(petName, PetOwnerEmail, serviceName, categoryName, CaretakerEmail, startDate, endDate, transactionDateTime, createdAt)
)
