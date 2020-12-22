import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Movies from "./components/movies";

export default class App extends Component {
  render() {
    return (
      <main className="container">
        <Movies />
      </main>
    );
  }
}
