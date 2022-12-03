const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8", (input, err) => {
  if (err) {
    console.log(err);
  }
});

// 0 - 51 (+1)
const priorities = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let priorityScore = 0;
let rucksacks = [];
let faultyItems = [];

let badgeScore = 0;
let rucksacksAllContent = input.split("\n");
let elveGroups = [];
let badges = [];

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
})();

const groupElves = () => {
  for (let index = 0; index < rucksacksAllContent.length; index += 3) {
    elveGroups.push([
      rucksacksAllContent[index],
      rucksacksAllContent[index + 1],
      rucksacksAllContent[index + 2],
    ]);
  }
};

const findBadge = () => {
  elveGroups.forEach((group, i) => {
    const [firstElve, secondElve, thirdElve] = group;

    for (const item of firstElve) {
      if (secondElve.includes(item) && thirdElve.includes(item)) {
        badges.push(item);
        break;
      }
    }
  });
};

const sumBadgeScore = () => {
  badges.forEach((item) => {
    badgeScore += priorities.indexOf(item) + 1;
  });
};

(() => {
  groupElves();
  findBadge();
  sumBadgeScore();
})();

console.log(`Priority score: ${priorityScore}`);
console.table(`Badge score: ${badgeScore}`);
