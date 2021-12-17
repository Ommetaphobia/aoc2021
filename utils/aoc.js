import fetch from "node-fetch";
import path from "path";
import { writeFileSync } from "fs";
import { readFile } from "fs/promises";
import minimist from "minimist";

const url = "https://adventofcode.com";
const now = new Date();

const defaultOpts = {
  day: now.getDay,
  year: now.getFullYear,
  sample: false,
};

async function createInputFile(opts) {
  const { day, year, sample } = Object.assign(defaultOpts, opts);

  console.log("Fetching input...");

  const resp = await fetch(
    `${url}/${year}/day/${day}${sample ? "" : "/input"}`,
    {
      headers: {
        cookie: `session=${process.env.SESSION}`,
      },
    }
  );

  console.log("Done.");

  if (resp.status !== 200) {
    throw new Error(`Failed to fetch input: ${resp.error}`);
  }

  const filePath = path.join(process.env.PWD, year, day, "input.txt");
  let input = await resp.text();

  if (sample) {
    const matches = input.match(/(?:<code>)(?<input>(.|\s)*?)(?:<\/code>)/);

    if (!matches?.groups?.input === undefined) {
      throw new Error(`Failed to parse sample input.`);
    }

    input = matches.groups.input;
  }

  console.log("Writing input to file...");
  await writeFileSync(filePath, input, { flag: "w" });
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
  const { year, day } = opts
    ? opts
    : minimist(process.argv.slice(2), {
        string: ["year", "day"],
      });

  const filePath = path.join(process.env.PWD, year, day, "input.txt");
  let input = "";

  try {
    const buf = await readFile(filePath);
    input = buf.toString();
  } catch (e) {
    if (e instanceof Error && e.code === "ENOENT") {
      console.log("Fetching input...");

      try {
        input = await get({ year, day });
      } catch (e) {
        console.error(e.message);
        process.exit(1);
      }
    } else {
      console.error(e.message);
      process.exit(1);
    }
  }
  return input;
}

export { createInputFile, submit, getInput, url };
