import React from 'react';

export default function Square(props){
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
  );
}
