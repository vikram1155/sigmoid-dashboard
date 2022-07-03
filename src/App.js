import { Component } from "react";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import DatePickerApp from "./components/DatePickerApp";

class Stack extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact={true} path="/" element={<Login/>} />
          <Route path="/date" element={<DatePickerApp/>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default Stack;
