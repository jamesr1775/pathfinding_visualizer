export function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

export function sortNodesByTotalDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.totDistance - nodeB.totDistance);
}

export function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

export function updateUnvisitedNeighborsAStar(node, goal, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    let hDist = heuristicDistance(neighbor, goal);
    neighbor.distance = node.distance + 1;
    let temp = neighbor.distance + hDist;
    if (temp < neighbor.totDistance) {
      neighbor.totDistance = temp;
    }
    neighbor.previousNode = node;
  }
}

export function updateUnvisitedNeighborsGreedy(node, goal, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    let hDist = heuristicDistance(neighbor, goal);
    if (hDist < neighbor.totDistance) {
      neighbor.distance = hDist;
    }
    neighbor.previousNode = node;
  }
}

export function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function heuristicDistance(nodeA, nodeB) {
  let xOne = nodeA.row;
  let yOne = nodeA.col;
  let xTwo = nodeB.row;
  let yTwo = nodeB.col;
  let xDist = Math.abs(xOne - xTwo);
  let yDist = Math.abs(yOne - yTwo);
  return xDist + yDist;
}

export function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
