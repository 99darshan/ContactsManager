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

-- INSERT INTO test
--     (firstName,lastName,phoneNumber,company,email,address)
-- VALUES
--     ('test', 'name', 123456789, 'aalu company', 'aalu@hawa.com', '123 street jupiter');