# Basic Banking Application

This is a Banking application made for Task 1 of GRIP(Graduate Rotational Internship Program) under [The Sparks Foundation](https://www.thesparksfoundationsingapore.org/).

This Full Stack application is made using
1. Postgres SQL
2. ExpressJS
3. ReactJS
4. NodeJS

The project is hosted using [heroku](https://www.heroku.com/about), [here](https://grip-banking-app.herokuapp.com/).

Checkout this same project made using Firebase and the backend on github [here](https://github.com/Maryll-castelino/firebase-bank)
hosted using firebase [here](https://fir-bank-c280b.web.app/home)

## Screenshots:

![home](https://github.com/Maryll-castelino/grip-banking-app/blob/master/screenshots/home.png?raw=true)
![customers](https://github.com/Maryll-castelino/grip-banking-app/blob/master/screenshots/customers.png?raw=true)
![transfer](https://github.com/Maryll-castelino/grip-banking-app/blob/master/screenshots/transfer.png?raw=true)
![history](https://github.com/Maryll-castelino/grip-banking-app/blob/master/screenshots/history.png?raw=true)

## To run on your local machine:

### Set up the database:
1. Install PostgreSQL.
2. create a new database.
```
CREATE DATABASE bank;
```
3. create new tables in that database.
```
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
```

4. Add mock data to the customers table.
5. create a .env file in the source folder of the project with the following enviornment variables.
```
PG_USER = postgres
PG_PASSWORD = <password of the postgres user>
PG_HOST = localhost
PG_PORT = 5432
PG_DATABASE = bank
```
6. run `npm install` in the root folder as well as the frontend folder.
7. run `node index` in the root folder to start the backend on `http://localhost:5000`.
8. run `npm start` in the frontend folder to start the react frontend at `http://localhost:3000`.

