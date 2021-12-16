import { submit } from "../utils/aoc.js";
import minimist from "minimist";

const now = new Date();

const { answer, ...opts } = minimist(process.argv.slice(2), {
  alias: {
    year: "y",
    day: "d",
    level: "l",
    answer: ["ans", "a"],
  },
  default: {
    year: now.getFullYear(),
    day: now.getDay(),
    level: 1,
  },
  string: ["year", "day"],
});

try {
  const res = await submit(opts, answer);

  console.log(res.match(/(?<=<p>)[^<]*/)[0]);
} catch (e) {
  console.log(e);
}
