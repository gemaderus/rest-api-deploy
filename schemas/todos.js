const z = require("zod");

const todoSchema = z.object({
  title: z.string().min(3).max(100),
  type: z.string().min(3).max(100),
  done: z.boolean(),
});

const validateTodo = (todo) => {
  return todoSchema.safeParse(todo);
};

const validatePartialMovie = (todo) => {
  return todoSchema.partial().safeParse(todo);
};

module.exports = {
  todoSchema,
  validateTodo,
  validatePartialMovie,
};
