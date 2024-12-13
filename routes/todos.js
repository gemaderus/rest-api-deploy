import { Router } from "express";
import { TodoController } from "../controllers/todos.js";

export const todosRouter = Router();

todosRouter.get("/", TodoController.getAll);
todosRouter.get("/:id", TodoController.getById);
todosRouter.post("/", TodoController.create);
todosRouter.patch("/:id", TodoController.update);
todosRouter.delete("/:id", TodoController.delete);
