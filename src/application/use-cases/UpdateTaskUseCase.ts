import { TaskProps } from '../../domain/entities/Task';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';

export class UpdateTaskUseCase {
    constructor(private taskRepository: ITaskRepository) { }

    async execute(id: string, props: Partial<Omit<TaskProps, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>>, userId: string): Promise<void> {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new Error('Task not found');
        }
        task.update(props, userId);
        return this.taskRepository.update(task);
    }
}
