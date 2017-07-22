import React from 'react';
import Square from './Square'


export default function Board(props) {
  return (
    <div className="board">
      {
        props.board.map((value, index) => {
          return (
            <BoardRow
              value={value}
              key={"boardRow"+index}
              puttable={props.puttable[index]}
              onClick={(i) => props.onClick(i, index)}/>
          );
        })
      }
    </div>
  );
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
  );
}
