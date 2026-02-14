export const handleSignUp = (details, { storage, storageFns }) => {
  const id = storageFns.signUp(storage, details);
  return new Response(JSON.stringify({ id }), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
};

export const handleSignIn = (details, { storage, storageFns }) => {
  const response = storageFns.signIn(storage, details);
  if (response.isError) {
    return new Response(response.body, {
      headers: {
        "content-type": "text/plain",
      },
      status: 404,
    });
  }

  return new Response(JSON.stringify(response.body), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
};
