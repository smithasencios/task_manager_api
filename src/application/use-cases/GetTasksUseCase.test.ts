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

  it('returns all tasks from the repository for the given user', async () => {
    const userId = 'user-test-123';
    const tasks = [
      new Task({
        id: '1',
        title: 'Task 1',
        description: 'Desc 1',
        status: TaskStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: userId,
        updatedBy: userId,
      }),
    ];
    (mockRepository.findAll as jest.Mock).mockResolvedValue(tasks);

    const result = await useCase.execute(userId);

    expect(mockRepository.findAll).toHaveBeenCalledWith(userId);
    expect(result).toHaveLength(1);
    expect(result).toBe(tasks);
  });

  it('returns empty array when repository has no tasks for the user', async () => {
    const userId = 'user-test-123';
    (mockRepository.findAll as jest.Mock).mockResolvedValue([]);

    const result = await useCase.execute(userId);

    expect(mockRepository.findAll).toHaveBeenCalledWith(userId);
    expect(result).toEqual([]);
  });
});
