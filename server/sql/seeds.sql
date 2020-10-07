INSERT INTO pet_owners
VALUES
  ('notaphoenix@gmail.com', 'mushu');
INSERT INTO pet_owners
VALUES('theexplorer@gmail.com', 'dora');

INSERT INTO AppUser
VALUES
  ('oompaloompa', 'minion@wonkafactory.co',
    '$2a$10$k9A9eGmV/AHwQ2toQSfI/OonyqFLtcL7DQFEmGeyRF2htHJV4SaQW', -- bcrypt for 'password
    'Oompa Loompa', null, '', '', '', ''); 

INSERT INTO Caretaker VALUES ('asdfasdf@gmail.com', 'asdfasdf', 'nameasdf', FALSE, 'im a weird caretaker', 98798787, 'orchard', '123123', 3);
INSERT INTO Caretaker VALUES ('wincent@gmail.com', 'Caretaker2', 'wincent', FALSE, 'im awesome', 89712322, 'orchard', '543123', 5);

INSERT INTO Full_Time_Employee VALUES ('asdfasdf@gmail.com');
INSERT INTO Full_Time_Employee VALUES ('wincent@gmail.com');

INSERT INTO applies_for_leave_period VALUES ('wincent@gmail.com', '10/10/2020', '11/10/2020', FALSE);
INSERT INTO applies_for_leave_period VALUES ('asdfasdf@gmail.com', '10/10/2020' ,'11/10/2020', FALSE);