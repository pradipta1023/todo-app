export const handleSignUp = (details, { storage, storageFns }) => {
  const id = storageFns.signUp(storage, details);
  return new Response(JSON.stringify({ id }), {
    headers: {
      "content-type": "application/json",
    },
  });
};
