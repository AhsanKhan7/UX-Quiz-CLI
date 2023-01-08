#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Lets take a UX quizzzzzzzzz \n"
  ).start()

  console.log('Powered by:')
  const msg = `TAMBA`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });

  await sleep();
  console.log(`
            ${chalk.bgBlue("HOW TO PLAY")}
            Iam a process on your computer.
            If you get any question wrong I will be ${chalk.bgRed("Killed")}.
            So get all the questions right...
  `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "A design repeated as a unit in a pattern is called a ________. \n",
    choices: [
      "Field",
      "Pattern",
      "Motif",
      "Two",
    ],
  });

  return handleAnswer(answers.question_1 === "Motif");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "A component's ________ control the visual characteristics that are displayed on the component. \n",
    choices: [
      "Combo box",
      "Sequential",
      "Properties",
      "Command line",
    ],
  });

  return handleAnswer(answers.question_2 === "Properties");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: "Which of the following types of component is/are included in a user interface? \n",
    choices: [
      "Hardware",
      "Software",
      "Both hardware and software",
    ],
  });

  return handleAnswer(answers.question_3 === "Both hardware and software");
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: "Which of the following is NOT a characteristic of a good persona? \n",
    choices: [
      "it is realistic and is not idealized.",
      "it describes a challenging design target.",
      "It focuses on future state.",
      "It reflects patterns observed in research."
    ],
  });

  return handleAnswer(answers.question_4 === "It focuses on future state.");
}


async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message: "For which of the following activities do you need to use UX tools? \n",
    choices: [
      "A/B testing",
      "Prototyping",
      "Wireframing",
      "Surveying",
      "All of the above"
    ],
  });

  return handleAnswer(answers.question_5 === "All of the above");
}



async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice Work ${playerName}. \n` });
  } else {
    spinner.error({ text: `Game Over, you lose ${playerName}!.` });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const msg = `Congrats, ${playerName}`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();

await winner();
