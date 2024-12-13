import { Todo } from "../models/todo.js";
import { validateTodo, validatePartialMovie } from "../schemas/todos.js";

export class TodoController {
  static async getAll(req, res) {
    const { type } = req.query;
    const todos = await Todo.getAll({ type });

    res.json(todos);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const todo = await Todo.getById({ id });
    if (todo) {
      return res.json(todo);
    }

    res.status(404).json({ message: "Todo not found" });
  }

  static async create(req, res) {
    console.log("req.body", req.body);

    const result = validateTodo(req.body);

    console.log("result", result);

    if (result.error) {
      return res.status(400).json(result.error);
    }

    const newTodo = await Todo.create(result.data);

    res.status(201).json(newTodo);
  }

  static async update(req, res) {
    const { id } = req.params;
    const result = validatePartialMovie(req.body);
    const updateTodo = await Todo.update({ id, todo: req.body });

    if (!result.success) {
      return res.status(400).json(result.error);
    }

    res.json(updateTodo);
  }

  static async delete(req, res) {
    const { id } = req.params;

    const result = await Todo.delete({ id });

    if (result === false) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted" });
  }
}
