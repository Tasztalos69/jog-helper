#!/usr/bin/env node
import path from "path";
import fs from "fs/promises";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import inquirer from "inquirer";
import chalk from "chalk";

const parser = yargs(hideBin(process.argv))
  .positional("file", {
    describe: "file to read answers from",
    type: "string",
    default: "jog.txt",
  })
  .help();

const main = async () => {
  const argv = await parser.argv;
  const filename = argv._[0] || "jog.txt";
  try {
    // Load file
    const buffer = await fs.readFile(path.join(__dirname, filename as string));
    const questions = buffer
      .toString()
      .split("\n")
      .map((l) => l.trim());
    console.log(chalk.cyan(`Loaded questions from ${filename}.`));

    let exit = false;
    while (!exit) {
      const answers = await inquirer.prompt([
        {
          type: "string",
          name: "question",
          message: "Enter the question (or q to quit):",
        },
      ]);
      const { question } = answers;

      // Exit command
      if (question === "q") {
        exit = true;
        return;
      }

      // Find all questions that match the title
      const questionLines: number[] = [];
      let q = 0,
        prevQ = 0;
      while (q !== -1) {
        q = questions.indexOf(question, prevQ + 1);
        if (q !== -1) {
          questionLines.push(q);
          prevQ = q;
        } else {
          q = -1;
        }
      }

      // Error of no answer
      if (questionLines.length === 0) {
        console.log(chalk.red("Sorry, no answer to that question."));
        continue;
      }

      // Print questions and answers
      const qAnswers = questionLines.map((ql) => {
        const lines: string[] = [];
        for (let i = ql - 1; i < ql + 5; i++) {
          const line = questions[i];
          let colored = chalk.gray;
          if (i === ql - 1) colored = chalk.magenta;
          if (i === ql) colored = chalk.cyan;
          if (line.startsWith("-")) colored = chalk.green;
          lines.push(colored(line));
        }
        return lines.join("\n");
      });

      console.log(qAnswers.join("\n\n"));
    }
  } catch (error) {
    const err = error as any;
    if (err.code === "ENOENT") {
      return console.log(chalk.red(`Error! File not found: ${filename}`));
    } else {
      console.error(err);
    }
  }
};

main();
