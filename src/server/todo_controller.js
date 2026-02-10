export const handleAddTodo = (todoDetails, { storage, storageFns }) => {
  const response = storageFns.addTodo(storage, todoDetails);
  if (response.isError) {
    return new Response(response.message, {
      headers: {
        "content-type": "text/plain",
      },
      status: 404,
    });
  }

  return new Response(JSON.stringify(response.message), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
};
