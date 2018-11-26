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
      <div className="game">
        <section className="hud">
          <h1>Litter Patrol</h1>
          <h2>Litter Spotted: { this.state.points }</h2>
        </section>
      </div>
    );
  }
}

export default App;
