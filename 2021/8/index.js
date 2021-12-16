import { getInput } from "../../utils/aoc.js";

const rows = (await getInput()).split(/\s+(?:\|\s+)*/);

part1(rows);
part2(rows);

function part1(rows) {
  const limit = rows.length - 9;
  // 1, 4, 7, 8
  const haystack = [2, 3, 4, 7];
  let appearances = 0;

  for (let i = 0; i < limit; i += 14) {
    for (let j = 10; j < 14; j++) {
      const pattern = rows[i + j];
      if (haystack.indexOf(pattern.length) !== -1) {
        appearances++;
      }
    }
  }

  console.log(`Part 1: ${appearances}`);
}

function part2(rows) {
  let sum = 0;
  const limit = rows.length - 9;

  // Lookup table using sum of unique char occurances as it's key
  const digitLookup = {
    42: "0",
    17: "1",
    34: "2",
    39: "3",
    30: "4",
    37: "5",
    41: "6",
    25: "7",
    49: "8",
    45: "9",
  };

  for (let i = 0; i < limit; i += 14) {
    let chars = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
      g: 0,
    };

    // Begin counting occurances of each character in first 10 patterns
    for (let j = 0; j < 10; j++) {
      const pattern = rows[i + j];
      const patternLen = pattern.length;

      for (let k = 0; k < patternLen; k++) {
        chars[pattern[k]]++;
      }
    }

    let digit = "";

    for (let j = 10; j < 14; j++) {
      const pattern = rows[i + j];
      const patternLen = pattern.length;
      let charSum = 0;

      // Sum occurances of each character in pattern. This will reference our starting lookup table letting us map a sum to a digit.
      for (let k = 0; k < patternLen; k++) {
        const char = pattern[k];

        charSum += chars[char];
      }

      digit += digitLookup[charSum];
    }

    sum += ~~digit;
  }

  console.log(`Part 2: ${sum}`);
}
