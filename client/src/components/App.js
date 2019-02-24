import React, { Component } from "react";
import "../styles/App.css";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Landing from "./layouts/Landing";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
