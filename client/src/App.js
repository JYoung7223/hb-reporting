import './App.css';
import React from "react";
import {BrowserRouter as Router, Route } from "react-router-dom";
import {Header} from "./components/Header";
import {NavBar} from "./components/NavBar";
import {Home} from "./components/Home";
// import {Budgets} from "./components/Budgets";
// import {Stats} from "./components/Stats";
import {Footer} from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <NavBar/>
        <Route exact path="/" component={Home}/>
        {/* <Route exact path="/budgets" component={Budgets}/>
        <Route exact path="/stats" component={Stats}/> */}
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
