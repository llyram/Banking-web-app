import react from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="inner-header">
        <Link to="/home">
          <div className="logo">
            <h1>Banking App</h1>
          </div>
        </Link>
        <ul className="navigation">
          <Link to="/home">
            <a>
              <li>Home</li>
            </a>
          </Link>
          <Link to="/customers">
            <a>
              <li>Customers</li>
            </a>
          </Link>
          <Link to="/transact">
            <a>
              <li>Make transactions</li>
            </a>
          </Link>
          <Link to="history">
            <a>
              <li>Transaction History</li>
            </a>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
