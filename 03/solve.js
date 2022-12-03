const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8", (input, err) => {
  if (err) {
    console.log(err);
  }
});

// 0 - 51 (+1)
const priorities = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let priorityScore = 0;
let faultyItems = [];
let rucksacks = [];

const massageData = () => {
  input.split("\n").forEach((rucksack) => {
    rucksacks.push([
      rucksack.slice(0, rucksack.length / 2).split(""),
      rucksack.slice(rucksack.length / 2, rucksack.length).split(""),
    ]);
  });
};

const findDuplicates = () => {
  rucksacks.forEach((rucksack) => {
    for (const item of rucksack[0]) {
      if (rucksack[1].includes(item)) {
        return faultyItems.push(item);
      }
    }
  });
};

const sumScore = () => {
  faultyItems.forEach((item) => {
    priorityScore += priorities.indexOf(item) + 1;
  });
};

(() => {
  massageData();
  findDuplicates();
  sumScore();
  console.log(priorityScore);
})();
