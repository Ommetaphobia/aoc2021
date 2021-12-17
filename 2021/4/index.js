import { getInput } from "../../utils/aoc.js";

let rows = (await getInput()).split(/\s+/);

const numbers = rows
  .shift()
  .split(",")
  .map((x) => ~~x);
const bingoCardRows = 5;
const bingoCardColumns = 5;

rows = rows.map((x) => ~~x);

part1(numbers, generateBingoCards(rows, bingoCardRows, bingoCardColumns));
part2(numbers, generateBingoCards(rows, bingoCardRows, bingoCardColumns));

function part1(numbers, bingoCards) {
  let total = 0;
  let bingo = false;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < bingoCards.length; j++) {
      const index = bingoCards[j].numbers.indexOf(numbers[i]);

      if (index !== -1) {
        bingoCards[j].numbers[index] = "";

        const columnNumber = index % bingoCardColumns;
        const rowNumber = Math.floor(index / bingoCardRows);

        bingoCards[j].rows[rowNumber]++;
        bingoCards[j].columns[columnNumber]++;

        if (
          bingoCards[j].rows[rowNumber] === bingoCardRows ||
          bingoCards[j].columns[columnNumber] === bingoCardColumns
        ) {
          const sum = sumOfNumbers(bingoCards[j].numbers);
          total = sum * numbers[i];
          bingo = true;
          break;
        }
      }
    }

    if (bingo) {
      break;
    }
  }

  console.log(`Part 1: ${total}`);
}

function part2(numbers, bingoCards) {
  let bingo = false;
  let total = 0;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = bingoCards.length - 1; j >= 0; j--) {
      const index = bingoCards[j].numbers.indexOf(numbers[i]);

      if (index !== -1) {
        bingoCards[j].numbers[index] = "";

        const columnNumber = index % bingoCardColumns;
        const rowNumber = Math.floor(index / bingoCardRows);

        bingoCards[j].rows[rowNumber]++;
        bingoCards[j].columns[columnNumber]++;

        if (
          bingoCards[j].rows[rowNumber] === bingoCardRows ||
          bingoCards[j].columns[columnNumber] === bingoCardColumns
        ) {
          if (bingoCards.length === 1) {
            bingo = true;
            const sum = sumOfNumbers(bingoCards[j].numbers);
            total = sum * numbers[i];
            break;
          } else {
            bingoCards.splice(j, 1);
          }
        }
      }
    }

    if (bingo) {
      break;
    }
  }

  console.log(`Part 2: ${total}`);
}

function sumOfNumbers(numbers) {
  return numbers.reduce((acc, cur) => (acc += ~~cur), 0);
}

function generateBingoCards(rows, bingoCardRows, bingoCardColumns) {
  const bingoCards = [];
  const size = bingoCardRows * bingoCardColumns;

  for (let i = 0; i < rows.length; i += size) {
    bingoCards.push({
      numbers: rows.slice(i, i + size),
      rows: new Array(bingoCardRows).fill(0),
      columns: new Array(bingoCardColumns).fill(0),
    });
  }

  return bingoCards;
}
