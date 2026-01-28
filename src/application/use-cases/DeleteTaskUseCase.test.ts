import { DeleteTaskUseCase } from './DeleteTaskUseCase';
import type { ITaskRepository } from '../../domain/repositories/ITaskRepository';

describe('DeleteTaskUseCase', () => {
  const mockRepository: ITaskRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const useCase = new DeleteTaskUseCase(mockRepository);

  it('calls repository delete with the given id', async () => {
    (mockRepository.delete as jest.Mock).mockResolvedValue(undefined);

    await useCase.execute('task-to-delete');

    expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockRepository.delete).toHaveBeenCalledWith('task-to-delete');
  });
});
