import {CreateTaskDto} from "../domain/dtos/create-task.dto";
import {UpdateTaskDto} from "../domain/dtos/update-task.dto";
import {TaskEntity} from "../domain/entities/task.entity";
import {TaskRepository} from "../domain/repositories/task.repository";

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  createTask(dto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.createTask(dto);
  }

  getTasks(): Promise<TaskEntity[]> {
    return this.taskRepository.getTasks();
  }

  updateTask(id: string, dto: UpdateTaskDto): Promise<boolean> {
    return this.taskRepository.updateTask(id, dto);
  }

  deleteTask(id: string): Promise<boolean> {
    return this.taskRepository.deleteTask(id);
  }
}
