const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

// process.env.PORT

// Middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  // serve static content
  app.use(express.static(path.join(__dirname, "frontend/build")));
}

// Routes //

// get all users
app.get("/getcustomers", async (req, res) => {
  console.log("query");
  try {
    const allCustomers = await pool.query(
      "SELECT * FROM customers ORDER BY c_id"
    );
    console.log(allCustomers.rows);
    res.json(allCustomers.rows);
    res.json(mock_return);
  } catch (err) {
    console.log(err.message);
  }
});

// add transaction
app.post("/transfer", async (req, res) => {
  const { sender_name, receiver_name, amount } = req.body;
  // console.log(sender_name, receiver_name, amount);
  try {
    const newTransaction = await pool.query(
      "INSERT INTO transfers (sender, receiver, transfer_amount) VALUES ($1, $2, $3) RETURNING *",
      [sender_name, receiver_name, amount]
    );

    const addAmount = await pool.query(
      "UPDATE customers SET balance = balance + $1 WHERE name = $2",
      [amount, receiver_name]
    );

    const subtractAmount = await pool.query(
      "UPDATE customers SET balance = balance - $1 WHERE name = $2",
      [amount, sender_name]
    );

    res.json(newTransaction);
  } catch (err) {
    console.log(err.message);
  }
  
});

// get all transactions
app.get("/gethistory", async (req, res) => {
  const allCustomers = await pool.query("SELECT * FROM transfers");
  res.json(allCustomers.rows);
});

app.listen(PORT, () => {
  console.log(`server has started at port ${PORT}`);
});


const mock_return = [
  {
    c_id: 1,
    name: 'Ermengarde Nickolls',
    email: 'enickolls0@yahoo.com',
    balance: 10684
  },
  {
    c_id: 2,
    name: 'Harmon Pughsley',
    email: 'hpughsley1@cam.ac.uk',
    balance: 41251
  },
  {
    c_id: 3,
    name: 'Noel Di Gregorio',
    email: 'ndi2@addthis.com',
    balance: 26718
  },
  {
    c_id: 4,
    name: 'Berty Balham',
    email: 'bbalham3@nytimes.com',
    balance: 42490
  },
  {
    c_id: 5,
    name: 'Kitty Troppmann',
    email: 'ktroppmann4@symantec.com',
    balance: 8592
  },
  {
    c_id: 6,
    name: 'Barrett Shankle',
    email: 'bshankle5@sciencedaily.com',
    balance: 65750
  },
  {
    c_id: 7,
    name: 'Luella Lapham',
    email: 'llapham6@baidu.com',
    balance: 28375
  },
  {
    c_id: 8,
    name: 'Tori Clyant',
    email: 'tclyant7@vinaora.com',
    balance: 54420
  },
  {
    c_id: 9,
    name: 'Nickey Boulding',
    email: 'nboulding8@google.ru',
    balance: 38044
  },
  {
    c_id: 10,
    name: 'Allina Simao',
    email: 'asimao9@youtu.be',
    balance: 39923
  }
]
