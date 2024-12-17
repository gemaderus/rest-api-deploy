import { Router } from "express";
import { TodoController } from "../controllers/todos.js";

export const createTodosRouter = ({ todoModel }) => {
  const todosRouter = Router();
  const todoController = new TodoController({ todoModel });

  todosRouter.get("/", todoController.getAll);
  todosRouter.get("/:id", todoController.getById);
  todosRouter.post("/", todoController.create);
  todosRouter.patch("/:id", todoController.update);
  todosRouter.delete("/:id", todoController.delete);

  return todosRouter;
};
