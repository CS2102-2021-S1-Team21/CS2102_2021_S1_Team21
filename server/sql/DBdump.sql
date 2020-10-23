--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: gender; Type: TYPE; Schema: public; Owner: dorcas
--

CREATE TYPE public.gender AS ENUM (
    'Male',
    'Female'
);


ALTER TYPE public.gender OWNER TO dorcas;

--
-- Name: payment_method; Type: TYPE; Schema: public; Owner: dorcas
--

CREATE TYPE public.payment_method AS ENUM (
    'Cash',
    'Credit Card'
);


ALTER TYPE public.payment_method OWNER TO dorcas;

--
-- Name: status; Type: TYPE; Schema: public; Owner: dorcas
--

CREATE TYPE public.status AS ENUM (
    'Accepted',
    'Completed',
    'Pending',
    'Expired',
    'Rejected'
);


ALTER TYPE public.status OWNER TO dorcas;

--
-- Name: transfer_type; Type: TYPE; Schema: public; Owner: dorcas
--

CREATE TYPE public.transfer_type AS ENUM (
    'Delivery',
    'Pick-up',
    'On-site transfer'
);


ALTER TYPE public.transfer_type OWNER TO dorcas;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: app_user; Type: TABLE; Schema: public; Owner: dorcas
--

CREATE TABLE public.app_user (
    username character varying NOT NULL,
    email character varying NOT NULL,
    passworddigest character varying NOT NULL,
    name character varying NOT NULL,
    deletedat timestamp without time zone,
    bio character varying,
    phonenumber character varying NOT NULL,
    address character varying NOT NULL,
    postalcode character varying NOT NULL
);


ALTER TABLE public.app_user OWNER TO dorcas;

--
-- Name: applies_for_leave_period; Type: TABLE; Schema: public; Owner: dorcas
--

CREATE TABLE public.applies_for_leave_period (
    caretakerusername character varying NOT NULL,
    startdate date NOT NULL,
    enddate date NOT NULL,
    isemergency boolean NOT NULL,
    isapproved boolean DEFAULT false
);


ALTER TABLE public.applies_for_leave_period OWNER TO dorcas;

--
-- Name: appuser; Type: TABLE; Schema: public; Owner: dorcas
--

CREATE TABLE public.appuser (
    username character varying NOT NULL,
    email character varying NOT NULL,
    passworddigest character varying NOT NULL,
    name character varying NOT NULL,
    deletedat timestamp without time zone,
    bio character varying,
    phonenumber character varying NOT NULL,
    address character varying NOT NULL,
    postalcode character varying NOT NULL
);


ALTER TABLE public.appuser OWNER TO dorcas;

--
-- Name: bidded_for_job; Type: TABLE; Schema: public; Owner: dorcas
--

CREATE TABLE public.bidded_for_job (
    petname character varying NOT NULL,
    petownerusername character varying NOT NULL,
    caretakerusername character varying NOT NULL,
    dailyprice numeric(10,2) NOT NULL,
    status public.status DEFAULT 'Pending'::public.status,
    submittedat timestamp without time zone NOT NULL,
    startdate date NOT NULL,
    enddate date NOT NULL,
    transfertype character varying NOT NULL,
    remarks character varying,
    transactionisverified boolean DEFAULT false,
    transactiondatetime timestamp without time zone,
    paymentmethod character varying,
    totalamount numeric(10,2),
    rating integer,
    comment character varying,
    reviewdatetime timestamp without time zone,
    CONSTRAINT bidded_for_job_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.bidded_for_job OWNER TO dorcas;

--
-- Name: bids; Type: TABLE; Schema: public; Owner: dorcas
--

CREATE TABLE public.bids (
    petname character varying NOT NULL,
    petownerusername character varying NOT NULL,
    caretakerusername character varying NOT NULL,
    dailyprice numeric(10,2) NOT NULL,
    status public.status DEFAULT 'Pending'::public.status,
    submittedat timestamp without time zone NOT NULL,
    startdate date NOT NULL,
    enddate date NOT NULL,
    transfertype public.transfer_type NOT NULL,
    remarks character varying,
    transactiondatetime timestamp without time zone,
    paymentmethod public.payment_method,
    totalamount numeric(10,2),
    rating integer,
    comment character varying,
    reviewdatetime timestamp without time zone,
    CONSTRAINT bids_rating_check CHECK (((rating >= 1) AND (rating <= 5))),
    CONSTRAINT statusaccepted CHECK (((status = ANY (ARRAY['Accepted'::public.status, 'Completed'::public.status])) OR ((transactiondatetime IS NULL) AND (paymentmethod IS NULL) AND (totalamount IS NULL)))),
    CONSTRAINT transactioncompleted CHECK ((((transactiondatetime IS NOT NULL) AND (status = 'Completed'::public.status)) OR ((rating IS NULL) AND (comment IS NULL) AND (reviewdatetime IS NULL))))
);


ALTER TABLE public.bids OWNER TO dorcas;

--
-- Name: cares_for; Type: TABLE; Schema: public; Owner: dorcas
--

CREATE TABLE public.cares_for (
    categoryname character varying NOT NULL,
    caretakerusername character varying NOT NULL
);


ALTER TABLE public.cares_for OWNER TO dorcas;

--
-- Name: caretaker; Type: TABLE; Schema: public; Owner: dorcas
--

CREATE TABLE public.caretaker (
    caretakerusername character varying NOT NULL,
    totalaveragerating numeric(2,1)
);


ALTER TABLE public.caretaker OWNER TO dorcas;

--
-- Name: full_time_employee; Type: TABLE; Schema: public; Owner: dorcas
--

CREATE TABLE public.full_time_employee (
    caretakerusername character varying NOT NULL
);


ALTER TABLE public.full_time_employee OWNER TO dorcas;

--
-- Name: indicates_availability_period; Type: TABLE; Schema: public; Owner: dorcas
--

CREATE TABLE public.indicates_availability_period (
    caretakerusername character varying NOT NULL,
    startdate date NOT NULL,
    enddate date NOT NULL
);


ALTER TABLE public.indicates_availability_period OWNER TO dorcas;

--
-- Name: modules; Type: TABLE; Schema: public; Owner: dorcas
--

CREATE TABLE public.modules (
    mcode character varying NOT NULL,
    sems integer NOT NULL,
    mname character varying,
    credit integer
);


ALTER TABLE public.modules OWNER TO dorcas;

--
-- Name: part_time_employee; Type: TABLE; Schema: public; Owner: dorcas
--

CREATE TABLE public.part_time_employee (
    caretakerusername character varying NOT NULL
);


ALTER TABLE public.part_time_employee OWNER TO dorcas;

--
-- Name: pcs_administrator; Type: TABLE; Schema: public; Owner: dorcas
--

CREATE TABLE public.pcs_administrator (
    username character varying NOT NULL,
    email character varying NOT NULL,
    passworddigest character varying NOT NULL,
    name character varying NOT NULL,
    deletedat timestamp without time zone
);


ALTER TABLE public.pcs_administrator OWNER TO dorcas;

--
-- Name: pet; Type: TABLE; Schema: public; Owner: dorcas
--

CREATE TABLE public.pet (
    petownerusername character varying NOT NULL,
    name character varying NOT NULL,
    yearofbirth date NOT NULL,
    breed character varying NOT NULL,
    deletedat timestamp without time zone,
    gender public.gender NOT NULL,
    categoryname character varying NOT NULL
);


ALTER TABLE public.pet OWNER TO dorcas;

--
-- Name: pet_category; Type: TABLE; Schema: public; Owner: dorcas
--

CREATE TABLE public.pet_category (
    categoryname character varying NOT NULL,
    dailyprice numeric(10,2) NOT NULL
);


ALTER TABLE public.pet_category OWNER TO dorcas;

--
-- Name: pet_owner; Type: TABLE; Schema: public; Owner: dorcas
--

CREATE TABLE public.pet_owner (
    ccnumber character varying,
    ccname character varying,
    ccexpirydate date,
    cccvvcode character varying,
    petownerusername character varying NOT NULL
);


ALTER TABLE public.pet_owner OWNER TO dorcas;

--
-- Name: records_monthly_summary; Type: TABLE; Schema: public; Owner: dorcas
--

CREATE TABLE public.records_monthly_summary (
    caretakerusername character varying NOT NULL,
    monthyear date NOT NULL,
    totalnojobs integer NOT NULL,
    monthaveragerating numeric(2,1) NOT NULL,
    totalpetdays integer NOT NULL,
    salary numeric(10,2) NOT NULL
);


ALTER TABLE public.records_monthly_summary OWNER TO dorcas;

--
-- Name: requirement; Type: TABLE; Schema: public; Owner: dorcas
--

CREATE TABLE public.requirement (
    requirementtype character varying NOT NULL,
    description character varying NOT NULL,
    petname character varying NOT NULL,
    petownerusername character varying NOT NULL
);


ALTER TABLE public.requirement OWNER TO dorcas;

--
-- Name: session; Type: TABLE; Schema: public; Owner: dorcas
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO dorcas;

--
-- Name: total_set; Type: TABLE; Schema: public; Owner: dorcas
--

CREATE TABLE public.total_set (
    sum numeric
);


ALTER TABLE public.total_set OWNER TO dorcas;

--
-- Data for Name: app_user; Type: TABLE DATA; Schema: public; Owner: dorcas
--

COPY public.app_user (username, email, passworddigest, name, deletedat, bio, phonenumber, address, postalcode) FROM stdin;
dora	theexplorer@gmail.com	$2a$10$k9A9eGmV/AHwQ2toQSfI/OonyqFLtcL7DQFEmGeyRF2htHJV4SaQW	Dora the Explorer	\N				
harambe	harambe@gmail.com	$2a$10$k9A9eGmV/AHwQ2toQSfI/OonyqFLtcL7DQFEmGeyRF2htHJV4SaQW	Mr Harambe	\N	My name is Yoshikage Kira. I'm 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest. I don't smoke, but I occasionally drink. I'm in bed by 11 PM, and make sure I get eight hours of sleep, no matter what. After having a glass of warm milk and doing about twenty minutes of stretches before going to bed, I usually have no problems sleeping until morning. Just like a baby, I wake up without any fatigue or stress in the morning. I was told there were no issues at my last check-up. I'm trying to explain that I'm a person who wishes to live a very quiet life. I take care not to trouble myself with any enemies, like winning and losing, that would cause me to lose sleep at night. That is how I deal with society, and I know that is what brings me happiness. Although, if I were to fight I wouldn't lose to anyone.	98798787	orchard	123123
wincent	wincent@gmail.com	$2a$10$k9A9eGmV/AHwQ2toQSfI/OonyqFLtcL7DQFEmGeyRF2htHJV4SaQW	Wincent Tjoi	\N	im awesome	89712322	orchard	543123
ladygaga	mistress@monstafactory.co	$2a$10$k9A9eGmV/AHwQ2toQSfI/OonyqFLtcL7DQFEmGeyRF2htHJV4SaQW	Lady Gaga	\N	......	995	monstafactory	1212121212
oompaloompa	minion@wonkafactory.co	$2b$10$CstRdP5Ho76.2D7B2C8g9.eviZppsEKlcUuqpbeCiYzbwziaSy/HW	Oompa Loompa	\N	hello	62738271	234	234234
\.


--
-- Data for Name: applies_for_leave_period; Type: TABLE DATA; Schema: public; Owner: dorcas
--

COPY public.applies_for_leave_period (caretakerusername, startdate, enddate, isemergency, isapproved) FROM stdin;
oompaloompa	2020-10-08	2020-10-08	f	f
harambe	2020-10-10	2020-11-10	f	f
wincent	2020-10-10	2020-11-10	f	f
oompaloompa	2020-10-14	2020-10-14	f	f
oompaloompa	2020-10-14	2021-01-14	f	f
oompaloompa	2020-10-08	2021-11-07	f	t
oompaloompa	2020-10-17	2020-10-17	f	f
oompaloompa	2021-10-16	2021-10-16	f	f
\.


--
-- Data for Name: appuser; Type: TABLE DATA; Schema: public; Owner: dorcas
--

COPY public.appuser (username, email, passworddigest, name, deletedat, bio, phonenumber, address, postalcode) FROM stdin;
oompaloompa	minion@wonkafactory.co	$2a$10$k9A9eGmV/AHwQ2toQSfI/OonyqFLtcL7DQFEmGeyRF2htHJV4SaQW	Oompa Loompa	\N				
ladygaga	mistress@monstafactory.co	$2a$10$k9A9eGmV/AHwQ2toQSfI/OonyqFLtcL7DQFEmGeyRF2htHJV4SaQW	Lady Gaga	\N	rara oh mama	995	monstafactory	1212121212
harambe	harambe@gmail.com	$2a$10$k9A9eGmV/AHwQ2toQSfI/OonyqFLtcL7DQFEmGeyRF2htHJV4SaQW	Mr Harambe	\N	My name is Yoshikage Kira. I'm 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married. I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest. I don't smoke, but I occasionally drink. I'm in bed by 11 PM, and make sure I get eight hours of sleep, no matter what. After having a glass of warm milk and doing about twenty minutes of stretches before going to bed, I usually have no problems sleeping until morning. Just like a baby, I wake up without any fatigue or stress in the morning. I was told there were no issues at my last check-up. I'm trying to explain that I'm a person who wishes to live a very quiet life. I take care not to trouble myself with any enemies, like winning and losing, that would cause me to lose sleep at night. That is how I deal with society, and I know that is what brings me happiness. Although, if I were to fight I wouldn't lose to anyone.	98798787	orchard	123123
wincent	wincent@gmail.com	$2a$10$k9A9eGmV/AHwQ2toQSfI/OonyqFLtcL7DQFEmGeyRF2htHJV4SaQW	Wincent Tjoi	\N	im awesome	89712322	orchard	543123
dora	theexplorer@gmail.com	$2a$10$k9A9eGmV/AHwQ2toQSfI/OonyqFLtcL7DQFEmGeyRF2htHJV4SaQW	Dora the Explorer	\N				
\.


--
-- Data for Name: bidded_for_job; Type: TABLE DATA; Schema: public; Owner: dorcas
--

COPY public.bidded_for_job (petname, petownerusername, caretakerusername, dailyprice, status, submittedat, startdate, enddate, transfertype, remarks, transactionisverified, transactiondatetime, paymentmethod, totalamount, rating, comment, reviewdatetime) FROM stdin;
Gougou	ladygaga	wincent	25.00	Pending	2020-01-01 00:00:00	2019-12-12	2019-12-18	Through PCS	\N	f	\N	\N	\N	5	Amazing, my dog came back pregnant	2020-01-01 00:00:00
Gougou	ladygaga	wincent	25.00	Pending	2020-01-01 00:00:00	2020-03-03	2020-03-06	Through PCS	\N	f	\N	\N	\N	2	Terrible, my dog came back obese	2020-01-01 00:00:00
\.


--
-- Data for Name: bids; Type: TABLE DATA; Schema: public; Owner: dorcas
--

COPY public.bids (petname, petownerusername, caretakerusername, dailyprice, status, submittedat, startdate, enddate, transfertype, remarks, transactiondatetime, paymentmethod, totalamount, rating, comment, reviewdatetime) FROM stdin;
Gougou	ladygaga	wincent	25.00	Accepted	2020-01-01 00:00:00	2020-03-04	2020-06-15	On-site transfer	\N	\N	\N	\N	\N	\N	\N
Gougou	ladygaga	dora	25.00	Accepted	2020-01-01 00:00:00	2020-03-04	2020-06-18	On-site transfer	\N	\N	\N	\N	\N	\N	\N
Gougou	ladygaga	dora	25.00	Accepted	2020-01-01 00:00:00	2020-03-04	2020-06-21	On-site transfer	\N	\N	\N	\N	\N	\N	\N
Gougou	ladygaga	dora	25.00	Accepted	2020-01-01 00:00:00	2020-03-04	2020-06-23	On-site transfer	\N	\N	\N	\N	\N	\N	\N
Gougou	ladygaga	dora	25.00	Accepted	2020-01-01 00:00:00	2020-03-04	2020-06-26	On-site transfer	\N	\N	\N	\N	\N	\N	\N
Gougou	ladygaga	dora	25.00	Accepted	2020-01-01 00:00:00	2020-03-05	2020-07-04	On-site transfer	\N	\N	\N	\N	\N	\N	\N
Gougou	ladygaga	dora	25.00	Accepted	2020-01-01 00:00:00	2020-03-04	2020-06-22	On-site transfer	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: cares_for; Type: TABLE DATA; Schema: public; Owner: dorcas
--

COPY public.cares_for (categoryname, caretakerusername) FROM stdin;
Small dog	wincent
Large dog	wincent
Hamster	harambe
\.


--
-- Data for Name: caretaker; Type: TABLE DATA; Schema: public; Owner: dorcas
--

COPY public.caretaker (caretakerusername, totalaveragerating) FROM stdin;
harambe	4.3
wincent	5.0
oompaloompa	\N
dora	4.5
\.


--
-- Data for Name: full_time_employee; Type: TABLE DATA; Schema: public; Owner: dorcas
--

COPY public.full_time_employee (caretakerusername) FROM stdin;
harambe
wincent
oompaloompa
\.


--
-- Data for Name: indicates_availability_period; Type: TABLE DATA; Schema: public; Owner: dorcas
--

COPY public.indicates_availability_period (caretakerusername, startdate, enddate) FROM stdin;
oompaloompa	2020-10-08	2020-10-08
oompaloompa	2020-10-08	2020-11-08
\.


--
-- Data for Name: modules; Type: TABLE DATA; Schema: public; Owner: dorcas
--

COPY public.modules (mcode, sems, mname, credit) FROM stdin;
CS2102	1	Database Systems	4
CS1101S	1	Programming Methodology	4
\.


--
-- Data for Name: part_time_employee; Type: TABLE DATA; Schema: public; Owner: dorcas
--

COPY public.part_time_employee (caretakerusername) FROM stdin;
oompaloompa
dora
\.


--
-- Data for Name: pcs_administrator; Type: TABLE DATA; Schema: public; Owner: dorcas
--

COPY public.pcs_administrator (username, email, passworddigest, name, deletedat) FROM stdin;
pcsadmin	admin@petcaringservices.org.sg	$2a$10$n2q9efUAsWFKbPzTu6O/4udJG6/kuwV.X.c8uwHTX36cpCk/Er3aK	PCS Admin	\N
\.


--
-- Data for Name: pet; Type: TABLE DATA; Schema: public; Owner: dorcas
--

COPY public.pet (petownerusername, name, yearofbirth, breed, deletedat, gender, categoryname) FROM stdin;
ladygaga	Gougou	2012-01-01	dalmatian	\N	Male	Large dog
ladygaga	Gougou Jr.	2012-04-01	chihuahua	\N	Male	Small dog
oompaloompa	Mario	2012-12-31	golden retriever	\N	Male	Large dog
oompaloompa	Marie	2015-12-31	persian	\N	Female	Cat
oompaloompa	Hammy	2020-01-01	Golden Hamster	\N	Male	Hamster
oompaloompa	Hammy2	2013-01-01	furry	2020-10-18 23:05:49.355811	Female	Hamster
\.


--
-- Data for Name: pet_category; Type: TABLE DATA; Schema: public; Owner: dorcas
--

COPY public.pet_category (categoryname, dailyprice) FROM stdin;
Large dog	50.00
Small dog	30.00
Cat	30.00
Hamster	20.00
\.


--
-- Data for Name: pet_owner; Type: TABLE DATA; Schema: public; Owner: dorcas
--

COPY public.pet_owner (ccnumber, ccname, ccexpirydate, cccvvcode, petownerusername) FROM stdin;
\N	\N	\N	\N	ladygaga
123245	Oompa	2020-02-23	892	oompaloompa
\.


--
-- Data for Name: records_monthly_summary; Type: TABLE DATA; Schema: public; Owner: dorcas
--

COPY public.records_monthly_summary (caretakerusername, monthyear, totalnojobs, monthaveragerating, totalpetdays, salary) FROM stdin;
\.


--
-- Data for Name: requirement; Type: TABLE DATA; Schema: public; Owner: dorcas
--

COPY public.requirement (requirementtype, description, petname, petownerusername) FROM stdin;
Dietary Needs	Allergic to peanuts	Mario	oompaloompa
Daily Walks	he usually goes out around 9am and 5pm everyday	Mario	oompaloompa
Dietary Needs	No chocolate!!	Hammy	oompaloompa
Dietary Needs		Hammy2	oompaloompa
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: dorcas
--

COPY public.session (sid, sess, expire) FROM stdin;
TatHBNeuSZwVri-yiwVx1XTVLDNLObQV	{"cookie":{"originalMaxAge":86400000,"expires":"2020-10-23T16:49:26.843Z","httpOnly":false,"path":"/"},"passport":{"user":"oompaloompa"}}	2020-10-24 09:42:59
MhKn76yh4WIHnTqTeRxjcjyaErEzcWc5	{"cookie":{"originalMaxAge":86400000,"expires":"2020-10-23T17:11:57.095Z","httpOnly":false,"path":"/"},"passport":{"user":"oompaloompa"}}	2020-10-24 02:38:42
\.


--
-- Data for Name: total_set; Type: TABLE DATA; Schema: public; Owner: dorcas
--

COPY public.total_set (sum) FROM stdin;
0
\.


--
-- Name: app_user app_user_email_key; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT app_user_email_key UNIQUE (email);


--
-- Name: app_user app_user_pkey; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT app_user_pkey PRIMARY KEY (username);


--
-- Name: applies_for_leave_period applies_for_leave_period_pkey; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.applies_for_leave_period
    ADD CONSTRAINT applies_for_leave_period_pkey PRIMARY KEY (caretakerusername, startdate, enddate);


--
-- Name: appuser appuser_email_key; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.appuser
    ADD CONSTRAINT appuser_email_key UNIQUE (email);


--
-- Name: appuser appuser_pkey; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.appuser
    ADD CONSTRAINT appuser_pkey PRIMARY KEY (username);


--
-- Name: bidded_for_job bidded_for_job_pkey; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.bidded_for_job
    ADD CONSTRAINT bidded_for_job_pkey PRIMARY KEY (petname, petownerusername, caretakerusername, submittedat, startdate, enddate);


--
-- Name: bids bids_pkey; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.bids
    ADD CONSTRAINT bids_pkey PRIMARY KEY (petname, petownerusername, caretakerusername, submittedat, startdate, enddate);


--
-- Name: cares_for cares_for_pkey; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.cares_for
    ADD CONSTRAINT cares_for_pkey PRIMARY KEY (categoryname, caretakerusername);


--
-- Name: caretaker caretaker_pkey; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.caretaker
    ADD CONSTRAINT caretaker_pkey PRIMARY KEY (caretakerusername);


--
-- Name: full_time_employee full_time_employee_pkey; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.full_time_employee
    ADD CONSTRAINT full_time_employee_pkey PRIMARY KEY (caretakerusername);


--
-- Name: indicates_availability_period indicates_availability_period_pkey; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.indicates_availability_period
    ADD CONSTRAINT indicates_availability_period_pkey PRIMARY KEY (caretakerusername, startdate, enddate);


--
-- Name: modules modules_pkey; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_pkey PRIMARY KEY (mcode, sems);


--
-- Name: part_time_employee part_time_employee_pkey; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.part_time_employee
    ADD CONSTRAINT part_time_employee_pkey PRIMARY KEY (caretakerusername);


--
-- Name: pcs_administrator pcs_administrator_email_key; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.pcs_administrator
    ADD CONSTRAINT pcs_administrator_email_key UNIQUE (email);


--
-- Name: pcs_administrator pcs_administrator_pkey; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.pcs_administrator
    ADD CONSTRAINT pcs_administrator_pkey PRIMARY KEY (username);


--
-- Name: pet_category pet_category_pkey; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.pet_category
    ADD CONSTRAINT pet_category_pkey PRIMARY KEY (categoryname);


--
-- Name: pet_owner pet_owner_pkey; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.pet_owner
    ADD CONSTRAINT pet_owner_pkey PRIMARY KEY (petownerusername);


--
-- Name: pet pet_pkey; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.pet
    ADD CONSTRAINT pet_pkey PRIMARY KEY (petownerusername, name);


--
-- Name: records_monthly_summary records_monthly_summary_pkey; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.records_monthly_summary
    ADD CONSTRAINT records_monthly_summary_pkey PRIMARY KEY (caretakerusername, monthyear);


--
-- Name: requirement requirement_pkey; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.requirement
    ADD CONSTRAINT requirement_pkey PRIMARY KEY (requirementtype, petname, petownerusername);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: dorcas
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- Name: applies_for_leave_period applies_for_leave_period_caretakerusername_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.applies_for_leave_period
    ADD CONSTRAINT applies_for_leave_period_caretakerusername_fkey FOREIGN KEY (caretakerusername) REFERENCES public.full_time_employee(caretakerusername) ON DELETE CASCADE;


--
-- Name: bidded_for_job bidded_for_job_caretakerusername_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.bidded_for_job
    ADD CONSTRAINT bidded_for_job_caretakerusername_fkey FOREIGN KEY (caretakerusername) REFERENCES public.caretaker(caretakerusername) ON DELETE CASCADE;


--
-- Name: bidded_for_job bidded_for_job_petname_petownerusername_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.bidded_for_job
    ADD CONSTRAINT bidded_for_job_petname_petownerusername_fkey FOREIGN KEY (petname, petownerusername) REFERENCES public.pet(name, petownerusername) ON DELETE CASCADE;


--
-- Name: bids bids_caretakerusername_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.bids
    ADD CONSTRAINT bids_caretakerusername_fkey FOREIGN KEY (caretakerusername) REFERENCES public.caretaker(caretakerusername) ON DELETE CASCADE;


--
-- Name: bids bids_petname_petownerusername_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.bids
    ADD CONSTRAINT bids_petname_petownerusername_fkey FOREIGN KEY (petname, petownerusername) REFERENCES public.pet(name, petownerusername) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cares_for cares_for_caretakerusername_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.cares_for
    ADD CONSTRAINT cares_for_caretakerusername_fkey FOREIGN KEY (caretakerusername) REFERENCES public.caretaker(caretakerusername);


--
-- Name: cares_for cares_for_categoryname_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.cares_for
    ADD CONSTRAINT cares_for_categoryname_fkey FOREIGN KEY (categoryname) REFERENCES public.pet_category(categoryname);


--
-- Name: caretaker caretaker_caretakerusername_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.caretaker
    ADD CONSTRAINT caretaker_caretakerusername_fkey FOREIGN KEY (caretakerusername) REFERENCES public.appuser(username);


--
-- Name: full_time_employee full_time_employee_caretakerusername_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.full_time_employee
    ADD CONSTRAINT full_time_employee_caretakerusername_fkey FOREIGN KEY (caretakerusername) REFERENCES public.caretaker(caretakerusername) ON DELETE CASCADE;


--
-- Name: indicates_availability_period indicates_availability_period_caretakerusername_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.indicates_availability_period
    ADD CONSTRAINT indicates_availability_period_caretakerusername_fkey FOREIGN KEY (caretakerusername) REFERENCES public.part_time_employee(caretakerusername) ON DELETE CASCADE;


--
-- Name: part_time_employee part_time_employee_caretakerusername_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.part_time_employee
    ADD CONSTRAINT part_time_employee_caretakerusername_fkey FOREIGN KEY (caretakerusername) REFERENCES public.caretaker(caretakerusername) ON DELETE CASCADE;


--
-- Name: pet pet_categoryname_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.pet
    ADD CONSTRAINT pet_categoryname_fkey FOREIGN KEY (categoryname) REFERENCES public.pet_category(categoryname);


--
-- Name: pet_owner pet_owner_petownerusername_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.pet_owner
    ADD CONSTRAINT pet_owner_petownerusername_fkey FOREIGN KEY (petownerusername) REFERENCES public.appuser(username);


--
-- Name: pet pet_petownerusername_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.pet
    ADD CONSTRAINT pet_petownerusername_fkey FOREIGN KEY (petownerusername) REFERENCES public.pet_owner(petownerusername) ON DELETE CASCADE;


--
-- Name: records_monthly_summary records_monthly_summary_caretakerusername_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.records_monthly_summary
    ADD CONSTRAINT records_monthly_summary_caretakerusername_fkey FOREIGN KEY (caretakerusername) REFERENCES public.caretaker(caretakerusername) ON DELETE CASCADE;


--
-- Name: requirement requirement_petname_petownerusername_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dorcas
--

ALTER TABLE ONLY public.requirement
    ADD CONSTRAINT requirement_petname_petownerusername_fkey FOREIGN KEY (petname, petownerusername) REFERENCES public.pet(name, petownerusername) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

