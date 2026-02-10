import { DatabaseSync } from "node:sqlite";
import { describe, it } from "node:test";
import { addTodo, init, signIn, signUp } from "../../src/db/db.js";
import { assertEquals } from "@std/assert";

describe("Testing db", () => {
  const db = new DatabaseSync(":memory:");
  it("init function should create tables for me", () => {
    init(db);
    const actual = db.prepare(
      `SELECT name FROM sqlite_master WHERE type = 'table' AND name != 'sqlite_sequence'`,
    ).all().length;
    assertEquals(actual, 2);
  });

  it("signUp function should return the id it gets after pushing data to db", () => {
    const actual = signUp(db, { name: "Dummy", password: "dummy1234" });
    assertEquals(actual, 1);
  });

  it("signIn function should return user object if found", () => {
    const user = signIn(db, { id: 1, password: "dummy1234" });
    assertEquals(user, { user_id: 1, name: "Dummy", password: "dummy1234" });
  });

  it("signIn function should return undefined if password or id doesn't match", () => {
    const user = signIn(db, { id: 1, password: "dummy123" });
    assertEquals(user, undefined);
  });

  it("addTodo function should return todo_id and todo name after adding todo", () => {
    const response = addTodo(db, { user_id: 1, name: "dummyTodo" });
    assertEquals(response.message, { "todo id": 1, name: "dummyTodo" });
    assertEquals(response.isError, false);
  });

  it("addTodo function should return", () => {
    const response = addTodo(db, { user_id: 5, name: "dummyTodo" });
    assertEquals(response.message, "5 is not a valid user id");
    assertEquals(response.isError, true);
  });
});
