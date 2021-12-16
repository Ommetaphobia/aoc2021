import { mkdir, writeFile } from "fs/promises";
import { createInputFile, url } from "../utils/aoc.js";
import path from "path";
import minimist from "minimist";
import { EOL } from "os";
import { exec } from "child_process";

const now = new Date();

const { day, year, open } = minimist(process.argv.slice(2), {
  alias: {
    year: "y",
    day: "d",
    open: "o",
  },
  default: {
    year: now.getFullYear(),
    day: now.getDay(),
    open: true,
  },
  string: ["year", "day"],
  boolean: "open",
});

const dirPath = path.join(process.env.PWD, year, day);

try {
  console.log("Creating Folder...");
  await mkdir(dirPath, { recursive: true });
  console.log("Done.");
} catch (e) {
  if (e.code === "EEXIST") {
    console.log("Folder already exists.");
  } else {
    console.error(e.message);
    process.exit(1);
  }
}

try {
  await createInputFile({ year, day });
} catch (e) {
  console.error(e);
  process.exit(1);
}

try {
  console.log("Creating index.js...");

  const template = [
    `import { getInput } from "../../utils/aoc.js"${EOL}`,
    `const rows = (await getInput());${EOL}`,
    "part1(rows);",
    `part2(rows);${EOL}`,
    `function part1(rows) {}${EOL}`,
    "function part2(rows) {}",
  ];

  await writeFile(path.join(dirPath, "index.js"), template.join(EOL), {
    flag: "wx",
  });

  console.log("Done.");
} catch (e) {
  if (e.code === "EEXIST") {
    console.log("index.js already exists.");
  } else {
    console.error(e.message);
    process.exit(1);
  }
}

if (open) {
  let start = "";

  if (process.platform === "darwin") {
    start = "open";
  } else if (process.platform === "win32") {
    start = "start";
  } else {
    start = "xdg-open";
  }

  exec(`${start} ${url}/${year}/day/${day}`);
}
