import { UpdateTaskUseCase } from './UpdateTaskUseCase';
import { Task, TaskStatus } from '../../domain/entities/Task';
import type { ITaskRepository } from '../../domain/repositories/ITaskRepository';

describe('UpdateTaskUseCase', () => {
  const mockRepository: ITaskRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const useCase = new UpdateTaskUseCase(mockRepository);

  it('updates an existing task and persists it', async () => {
    const existingTask = new Task({
      id: 'task-1',
      title: 'Old title',
      description: 'Old description',
      status: TaskStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'user-1',
      updatedBy: 'user-1',
    });
    (mockRepository.findById as jest.Mock).mockResolvedValue(existingTask);
    (mockRepository.update as jest.Mock).mockResolvedValue(undefined);

    await useCase.execute('task-1', {
      title: 'New title',
      status: TaskStatus.IN_PROGRESS,
    }, 'user-2');

    expect(mockRepository.findById).toHaveBeenCalledWith('task-1');
    expect(existingTask.title).toBe('New title');
    expect(existingTask.status).toBe(TaskStatus.IN_PROGRESS);
    expect(existingTask.updatedBy).toBe('user-2');
    expect(mockRepository.update).toHaveBeenCalledWith(existingTask);
  });

  it('throws if task not found', async () => {
    (mockRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(useCase.execute('task-1', { title: 'New title' }, 'user-2'))
      .rejects.toThrow('Task not found');
  });

});
