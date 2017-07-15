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
  clone() {
    return new Vec(this.x, this.y);
  }
}

function genBoard(){
  const board = new Array(8);
  for(let i = 0; i < 8; ++i) {
   board[i] = new Array(8).fill(null);
  }
  return board;
}

class App extends Component {
  constructor(){
    super();
    const board = new Array(8);
    for(let i = 0; i < 8; ++i) {
      board[i] = new Array(8).fill(null);
    }
    board[0][0] = "w";
    board[0][1] = "b";
    board[1][0] = "w";
    board[1][1] = "b";
    board[3][3] = "w";
    board[4][4] = "w";
    //board[3][4] = "b";
    //board[4][3] = "b";
    this.state = {
      board: board,
      isWhiteTurn: true,
    };

  }

  turn(turn = this.state.isWhiteTurn){
    return turn?
      "w":
      "b";
  }

  enemy(turn = this.state.isWhiteTurn){
    return turn?
      "b":
      "w";
  }

  copyBoard(){
    const copy = new Array(8);
    for(let i = 0; i < 8; ++i) {
      copy[i] = this.state.board[i].slice();
    }
    return copy;
  }

  genReverseList(i, j, board = this.state.board, turn = this.state.isWhiteTurn){
    // 8方向のベクトルを作成
    const vecs = [];
    for(let i = 0; i < 9; ++i) {
      vecs[i] = new Vec(i % 3 - 1, Math.floor(i / 3) - 1);
    }
    if(board[j][i] != null) {
      return;
    }

    const allReverseList = [];

    for(const vec of vecs) {
      let place = new Vec(i, j).add(vec);
      // 場所から状態を取得
      const getPlace = () => {
        if(0 > place.y || 8 <= place.y){
          return;
        }
        return board[place.y][place.x];
      };
      // そっちの方向に違う色の石があるか
      if(getPlace() !== this.enemy(turn)) {
        continue;
      }
      const reverseList = [place.clone()];

      // また違う色の石に当たるまで調べる
      while(true){
        place = place.add(vec);
        if(getPlace() !== this.enemy(turn)) {
          break;
        }
        reverseList.push(place.clone());
      }

      // その先に自分の色の石があるか？
      if(getPlace() === this.turn(turn)){
        Array.prototype.push.apply(allReverseList, reverseList);
      }
    }

    if(allReverseList.length === 0) {
      return;
    }
    return allReverseList;
  }

  genPuttable(board, turn = this.state.isWhiteTur) {
    const puttable = new Array(8);
    for(let i = 0; i < 8; ++i) {
      puttable[i] = new Array(8).fill(false);
    }
    let isPuttable = false;

    for(let i = 0; i < 8; ++i) {
      for(let j = 0; j < 8; ++j) {
        if(this.genReverseList(i, j, board, turn) != null) {
          puttable[j][i] = true;
          isPuttable = true;
        }
      }
    }
    return isPuttable ? puttable : undefined;
  }

  handleClick(i, j) {
    const board = this.copyBoard();
    board[j][i] = this.turn();

    const reverseList = this.genReverseList(i, j);
    for(const p of reverseList) {
      board[p.y][p.x] = this.turn();
    }

    this.setState({board:board, isWhiteTurn:!this.state.isWhiteTurn});

    if(this.genPuttable(board, !this.state.isWhiteTurn) == null) {
      this.setState({isWhiteTurn: this.state.isWhiteTurn});
      if(this.genPuttable(board, this.state.isWhiteTurn) == null) {
        this.setState({gameSet: true});
      }
    }

    return;
  }

  render() {
    const puttable = this.genPuttable() || genBoard();
    return (
      <div className="App">
        {
          this.state.board.map((value, index) => {
            return (
              <BoardRow
                value={value}
                key={"boardRow"+index}
                puttable={puttable[index]}
                onClick={(i) => this.handleClick(i, index)}/>
            );
          })
        }
      </div>
    );
  }
}

function BoardRow(props){
  return (
    <div className="board-row">
      {props.value.map((value, index) => {
        return (
          <Square
            value={value}
            key={"Square"+index}
            onClick={() => {return props.onClick(index)}}
            puttable={props.puttable[index]}/>
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
      onClick={
        props.puttable ?
          props.onClick :
          () => {}}>
      {props.value == null ?
        "" :
        props.value === "b" ?
        "●" :
        "○"}
    </button>
  )
}

export default App;
