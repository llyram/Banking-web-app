import "./App.css";
import react from "react";
import { BrowserRouter as Router, Switch, Route , Redirect} from "react-router-dom";

// importing components
import Header from "./components/Header";
import Home from "./components/Home";
import Customers from "./components/Customers";
import Transact from "./components/Transact";
import History from "./components/History";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/customers" component={Customers} />
        <Route path="/transact" component={Transact} />
        <Route path="/history" component={History} />
      </div>
    </Router>
  );
};

export default App;
