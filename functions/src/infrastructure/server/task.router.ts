import {Router} from "express";
import {TaskRepositoryImpl} from "../repositories/task.repository.impl";
import {TaskService} from "../../application/task.service";
import {TasksController} from "../controllers/task.controller";

export class TasksRouter {
  static getRoutes(): Router {
    const router = Router();
    const taskRepository = new TaskRepositoryImpl();
    const taskService = new TaskService(taskRepository);
    const controller = new TasksController(taskService);
    console.log(taskRepository);

    // get all tasks
    router.get("/", controller.getTasks);
    // create task
    router.post("/", controller.createTask);
    // update task
    router.put("/:id", controller.updateTask);
    // delete task
    router.delete("/:id", controller.deleteTask);

    return router;
  }
}
