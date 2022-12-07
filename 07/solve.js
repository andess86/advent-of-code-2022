const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8", (input, err) => {
  if (err) {
    console.log(err);
  }
});

const rows = input.split("\n");

const foldersAndSizes = { "/": 0 };
const paths = ["/"];

const discSize = 70000000;
const spaceNeeded = 30000000;

for (let i = 1; i < rows.length; i++) {
  const [, cmd, dir] = rows[i].split(" ");
  if (cmd === "ls") {
    while (i < rows.length - 1) {
      i++;
      const partsOfCommand = rows[i].split(" ");
      if (partsOfCommand[0] === "$") {
        i--;
        break;
      }
      if (partsOfCommand[0] !== "dir") {
        const fileSize = partsOfCommand[0];
        for (const path of paths) {
          foldersAndSizes[path] = (foldersAndSizes[path] ?? 0) + +fileSize;
        }
      }
    }
  } else {
    if (dir === "..") {
      paths.pop();
    } else {
      paths.push(`${paths.at(-1)}${dir}/`);
    }
  }
}

console.log(
  Object.values(foldersAndSizes)
    .filter((size) => size <= 100000)
    .reduce((acc, size) => acc + size)
);

console.log(
  Math.min(
    ...Object.values(foldersAndSizes).filter(
      (size) => size >= foldersAndSizes["/"] - (discSize - spaceNeeded)
    )
  )
);
