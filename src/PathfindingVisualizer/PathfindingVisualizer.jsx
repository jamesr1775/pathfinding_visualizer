import React, { Component } from "react";
import Node from "./Node/Node";
import Header from "../layout/Header";

import { dijkstra } from "../algorithms/dijkstra";
import { breadthFirstSearch } from "../algorithms/breadthFirstSearch";
import { astar } from "../algorithms/astar";
import { greedy } from "../algorithms/greedy";
import { getNodesInShortestPathOrder } from "../algorithms/algorithmUtils";

import { generateBasicRandomMaze } from "../mazeGenAlgorithms/basicRandomMaze";
import { generateStairMaze } from "../mazeGenAlgorithms/stairMaze";
import { generateRecursiveMaze } from "../mazeGenAlgorithms/recursiveMaze";

import "./PathfindingVisualizer.css";

const NUM_GRID_ROWS = 30;
const NUM_GRID_COLS = 75;

const START_NODE_ROW = 14;
const START_NODE_COL = 16;
const FINISH_NODE_ROW = 14;
const FINISH_NODE_COL = 19;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();

    this.moveStartPos = false;
    this.startRow = START_NODE_ROW;
    this.startCol = START_NODE_COL;
    this.mouseIsPressed = false;
    this.moveFinishPos = false;
    this.lastNodeWasWall = false;
    this.finishRow = FINISH_NODE_ROW;
    this.finishCol = FINISH_NODE_COL;

    this.state = {
      grid: [],
      algorithm: "",
      maze: "",
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(e, row, col) {
    e.preventDefault();
    const { grid, moveStartPos } = this.state;
    let currentNode = grid[row][col];
    // let currentElement = document.getElementById(`node-${row}-${col}`);

    this.mouseIsPressed = true;
    if (currentNode.isStart) {
      this.moveStartPos = true;
    } else if (currentNode.isFinish) {
      this.moveFinishPos = true;
    } else if (!moveStartPos) {
      getNewGridWithWallToggled(grid, row, col);
    }
  }

  handleMouseEnter(e, row, col) {
    e.preventDefault();
    const { grid } = this.state;
    let currentNode = grid[row][col];
    let currentElement = document.getElementById(`node-${row}-${col}`);
    if (!this.mouseIsPressed) return;
    if (this.moveStartPos) {
      let lastStartNode = grid[this.startRow][this.startCol];
      lastStartNode.isStart = false;
      if (this.lastNodeWasWall) {
        this.lastNodeWasWall = false;
        lastStartNode.isWall = true;
      }
      let lastStartElement = document.getElementById(`node-${this.startRow}-${this.startCol}`);
      lastStartElement.className = lastStartNode.isWall ? "node node-wall" : "node node-unvisited";
      currentNode.isStart = true;
      this.startRow = row;
      this.startCol = col;
      currentElement.className = "node node-start";
      if (currentNode.isWall) {
        this.lastNodeWasWall = true;
        currentNode.isWall = false;
      }
    } else if (this.moveFinishPos) {
      let lastFinishNode = grid[this.finishRow][this.finishCol];
      lastFinishNode.isFinish = false;
      if (this.lastNodeWasWall) {
        this.lastNodeWasWall = false;
        lastFinishNode.isWall = true;
      }
      let lastFinishElement = document.getElementById(`node-${this.finishRow}-${this.finishCol}`);
      lastFinishElement.className = lastFinishNode.isWall ? "node node-wall" : "node node-unvisited";
      currentNode.isFinish = true;
      this.finishRow = row;
      this.finishCol = col;
      currentElement.className = "node node-finish";
      if (currentNode.isWall) {
        this.lastNodeWasWall = true;
        currentNode.isWall = false;
      }
    } else {
      getNewGridWithWallToggled(grid, row, col);
    }
  }

  handleMouseUp(e) {
    //const { grid, moveStartPos, moveFinishPos } = this.state;
    this.mouseIsPressed = false;
    this.moveStartPos = false;
    this.moveFinishPos = false;
    // if (moveStartPos) {
    //   this.setState({ grid: grid, mouseIsPressed: false, moveStartPos: false });
    // } else if (moveFinishPos) {
    // } else {
    //   this.setState({ mouseIsPressed: false });
    // }
  }

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = "node node-visited";
      }, 10 * i);
    }
  }
  animateMaze(visitedNodesInOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = "node node-wall";
      }, 10 * i);
    }
  }
  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = "node node-shortest-path";
      }, 25 * i);
    }
  }

  getClearGrid = () => {
    const grid = this.state.grid;
    for (let row = 0; row < NUM_GRID_ROWS; row++) {
      //const currentRow = [];
      for (let col = 0; col < NUM_GRID_COLS; col++) {
        const node = grid[row][col];
        node.isVisited = false;
        node.distance = Infinity;
        node.totDistance = Infinity;
        node.previousNode = null;
        if (node.isStart) {
          document.getElementById(`node-${node.row}-${node.col}`).className = "node node-start";
        } else if (node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className = "node node-finish";
        } else if (node.isWall) {
          document.getElementById(`node-${node.row}-${node.col}`).className = "node node-wall";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className = "node ";
        }
      }
    }
    this.setState({ grid });
  };

  selectAlgorithm = (algorithm) => {
    this.setState({ algorithm: algorithm });
  };

  selectMaze = (maze) => {
    this.setState({ maze: maze });
    if (maze === "Basic Random Maze") {
      this.getBasicRandomMaze();
    } else if (maze === "Simple Stair Pattern") {
      this.getStairMaze();
    } else if (maze === "Recursive Maze Pattern") {
      this.getRecursiveMaze(this.state.grid, 2, NUM_GRID_ROWS - 3, 2, NUM_GRID_COLS - 3, "horizontal", false, NUM_GRID_ROWS, NUM_GRID_COLS);
    }
  };

  getBasicRandomMaze = () => {
    const grid = this.state.grid;
    generateBasicRandomMaze(grid, NUM_GRID_ROWS, NUM_GRID_COLS);
    this.setState({ grid });
  };
  getStairMaze = () => {
    const grid = this.state.grid;
    generateStairMaze(grid, NUM_GRID_ROWS, NUM_GRID_COLS);
    this.setState({ grid });
  };

  getRecursiveMaze(grid, rowStart, rowEnd, colStart, colEnd, orientation, surroundingwalls, maxRows, maxCols) {
    generateRecursiveMaze(grid, rowStart, rowEnd, colStart, colEnd, orientation, surroundingwalls, maxRows, maxCols);
    this.setState({ grid });
  }

  visualizeAlgorithm() {
    const { grid, algorithm } = this.state;
    const startNode = grid[this.startRow][this.startCol];
    const finishNode = grid[this.finishRow][this.finishCol];
    let visitedNodesInOrder;
    if (algorithm === "Dijstra's Algorithm") {
      visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    } else if (algorithm === "Breadth First Search") {
      visitedNodesInOrder = breadthFirstSearch(grid, startNode, finishNode);
    } else if (algorithm === "A* Algorithm") {
      visitedNodesInOrder = astar(grid, startNode, finishNode);
    } else if (algorithm === "Greedy Algorithm") {
      visitedNodesInOrder = greedy(grid, startNode, finishNode);
    } else {
      return;
    }
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <Header
          selectAlgorithm={this.selectAlgorithm}
          selectMaze={this.selectMaze}
          algorithm={this.state.algorithm}
          visualizeAlgorithm={this.visualizeAlgorithm.bind(this)}
          getClearGrid={this.getClearGrid.bind(this)}
        >
          {" "}
        </Header>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(e, row, col) => this.handleMouseDown(e, row, col)}
                      onMouseEnter={(e, row, col) => this.handleMouseEnter(e, row, col)}
                      onMouseUp={(e, row, col) => this.handleMouseUp(e, row, col)}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < NUM_GRID_ROWS; row++) {
    const currentRow = [];
    const isWall = false;
    for (let col = 0; col < NUM_GRID_COLS; col++) {
      currentRow.push(createNode(col, row, isWall));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row, isWall) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    totDistance: Infinity,
    isVisited: false,
    isWall: isWall,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  let currentNode = grid[row][col];
  let element = document.getElementById(`node-${row}-${col}`);
  if (!currentNode.isStart && !currentNode.isFinish) {
    currentNode.isWall = !currentNode.isWall;
    element.className = currentNode.isWall ? "node node-wall" : "node node-unvisited";
  }
};
