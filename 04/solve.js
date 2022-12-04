const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8", (input, err) => {
  if (err) {
    console.log(err);
  }
});

const data = input.split("\n");
let nrOfContainments = 0;
let nrOfOverlaps = 0;

data.forEach((pair) => {
  const [first, second] = pair.split(",");

  const [firstStart, firstEnd] = first.split("-").map((x) => parseInt(x));
  const [secondStart, secondEnd] = second.split("-").map((x) => parseInt(x));

  if (
    (firstStart >= secondStart && firstEnd <= secondEnd) ||
    (secondStart >= firstStart && secondEnd <= firstEnd)
  ) {
    nrOfContainments++;
    return;
  }
});

data.forEach((pair) => {
  const [first, second] = pair.split(",");

  let [firstStart, firstEnd] = first.split("-").map((x) => parseInt(x));
  const [secondStart, secondEnd] = second.split("-").map((x) => parseInt(x));

  let firstRange = Array.from({ length: firstEnd + 1 }, (x, i) => i).splice(
    firstStart,
    firstEnd
  );

  let secondRange = Array.from({ length: secondEnd + 1 }, (x, i) => i).splice(
    secondStart,
    secondEnd
  );

  for (const section of firstRange) {
    if (secondRange.includes(section)) {
      return nrOfOverlaps++;
    }
  }
});

console.log(nrOfContainments);
console.log(nrOfOverlaps);
