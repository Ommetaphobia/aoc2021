import fetch from "node-fetch";
import path from "path";
import { writeFileSync } from "fs";
import { readFile } from "fs/promises";
import minimist from "minimist";
import { EOL } from "os";

const url = "https://adventofcode.com";
const now = new Date();
const inputFilePath = ({ year, day, sample }) =>
  path.join(process.env.PWD, year, day, sample ? "sample.txt" : "input.txt");

const defaultOpts = {
  day: now.getDay(),
  year: now.getFullYear(),
};

async function createInputFile(opts) {
  const { day, year } = Object.assign(defaultOpts, opts);

  console.log("Fetching input...");

  const resp = await fetch(`${url}/${year}/day/${day}/input`, {
    headers: {
      cookie: `session=${process.env.SESSION}`,
    },
  });

  console.log("Done.");

  if (resp.status !== 200) {
    throw new Error(`Failed to fetch input: ${resp.error}`);
  }

  let input = (await resp.text()).trimEnd().replace(/(\r\n|\n|\r)/gm, EOL);

  console.log("Writing input to file...");
  await writeFileSync(inputFilePath({ day, year }), input, {
    flag: "w",
  });
  console.log("Done.");

  return input;
}

async function submit({ day, year, level }, ans) {
  const resp = await fetch(`${url}/${year}/day/${day}/answer`, {
    method: "POST",
    headers: {
      cookie: `session=${process.env.SESSION}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `level=${level}&answer=${encodeURIComponent(ans)}`,
  });

  if (resp.status !== 200) {
    throw new Error(`Failed to submit answer: ${resp.error}`);
  }

  const body = await resp.text();

  return body;
}

async function getInput(opts) {
  const { year, day, sample } = opts
    ? opts
    : minimist(process.argv.slice(2), {
        default: {
          sample: false,
        },
        string: ["year", "day"],
        boolean: "sample",
      });

  let input = "";

  try {
    const buf = await readFile(inputFilePath({ day, year, sample }));
    input = buf.toString();
  } catch (e) {
    if (e instanceof Error && e.code === "ENOENT") {
      if (sample) {
        console.error(e.message);
        process.exit(1);
      }
      input = await createInputFile({ year, day });
    } else {
      console.error(e.message);
      process.exit(1);
    }
  }

  return input;
}

export { createInputFile, submit, getInput, url };
