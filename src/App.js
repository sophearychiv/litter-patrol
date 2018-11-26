import React, { Component } from 'react';
import uuid from 'uuid';
import './App.css';
import GameItem from './components/GameItem.js';
import logo from './images/logo.png';

class App extends Component {
  config = {
    itemTypes: {
      // type: spawn rate (weighting)
      litter:  20,
      rock:     5,
      bush:     5,
      flower:   5,
      mushroom: 5,
    },
    spawnRate: 1.2, // Hz
    spawnRateRnd: 1.79, // randomization factor
    spawnHeight: 100, // height of item spawn area in pixels
    spawnFloor: 0, // offset from bottom of game "level" in pixels
    itemLifetime: 10 * 1000, // 10 seconds (should be longer than CSS animation time)
  }

  constructor() {
    super();

    this.state = {
      items: [],
      points: 0,
    };

    // Uncomment this to spawn a single test item
    //const testItem = this.spawnItem(Date.now());
    //this.state.items.push(testItem);

    // Uncomment this to automatically spawn new items
    this.enableSpawner();

    console.log(this.state);
  }

  onItemClicked = () => {
    // Fill this in!
  }

  render() {
    const items = this.state.items.map((item, i) => {
      return <GameItem
               height={item.height}     // Height - used for a CSS style to position on the screen
               layer={100 + i}          // Layer - used for a CSS style to show items on-top of bg
               key={item.id}            // Key - to help React with performance

               // Additional props (event callbacks, etc.) can be passed here
             />;
    });

    return (
      <div className="game">
        <section className="hud">
          <h2 className="score">Litter Spotted: { this.state.points }</h2>
          <img className="logo" src={logo} alt="Litter Patrol logo" />
        </section>

        <section className="level">
          { this.levelBackground() }
          { items }
        </section>

      </div>
    );
  }


  //////////////\\\\\\\\\\\\\\
  // Implementation details \\

  tick(time) {
    const newState = {};

    // Cull any items that are expired
    const items = this.state.items.filter((item) => {
      return item.expiration !== null && item.expiration > time;
    });

    if(items.length !== this.state.items.length) {
      newState.items = items;
    }

    // Should we spawn a new item?
    const {spawnRate, spawnRateRnd} = this.config;
    if(this.spawnItems && spawnRate > 0) {
      let spawnDelta = time - (this.lastSpawn || 0);

      // Randomize spawn rate
      if(spawnRateRnd > 0) {
        const factor = 1 + Math.random() * spawnRateRnd;
        spawnDelta *= factor;
      }

      if(spawnDelta >= (1 / spawnRate) * 1000) {
        newState.items = [
          ...(newState.items || this.state.items),
          this.spawnItem(time),
        ];
      }
    }

    return newState;
  }

  spawnItem(time) {
    this.lastSpawn = time;

    // Figure out what kind of item to create
    const id = uuid();
    const type = this.randomType();

    const expiration = time + this.config.itemLifetime;
    const height = Math.random() * this.config.spawnHeight + this.config.spawnFloor;

    return {id, type, expiration, height};
  }

  randomType() {
    // Figure out the total of all the weighted types
    const totalWeight = Object.values(this.config.itemTypes).reduce((l,r)=>l+r,0);

    // Get a random value between zero and the total
    let choice = Math.random() * totalWeight;
    let selectedType = null;

    // Loop through all item types and figure out which one we chose
    Object.entries(this.config.itemTypes).forEach(([type, weight]) => {
      if(selectedType !== null) return; // We've already found our choice

      // If the random value was less than this type's weight
      if(choice <= weight) {
        selectedType = type; // then we've selected it
      } else {
        choice -= weight; // otherwise move past this entry
      }
    });

    return selectedType;
  }

  enableSpawner() {
    this.spawnItems = true;
  }

  levelBackground() {
    const layers = ['clouds-1', 'clouds-2', 'clouds-3', 'clouds-4',
                    'hills-1','hills-2','bushes','trees-1','trees-2','ground'];
    return (
      <div className="level-bg">
        {layers.map(layer => (<div className={`level-bg-${layer}`} key={layer} />))}
      </div>
    );
  }

  componentDidMount() {
    // Update the game state (active items) at a fixed rate
    const update = () => {
      const callback = () => {
        this.updateTimer = setTimeout(update, 1000 / 8);
      };

      const newState = this.tick(Date.now());

      if(Object.keys(newState).length > 0) {
        this.setState(newState, callback);
      } else {
        callback();
      }
    };

    update();
  }

  componentWillUnmount() {
    if(this.updateTimer !== null) {
      clearInterval(this.updateTimer);
    }
  }
}

export default App;
