// import { readJSON } from "../utils/readJson.js";
// import { randomUUID } from "node:crypto";

import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "tododb",
  port: 3306,
};

const connection = await mysql.createConnection(config);

export class Todo {
  static async getAll({ type }) {
    const [todos] = await connection.query(
      "SELECT done, title, type, BIN_TO_UUID(ID) id FROM todo;"
    );

    return todos;
  }

  static async getById({ id }) {
    const [todos] = await connection.query(
      `SELECT done, title, type, BIN_TO_UUID(ID) id FROM todo WHERE id = UUID_TO_BIN(?);`,
      [id]
    );

    if (todos.length === 0) {
      return null;
    }

    return todos[0];
  }

  static async create(todo) {
    const { title, type, done } = todo;

    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        `INSERT INTO todo (id, done, title, type) VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?);`,
        [done, title, type]
      );
    } catch (error) {
      throw new Error("Error creating todo");
    }

    return {
      ...todo,
      id: uuid,
    };
  }

  static async update({ id, todo }) {
    const { title, type, done } = todo;

    try {
      await connection.query(
        `UPDATE todo SET done = ?, title = ?, type = ? WHERE id = UUID_TO_BIN(?);`,
        [done, title, type, id]
      );
    } catch (error) {
      console.log("error", error);
      throw new Error("Error updating todo");
    }

    return {
      ...todo,
      id,
    };
  }

  static async delete({ id }) {
    try {
      await connection.query(`DELETE FROM todo WHERE id = UUID_TO_BIN(?);`, [
        id,
      ]);
    } catch (error) {
      console.log("error", error);
      throw new Error("Error deleting todo");
    }

    return true;
  }
}
