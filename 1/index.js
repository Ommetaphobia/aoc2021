const { readFileSync } = require("fs");
const { EOL } = require("os");

const depths = readFileSync("input.txt", { encoding: "utf-8" })
  .split(EOL)
  .map((x) => x >> 0);

part1(depths);
part2(depths);

function part1(depths) {
  let prev = depths[0];
  let totalIncreases = 0;

  for (let i = 1; i < depths.length; i++) {
    if (depths[i] > prev) {
      totalIncreases++;
    }

    prev = depths[i];
  }

  console.log(`Part 1: ${totalIncreases}`);
}

function part2(depths) {
  let totalIncreases = 0;
  let prevSum = depths[0] + depths[1] + depths[2];

  for (let i = 1; i <= depths.length - 3; i++) {
    let curSum = prevSum + depths[i + 2] - depths[i - 1];

    if (curSum > prevSum) {
      totalIncreases++;
    }

    prevSum = curSum;
  }

  console.log(`Part 2: ${totalIncreases}`);
}
