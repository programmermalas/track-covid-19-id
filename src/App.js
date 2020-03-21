import React, { Component } from 'react';

import './assets/css/tailwind.css';

import Indonesia from './containers/Indonesia';

class App extends Component {
  render() {
    return(
      <div className="App">
        <div className="container mx-auto">
          <h1 className="text-4xl font-extrabold text-pink-800">Covid 19</h1>

          <h1 className="text-4xl font-extrabold text-gray-800">Global ( Work in progress )</h1>

          <Indonesia />
        </div>
      </div>
    );
  };
};

export default App;
