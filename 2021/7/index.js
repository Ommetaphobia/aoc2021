import { getInput } from "../../utils/aoc.js";

const numbers = (await getInput())
  .split(",")
  .map((v) => ~~v)
  .sort((a, b) => a - b);

const totalNumbers = numbers.length;

part1(numbers, totalNumbers);
part2(numbers, totalNumbers);

function part1(numbers, totalNumbers) {
  let sum = 0;

  const upperMid = numbers[totalNumbers / 2];
  const lowerMid = numbers[(totalNumbers - 2) / 2];
  const median = (upperMid + lowerMid) / 2;

  for (let i = 0; i < totalNumbers; i++) {
    sum += Math.abs(numbers[i] - median);
  }

  console.log(`Part 1: ${sum}`);
}

function part2(numbers, totalNumbers) {
  // rate of n(n + 1) / 2
  let sum = 0;
  let total = 0;

  for (let i = 0; i < totalNumbers; i++) {
    total += numbers[i];
  }

  const mean = Math.floor(total / totalNumbers);

  for (let i = 0; i < totalNumbers; i++) {
    sum += triangleNumber(Math.abs(numbers[i] - mean));
  }

  console.log(`Part 2: ${sum}`);
}

function triangleNumber(n) {
  return (n ** 2 + n) / 2;
}
