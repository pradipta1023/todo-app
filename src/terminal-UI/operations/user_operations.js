import { detailsForSignIn, detailsForSignUp } from "../UI/user_ui.js";
import { addTodo, addUser, getTodos, login } from "../../client/request.js";
import { input, select, checkbox } from "@inquirer/prompts";

export const userSignUp = async () => {
  const userDetails = await detailsForSignUp();
  const response = await addUser(userDetails);
  console.log(response.body);
};

const userSignIn = async () => {
  const userDetails = await detailsForSignIn();
  const response = await login(userDetails);
  return response;
};

const getTodoDetails = async () => {
  const name = await input({ message: "Enter todo name: ", required: true });
  const description = await input({
    message: "Enter description",
    required: true,
  });
  return { name, description };
};

const addNewTodo = async (user_id) => {
  const todoDetails = await getTodoDetails();
  todoDetails.user_id = user_id;
  const response = await addTodo(todoDetails);
  console.log(response);
};

const getAllTodos = async (user_id) => {
  const response = await getTodos({ user_id });
  console.log(response);
};

const handleTodoRequests = async ({ user_id }) => {
  let toRun = true;
  while (toRun) {
    const command = await select({
      message: "Select your operation",
      choices: [
        {
          name: "Add todo",
          value: addNewTodo,
          description: "Add a new todo",
        },
        {
          name: "Get todos",
          value: getAllTodos,
          description: "Get all available todos",
        },
        {
          name: "Delete todo",
          value: deleteExistingTodos,
          description: 'Delete existing todos'
        }
        {
          name: "Back",
          value: () => toRun = false,
          description: "Back to previous menu",
        },
      ],
    });
    await command(user_id);
  }
};

export const existingAccount = async () => {
  const response = await userSignIn();

  if (response.status === 200) {
    await handleTodoRequests(response.body);
  }
};
