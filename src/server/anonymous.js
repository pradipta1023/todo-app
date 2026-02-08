export const handleUser = (request) => {
  const path = new URL(request.url).pathname;
  console.log({ request });
  const body = "Response from server";
  return new Response(body, {
    headers: { "content-type": "text/pain" },
    status: 200,
  });
};
