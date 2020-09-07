import * as utils from "./algorithmUtils";
// Performs Breadth first search algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function breadthFirstSearch(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  //const unvisitedNodes = getAllNodes(grid);
  var queue = [startNode];
  const nodeQueued = grid.map((row) => row.map((value) => false));

  while (queue.length > 0) {
    //sortNodesByDistance(unvisitedNodes);
    const currentNode = queue.shift();
    if (currentNode.isWall) continue;
    currentNode.isVisited = true;
    utils.updateUnvisitedNeighbors(currentNode, grid);

    visitedNodesInOrder.push(currentNode);
    let neighbouringNodes = utils.getUnvisitedNeighbors(currentNode, grid);
    neighbouringNodes.forEach((neighbour) => {
      let { col, row } = neighbour;
      if (nodeQueued[row][col] === false) {
        queue.push(neighbour);
        nodeQueued[row][col] = true;
      }
    });

    if (currentNode === finishNode) return visitedNodesInOrder;
  }
  return visitedNodesInOrder;
}
