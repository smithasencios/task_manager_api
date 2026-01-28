import { Task } from '../../domain/entities/Task';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';

export class GetTasksUseCase {
    constructor(private taskRepository: ITaskRepository) { }

    async execute(): Promise<Task[]> {
        return this.taskRepository.findAll();
    }
}
