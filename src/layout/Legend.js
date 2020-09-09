import React, { Component } from "react";

import "./Legend.css";
export class Legend extends Component {
  render() {
    return (
      <div>
        <ul>
          <li className="legendCol">
            <div className="start"></div>Start Node
          </li>
          <li className="legendCol">
            <div className="finish"></div>
            End Node
          </li>
          <li className="legendCol">
            <div className="visited1"></div>
            <div className="visited2"></div>
            Visited Node
          </li>
          <li className="legendCol">
            <div className="unvisited"></div>Unvisited Node
          </li>
          <li className="legendCol">
            <div className="shortestpath"></div>
            Shortest Path
          </li>
          <li className="legendCol">
            <div className="wall"></div>
            Wall Node
          </li>
        </ul>
      </div>
    );
  }
}

export default Legend;
