const details = { name: "Dummy", password: "dummy1234" };

const repsonse = await fetch("http://localhost:8000/reg", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify(details),
});

const jsonResponse = await repsonse.json();

console.log({ jsonResponse });
