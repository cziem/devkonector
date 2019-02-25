import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";

import store from "../store/store";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser } from "../actions/authActions";

import "../styles/App.css";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Landing from "./layouts/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info and exp
  const decoded = jwtDecode(localStorage.jwtToken);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
