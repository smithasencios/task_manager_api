import { Request, Response, NextFunction } from 'express';
import { CreateTaskUseCase } from '../../application/use-cases/CreateTaskUseCase';
import { GetTasksUseCase } from '../../application/use-cases/GetTasksUseCase';
import { UpdateTaskUseCase } from '../../application/use-cases/UpdateTaskUseCase';
import { DeleteTaskUseCase } from '../../application/use-cases/DeleteTaskUseCase';
import type {
  CreateTaskBody,
  UpdateTaskBody,
  TaskIdParam,
} from '../validations/taskSchemas';

export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getTasksUseCase: GetTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase
  ) {}

  create = async (
    req: Request<object, unknown, CreateTaskBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const task = await this.createTaskUseCase.execute(req.body);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const tasks = await this.getTasksUseCase.execute();
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request<TaskIdParam, unknown, UpdateTaskBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      await this.updateTaskUseCase.execute(id, req.body);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req: Request<TaskIdParam>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      await this.deleteTaskUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
