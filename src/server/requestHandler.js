import { handleSignUp } from "./userController.js";

export const handleUser = async (request, { storage, storageFns }) => {
  const path = new URL(request.url).pathname;
  console.log({ method: request.method, path });

  if (path === "/reg" && request.method === "POST") {
    const details = await request.json();
    return await handleSignUp(details, { storage, storageFns });
  }

  const body = "Response from server";
  return new Response(body, {
    headers: { "content-type": "text/plain" },
    status: 200,
  });
};
