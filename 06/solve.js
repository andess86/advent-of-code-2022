const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8", (input, err) => {
  if (err) {
    console.log(err);
  }
});
let regex = /^.*(.).*\1.*$/;
let foundpart1;
let foundpart2;

[...input].forEach((c, i) => {
  if (i < 4 || foundpart1) {
    return;
  }
  let sequence = input[i] + input[i + 1] + input[i + 2] + input[i + 3];

  let testSequence = regex.exec(sequence);
  if (!testSequence) {
    foundpart1 = true;
    console.log(sequence);
    console.log(i + 4);
  }
});

[...input].forEach((c, i) => {
  if (i < 14 || foundpart2) {
    return;
  }
  let sequence = input.substring(i, i + 14);

  let testSequence = regex.exec(sequence);
  if (!testSequence) {
    foundpart2 = true;
    console.log(sequence);
    console.log(i + 14);
  }
});
