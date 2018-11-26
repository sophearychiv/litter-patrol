import React, { Component } from 'react';
import './App.css';
import Trash from './components/Trash.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      points: 0,
    };

    console.log(this.state);
  }

  onTrashClicked = () => {
    // Fill this in!
  }

  render() {
    return (
      <div className="App">
        <section className="overall-data">
          <h1>Litter Patrol</h1>
          <h2>Points: { this.state.points }</h2>
        </section>
      </div>
    );
  }
}

export default App;
