-- DROP TABLE IF EXISTS pet_owners;
-- DROP TABLE IF EXISTS PCS_Administrator;
-- DROP TABLE IF EXISTS App_User;
-- DROP TABLE IF EXISTS Pet_Owner;
-- DROP TABLE IF EXISTS Caretaker;
-- DROP TABLE IF EXISTS Full_Time_Employee;
-- DROP TABLE IF EXISTS Part_Time_Employee;
-- DROP TABLE IF EXISTS Pet
-- DROP TABLE IF EXISTS Requirement;
-- DROP TABLE IF EXISTS Cares_For;
-- DROP TABLE IF EXISTS Records_Monthly_Summary;
-- DROP TABLE IF EXISTS Indicates_Availability_Period;
-- DROP TABLE IF EXISTS Applies_For_Leave_Period;
-- DROP TABLE IF EXISTS Bids;
 -- INSERT INTO pet_owners
-- VALUES ('notaphoenix@gmail.com',
--         'mushu');
 -- INSERT INTO pet_owners
-- VALUES('theexplorer@gmail.com',
--        'dora');

INSERT INTO PCS_Administrator
VALUES
  (
    'pcsadmin',
    'admin@petcaringservices.org.sg',
    '$2a$10$n2q9efUAsWFKbPzTu6O/4udJG6/kuwV.X.c8uwHTX36cpCk/Er3aK', -- bcrypt for 'pcsadmin'
    'PCS Admin',
    null);

INSERT INTO App_User
VALUES ('oompaloompa',
        'minion@wonkafactory.co',
        '$2a$10$k9A9eGmV/AHwQ2toQSfI/OonyqFLtcL7DQFEmGeyRF2htHJV4SaQW', -- bcrypt for 'password'
 'Oompa Loompa',
 null,
 '',
 '',
 '',
 '');

INSERT INTO App_User
VALUES ('dora',
        'theexplorer@gmail.com',
        '$2a$10$k9A9eGmV/AHwQ2toQSfI/OonyqFLtcL7DQFEmGeyRF2htHJV4SaQW', -- bcrypt for 'password'
 'Dora the Explorer',
 null,
 '',
 '',
 '',
 '');

INSERT INTO App_User
VALUES ('ladygaga',
        'mistress@monstafactory.co',
        '$2a$10$k9A9eGmV/AHwQ2toQSfI/OonyqFLtcL7DQFEmGeyRF2htHJV4SaQW', -- bcrypt for 'password'
 'Lady Gaga',
 null,
 'rara oh mama',
 '995',
 'monstafactory',
 '1212121212');


INSERT INTO App_User
VALUES ('harambe', 'harambe@gmail.com',
                  '$2a$10$k9A9eGmV/AHwQ2toQSfI/OonyqFLtcL7DQFEmGeyRF2htHJV4SaQW', -- bcrypt for 'password'
 'Mr Harambe',
 null,
 'My name is Yoshikage Kira. I''m 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest. I don''t smoke, but I occasionally drink. I''m in bed by 11 PM, and make sure I get eight hours of sleep, no matter what. After having a glass of warm milk and doing about twenty minutes of stretches before going to bed, I usually have no problems sleeping until morning. Just like a baby, I wake up without any fatigue or stress in the morning. I was told there were no issues at my last check-up. I''m trying to explain that I''m a person who wishes to live a very quiet life. I take care not to trouble myself with any enemies, like winning and losing, that would cause me to lose sleep at night. That is how I deal with society, and I know that is what brings me happiness. Although, if I were to fight I wouldn''t lose to anyone.',
 '98798787',
 'orchard',
 '123123');


INSERT INTO App_User
VALUES ('wincent',
        'wincent@gmail.com',
        '$2a$10$k9A9eGmV/AHwQ2toQSfI/OonyqFLtcL7DQFEmGeyRF2htHJV4SaQW', -- bcrypt for 'password'
 'Wincent Tjoi',
 null,
 'im awesome',
 '89712322',
 'orchard',
 '543123');


INSERT INTO Caretaker
VALUES ('harambe', 4.3);


INSERT INTO Caretaker
VALUES ('wincent',
        5);

INSERT INTO Caretaker
VALUES ('dora', 4.5);

INSERT INTO Part_Time_Employee
VALUES ('dora');

INSERT INTO Full_Time_Employee
VALUES ('harambe');


INSERT INTO Full_Time_Employee
VALUES ('wincent');


INSERT INTO Pet_Owner(petOwnerUsername)
VALUES ('ladygaga');
INSERT INTO Pet_Owner(petOwnerUsername)
VALUES ('oompaloompa');
INSERT INTO Pet_Category
VALUES ('Large dog',
        50);
INSERT INTO Pet_Category
VALUES ('Small dog',
        30);
INSERT INTO Pet_Category
VALUES ('Cat',
        30);
INSERT INTO Pet
VALUES ('ladygaga',
        'Gougou',
        '1/1/2012',
        'dalmatian',
        null,
        'Male',
        'Large dog');
INSERT INTO Pet
VALUES ('ladygaga',
        'Gougou Jr.',
        '4/1/2012',
        'chihuahua',
        null,
        'Male',
        'Small dog');
INSERT INTO Pet
VALUES ('oompaloompa',
        'Mario',
        '1/1/2012',
        'golden retriever',
        null,
        'Male',
        'Large dog');
INSERT INTO Cares_For
VALUES ('Small dog',
        'wincent');
INSERT INTO Cares_For
VALUES ('Large dog',
        'wincent');
INSERT INTO Cares_For
VALUES ('Small dog',
        'harambe');
INSERT INTO applies_for_leave_period
VALUES ('harambe',
        '10/10/2020',
        '11/10/2020',
        FALSE);


INSERT INTO applies_for_leave_period
VALUES ('wincent',
        '10/10/2020',
        '11/10/2020',
        FALSE);


INSERT INTO Bids(petName, petOwnerUsername, caretakerUsername, dailyPrice, submittedAt, startDate, endDate, transferType, rating, comment, reviewDateTime)
VALUES('Gougou',
       'ladygaga',
       'wincent',
       25,
       '1/1/20',
       '12/10/19',
       '12/12/19',
       'On-site transfer',
       5,
       'Amazing, my dog came back pregnant',
       '1/1/20');


INSERT INTO Bids(petName, petOwnerUsername, caretakerUsername, dailyPrice, submittedAt, startDate, endDate, transferType, rating, comment, reviewDateTime)
VALUES('Gougou',
       'ladygaga',
       'wincent',
       25,
       '1/1/20',
       '3/3/20',
       '3/6/20',
       'On-site transfer',
       2,
       'Terrible, my dog came back obese',
       '1/1/20');

INSERT INTO Caretaker VALUES ('oompaloompa', null);

INSERT INTO Full_Time_Employee VALUES ('oompaloompa');

INSERT INTO Part_Time_Employee VALUES ('oompaloompa');