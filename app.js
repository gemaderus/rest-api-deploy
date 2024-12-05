const express = require("express");
const todos = require("./todos");
const crypto = require("crypto");
const app = express();
const PORT = process.env.port ?? 3000;
const { validateTodo, validatePartialMovie } = require("./schemas/todos");

app.disable("x-powered-by");

app.use(express.json());

const ACCEPTED_ORIGINS = [
  "http://localhost:3000",
  "file:///Users/gema/Dev/todolist/index.html",
];

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

app.get("/todos", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const { type } = req.query;

  if (type) {
    const filteredTodos = todos.filter(
      (todo) => todo.type.toLowerCase() === type.toLowerCase()
    );

    return res.json(filteredTodos);
  }

  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === +id);
  if (todo) {
    return res.json(todo);
  }

  res.status(404).json({ message: "Todo not found" });
});

app.post("/todos", (req, res) => {
  const result = validateTodo(req.body);

  if (result.error) {
    return res.status(400).json(result.error);
  }

  const newTodo = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;
  const result = validatePartialMovie(req.body);

  if (!result.success) {
    return res.status(400).json(result.error);
  }

  const todoIndex = todos.findIndex((todo) => todo.id === +id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const updateTodo = {
    ...todos[todoIndex],
    ...result.data,
  };

  todos[todoIndex] = updateTodo;

  res.json(updateTodo);
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((todo) => todo.id === +id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todos.splice(todoIndex, 1);

  res.json({ message: "Todo deleted" });
});

// Cors preflight
app.options("/todos", (req, res) => {
  const origin = req.headers.origin;

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
  }

  res.send();
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
