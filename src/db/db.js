export const addTodo = (db, todoDetails) => {
  const { name, user_id, description } = todoDetails;
  const insertStatement =
    `INSERT INTO todo (name, description, user_id) VALUES (?, ?, ?) RETURNING *`;
  try {
    const response = db.prepare(insertStatement).get(
      name,
      description,
      user_id,
    );
    return {
      isError: false,
      body: { ["todo id"]: response.todo_id, name: response.name },
    };
  } catch (error) {
    console.log(error);

    return { isError: true, body: `${user_id} is not a valid user id` };
  }
};

export const getTodos = (db, user) => {
  const { user_id } = user;
  const selectStatement = `SELECT * FROM todo WHERE user_id = ?`;
  try {
    const response = db.prepare(selectStatement).all(user_id);
    const isError = !response;
    const body = response || `No todos found`;
    return { isError, body };
  } catch (error) {
    return { isError: true, body: `An error occurred: ${error.message}` };
  }
};

export const deleteTodo = (db, user) => {
  const { user_id, todo_id } = user;
  const selectStatement =
    `DELETE FROM todo WHERE user_id = ? AND todo_id = ? RETURNING *`;
  try {
    const response = db.prepare(selectStatement).get(user_id, todo_id);
    return {
      isError: !response,
      body: response || "Invalid user id or todo id",
    };
  } catch {
    return { isError: true, body: `An error occurred: ${error.message}` };
  }
};

export const signUp = (db, userDetails) => {
  const { name, password } = userDetails;
  const insertStatement =
    `INSERT INTO user (name, password) VALUES (?, ?) RETURNING user_id`;
  const dbResponse = db.prepare(insertStatement).get(name, password);

  return dbResponse.user_id;
};

export const signIn = (db, userDetails) => {
  const { id, password } = userDetails;
  const selectStatement = `SELECT * FROM user WHERE user_id = ?`;
  const user = db.prepare(selectStatement).get(id);
  if (user) {
    return user.password === password
      ? { isError: false, body: user }
      : { isError: true, body: "Invalid password" };
  }
  return { isError: true, body: "Invalid user id" };
};

export const init = (db) => {
  db.exec(`CREATE TABLE IF NOT EXISTS user(
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text,
    password text
    );
    CREATE TABLE IF NOT EXISTS todo(
    todo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text,
    description text,
    has_done INTEGER CHECK (has_done IN (0, 1)) DEFAULT 0,
    user_id INTEGER REFERENCES user(user_id)
    );
  `);
};
