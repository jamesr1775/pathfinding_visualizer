import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  render() {
    const { col, isFinish, isStart, isWall, onMouseDown, onMouseEnter, onMouseUp, row } = this.props;
    const extraClassName = isFinish ? "node-finish" : isStart ? "node-start" : isWall ? "node-wall" : "";

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={(e) => onMouseDown(e, row, col)}
        onMouseEnter={(e) => onMouseEnter(e, row, col)}
        onMouseUp={(e) => onMouseUp(e)}
      ></div>
    );
  }
}
