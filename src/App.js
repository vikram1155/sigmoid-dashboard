import { Component } from "react";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import DatePickerApp from "./components/DatePickerApp";
import Dashboard from "./components/Dashboard";

class Stack extends Component {
  render() {
    return (
      <BrowserRouter>
        <h3 style={{ textAlign: "center" }}>SIGMOID DATA ANALYTICS DASHBOARD</h3>
        <Routes>
          <Route exact={true} path="/" element={<Login />} />
          <Route path="/date" element={<DatePickerApp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default Stack;
