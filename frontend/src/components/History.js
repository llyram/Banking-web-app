import react, { useEffect, useState } from "react";

const History = () => {
  const [transactions, setTransactions] = useState([]);

  const getHistory = async () => {
    try {
      const response = await fetch("/gethistory");
      const jsonData = await response.json();
      // console.log(jsonData);
      setTransactions(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="History">
      <div className="container">
        <h1>All Transactions</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Transfer Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr>
                <td>{transaction.t_id}</td>
                <td>{transaction.sender}</td>
                <td>{transaction.receiver}</td>
                <td>{transaction.transfer_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
