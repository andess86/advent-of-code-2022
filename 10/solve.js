const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf-8", (input, err) => {
    if (err) {
      console.log(err);
    }
  })
  .split("\n");

let data = input.map((e) => e.split(" "));
let cycles = 0;
let x = 1;
let recordValAt = 20;
let signalStrengths = [];

function tick() {
  cycles++;
  if (cycles === recordValAt) {
    signalStrengths.push(x * cycles);
    recordValAt += 40;
  }
}

data.forEach((row, i) => {
  let [command, value] = row;
  if (command === "noop") return tick();
  else if (command === "addx") {
    tick();
    tick();
    x += +value;
  }
});

console.log(signalStrengths.reduce((a, e) => a + e, 0));
