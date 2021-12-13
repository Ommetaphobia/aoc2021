const path = require("path");
const { readFileSync } = require("fs");

const rows = readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf-8",
}).split(/\s*(?:->)\s*(.+)\s*/);

const lines = {
  linear: [],
  diagonal: [],
};

const rowLength = rows.length;
let graphWidth = 0;
let graphHeight = 0;

for (let i = 1; i < rowLength; i += 2) {
  const startPoints = rows[i - 1].split(",");
  const endPoints = rows[i].split(",");

  const plot = {
    x1: ~~startPoints[0],
    y1: ~~startPoints[1],
    x2: ~~endPoints[0],
    y2: ~~endPoints[1],
  };

  if (plot.x1 === plot.x2 || plot.y1 === plot.y2) {
    lines.linear.push(plot);
  } else {
    lines.diagonal.push(plot);
  }

  if (plot.x1 > graphWidth || plot.x2 > graphWidth) {
    graphWidth = plot.x1 > plot.x2 ? plot.x1 : plot.x2;
  }

  if (plot.y1 > graphHeight || plot.y2 > graphHeight) {
    graphHeight = plot.y1 > plot.y2 ? plot.y1 : plot.y2;
  }
}

part1(lines.linear, generateMatrix(graphWidth, graphHeight));

function part1(rows, matrix) {
  const rowLength = rows.length;
  let totalMultipleIntersections = 0;

  for (let i = 0; i < rowLength; i++) {
    const { x1, x2, y1, y2 } = rows[i];

    if (x1 === x2) {
      const yRange = [y1, y2];

      const line = {
        x: x1,
        y: yRange.sort((a, b) => (a < b ? -1 : 1)),
      };

      for (let i = line.y[0]; i <= line.y[1]; i++) {
        matrix[i][line.x]++;

        if (matrix[i][line.x] === 2) {
          totalMultipleIntersections++;
        }
      }
    } else {
      const xRange = [x1, x2];

      const line = {
        x: xRange.sort((a, b) => (a < b ? -1 : 1)),
        y: y1,
      };

      for (let i = line.x[0]; i <= line.x[1]; i++) {
        matrix[line.y][i]++;

        if (matrix[line.y][i] === 2) {
          totalMultipleIntersections++;
        }
      }
    }
  }

  console.log(`Part 1: ${totalMultipleIntersections}`);
}

function generateMatrix(rowLength, rowHeight) {
  const matrix = [];

  for (let i = 0; i <= rowHeight; i++) {
    matrix.push(new Array(rowLength).fill(0));
  }

  return matrix;
}
