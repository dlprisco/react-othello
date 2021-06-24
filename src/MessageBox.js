import React, { Component } from 'react';
import './MessageBox.css';

class MessageBox extends Component {
  render() {
    let winner, first, second, classes = "message-box";
    if(this.props.show) {
      if(this.props.black > this.props.white) {
        winner = 'Black';
        first = this.props.black;
        second = this.props.white;
      } else if(this.props.white > this.props.black) {
        winner = 'White';
        second = this.props.black;
        first = this.props.white;
      }
      classes += " visible";
    }
    if(winner === undefined) {
      return (
        <div className={classes}> The game is draw! </div>
      )
    } else {
      return (
        <div>
          <div className={classes}>{`${winner} wins: ${first} - ${second}`}</div>
          <button className="new-game" onClick={this.props.resetFn}> New Game </button>
        </div>
      )
    }
  }
}

export default MessageBox;
