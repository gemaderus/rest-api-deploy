import cors from "cors";

export const corsMiddleware = () =>
  cors({
    origin: (origin, callbacks) => {
      const ACCEPTED_ORIGINS = [
        "http://localhost:3000",
        "file:///Users/gema/Dev/todolist/index.html",
      ];

      if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        return callbacks(null, true);
      }

      if (!origin) {
        return callbacks(null, true);
      }

      return callbacks(new Error("Not allowed by CORS"));
    },
  });
