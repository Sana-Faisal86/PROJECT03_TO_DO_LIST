#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

console.log(
  chalk.black.bgCyan("\n\t", "+".repeat(15), "======>"),
  chalk.black.bgRedBright(" WELLCOME TO DO LIST PROJECT"),
  chalk.black.bgCyan("<======", "+".repeat(15), "\n")
);

let todos = ["Wake Up"];
let condition = true;
async function createTodo(todos: string[]) {
  do {
    let answer = await inquirer.prompt({
      type: "list",
      name: "option",
      message: chalk.magentaBright.bold.underline("\n\t>>>> Select an option !"),
      choices: ["Add", "Update", "View", "Delete", "Exit"],
    });
    if (answer.option === "Add") {
      let addMore = await inquirer.prompt({
        name: "addmore",
        type: "input",
        message: chalk.bold.cyan.underline("\n\t\t>>>> Add item in the list ==>"),
      });
      todos.push(addMore.addmore);
      todos.forEach((addMore) => console.log(`\n\t\t${chalk.red.bold.underline(addMore)}`));
    }
    if (answer.option == "Update") {
      let updateMore = await inquirer.prompt({
        name: "todo",
        type: "list",
        message: chalk.magentaBright.bold.underline("\n\t>>>> Select item for update ==>"),
        choices: todos.map((item) => item),
      });
      let addMore = await inquirer.prompt({
        name: "todo",
        type: "input",
        message: chalk.bold.cyan.underline("\n\t\t >>>> Add item...."),
      });
      let newTask = todos.filter((val) => val !== updateMore.todo);
      todos = [...newTask, addMore.todo];
      console.log("\n\t\t",todos);
    }
    if (answer.option === "View") {
      console.log("\n\t\t",todos);
    }
    if (answer.option === "Delete") {
      let deleteTask = await inquirer.prompt({
        name: "deletetask",
        type: "list",
        message: chalk.bold.red.underline(
          "\n\t\t>>>> Delete task from the list !"
        ),
        choices: todos.map((item) => item),
      });
      let newTask = todos.filter((val) => val !== deleteTask.deletetask);
      todos = [...newTask];
    }
    if (answer.option == "Exit") {
      condition = false;
      console.log(chalk.black.bgBlue("\n\t\t >>>> Thanks for Use :"));
    }
  } while (condition);
}

createTodo(todos);
