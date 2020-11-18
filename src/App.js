import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const abc = () => {
    for (let i = 0; i < 3; i++) {
      //debugger;
      switch (i) {
        case 0:
          break;
        case 1:
          console.log("one");
        case 2:
          console.log("two");
        case 2:
          console.log("three");
        default:
          break;
      }
    }
  };
  abc();
  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
