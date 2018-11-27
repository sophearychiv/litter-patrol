# Litter Patrol

In this assignment, you'll be building a litter patrol game. Get points for spotting the litter!

## Learning Goals
- Practice with `state` and `props`
- Pass state data from parent component to child component as props
- Pass event handler functions from parent component to child component as a prop
- Control the rendering behavior of a component with conditional logic

## Scaffolding
The project structure includes two partially-implemented components, `App` and `GameItem`. You will need to add code into both of these components to complete the project, however you should only need to modify the existing code when there is a comment explicitly saying roughly "add your code here".

The game engine has been created for you, and is largely implemented within the `App` component beneath the comment about "implementation details". Feel free to read through this code, but understanding it is not the learning goal for this project.

The state in the top-level component, `App`, contains two items:
1. **items** - an array of objects that are a representation of each of _active_ items on the game screen.<br>The existing game engine code is responsible for adding and removing items from this array as necessary, however for testing purposes you may turn off that logic by commenting out a line in the `constructor` function.
1. **points** - an integer that contains the number of points the player has scored by clicking on litter items.

## Requirements
### Baseline
Review the provided code in both `src/App.js` and `src/components/GameItem.js`. Within the `App` component it is not necessary to review any of the code other than the `constructor` and `render` functions. Add comments to the code when you've read through it and have begun to understand it.

Check out a completed version of the game [here](#). Start the game with `npm start` and get a feel for how it works without any of the game logic implemented. 

### Wave 1 - Item Types
For this wave you will need to update the `GameItem` component to display the correct icon for each item. Consider what data from the `App` component we have which might be useful for that code.

Once you have an idea of what data is needed, update the `render` function in `App` to provide the necessary information as a prop to `GameItem`. After that, update the `render` function in `GameItem` to check the additional data and use the correct icon.

### Wave 2 - Spotting Items
For this wave you will begin to implement the game logic by allowing the player to spot items as they scroll by. Players can "spot" an item by clicking on it, and the game gives immediate feedback on whether the item was litter.

* When a player clicks on a game item that has not yet been clicked upon, the item displays either:
    * a green check, if the item has type 'litter'
    * a red X, otherwise
* When a player clicks on a game item that has already been clicked upon, nothing changes with the item's display

Each `GameItem` component should track whether it has been spotted using an event handler. You will need to update the `render` function as well to use the appropriate CSS classes to indicate whether the spotted item was litter or not.

### Wave 3 - Scoring Points
For this wave you will finalize the game logic by keeping score. The game's scoring logic is based entirely on what type of item was clicked upon:

* When a player clicks on a game item that has the type 'litter', their score should increase by 1 point
* When a player clicks on a game item that has any other type, their score does NOT increase

In order to implement the above logic you will need to modify both the `GameItem` and `App` components.

The `App` component should have the code that actually updates the score, because it is the component where that value is stored in `state`. However, the `GameItem` component is the only one that can actually handle the click event for that specific item, so you will need to write code to connect the two components.

## Attribution
The original version of this assignment was based off a "whack-a-mole" game from [Code Platoon](https://codeplatoon.org/). Versions since C10 are no longer based upon that scaffold.

The Litter Patrol logo was made with [Textcraft](https://textcraft.net/).

The litter icon is from the Tango! Desktop Project ([details here](https://commons.wikimedia.org/wiki/File:Mail-mark-junk-2.svg)).

All other icons and the background images by [RavenTale Studio](https://raventale.itch.io/).
