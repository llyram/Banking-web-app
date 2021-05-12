CREATE DATABASE bank;

CREATE TABLE customers(
    c_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    balance FLOAT
);

CREATE TABLE transfers(
    t_id SERIAL PRIMARY KEY,
    sender VARCHAR(255),
    receiver VARCHAR(255),
    transfer_amount FLOAT
);