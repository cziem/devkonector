import React, { Component } from "react";
import "../styles/App.css";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <h1>DevKonector</h1>
        <Footer />
      </div>
    );
  }
}

export default App;
