import React, { Component } from 'react';
import '../App.css';
import ItemIcons from '../ItemIcons.js';
import PropTypes from 'prop-types';

class GameItem extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    layer: PropTypes.number.isRequired,
  }

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     items: this.items,
  //   }

  // }


  render() {
    const itemStyle = {
      bottom: `${this.props.height}px`, // use props.height to offset from the bottom of screen
      zIndex: this.props.layer, // use props.layer to set z-index, so we display ontop of background
    };

    // Update this to select the correct icon for each item
    // const icon = ItemIcons.rock;
    let icon;
    if (this.props.itemType === "rock") {
      icon = ItemIcons.rock;
    }

    if (this.props.itemType === "litter") {
      icon = ItemIcons.litter;
    }

    if (this.props.itemType === "bush") {
      icon = ItemIcons.bush;
    }

    if (this.props.itemType === "flower") {
      icon = ItemIcons.flower;
    }

    if (this.props.itemType === "mushroom") {
      icon = ItemIcons.mushroom;
    }
   

    return (
      <div onClick={this.props.onItemClicked} className="game-item" style={itemStyle}>
        <img src={icon} alt="Item" className="icon-item"></img>
      </div>
    );
  }
}

export default GameItem;
