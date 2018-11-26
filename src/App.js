import React, { Component } from 'react';
import uuid from 'uuid';
import './App.css';
import Trash from './components/Trash.js';

class App extends Component {
  config = {
    objectTypes: {
      // type: spawn rate (weighting)
      litter:  20,
      rock:     5,
      bush:     5,
      flower:   5,
      mushroom: 5,
    },
    spawnRate: 1.2, // Hz
    spawnRateRnd: 1.79, // randomization factor
    spawnHeight: 100, // height of object spawn area in pixels
    spawnFloor: 0, // offset from bottom of game "level" in pixels
    objLifetime: 10 * 1000, // 10 seconds (should be longer than CSS animation time)
  }

  constructor() {
    super();

    this.state = {
      objects: [],
      points: 0,
    };

    // Uncomment this to spawn a single test object
    //const testObj = this.spawnObject(Date.now());
    //this.state.objects.push(testObj);

    // Uncomment this to automatically spawn new objects
    this.enableSpawner();

    console.log(this.state);
  }

  onTrashClicked = () => {
    // Fill this in!
  }

  render() {
    const objects = this.state.objects.map((obj, i) => {
      return <Trash
               height={obj.height}      // Height - used for a CSS style to position on the screen
               layer={100 + i}          // Layer - used for a CSS style to show objects on-top of bg
               key={obj.id}             // Key - to help React with performance

               // Additional props (event callbacks, etc.) can be passed here
             />;
    });

    return (
      <div className="game">
        <section className="hud">
          <h1>Litter Patrol</h1>
          <h2>Litter Spotted: { this.state.points }</h2>
        </section>

        <section className="level">
          { this.levelBackground() }
          { objects }
        </section>

      </div>
    );
  }


  //////////////\\\\\\\\\\\\\\
  // Implementation details \\

  tick(time) {
    // Cull any objects that are expired
    const objects = this.state.objects.filter((obj) => {
      return obj.expiration !== null && obj.expiration > time;
    });

    if(objects.length !== this.state.objects.length) {
      this.setState({ objects });
    }

    // Should we spawn a new object?
    const {spawnRate, spawnRateRnd} = this.config;
    if(this.spawnObjects && spawnRate > 0) {
      let spawnDelta = time - (this.lastSpawn || 0);

      // Randomize spawn rate
      if(spawnRateRnd > 0) {
        const factor = 1 + Math.random() * spawnRateRnd;
        spawnDelta *= factor;
      }

      if(spawnDelta >= (1 / spawnRate) * 1000) {
        this.setState({
          objects: [...this.state.objects, this.spawnObject(time)],
        });
      }
    }
  }

  spawnObject(time) {
    this.lastSpawn = time;

    // Figure out what kind of object to create
    const id = uuid();
    const type = this.randomType();

    const expiration = time + this.config.objLifetime;
    const height = Math.random() * this.config.spawnHeight + this.config.spawnFloor;

    return {id, type, expiration, height};
  }

  randomType() {
    // Figure out the total of all the weighted types
    const totalWeight = Object.values(this.config.objectTypes).reduce((l,r)=>l+r,0);

    // Get a random value between zero and the total
    let choice = Math.random() * totalWeight;
    let selectedType = null;

    // Loop through all object types and figure out which one we chose
    Object.entries(this.config.objectTypes).forEach(([type, weight]) => {
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
    this.spawnObjects = true;
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
    // Update the game state (active objects) at a fixed rate
    this.tickInterval = setInterval(() => {
      this.tick(Date.now());
    }, 1000 / 8);

    // Log state every 10 seconds
    //setInterval(() => console.log(this.state), 10000);
  }

  componentWillUnmount() {
    if(this.tickInterval !== null) {
      clearInterval(this.tickInterval);
    }
  }
}

export default App;
