import { getInput } from "../../utils/aoc.js";

const rows = (await getInput()).split(/\s*(?:->)\s*(.+)\s*/);

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

const graph = generateGraph(graphWidth, graphHeight);

part1(lines.linear, graph);
part2(lines.diagonal, graph);

function part1(rows, graph) {
  const rowLength = rows.length;

  for (let i = 0; i < rowLength; i++) {
    graph.plotLine(rows[i]);
  }

  console.log(`Part 1: ${graph.intersections}`);
}

function part2(rows, graph) {
  const rowLength = rows.length;

  for (let i = 0; i < rowLength; i++) {
    graph.plotLine(rows[i]);
  }

  console.log(`Part 2: ${graph.intersections}`);
}

function generateGraph(graphLength, graphHeight) {
  const graph = {
    matrix: [],
    intersections: 0,
    plotHorizontal: function ({ x1, x2 }, y) {
      let x = x2 > x1 ? x1 : x2;
      let end = x === x1 ? x2 : x1;

      for (x; x <= end; x++) {
        this.matrix[y][x]++;

        if (this.matrix[y][x] === 2) {
          this.intersections++;
        }
      }
    },
    plotVertical: function ({ y1, y2 }, x) {
      let y = y2 > y1 ? y1 : y2;
      let end = y === y1 ? y2 : y1;

      for (y; y <= end; y++) {
        this.matrix[y][x]++;

        if (this.matrix[y][x] === 2) {
          this.intersections++;
        }
      }
    },
    plotDiagonal: function ({ x1, x2, y1, y2 }) {
      const m = (y1 - y2) / (x1 - x2);
      const c = y1 - x1 * m;

      let x = x1 > x2 ? x2 : x1;
      const end = x === x2 ? x1 : x2;

      for (x; x <= end; x++) {
        let y = m * x + c;

        this.matrix[y][x]++;

        if (this.matrix[y][x] === 2) {
          this.intersections++;
        }
      }
    },
    plotLine: function (points) {
      if (points.x1 === points.x2) {
        this.plotVertical(points, points.x1);
      } else if (points.y1 === points.y2) {
        this.plotHorizontal(points, points.y1);
      } else if (points.x1 !== points.x2 && points.y1 !== points.y2) {
        this.plotDiagonal(points);
      }
    },
  };

  for (let i = 0; i <= graphHeight; i++) {
    graph.matrix.push(new Array(graphLength + 1).fill(0));
  }

  return graph;
}
