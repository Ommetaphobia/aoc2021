import { getInput } from "../../utils/aoc.js";
import { EOL } from "os";

const rows = (await getInput())
  .split(EOL)
  .map((a) => a.split("").map((v) => ~~v));

const lastRow = rows.length - 1;
const lastCol = rows[0].length - 1;

part1(rows, lastRow, lastCol);
part2(rows, lastRow, lastCol);

function part1(rows, lastRow, lastCol) {
  const lowPointGenerator = getLowPoints(rows, lastRow, lastCol);

  let sum = 0;

  for (const { height } of lowPointGenerator) {
    sum += height + 1;
  }

  console.log(`Part 1: ${sum}`);
}

function part2(rows, lastRow, lastCol) {
  // Basins are surrounded by height 9
  const lowPointGenerator = getLowPoints(rows, lastRow, lastCol);

  const allBasinSize = [];

  for (const { x, y } of lowPointGenerator) {
    const basin = getBasinSize(rows, lastRow, lastCol, { x, y }, new Set());
    allBasinSize.push(basin.size);
  }
  const product = allBasinSize
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((acc, cur) => acc * cur);

  console.log(`Part 2: ${product}`);
}

function* getLowPoints(rows, lastRow, lastCol) {
  for (let y = 0; y <= lastRow; y++) {
    for (let x = 0; x <= lastCol; x++) {
      if (rows[y][x] !== 9) {
        const adjGenerator = getAdjacent(lastRow, lastCol, { x, y });
        let lowPoint = true;

        for (const adj of adjGenerator) {
          if (rows[y][x] > rows[adj.y][adj.x]) {
            lowPoint = false;
            break;
          }
        }

        if (lowPoint) {
          yield { x, y, height: rows[y][x] };
          x++;
        }
      }
    }
  }
}

function* getAdjacent(lastRow, lastCol, { x, y }) {
  if (x > 0) yield { x: x - 1, y };
  if (x < lastCol) yield { x: x + 1, y };
  if (y > 0) yield { x, y: y - 1 };
  if (y < lastRow) yield { x, y: y + 1 };
}

function getBasinSize(rows, lastRow, lastCol, { x, y }, acc) {
  acc.add(`y${y}_x${x}`);

  const adjGenerator = getAdjacent(lastRow, lastCol, { x, y });

  for (const point of adjGenerator) {
    if (
      acc.has(`y${point.y}_x${point.x}`) ||
      rows[point.y][point.x] === 9 ||
      rows[point.y][point.x] < rows[y][x]
    ) {
      continue;
    }
    getBasinSize(rows, lastRow, lastCol, point, acc);
  }

  return acc;
}
