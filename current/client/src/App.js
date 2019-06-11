import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
function post(data) {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data })
  };
}
function get() {
  return {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  };
}
function App() {
  useEffect(() => {
    function fetchData() {
      const loc = { lat: 123.123, lon: 123.13 };
      // const data = await fetch('http://localhost:8000/api/location', post(loc));
      // const data = await fetch('/api/json', get());
      fetch('http://localhost:5000/api/json', get())
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          console.log(JSON.stringify(myJson));
        });
      // const res = await data.json();
      // console.log(res);
    }
    fetchData();
  });
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
