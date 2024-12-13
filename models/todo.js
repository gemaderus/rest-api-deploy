import { readJSON } from "../utils/readJson.js";
import { randomUUID } from "node:crypto";

const todos = readJSON("../todos.json");

export class Todo {
  static async getAll({ type }) {
    if (type) {
      return todos.filter(
        (todo) => todo.type.toLowerCase() === type.toLowerCase()
      );
    }
    return todos;
  }

  static async getById({ id }) {
    const todo = todos.find((todo) => todo.id === +id);
    return todo;
  }

  static async create(todo) {
    console.log("todo", todo);
    const newTodo = {
      id: randomUUID(),
      ...todo,
    };

    console.log(newTodo);

    todos.push(newTodo);

    return newTodo;
  }

  static async update({ id, todo }) {
    const index = todos.findIndex((todo) => todo.id === +id);

    if (index === -1) {
      return null;
    }

    todos[index] = {
      ...todos[index],
      ...todo,
    };

    return todos[index];
  }

  static async delete(id) {
    const index = todos.findIndex((todo) => todo.id === +id);

    if (index === -1) {
      return null;
    }

    todos.splice(index, 1);

    return true;
  }
}
