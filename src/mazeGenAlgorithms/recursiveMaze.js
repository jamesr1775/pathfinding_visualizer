export function generateRecursiveMaze(grid, rowStart, rowEnd, colStart, colEnd, orientation, surroundingwalls, maxRows, maxCols) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
  if (!surroundingwalls) {
    for (let row = 0; row < maxRows; row++) {
      for (let col = 0; col < maxCols; col++) {
        if (row === 0 || row === maxRows - 1 || col === 0 || col === maxCols - 1) {
          if (!grid[row][col].isStart && !grid[row][col].isFinish) {
            grid[row][col].isWall = true;
          }
        }
      }
    }
    surroundingwalls = true;
  }
  if (orientation === "horizontal") {
    let possibleRows = [];
    for (let i = rowStart; i <= rowEnd; i += 2) {
      possibleRows.push(i);
    }
    let possibleCols = [];
    for (let i = colStart - 1; i <= colEnd + 1; i += 2) {
      possibleCols.push(i);
    }
    let randRowIdx = Math.floor(Math.random() * possibleRows.length);
    let randColIdx = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randRowIdx];
    let colRand = possibleCols[randColIdx];
    for (let row = 0; row < maxRows; row++) {
      for (let col = 0; col < maxCols; col++) {
        if (
          row === currentRow &&
          col !== colRand &&
          col >= colStart - 1 &&
          col <= colEnd + 1 &&
          !grid[row][col].isStart &&
          !grid[row][col].isFinish
        ) {
          grid[row][col].isWall = true;
        }
      }
    }
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      generateRecursiveMaze(grid, rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingwalls, maxRows, maxCols);
    } else {
      generateRecursiveMaze(grid, rowStart, currentRow - 2, colStart, colEnd, "vertical", surroundingwalls, maxRows, maxCols);
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      generateRecursiveMaze(grid, currentRow + 2, rowEnd, colStart, colEnd, orientation, surroundingwalls, maxRows, maxCols);
    } else {
      generateRecursiveMaze(grid, currentRow + 2, rowEnd, colStart, colEnd, "vertical", surroundingwalls, maxRows, maxCols);
    }
  } else {
    let possibleCols = [];
    for (let i = colStart; i <= colEnd; i += 2) {
      possibleCols.push(i);
    }
    let possibleRows = [];
    for (let i = rowStart - 1; i <= rowEnd + 1; i += 2) {
      possibleRows.push(i);
    }

    let randRowIdx = Math.floor(Math.random() * possibleRows.length);
    let randColIdx = Math.floor(Math.random() * possibleCols.length);
    let randRow = possibleRows[randRowIdx];
    let currentCol = possibleCols[randColIdx];
    for (let row = 0; row < maxRows; row++) {
      for (let col = 0; col < maxCols; col++) {
        if (
          col === currentCol &&
          row !== randRow &&
          row >= rowStart - 1 &&
          row <= rowEnd + 1 &&
          !grid[row][col].isStart &&
          !grid[row][col].isFinish
        ) {
          grid[row][col].isWall = true;
        }
      }
    }
    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      generateRecursiveMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, "horizontal", surroundingwalls, maxRows, maxCols);
    } else {
      generateRecursiveMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, orientation, surroundingwalls, maxRows, maxCols);
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      generateRecursiveMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, "horizontal", surroundingwalls, maxRows, maxCols);
    } else {
      generateRecursiveMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, orientation, surroundingwalls, maxRows, maxCols);
    }
  }
}
