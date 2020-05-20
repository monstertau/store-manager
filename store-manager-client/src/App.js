import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import CustomHeader from "./app/layout/header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <CustomHeader></CustomHeader>
    </div>
  );
}

export default App;
