import { getInput } from "../../utils/aoc.js";
import { EOL } from "os";

const rows = (await getInput()).split(EOL).map((v) => v.split(""));

solve(rows);

function solve(rows) {
  const syntaxValueMap = {
    "(": -3,
    ")": 3,
    "[": -57,
    "]": 57,
    "{": -1197,
    "}": 1197,
    "<": -25137,
    ">": 25137,
  };

  const autocompleteMap = {
    [-3]: 1,
    [-57]: 2,
    [-1197]: 3,
    [-25137]: 4,
  };

  const totalRows = rows.length;
  const autocompleteValues = [];
  let syntaxErrorSum = 0;

  for (let i = 0; i < totalRows; i++) {
    const totalCols = rows[i].length;
    const syntaxValues = [syntaxValueMap[rows[i][0]]];
    let syntaxError = false;

    for (let j = 1; j < totalCols; j++) {
      const curSyntaxValue = syntaxValueMap[rows[i][j]];

      if (curSyntaxValue < 0) {
        syntaxValues.push(curSyntaxValue);
      } else {
        const lastSyntaxValue = syntaxValues.pop();

        if (lastSyntaxValue * curSyntaxValue !== -(curSyntaxValue ** 2)) {
          syntaxErrorSum += curSyntaxValue;
          syntaxError = true;
          break;
        }
      }
    }

    if (!syntaxError) {
      let autocompleteValue = 0;

      for (let j = syntaxValues.length; j-- > 0; ) {
        autocompleteValue =
          autocompleteValue * 5 + autocompleteMap[syntaxValues[j]];
      }

      autocompleteValues.push(autocompleteValue);
    }
  }

  autocompleteValues.sort((a, b) => a - b);

  const autocompleteValue =
    autocompleteValues[(autocompleteValues.length - 1) / 2];

  console.log(`Part 1: ${syntaxErrorSum}`);

  console.log(`Part 2: ${autocompleteValue}`);
}
