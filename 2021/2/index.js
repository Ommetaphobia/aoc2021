import { getInput } from "../../utils/aoc.js";

const commands = (await getInput()).split(/\s+/);

part1(commands);
part2(commands);

function part1(commands) {
  const sub = {
    horizontal: 0,
    depth: 0,
    forward(length) {
      this.horizontal += length;
    },
    up(length) {
      this.depth -= length;
    },
    down(length) {
      this.depth += length;
    },
  };

  for (let i = 0; i < commands.length - 1; i += 2) {
    sub[commands[i]](~~commands[i + 1]);
  }

  const product = sub.depth * sub.horizontal;

  console.log(`Part 1: ${product}`);
}

function part2(commands) {
  const sub = {
    aim: 0,
    horizontal: 0,
    depth: 0,
    forward(length) {
      this.horizontal += length;
      this.depth += this.aim * length;
    },
    up(length) {
      this.aim -= length;
    },
    down(length) {
      this.aim += length;
    },
  };

  for (let i = 0; i < commands.length - 1; i += 2) {
    sub[commands[i]](~~commands[i + 1]);
  }

  const product = sub.depth * sub.horizontal;

  console.log(`Part 2: ${product}`);
}
