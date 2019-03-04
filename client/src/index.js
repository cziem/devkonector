import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import dotenv from "dotenv";

dotenv.config();

ReactDOM.render(<App />, document.getElementById("root"));
