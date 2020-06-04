import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
console.log("here");

ReactDOM.hydrate(
  <App display={"This is a prop from client"} />,
  document.getElementById("root")
);
