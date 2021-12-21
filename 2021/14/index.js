import { getInput } from "../../utils/aoc.js";
import { EOL } from "os";

const rows = (await getInput()).split(EOL);

const sequence = rows.shift();
rows.shift();
const insertions = rows.reduce((acc, cur) => {
  const parts = cur.split(" -> ");
  acc[[parts[0]]] = parts[1];

  return acc;
}, {});

part1(sequence, insertions, 10);
part2(sequence, insertions, 40);

function part1(sequence, insertions, steps) {
  const answer = solve(sequence, insertions, steps);

  console.log(`Part 1: ${answer}`);
}

function part2(sequence, insertions, steps) {
  const answer = solve(sequence, insertions, steps);

  console.log(`Part 2: ${answer}`);
}

function initOccurances(sequence, insertions) {
  const occurances = Object.entries(insertions).reduce(
    (acc, [key, val]) => {
      if (!acc.hasOwnProperty(val)) {
        acc.chars[val] = 0;
      }

      if (!acc.hasOwnProperty(key)) {
        acc.pairs[key] = 0;
      }

      return acc;
    },
    {
      pairs: {},
      chars: {},
    }
  );

  for (let i = 0; i < sequence.length - 1; i++) {
    occurances.pairs[sequence[i] + sequence[i + 1]]++;
  }

  for (let i = 0; i < sequence.length; i++) {
    occurances.chars[sequence[i]]++;
  }

  return occurances;
}

function findOccurances(sequence, insertions, steps) {
  const { pairs, chars } = initOccurances(sequence, insertions);

  for (let i = 0; i < steps; i++) {
    for (const [pair, value] of Object.entries(Object.assign({}, pairs))) {
      const insert = insertions[pair];
      const parts = pair.split("");

      pairs[parts[0] + parts[1]] -= value;
      pairs[parts[0] + insert] += value;
      pairs[insert + parts[1]] += value;
      chars[insert] += value;
    }
  }

  return chars;
}

function solve(sequence, insertions, steps) {
  const occurances = findOccurances(sequence, insertions, steps);
  const sorted = Object.values(occurances).sort((a, b) => a - b);
  return sorted.at(-1) - sorted[0];
}
