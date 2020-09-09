import * as utils from "./algorithmUtils";

// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  startNode.totDistance =
    startNode.distance + utils.heuristicDistance(startNode, finishNode);
  const unvisitedNodes = utils.getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    utils.sortNodesByTotalDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.totDistance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    utils.updateUnvisitedNeighborsAStar(closestNode, finishNode, grid);
  }
}
