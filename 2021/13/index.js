import { getInput } from "../../utils/aoc.js";
import { EOL } from "os";

const rows = async () => {
  return (await getInput()).split(EOL).reduce(
    (acc, cur) => {
      if (cur.indexOf(",") !== -1) {
        const points = cur.split(",").map((v) => ~~v);
        acc.points.push({ x: points[0], y: points[1] });
      } else if (cur.length > 0) {
        const fold = cur.substring(11).split("=");
        acc.folds.push({ axis: fold[0], point: ~~fold[1] });
      }

      return acc;
    },
    { points: [], folds: [] }
  );
};

part1(await rows());
part2(await rows());

function part1(rows) {
  const { points } = initGrid(rows, 1);
  console.log(`Part 1: ${points.length}`);
}

function part2(rows) {
  const grid = initGrid(rows, rows.folds.length);

  console.log("Part 2:");
  renderGrid(grid);
}

function initGrid(rows, totalFolds) {
  // Can work out where points will sit based
  // If point > fold point then new point = fold point * 2 - point
  const totalPoints = rows.points.length;
  const transformedPoints = new Set();
  const gridSize = { x: 0, y: 0 };

  for (let i = 0; i < totalPoints; i++) {
    for (let j = 0; j < totalFolds; j++) {
      const fold = rows.folds[j];

      if (rows.points[i][fold.axis] > fold.point) {
        rows.points[i][fold.axis] = fold.point * 2 - rows.points[i][fold.axis];
      }
    }

    transformedPoints.add(`${rows.points[i].x}_${rows.points[i].y}`);

    if (gridSize.x < rows.points[i].x) {
      gridSize.x = rows.points[i].x;
    }

    if (gridSize.y < rows.points[i].y) {
      gridSize.y = rows.points[i].y;
    }
  }

  const points = [...transformedPoints].map((o) => {
    const parts = o.split("_").map((v) => ~~v);
    return { x: parts[0], y: parts[1] };
  });

  return { points, gridSize };
}

function renderGrid({ points, gridSize }) {
  const totalPoints = points.length;

  const grid = Array.from(new Array(gridSize.y + 1), () =>
    new Array(gridSize.x + 1).fill(" ")
  );

  for (let i = 0; i < totalPoints; i++) {
    grid[points[i].y][points[i].x] = "#";
  }

  for (let i = 0; i <= gridSize.y; i++) {
    console.log(grid[i].join(""));
  }
}
