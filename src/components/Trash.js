import React, { Component } from 'react';
import '../App.css';
import TrashIcons from '../TrashIcons.js';

class Trash extends Component {
  render() {
    const trashStyle = {
      bottom: `${this.props.height}px`, // use props.height to offset from the bottom of screen
      zIndex: this.props.layer, // use props.layer to set z-index, so we display ontop of background
    };

    // Update this to select the correct icon for each item
    const icon = TrashIcons.rock;

    return (
      <div className="trash" style={trashStyle}>
        <img src={icon} alt="Trash" className="icon-trash"></img>
      </div>
    );
  }
}

export default Trash;
