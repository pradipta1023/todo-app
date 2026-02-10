export const addTodo = (db, todoDetails) => {
  const { name, user_id } = todoDetails;
  const insertStatement =
    `INSERT INTO todo (name, user_id) VALUES (?, ?) RETURNING *`;
  try {
    const response = db.prepare(insertStatement).get(name, user_id);
    return {
      isError: false,
      message: { ["todo id"]: response.todo_id, name: response.name },
    };
  } catch {
    return { isError: true, message: `${user_id} is not a valid user id` };
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
  const selectStatement =
    `SELECT * FROM user WHERE user_id = ? AND password = ?`;
  const user = db.prepare(selectStatement).get(id, password);
  return user;
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
    has_done INTEGER CHECK (has_done IN (0, 1)) DEFAULT 0,
    user_id INTEGER REFERENCES user(user_id)
    );
  `);
};
