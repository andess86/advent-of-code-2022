const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8", (input, err) => {
  if (err) {
    console.log(err);
  }
});
let allRounds = [];
let totalPoints;

let data = input.split("\n").forEach((element) => {
  allRounds.push(element.split(" "));
});

const calculateRoundOutcome = (opponentMove, ownMove) => {
  switch (opponentMove) {
    case "A":
      if (ownMove === "X") {
        return 3;
      }
      if (ownMove === "Y") {
        return 6;
      }
      if (ownMove === "Z") {
        return 0;
      }
      break;
    case "B":
      if (ownMove === "X") {
        return 0;
      }
      if (ownMove === "Y") {
        return 3;
      }
      if (ownMove === "Z") {
        return 6;
      }
      break;
    case "C":
      if (ownMove === "X") {
        return 6;
      }
      if (ownMove === "Y") {
        return 0;
      }
      if (ownMove === "Z") {
        return 3;
      }
      break;
    default:
      break;
  }
};

const pointsForMove = (ownMove) => {
  if (ownMove === "X") {
    return 1;
  } else if (ownMove === "Y") {
    return 2;
  } else if (ownMove === "Z") {
    return 3;
  } else {
    console.log("error");
  }
};
const calculateRoundTwoOutcome = (opponentMove, roundResult) => {
  let points = 0;
  if (roundResult === "X") {
    points = 0;
    switch (opponentMove) {
      case "A":
        points = 3;
        break;
      case "B":
        points = 1;
        break;
      case "C":
        points = 2;
        break;

      default:
        break;
    }
    return points;
  }
  if (roundResult === "Y") {
    points = 3;
    switch (opponentMove) {
      case "A":
        points += 1;
        break;
      case "B":
        points += 2;
        break;
      case "C":
        points += 3;
        break;

      default:
        break;
    }
    return points;
  }
  if (roundResult === "Z") {
    points = 6;
    switch (opponentMove) {
      case "A":
        points += 2;
        break;
      case "B":
        points += 3;
        break;
      case "C":
        points += 1;
        break;

      default:
        break;
    }
    return points;
  }
};

let points1 = 0;
let points2 = 0;

(() => {
  allRounds.forEach((round) => {
    let [opponentMove, ownMove] = round;
    points1 += pointsForMove(ownMove);
    points1 += calculateRoundOutcome(opponentMove, ownMove);
  });
})();

(() => {
  allRounds.forEach((round) => {
    let [opponentMove, roundResult] = round;
    points2 += calculateRoundTwoOutcome(opponentMove, roundResult);
  });
})();

console.log(points1);
console.log(points2);
