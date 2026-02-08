const repsonse = await fetch("http://localhost:8000");

const repsonseText = await repsonse.text();

console.log({ repsonse, repsonseText });
