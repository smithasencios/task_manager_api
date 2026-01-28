import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { Task, TaskStatus } from '../../domain/entities/Task';
import { FirebaseClient } from '../firebase/FirebaseClient';

export class FirestoreTaskRepository implements ITaskRepository {
    private collection = FirebaseClient.getInstance().getFirestore().collection('tasks');

    async create(task: Task): Promise<Task> {
        const docRef = this.collection.doc();
        const taskData = {
            id: docRef.id,
            title: task.title,
            description: task.description,
            status: task.status,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
        };
        await docRef.set(taskData);
        return new Task({ ...taskData });
    }

    async findAll(): Promise<Task[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => {
            const data = doc.data();
            return new Task({
                id: doc.id,
                title: data.title,
                description: data.description,
                status: data.status as TaskStatus,
                createdAt: data.createdAt.toDate(),
                updatedAt: data.updatedAt.toDate(),
            });
        });
    }

    async findById(id: string): Promise<Task | null> {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) return null;
        const data = doc.data()!;
        return new Task({
            id: doc.id,
            title: data.title,
            description: data.description,
            status: data.status as TaskStatus,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
        });
    }

    async update(task: Task): Promise<void> {
        if (!task.id) throw new Error('Task ID is required for update');
        await this.collection.doc(task.id).update({
            title: task.title,
            description: task.description,
            status: task.status,
            updatedAt: task.updatedAt,
        });
    }

    async delete(id: string): Promise<void> {
        await this.collection.doc(id).delete();
    }
}
