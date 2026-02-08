export const signUp = (db, userDetails) => {
  const { name, password } = userDetails;
  const insertStatement =
    `INSERT INTO user (name, password) VALUES (?, ?) RETURNING id`;
  const dbResponse = db.prepare(insertStatement).get(name, password);

  return dbResponse.id;
};

export const init = (db) => {
  db.exec(`CREATE TABLE IF NOT EXISTS user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text,
    password text
    );
  `);
};
