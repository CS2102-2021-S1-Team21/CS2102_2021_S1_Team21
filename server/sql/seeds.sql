

INSERT INTO AppUser
VALUES
  ('oompaloompa', 'minion@wonkafactory.co',
    '$2a$10$k9A9eGmV/AHwQ2toQSfI/OonyqFLtcL7DQFEmGeyRF2htHJV4SaQW', -- bcrypt for 'password
    'Oompa Loompa', null, '', '', '', ''); 

INSERT INTO pet_owner
VALUES
  ('', '', null, '', 'oompaloompa');

INSERT INTO Caretaker VALUES ('oompaloompa', null);

INSERT INTO Full_Time_Employee VALUES ('oompaloompa');

INSERT INTO Full_Time_Employee VALUES ('oompaloompa');