import path from "path";
import { readFile } from "fs/promises";
import minimist from "minimist";
import { fork } from "child_process";

const now = new Date();

const { day, year } = minimist(process.argv.slice(2), {
  alias: {
    year: "y",
    day: "d",
  },
  default: {
    year: now.getFullYear(),
    day: now.getDay(),
  },
  string: ["year", "day"],
});

const filePath = path.join(process.env.PWD, year, day, "index.js");

try {
  await readFile(filePath);
} catch (e) {
  console.error(e.message);
  process.exit(1);
}

const child = fork(filePath, ["--year", year, "--day", day]);

child.on("error", (e) => {
  console.error(e);
});

child.on("exit", (code) => {
  if (code !== 0) {
    throw new Error(`Exit code ${code}`);
  }
});
