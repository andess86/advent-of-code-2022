const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf-8", (input, err) => {
    if (err) {
      console.log(err);
    }
  })
  .split("\n");

let treeMatrix = input.map((row) => row.split(""));
const [numberOfRows, numberOfCols] = [treeMatrix.length, treeMatrix[0].length];
let visibility = 0;

const isTreeAtEdge = (row, col) => {
  if (row === 0 || col === 0 || row === numberOfRows || col === numberOfCols) {
    return true;
  }
};

const isVisible = (row, col) => {
  // If the tree we are checking against is positioned on one of the edges, just return true
  if (isTreeAtEdge(row, col)) return true;

  // Need the values of current trees full row & columns
  const [rowValues, colValues] = [
    treeMatrix[row],
    Array.from({ length: numberOfRows }, (_, i) => treeMatrix[i][col]),
  ];

  //   Check if tree (each left/tright/over/under) is lower than
  //    the one we are currently comparing to its surroundings
  const isTaller = (tree) => tree < treeMatrix[row][col];

  // Compare all values to the left, right, over and under to the current one
  // Omit the tree we are comparing against; therefore, +1
  return [
    rowValues.slice(0, col).every(isTaller),
    rowValues.slice(col + 1).every(isTaller),
    colValues.slice(0, row).every(isTaller),
    colValues.slice(row + 1).every(isTaller),
    // We now have an array of true or false values regarding visibility in all four directions.
    // Any of these true? If so, we are happy (and visible!)
  ].some((trueOrFalse) => trueOrFalse === true);
};

for (let row = 0; row < numberOfRows; row++) {
  for (let col = 0; col < numberOfCols; col++) {
    visibility += isVisible(row, col);
  }
}

console.log(visibility);
