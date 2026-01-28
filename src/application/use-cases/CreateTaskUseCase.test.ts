import { CreateTaskUseCase } from './CreateTaskUseCase';
import { Task, TaskStatus } from '../../domain/entities/Task';
import type { ITaskRepository } from '../../domain/repositories/ITaskRepository';

describe('CreateTaskUseCase', () => {
  const mockRepository: ITaskRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const useCase = new CreateTaskUseCase(mockRepository);

  it('creates a task and returns it from the repository', async () => {
    const props = {
      title: 'New task',
      description: 'New description',
      status: TaskStatus.PENDING,
    };
    const savedTask = new Task({
      ...props,
      id: 'saved-id',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    (mockRepository.create as jest.Mock).mockResolvedValue(savedTask);

    const result = await useCase.execute(props);

    expect(mockRepository.create).toHaveBeenCalledTimes(1);
    expect(mockRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'New task',
        description: 'New description',
        status: TaskStatus.PENDING,
      })
    );
    expect(result).toBe(savedTask);
    expect(result.id).toBe('saved-id');
  });
});
