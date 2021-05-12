const express = require("express");
const app = express();
const cors = require("cors");
const pool  = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

// process.env.PORT

// Middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production"){
    // serve statci content
    app.use(express.static(path.join(__dirname, "frontend/build")));
}

// Routes //

// get all users
app.get("/customers", async (req, res) => {
    const allCustomers = await pool.query("SELECT * FROM customers ORDER BY c_id");
    res.json(allCustomers.rows);
});


// add transaction
app.post("/transfer", async (req, res) => {
    const {sender_name, receiver_name, amount} = req.body;
    console.log(sender_name, receiver_name, amount);

    const newTransaction = await pool.query(
        "INSERT INTO transfers (sender, receiver, transfer_amount) VALUES ($1, $2, $3) RETURNING *", 
        [sender_name, receiver_name, amount]
    );

    const addAmount = await pool.query(
        "UPDATE customers SET balance = balance + $1 WHERE name = $2",
        [amount, receiver_name]
    )

    const subtractAmount = await pool.query(
        "UPDATE customers SET balance = balance - $1 WHERE name = $2",
        [amount, sender_name]
    )

    res.json(newTransaction);

    
});

// get all transactions
app.get("/history", async (req, res) => {
    const allCustomers = await pool.query("SELECT * FROM transfers");
    res.json(allCustomers.rows);
});


app.listen(PORT, () => {
    console.log(`server has started at port ${PORT}`);
});