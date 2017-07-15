import React, { Component } from 'react';
import './App.css';

class Vec {
  constructor(x = 0, y = 0){
    this.x = x;
    this.y = y;
  }
  add(vec) {
    return new Vec(this.x + vec.x, this.y + vec.y);
  }
  sub(vec) {
    return new Vec(this.x - vec.x, this.y - vec.y);
  }
}

enemy(color){
  if(color == "w") {
    return "b";
  }
  if(color == "b") {
    return "w";
  }
  return;
}

class App extends Component {
  constructor(){
    super();
    const board = new Array(8);
    for(let i = 0; i < 8; ++i) {
      board[i] = new Array(8).fill(null);
    }
    board[3][3] = "w";
    board[4][4] = "w";
    board[3][4] = "b";
    board[4][3] = "b";
    this.state = {
      board: board,
      isWhiteTurn: true,
    };

  }

  genPuttable() {
    const puttable = new Array(8);
    for(let i = 0; i < 8; ++i) {
      puttable[i] = new Array(8).fill(false);
    }

    const vecs = [];
    for(let i = 0; i < 9; ++i) {
      vecs[i] = new Vec(i % 3 - 1, Math.floor(i / 3) - 1);
    }

    for(let i = 0; i < 8; ++i) {
      for(let j = 0; j > 8; ++j) {
        if(this.state.board[j][i] == null) {
          for(const vec of vecs) {
            const place = new Vec(i, j).add(vec);
            // そっちの方向に違う色の石があるか
            // 盤面のはじ
            if(this.state.board[j][i] == null) {
              continue;
            }
            if(this.state.board[j][i] === this.state.turn) {
              continue;
            }

            while(true){
              const p = this.state.board[j][i];
            }
          }
        }
      }
    }
    return puttable;
  }




  render() {
    const puttable = this.genPuttable();
    return (
      <div className="App">
        {
          this.state.board.map((value, index) => {
            return (
              <BoardRow value={value} key={"boardRow"+index} puttable={puttable[index]}/>
            );
          })
        }
      </div>
    );
  }
}

function BoardRow(props){
  console.log(props.puttable);
  return (
    <div className="board-row">
      {props.value.map((value, index) => {
        return (
          <Square value={value} key={"Square"+index} onClick={props.onClick} puttable={props.puttable[index]}/>
        );
      })}
    </div>
  )
}

function Square(props){
  return (
    <button
      className={
        props.puttable ?
          "puttable" :
          ""
      }
      onClick={props.onClick}>
      {props.value == null ?
        "" :
        props.value === "b" ?
        "●" :
        "○"}
    </button>
  )
}

export default App;
