const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8", (input, err) => {
  if (err) {
    console.log(err);
  }
});

let [stacks, procedures] = input.split("\n\n").map((r) => r.split("\n"));

stacks = stacks.map((stack) => stack.match(/.{1,4}/g));

let newStacks = stacks
  .map((_, colIndex) => stacks.map((row) => row[colIndex]))
  .map((e) => e.filter((e) => !/    |   /.test(e)));

procedures = procedures.map((e) => {
  let [procedure, count, from, to] =
    e.match(/move (\d+) from (\d+) to (\d+)/) ?? [];
  return [count, from, to].map(Number);
});

procedures.forEach(([count, from, to]) => {
  for (let index = 0; index < count; index++) {
    const crate = newStacks[from - 1].shift();
    newStacks[to - 1].unshift(crate);
  }
});

console.log(
  newStacks
    .map((stack) => stack[0])
    .join()
    .match(/[A-Z]/g)
    .join()
    .replaceAll(",", "")
);
