import { getInput } from "../../utils/aoc.js";
import { EOL } from "os";

const rows = (await getInput()).split(EOL);

part1(rows);
part2(rows);

function part1(rows) {
  const byteLength = rows[0].length;
  const midpoint = rows.length / 2;

  let totals = new Array(byteLength).fill(0);

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < totals.length; j++) {
      totals[j] += ~~rows[i][j];
    }
  }

  let gamma = "";
  let epsilon = "";

  for (let i = 0; i < totals.length; i++) {
    const mode = totals[i] >= midpoint ? 1 : 0;

    gamma += `${mode}`;
    epsilon += `${1 - mode}`;
  }

  gamma = Number.parseInt(gamma, 2);
  epsilon = Number.parseInt(epsilon, 2);

  const powerCons = gamma * epsilon;

  console.log(`Part 1: ${powerCons}`);
}

function part2(rows) {
  const byteLength = rows[0].length;
  const tree = [
    { total: 0, items: [] },
    { total: 0, items: [] },
  ];

  for (let i = 0; i < rows.length; i++) {
    const parts = rows[i].split("");
    let cur = parts.shift();
    let node = tree[cur];

    while (parts.length) {
      if (node.total === 0) {
        node.items.push(
          { total: 0, items: [], value: rows[i] },
          { total: 0, items: [], value: rows[i] }
        );
      }
      node.total++;

      cur = parts.shift();
      node = node.items[cur];
    }
  }

  let co2 = "";
  let oxygen = "";

  let co2Node = tree[0].total <= tree[1].total ? tree[0] : tree[1];
  let oxygenNode = tree[1].total >= tree[0].total ? tree[1] : tree[0];

  for (let i = 1; i < byteLength; i++) {
    if (co2Node.total !== 0) {
      co2Node =
        co2Node.items[0].total <= co2Node.items[1].total
          ? co2Node.items[0]
          : co2Node.items[1];
      co2 = co2Node.value;
    }

    if (oxygenNode.total !== 0) {
      oxygenNode =
        oxygenNode.items[1].total >= oxygenNode.items[0].total
          ? oxygenNode.items[1]
          : oxygenNode.items[0];
      oxygen = oxygenNode.value;
    }
  }

  co2 = parseInt(co2, 2);
  oxygen = parseInt(oxygen, 2);

  const lifeSupportRating = co2 * oxygen;

  console.log(`Part 2: ${lifeSupportRating}`);
}
