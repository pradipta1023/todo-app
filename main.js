import { handleUser } from "./src/server/anonymous.js";

const main = () => {
  Deno.serve({
    port: 8000,
    onListen: (p) => console.log(`Listening from : ${p.port}`),
  }, (request) => handleUser(request));
};

main();
