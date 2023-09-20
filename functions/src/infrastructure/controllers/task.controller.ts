import {Request, Response} from "express";
import {TaskService} from "../../application/task.service";
import {CreateTaskDto} from "../../domain/dtos/create-task.dto";
import {UpdateTaskDto} from "../../domain/dtos/update-task.dto";

export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  getTasks = (_req: Request, res: Response) => {
    this.taskService
      .getTasks()
      .then((tasks) => res.status(200).json(tasks))
      .catch((error) => {
        console.log(error);
        return res.status(500).json(error);
      });
  };

  createTask = (req: Request, res: Response) => {
    const [error, taskdto] = CreateTaskDto.create(req.body);

    if (error || !taskdto) return res.status(400).json({error});

    this.taskService
      .createTask(taskdto)
      .then((task) => res.status(200).json(task))
      .catch((error) => {
        console.log(error);
        return res.status(500).json(error);
      });
  };

  updateTask = (req: Request, res: Response) => {
    const {id} = req.params;
    if (!id) return res.status(400).json({error: "Missing id"});

    const [error, taskdto] = UpdateTaskDto.create(req.body);

    if (error || !taskdto) return res.status(400).json({error});

    this.taskService
      .updateTask(id, taskdto)
      .then((response) => res.status(200).json({ok: response}))
      .catch((error) => {
        console.log(error);
        return res.status(500).json(error);
      });
  };

  deleteTask = (req: Request, res: Response) => {
    const {id} = req.params;
    if (!id) return res.status(400).json({error: "Missing id"});

    this.taskService
      .deleteTask(id)
      .then((response) => res.status(200).json({ok: response}))
      .catch((error) => {
        console.log(error);
        return res.status(500).json(error);
      });
  };
}
