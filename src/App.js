import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Auth from "./component/Auth/Auth";
import Dashboard from "./component/Dashboard/Dashboard";
import Form from "./component/Form/Form";
import Nav from "./component/Nav/Nav";
import Post from "./component/Post/Post";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React</h1>
        </header>
        <p className="App-intro">
          <Auth />
          <Dashboard />
          <Form />
          <Nav />
          <Post />
        </p>
      </div>
    );
  }
}

export default App;
