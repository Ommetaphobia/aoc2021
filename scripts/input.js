import { mkdir } from "fs/promises";
import { createInputFile } from "../utils/aoc.js";
import path from "path";
import minimist from "minimist";

const now = new Date();

const { day, year, sample } = minimist(process.argv.slice(2), {
  alias: {
    year: "y",
    day: "d",
    sample: "s",
  },
  default: {
    year: now.getFullYear(),
    day: now.getDay(),
    sample: false,
  },
  string: ["year", "day"],
  boolean: "sample",
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
  await createInputFile({ year, day, sample });
} catch (e) {
  console.error(e);
  process.exit(1);
}
