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
  