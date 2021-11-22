// import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";


// import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Transactions from "./Transactions";
import React from "react";
import AddTransaction from "./AddTransaction";

function App() {
  // const transactionCtx = useContext(StoreContext);
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          AvanParvadiya
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/transactions"} className="nav-link">
              Transactions
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <div className="App">
          <Switch>
            <Route exact path="/transactions">
              <Transactions />
            </Route>

            <Route path="/add">
              <AddTransaction />
            </Route>
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
