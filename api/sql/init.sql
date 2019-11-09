--TODO: Create user first from command line
-- CREATE DATABASE contacts_manager
--     WITH 
--     OWNER = "99darshan"
-- ENCODING = 'UTF8'
--     CONNECTION LIMIT = -1;

CREATE TABLE contacts
(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR NOT NULL,
    lastName VARCHAR,
    phoneNumber INT NOT NULL,
    company VARCHAR,
    email VARCHAR,
    address VARCHAR
);

-- INSERT INTO contacts
--     (firstName,lastName,phoneNumber,company,email,address)
-- VALUES
--     ('test', 'name', 123456789, 'aalu company', 'aalu@hawa.com', '123 street jupiter');