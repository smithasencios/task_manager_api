import { Task, TaskProps } from '../../domain/entities/Task';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';

export class CreateTaskUseCase {
    constructor(private taskRepository: ITaskRepository) { }

    async execute(props: TaskProps): Promise<Task> {
        const task = new Task(props);
        return this.taskRepository.create(task);
    }
}
