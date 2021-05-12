import react, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";

const Transact = () => {
  const [customers, setCustomers] = useState([]);
  const [sender_name, setSender] = useState("");
  const [receiver_name, setReceiver] = useState("");
  const [amount, setAmount] = useState(-1);
  const [sender_bal, setSenderBal] = useState();

  let history = useHistory();

  // var sender_name = "",
  //   sender_bal,name
  //   receiver_name = "";
  var sender_id, receiver_id, i;
  // var amount = -1;

  const getCustomers = async () => {
    try {
      const response = await fetch("/getcustomers");
      const jsonData = await response.json();

      setCustomers(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const transactionHandler = async (e) => {
    e.preventDefault();

    try {
      console.log(sender_name, receiver_name, amount);
      if (sender_name == "") {
        window.alert("Select sender!");
        return;
      } else if (receiver_name == "") {
        window.alert("Select Receiver");
        return;
      } else if (amount == -1) {
        window.alert("Please enter amount to be transferred!");
        return;
      } else if (sender_bal < amount) {
        window.alert("Insufficient Funds!!");
        return;
      } else if (sender_name == receiver_name) {
        window.alert("Sender and Receiver Cannot be the same!!");
        return;
      }
      const body = { sender_name, receiver_name, amount };

      const response = await fetch("/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(response);
      window.confirm("Transaction Successful!");
      getCustomers();

      history.push("/history");
      
    } catch (error) {
      console.log(error.message);
    }
  };

  const senderChangeHandler = (e) => {
    sender_id = e.target.value;
    for (i = 0; i < 10; i++) {
      if (customers[i].c_id == sender_id) {
        setSender(customers[i].name);
        setSenderBal(customers[i].balance);
      }
    }

    console.log(sender_name, sender_bal);
  };

  const receiverChangeHandler = (e) => {
    receiver_id = e.target.value;
    for (i = 0; i < 10; i++) {
      if (customers[i].c_id == receiver_id) {
        setReceiver(customers[i].name);
      }
    }

    console.log(receiver_name);
  };

  const amountChangeHandler = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div className="Transact">
      <div className="container transfer">
        <span className="title">Transfer Form</span>
        <br />
        <br />
        <form action="">
          <div>
            Sender: <br />
            <select name="sender" id="sender" onChange={senderChangeHandler}>
              <option selected disabled>
                Choose Sender
              </option>
              {customers.map((customer) => (
                <option value={customer.c_id}>
                  {customer.name} [Rs.{customer.balance}]
                </option>
              ))}
            </select>
          </div>
          <br />
          <div>
            Receiver: <br />
            <select
              name="receiver"
              id="receiver"
              onChange={receiverChangeHandler}
            >
              <option selected disabled>
                Choose Sender
              </option>
              {customers.map((customer) => (
                <option value={customer.c_id}>
                  {customer.name} [Rs.{customer.balance}]
                </option>
              ))}
            </select>
          </div>
          <br />
          <div>
            Amount: <br />
            <input
              type="text"
              placeholder="Rs."
              onChange={amountChangeHandler}
            />
          </div>
          <div className="transfer-btn">
            <button onClick={transactionHandler}>Transfer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Transact;
