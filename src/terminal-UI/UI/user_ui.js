import { input, number, password, select } from "@inquirer/prompts";
import { userSignUp } from "../operations/user_operations.js";

export const detailsForSignUp = async () => {
  const user = {};
  user["name"] = await input({ message: "Enter your name: ", required: true });
  user["password"] = await password({
    message: "Enter your password:",
    required: true,
    mask: true,
  });
  return user;
};

export const detailsForSignIn = async () => {
  const loginDetails = {};
  loginDetails["id"] = await number({
    message: "Enter your id",
    required: true,
  });
  loginDetails["password"] = await password({
    message: "Enter your password:",
    required: true,
    mask: true,
  });
  return loginDetails;
};

const request = async () => {
  let toRun = true;
  while (toRun) {
    const command = await select({
      message: "Select your choice",
      choices: [
        {
          name: "register",
          value: userSignUp,
          description: "Register as a new user",
        },
        {
          name: "login",
          value: existingAccount,
          description: "Login to your existing account",
        },
        {
          name: "back",
          value: () => toRun = false,
          description: "Close",
        },
      ],
    });
    await command();
  }
};

request();
