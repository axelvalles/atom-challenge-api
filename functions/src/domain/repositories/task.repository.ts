import {CreateTaskDto} from "../dtos/create-task.dto";
import {UpdateTaskDto} from "../dtos/update-task.dto";
import {TaskEntity} from "../entities/task.entity";

export abstract class TaskRepository {
  abstract getTasks(): Promise<TaskEntity[]>;
  abstract createTask(dto: CreateTaskDto): Promise<TaskEntity>;
  abstract updateTask(id: string, dto: UpdateTaskDto): Promise<boolean>;
  abstract deleteTask(id: string): Promise<boolean>;
}
