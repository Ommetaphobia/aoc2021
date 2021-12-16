import { getInput } from "../../utils/aoc.js";

const rows = (await getInput()).split(",");

const fish = new Array(7).fill(0);
const totalFish = rows.length;

for (let i = 0; i < totalFish; i++) {
  fish[rows[i]]++;
}

part1(fish.slice(0), totalFish);
part2(fish.slice(0), totalFish);

function part1(fish, total) {
  total += simulateFish(fish, 80);

  console.log(`Part 1: ${total}`);
}

function part2(fish, total) {
  total += simulateFish(fish, 256);

  console.log(`Part 2: ${total}`);
}

function simulateFish(fish, days) {
  const babyFish = new Array(days + 8).fill(0);
  let total = 0;

  for (let i = 0; i < days; i++) {
    const fishIndex = i % 7;

    fish[fishIndex] += babyFish[i];
    babyFish[i + 9] = fish[fishIndex];

    total += fish[fishIndex];
  }

  return total;
}
