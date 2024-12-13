import z from "zod";

const todoSchema = z.object({
  title: z.string().min(3).max(100),
  type: z.string().min(3).max(100),
  done: z.boolean(),
});

export const validateTodo = (todo) => {
  return todoSchema.safeParse(todo);
};

export const validatePartialMovie = (todo) => {
  return todoSchema.partial().safeParse(todo);
};
