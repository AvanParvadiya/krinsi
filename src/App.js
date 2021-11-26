// import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Link, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Transactions from "./Transactions";
import React, { useContext } from "react";
import AddTransaction from "./AddTransaction";
import AuthContext from "./store/auth-context";
import { AuthForm } from "./pages/AuthForm";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          AvanParvadiya
        </a>
        <div className="navbar-nav mr-auto">
          {isLoggedIn && (
            <>
              {" "}
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
              <li className="nav-item">
                <button className="btn nav-link" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </>
          )}
        </div>
      </nav>
      <div className="container mt-3">
        <div className="App">
          <Switch>
            <Route exact path="/">
              {!isLoggedIn && <AuthForm />}
              {isLoggedIn && <Redirect to="/transactions" />}
            </Route>
            <Route exact path="/transactions">
              {isLoggedIn && <Transactions />}
              {!isLoggedIn && <Redirect to="/" />}
            </Route>
            <Route path="/add">
              {isLoggedIn && <AddTransaction />}
              {!isLoggedIn && <Redirect to="/" />}
            </Route>
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
