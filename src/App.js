import React, { Component } from 'react';
import MessageBox from './MessageBox';
import StatusBar from './StatusBar';
import Row from './SquareRow';
import './App.css';
import './Board.css';

class App extends Component {
  constructor(props) {
    super(props);
    let array = new Array(8);
    for(let i=0; i<8; i++) {
      array[i] = new Array(8);
    }
    // white: 1
    // black: 0
    // empty: undefined
    array[3][3] = 1;
    array[3][4] = 0;
    array[4][3] = 0;
    array[4][4] = 1;

    this.state = {
      array: array,
      size: 8,
      black_turn: true,
      black: 2,
      white: 2,
      gameOver: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.checkMove = this.checkMove.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
  }

  resetBoard() {
    let array = new Array(8);
    for(let i=0; i<8; i++) {
      array[i] = new Array(8);
    }
    // white: 1
    // black: 0
    // empty: undefined
    array[3][3] = 1;
    array[3][4] = 0;
    array[4][3] = 0;
    array[4][4] = 1;

    this.setState({
      array: array,
      size: 8,
      black_turn: true,
      black: 2,
      white: 2,
      gameOver: false
    });
  }

  checkMove(i, j, apply, black_turn) {
    let black = this.state.black,
      white = this.state.white;
    let newArray = [...this.state.array];
    let our = black_turn === undefined ? (~~!this.state.black_turn) :(~~!black_turn);
    let other = ~~!our;
    let otherX, otherY, ourX, ourY;
    let moved = false;
    let foundMove = false;

    // checking ←
    let foundOur = false;
    let foundOther = false;
    for(let col=j-1; col>= 0; col--) {
      if(newArray[i][col] !== other){
        if(newArray[i][col] === our) {
          foundOur = true;
          ourX = i;
          ourY = col;
        }
        break;
      } else {
        foundOther = true;
        otherX = i;
        otherY = col;
      }
    }
    if(foundOur && ourY<j-1) {
      if (!apply) {
        console.log('found move for', black_turn ? 'black' : 'white', 'at', i, j)
        //return {true, false};
        return {foundMove:true, moved:false};
      }
      for(let col=ourY+1; apply && col<j; col++) {
        newArray[i][col] = our;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
        moved = true;
      }
      if(apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    // checking ↙
    foundOur = false;
    foundOther = false;
    for(let row=i+1, col=j-1; row<8 && col>=0; row++, col--) {
      if(newArray[row][col] !== other){
        if(newArray[row][col] === our) {
          foundOur = true;
          ourX = row;
          ourY = col;
        }
        break;
      } else {
        foundOther = true;
        otherX = row;
        otherY = col;
      }
    }
    //foundOur && console.log('↙', foundOur);
    if(foundOur && ourX>i+1 && ourY<j+1) {
      if (!apply) {
        console.log('found move for', black_turn ? 'black' : 'white', 'at', i, j)
        return {foundMove:true, moved:false};
      }
      //foundMove = true;
      for(let row=ourX-1, col=ourY+1; apply && row>i && col<j; row--, col++) {
        newArray[row][col] = our;
        //our == 1 ? white++ : black++;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
        moved = true;
      }
      // newArray[i][j] = our;
      if(apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    // checking ↓
    foundOur = false;
    foundOther = false;
    for(let row=i+1; row<8; row++) {
      if(newArray[row][j] !== other){
        if(newArray[row][j] === our) {
          foundOur = true;
          ourX = row;
          ourY = j;
        }
        break;
      } else {
        foundOther = true;
        otherX = row;
        otherY = j;
      }
    }
    foundOur && console.log('↓', foundOur);
    if(foundOur && ourX>i+1) {
      if (!apply) {
        //return {true, false};
        console.log('found move for', black_turn ? 'black' : 'white', 'at', i, j)
        return {foundMove:true, moved:false};
      }
      //foundMove = true;
      for(let row=ourX-1; apply && row>i; row--) {
        newArray[row][j] = our;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
        moved = true;
      }
      if(apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    // checking ↘
    foundOur = false;
    foundOther = false;
    for(let row=i+1, col=j+1; row<8 && col<8; row++, col++) {
      if(newArray[row][col] !== other){
        if(newArray[row][col] === our) {
          foundOur = true;
          ourX = row;
          ourY = col;
        }
        break;
      } else {
        foundOther = true;
        otherX = row;
        otherY = col;
      }
    }
    //foundOur && console.log('↘', foundOur);
    if(foundOur && ourX>i+1 && ourY>j+1) {
      //foundMove = true;
      if (!apply) {
        //return {true, false};
        console.log('found move for', black_turn ? 'black' : 'white', 'at', i, j)
        return {foundMove:true, moved:false};
      }
      for(let row=ourX-1, col=ourY-1; apply && row>i && col>j; row--, col--) {
        newArray[row][col] = our;
        //our == 1 ? white++ : black++;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
        moved = true;
      }
      if(apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }


    // checking →
    foundOur = false;
    foundOther = false;
    for(let col=j+1; col<8; col++) {
      if(newArray[i][col] !== other){
        if(newArray[i][col] === our) {
          foundOur = true;
          ourX = i;
          ourY = col;
        }
        break;
      } else {
        foundOther = true;
        otherX = i;
        otherY = col;
      }
    }
    //foundOur && console.log('→', foundOur);
    if(foundOur && ourY>j+1) {
      //foundMove = true;
      if (!apply) {
        //return {true, false};
        console.log('found move for', black_turn ? 'black' : 'white', 'at', i, j)
        return {foundMove:true, moved:false};
      }
      for(let col=ourY-1; apply && col>j; col--) {
        newArray[i][col] = our;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
        moved = true;
      }
      if(apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    // checking ↗
    foundOur = false;
    foundOther = false;
    for(let row=i-1, col=j+1; row>=0 && col<8; row--, col++) {
      if(newArray[row][col] !== other){
        if(newArray[row][col] === our) {
          foundOur = true;
          ourX = row;
          ourY = col;
        }
        break;
      } else {
        foundOther = true;
        otherX = row;
        otherY = col;
      }
    }
    //foundOur && console.log('↗', foundOur);
    if(foundOur && ourX<i-1 && ourY>j+1) {
      //foundMove = true;
      if (!apply) {
        //return {true, false};
        console.log('found move for', black_turn ? 'black' : 'white', 'at', i, j)
        return {foundMove:true, moved:false};
      }
      for(let row=ourX+1, col=ourY-1; apply && row<i && col>j; row++, col--) {
        newArray[row][col] = our;
        moved = true;
        //our == 1 ? white++ : black++;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
      }
      if(apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    // checking ↑
    foundOur = false;
    foundOther = false;
    for(let row=i-1; row>=0; row--) {
      if(newArray[row][j] !== other){
        if(newArray[row][j] === our) {
          foundOur = true;
          ourX = row;
          ourY = j;
        }
        break;
      } else {
        foundOther = true;
        otherX = row;
        otherY = j;
      }
    }
    //foundOur && console.log('↑', foundOur);
    if(foundOur && ourX<i-1) {
      //foundMove = true;
      if (!apply) {
        //return {true, false};
        console.log('found move for', black_turn ? 'black' : 'white', 'at', i, j)
        return {foundMove:true, moved:false};
      }
      for(let row=ourX+1; apply && row<i; row++) {
        newArray[row][j] = our;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
        moved = true;
      }
      if(apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    // checking ↖
    foundOur = false;
    foundOther = false;

    for(let row=i-1, col=j-1; row>=0 && col>= 0; row--, col--) {
      if(newArray[row][col] !== other){
        if(newArray[row][col] === our) {
          foundOur = true;
          ourX = row;
          ourY = col;
        }
        break;
      } else {
        foundOther = true;
        otherX = row;
        otherY = col;
      }
    }
    //foundOur && console.log('↖', foundOur);
    if(foundOur && ourX<i-1 && ourY<j-1) {
      if (!apply) {
        console.log('found move for', black_turn ? 'black' : 'white', 'at', i, j)
        return {foundMove:true, moved:false};
      }
      for(let row=ourX+1, col=ourY+1; apply && row<i && col<j; row++, col++) {
        newArray[row][col] = our;
        moved = true;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
      }
      if(apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }


    if(apply) {
      this.setState({
        array: newArray,
        black: black,
        white: white,
      });
    }
    return {foundMove: foundMove, moved: moved};
  }

  handleClick(i, j) {
    // check if current player as a valid move at given position
    // if yes, set the state variables accordingly
    //    check if the other player has no pieces, if so declare the result
    //    other wise, check if the other player has a move in the entire board
    //    if yes, set next players turn
    //    if not, check if the current player has a move in the entire board
    //    if not, count pieces and declare results
    //    if yes, do nothing
    // if no, do nothing
    //

    // let newArray = [...this.state.array];
    // newArray[i][j] = ~~!this.state.black_turn;
    // this.setState({
    //   array: newArray,
    //   black_turn: !this.state.black_turn
    // });

    if(this.state.array[i][j] !== undefined) {
      return;
    }

    let moved = this.checkMove(i, j, true).moved;
    let black_turn = this.state.black_turn;
    if(moved) {
      let hasMove = false;
      console.log('checking possible move for', black_turn ? 'white' : 'black');
      for(let i=0; i<8; i++) {
        for(let j=0; j<8; j++) {
          if(this.state.array[i][j] === undefined) {
            if(this.checkMove(i, j, false, !black_turn).foundMove) {
              console.log('checking ', i, j, true);
              hasMove = true;
              break;
            }
          }
        }
        if(hasMove) {
          console.log('found possible move for', black_turn ? 'white' : 'black');
          this.setState({black_turn: !black_turn});
          break;
        }
      }
      if(!hasMove) {
        console.log('current player has no moves! passing turn to other player');
        //this.setState({black_turn: !black_turn});
        console.log('checking possible move for', black_turn ? 'white' : 'black');
        for(let i=0; i<8; i++) {
          for(let j=0; j<8; j++) {
            if(this.state.array[i][j] === undefined) {
              if(this.checkMove(i, j, false).foundMove) {
                hasMove = true;
                break;
              }
            }
          }
          if(hasMove) {
          console.log('found possible move for', !black_turn ? 'white' : 'black');
            break;
          }
        }
        if(!hasMove) {
          this.setState({gameOver: true});
          console.log('both players don\'t have any move. The game is finished');
        }
      }
    }
    //this.setState({black_turn: black_turn});

  }
  render() {
    return (
      <>
      <div style={{backgroundColor: 'lightblue'}}>
      <div style={{fontFamily: 'cursive', fontSize:40, textAlign: 'center', marginTop: '25px', marginBottom: '50px'}}>Play <span style={{color:'blue'}}>Othello</span></div>
      <div style={{marginTop: "100px"}}>
        <MessageBox resetFn={this.resetBoard} show={this.state.gameOver} black={this.state.black} white={this.state.white} />
        <div className="board">
          <Row over={this.state.gameOver} key={0} i={0} handleClick={this.handleClick} array={this.state.array[0]} />
          <Row over={this.state.gameOver} key={1} i={1} handleClick={this.handleClick} array={this.state.array[1]} />
          <Row over={this.state.gameOver} key={2} i={2} handleClick={this.handleClick} array={this.state.array[2]} />
          <Row over={this.state.gameOver} key={3} i={3} handleClick={this.handleClick} array={this.state.array[3]} />
          <Row over={this.state.gameOver} key={4} i={4} handleClick={this.handleClick} array={this.state.array[4]} />
          <Row over={this.state.gameOver} key={5} i={5} handleClick={this.handleClick} array={this.state.array[5]} />
          <Row over={this.state.gameOver} key={6} i={6} handleClick={this.handleClick} array={this.state.array[6]} />
          <Row over={this.state.gameOver} key={7} i={7} handleClick={this.handleClick} array={this.state.array[7]} />
        </div>
        <StatusBar black={this.state.black} white={this.state.white} black_turn={this.state.black_turn} />
      </div>
      <div style={{fontFamily: 'cursive', fontSize:18, textAlign: 'center', marginTop: '100px'}}>Check tutorial <a href="https://youtube.com">here!</a></div>
      </div>
      </>
    );
  }
}

export default App;
