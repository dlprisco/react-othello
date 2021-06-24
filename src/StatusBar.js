import React, { Component } from 'react';
import './StatusBar.css';

class StatusBar extends Component {
  render () {
    return (
      <div className="status">
        <div className={`status-white ${this.props.black_turn ? '' : 'active'}`}>
          {this.props.white}
          <div className="circle white"></div>
          <div className="arrow">←</div>
        </div>
        <div className={`status-black ${this.props.black_turn ? 'active' : ''}`}>
          <div className="arrow">→</div>
          <div className="circle black"></div>
          {this.props.black}
        </div>
      </div>
    );
  }
}

export default StatusBar;
