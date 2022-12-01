const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8", (input, err) => {
  if (err) {
    console.log(err);
  }
});

let data = input.split(";\n");

let listOfElves = [];
let currentElf = 0;

data.forEach((calEl) => {
  if (!calEl.startsWith("\n")) {
    currentElf = currentElf + Number(calEl);
  } else {
    listOfElves.push(currentElf);
    currentElf = Number(calEl);
  }
});

console.log(
  listOfElves
    .sort()
    .slice(-3)
    .reduce((partialSum, a) => partialSum + a, 0)
);
