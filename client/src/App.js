import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter as Router, Route } from "react-router-dom";
import {Header} from "./components/Header";
import {NavBar} from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <NavBar/>
      </Router>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
    </div>
  );
}

export default App;
