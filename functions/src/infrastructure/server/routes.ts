import {Router} from "express";
import {TasksRouter} from "./task.router";


export class ServerRoutes {
  static getRoutes(): Router {
    const router = Router();

    // define all main routes
    router.use("/api/tasks", TasksRouter.getRoutes());
    router.get("/", (req, res) => {
      res.send("ok");
    });

    return router;
  }
}
