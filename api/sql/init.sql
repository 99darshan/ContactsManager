--TODO: Create user first from command line
-- CREATE DATABASE contacts_manager
--     WITH 
--     OWNER = "99darshan"
-- ENCODING = 'UTF8'
--     CONNECTION LIMIT = -1;

CREATE TABLE contacts
(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR,
    phone_number INT NOT NULL,
    company VARCHAR,
    email VARCHAR,
    address VARCHAR,
    birthday DATE,
    is_favorite BOOLEAN DEFAULT false,
    facebook_id BIGINT not null
);

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    facebook_id BIGINT UNIQUE not null,
    name varchar,
    email varchar,
    profile_picture varchar
);

-- INSERT INTO contacts
--     (first_name,last_name,phone_number,company,email,address,birthday)
-- VALUES
--     ('test', 'name', 123456789, 'aalu company', 'aalu@hawa.com', '123 street jupiter', current_date);
