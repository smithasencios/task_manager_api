import { Task, TaskStatus } from './Task';

describe('Task', () => {
  const baseProps = {
    title: 'Test task',
    description: 'Test description',
    status: TaskStatus.PENDING,
    createdBy: 'user-1',
    updatedBy: 'user-1',
  };

  describe('constructor', () => {
    it('creates a task with required props', () => {
      const task = new Task(baseProps);
      expect(task.title).toBe('Test task');
      expect(task.description).toBe('Test description');
      expect(task.status).toBe(TaskStatus.PENDING);
      expect(task.createdAt).toBeInstanceOf(Date);
      expect(task.updatedAt).toBeInstanceOf(Date);
      expect(task.createdBy).toBe('user-1');
      expect(task.updatedBy).toBe('user-1');
    });

    it('uses provided id, createdAt, updatedAt when given', () => {
      const id = 'task-123';
      const createdAt = new Date('2025-01-01');
      const updatedAt = new Date('2025-01-02');
      const task = new Task({
        ...baseProps,
        id,
        createdAt,
        updatedAt,
      });
      expect(task.id).toBe(id);
      expect(task.createdAt).toBe(createdAt);
      expect(task.updatedAt).toBe(updatedAt);
    });

    it('defaults createdAt and updatedAt to new Date when not provided', () => {
      const before = new Date();
      const task = new Task(baseProps);
      const after = new Date();
      expect(task.createdAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(task.createdAt.getTime()).toBeLessThanOrEqual(after.getTime());
      expect(task.updatedAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
    });
  });

  describe('update', () => {
    let task: Task;

    beforeEach(() => {
      task = new Task({ ...baseProps, id: 'id-1' });
    });

    it('updates title when provided', () => {
      task.update({ title: 'Updated title' }, 'user-2');
      expect(task.title).toBe('Updated title');
      expect(task.description).toBe(baseProps.description);
      expect(task.status).toBe(baseProps.status);
      expect(task.updatedBy).toBe('user-2');
    });

    it('updates description when provided', () => {
      task.update({ description: 'Updated description' }, 'user-2');
      expect(task.description).toBe('Updated description');
      expect(task.title).toBe(baseProps.title);
      expect(task.updatedBy).toBe('user-2');
    });

    it('updates status when provided', () => {
      task.update({ status: TaskStatus.IN_PROGRESS }, 'user-2');
      expect(task.status).toBe(TaskStatus.IN_PROGRESS);
      expect(task.updatedBy).toBe('user-2');
    });

    it('updates multiple fields and refreshes updatedAt', () => {
      const prevUpdatedAt = task.updatedAt;
      task.update({
        title: 'New title',
        description: 'New description',
        status: TaskStatus.COMPLETED,
      }, 'user-2');
      expect(task.title).toBe('New title');
      expect(task.description).toBe('New description');
      expect(task.status).toBe(TaskStatus.COMPLETED);
      expect(task.updatedBy).toBe('user-2');
      expect(task.updatedAt.getTime()).toBeGreaterThanOrEqual(prevUpdatedAt.getTime());
    });

    it('does not change createdAt', () => {
      const createdAt = task.createdAt;
      task.update({ title: 'Changed' }, 'user-2');
      expect(task.createdAt).toBe(createdAt);
    });
  });
});
