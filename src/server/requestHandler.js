export const handleUser = async (request) => {
  const path = new URL(request.url).pathname;
  console.log({ method: request.method, path });

  if (path === "/reg" && request.method === "POST") {
    const details = await request.json();
    console.log({ details });
    return new Response(JSON.stringify(details), {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  const body = "Response from server";
  // console.clear();
  return new Response(body, {
    headers: { "content-type": "text/plain" },
    status: 200,
  });
};
