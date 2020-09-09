export function generateBasicRandomMaze(grid, maxRows, maxCols) {
  for (let row = 0; row < maxRows; row++) {
    for (let col = 0; col < maxCols; col++) {
      let isWall = Math.floor(Math.random() * 10);
      const node = grid[row][col];
      if (!node.isStart && !node.isFinish) {
        node.isWall = isWall > 6 ? true : false;
      }
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
}
