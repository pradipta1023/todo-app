import { detailsForSignIn, detailsForSignUp } from "../UI/user_ui.js";
import { addUser, login } from "../../client/request.js";

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

export const existingAccount = async () => {
  const response = await userSignIn();

  if (response.status === 200) {
    return console.log(response.body);
  }
  return console.log(response.body);
};
