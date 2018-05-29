# Litter Patrol

In this assignment, you'll be building a litter patrol game. Get points for "cleaning up" the trash!

## Learning Goals
- Practice with `state` and `props`
- Pass state data from parent component to child component as props
- Pass event handler functions from parent component to child component as a prop
- Conditionally render components

## Scaffolding
The game engine has been created for you. The state in the top-level component, `App.js`, contains two items:
1. **bins** - an array of objects that are a representation of each of the trash bins in the game.
2. **points** - an integer that contains the number of times your trash was put in the bin, i.e. clicked.

## Requirements

### Baseline
Inspect `App.js` and parse through the logic that exists to understand the game engine logic - this will help you achieve the overall objectives.

- Add comments to the `startGame()`, `getBinState()` methods that explain what the code is doing or what outstanding questions you have about the code.
- Review these comments with a neighbor before moving on to Wave 1 requirements.

### Wave 1
Modify the `props` that are passed into `Trash.js` and the `Trash.js` component itself so that the Trash image only appears when the **isTrashVisible** property of the appropriate **bin** object is set to true.

### Wave 2
1. Fill in the `onTrashClicked` function to increment the points when the event handler is called.
2. Tie this event handler function to the `Trash` component so that points are incremented whenever a **visible** trash is clicked.

#### Attribution
This assignment is based off a "whack-a-mole" game from [Code Platoon](https://codeplatoon.org/).
