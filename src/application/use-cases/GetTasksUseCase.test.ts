import { GetTasksUseCase } from './GetTasksUseCase';
import { Task, TaskStatus } from '../../domain/entities/Task';
import type { ITaskRepository } from '../../domain/repositories/ITaskRepository';

describe('GetTasksUseCase', () => {
  const mockRepository: ITaskRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const useCase = new GetTasksUseCase(mockRepository);

  it('returns all tasks from the repository', async () => {
    const tasks = [
      new Task({
        id: '1',
        title: 'Task 1',
        description: 'Desc 1',
        status: TaskStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      new Task({
        id: '2',
        title: 'Task 2',
        description: 'Desc 2',
        status: TaskStatus.COMPLETED,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];
    (mockRepository.findAll as jest.Mock).mockResolvedValue(tasks);

    const result = await useCase.execute();

    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(2);
    expect(result).toBe(tasks);
  });

  it('returns empty array when repository has no tasks', async () => {
    (mockRepository.findAll as jest.Mock).mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
  });
});
