import React, { Component } from "react";
import Node from "./Node/Node";
import Header from "../layout/Header";
import { dijkstra } from "../algorithms/dijkstra";
import { breadthFirstSearch } from "../algorithms/breadthFirstSearch";

import { getNodesInShortestPathOrder } from "../algorithms/algorithmUtils";

import "./PathfindingVisualizer.css";

const NUM_GRID_ROWS = 30;
const NUM_GRID_COLS = 50;

const START_NODE_ROW = 14;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 14;
const FINISH_NODE_COL = 19;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      moveStartPos: false,
      moveFinishPos: false,
      startRow: START_NODE_ROW,
      startCol: START_NODE_COL,
      finishRow: FINISH_NODE_ROW,
      finishCol: FINISH_NODE_COL,
      algorithm: "",
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const { grid, moveStartPos } = this.state;

    if (grid[row][col].isStart) {
      this.setState({ grid: grid, mouseIsPressed: true, moveStartPos: true });
    } else if (grid[row][col].isFinish) {
      this.setState({ grid: grid, mouseIsPressed: true, moveFinishPos: true });
    } else if (!moveStartPos) {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({
        grid: newGrid,
        mouseIsPressed: true,
      });
    }
  }

  handleMouseEnter(row, col) {
    const {
      grid,
      mouseIsPressed,
      moveStartPos,
      startRow,
      startCol,
      moveFinishPos,
      finishRow,
      finishCol,
    } = this.state;
    if (!mouseIsPressed) return;
    if (moveStartPos) {
      grid[startRow][startCol].isStart = false;
      grid[row][col].isStart = true;
      this.setState({
        grid: grid,
        moveStartPos: true,
        startRow: row,
        startCol: col,
      });
    } else if (moveFinishPos) {
      grid[finishRow][finishCol].isFinish = false;
      grid[row][col].isFinish = true;
      this.setState({
        grid: grid,
        moveFinishPos: true,
        finishRow: row,
        finishCol: col,
      });
    } else {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      this.setState({ grid: newGrid });
    }
  }

  handleMouseUp() {
    const { grid, moveStartPos, moveFinishPos } = this.state;
    if (moveStartPos) {
      //grid[row][col].isStart = true;
      this.setState({ grid: grid, mouseIsPressed: false, moveStartPos: false });
    } else if (moveFinishPos) {
      //grid[row][col].isStart = true;
      this.setState({
        grid: grid,
        mouseIsPressed: false,
        moveFinishPos: false,
      });
    } else {
      this.setState({ mouseIsPressed: false });
    }
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
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
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
        node.previousNode = null;
        if (node.isStart) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-start";
        } else if (node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-finish";
        } else if (node.isWall) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-wall";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node ";
        }
      }
    }
    this.setState({ grid });
  };

  selectAlgorithm = (algorithm) => {
    console.log("select Algo");
    this.setState({ algorithm: algorithm });
    console.log(this.state.algorithm);
  };

  visualizeAlgorithm() {
    const {
      grid,
      startRow,
      startCol,
      finishRow,
      finishCol,
      algorithm,
    } = this.state;
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    let visitedNodesInOrder;
    if (algorithm === "Dijstra's Algorithm") {
      visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    } else if (algorithm === "Breadth First Search") {
      visitedNodesInOrder = breadthFirstSearch(grid, startNode, finishNode);
    } else {
      return;
    }
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeDijkstra() {
    const { grid, startRow, startCol, finishRow, finishCol } = this.state;
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeBreadthFirstSearch() {
    const { grid, startRow, startCol, finishRow, finishCol } = this.state;
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const visitedNodesInOrder = breadthFirstSearch(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <Header
          selectAlgorithm={this.selectAlgorithm}
          algorithm={this.state.algorithm}
          visualizeAlgorithm={this.visualizeAlgorithm.bind(this)}
          getClearGrid={this.getClearGrid.bind(this)}
        >
          {" "}
        </Header>
        {/* <button
          onClick={() => this.visualizeAlgorithm()}
          disabled={this.state.algorithm === ""}
        >
          Visualize
        </button> */}
        {/* <button onClick={() => this.visualizeBreadthFirstSearch()}>
          Visualize Breadth First Search Algorithm
        </button> */}
        {/* <button onClick={() => this.getClearGrid(grid)}>Clear Board</button> */}
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
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={(row, col) => this.handleMouseUp(row, col)}
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
    isVisited: false,
    isWall: isWall,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  if (!grid[row][col].isStart && !grid[row][col].isFinish) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };

    newGrid[row][col] = newNode;
    return newGrid;
  } else {
    return grid;
  }
};
