const path = require('path');
const { readFileSync } = require("fs");
const { EOL } = require("os");

const rows = readFileSync(path.join(__dirname, 'input.txt'), { encoding: "utf-8" })
  .split(EOL)
  .map((x) => x >> 0);

part1(rows);

function part1(rows) {
  const totals = new Array(5).fill(0);

  console.log(totals);
}
