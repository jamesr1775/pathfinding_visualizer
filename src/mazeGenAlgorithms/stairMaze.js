export function generateStairMaze(grid, maxRows, maxCols) {
  let currentRow = maxRows - 1;
  let directionUp = true;
  for (let col = 0; col < maxCols - 1; col++) {
    if (currentRow > 1 && directionUp) {
      currentRow--;
    } else if (currentRow < maxRows - 1 - 1 && !directionUp) {
      currentRow++;
    } else {
      directionUp = !directionUp;
    }
    const node = grid[currentRow][col];
    if (!node.isStart && !node.isFinish) {
      node.isWall = true;
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
