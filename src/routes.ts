import { Express, Request, Response } from "express";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import deserializedUser from "./middleware/deserializedUser";
import requireUser from "./middleware/requireUser";
import ValidateResource from "./middleware/validateResource";
import authRoutes from "./reoutes/authRoutes";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

const routes = (app: Express) => {
  app.post(
    "/api/sessions",
    ValidateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.post("/api/users", ValidateResource(createUserSchema), createUserHandler);
  app.use(requireUser);
  app.use("/api/auth", authRoutes);

  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.get("/api/sessions", getUserSessionsHandler);

  app.get("/api/test", (req: Request, res: Response) => {
    res.send("gofds");
  });
};

export default routes;
