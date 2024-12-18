import express, { json } from "express";

import { corsMiddleware } from "./middlewares/cors.js";
import { createTodosRouter } from "./routes/todos.js";
import { Todo } from "./models/mysql/todo.js";

export const createApp = ({ todoModel }) => {
  const app = express();
  const PORT = process.env.port ?? 3000;

  //import fs from "node:fs";
  //const todos = JSON.parse(fs.readFileSync("./todos.json", "utf-8"));

  app.disable("x-powered-by");

  app.use(json());

  // app.use((req, res, next) => {
  //   if (req.method !== "POST") {
  //     return next();
  //   }

  //   if (req.headers["content-type"] !== "application/json") {
  //     return next();
  //   }

  //   let body = "";
  //   req.on("data", (chunk) => {
  //     body += chunk.toString();
  //   });

  //   req.on("end", () => {
  //     const data = JSON.parse(body);
  //     console.log("data", data);
  //     data.timestamp = Date.now();

  //     req.body = data;

  //     next();
  //   });
  // });

  app.use("/todos", createTodosRouter({ todoModel }));

  app.use(corsMiddleware());

  // Cors preflight
  // app.options("/todos", (req, res) => {
  //   const origin = req.headers.origin;

  //   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //     res.header("Access-Control-Allow-Origin", origin);
  //     res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
  //   }

  //   res.send();
  // });

  app.use((req, res) => {
    res.status(404).send("404 Not Found");
  });

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
};
