import { createApp } from "./app.js";

import { Todo } from "./models/mysql/todo.js";

createApp({ todoModel: Todo });
