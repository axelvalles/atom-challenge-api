import {CreateTaskDto} from "../../domain/dtos/create-task.dto";
import {UpdateTaskDto} from "../../domain/dtos/update-task.dto";
import {TaskEntity} from "../../domain/entities/task.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {TaskRepository} from "../../domain/repositories/task.repository";
import {collections} from "../data/firebase/initialize";

export class TaskRepositoryImpl implements TaskRepository {
  async createTask(dto: CreateTaskDto): Promise<TaskEntity> {
    const {title, description} = dto;

    try {
      const docRef = await collections.tasks.add({
        title,
        completed: false,
        description,
      });

      const task = new TaskEntity(docRef.id, title, false, description);

      return task;
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }

  async getTasks(): Promise<TaskEntity[]> {
    try {
      const tasks: TaskEntity[] = [];
      const querySnapshot = await collections.tasks.get();

      querySnapshot.forEach((doc) => {
        console.log(doc.data());

        tasks.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      return tasks;
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }

  async updateTask(id: string, dto: UpdateTaskDto): Promise<boolean> {
    try {
      await collections.tasks.doc(id).update({
        ...dto,
      });

      return true;
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }

  async deleteTask(id: string): Promise<boolean> {
    try {
      const doc = await collections.tasks.doc(id).delete();

      console.log(doc);

      return true;
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }
}
