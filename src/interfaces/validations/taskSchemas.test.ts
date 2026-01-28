import {
  createTaskBodySchema,
  updateTaskBodySchema,
  taskIdParamSchema,
} from './taskSchemas';
import { TaskStatus } from '../../domain/entities/Task';

describe('createTaskBodySchema', () => {
  it('accepts valid create body with required fields', () => {
    const result = createTaskBodySchema.safeParse({
      title: 'A task',
      description: 'A description',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe('A task');
      expect(result.data.description).toBe('A description');
      expect(result.data.status).toBe(TaskStatus.PENDING);
    }
  });

  it('accepts valid create body with optional status', () => {
    const result = createTaskBodySchema.safeParse({
      title: 'Task',
      description: 'Desc',
      status: TaskStatus.IN_PROGRESS,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.status).toBe(TaskStatus.IN_PROGRESS);
    }
  });

  it('rejects empty title', () => {
    const result = createTaskBodySchema.safeParse({
      title: '',
      description: 'Desc',
    });
    expect(result.success).toBe(false);
  });

  it('rejects empty description', () => {
    const result = createTaskBodySchema.safeParse({
      title: 'Title',
      description: '',
    });
    expect(result.success).toBe(false);
  });

  it('rejects title over 500 characters', () => {
    const result = createTaskBodySchema.safeParse({
      title: 'a'.repeat(501),
      description: 'Desc',
    });
    expect(result.success).toBe(false);
  });

  it('rejects missing title', () => {
    const result = createTaskBodySchema.safeParse({
      description: 'Desc',
    });
    expect(result.success).toBe(false);
  });
});

describe('updateTaskBodySchema', () => {
  it('accepts valid update with at least one field', () => {
    const result = updateTaskBodySchema.safeParse({
      title: 'Updated title',
    });
    expect(result.success).toBe(true);
  });

  it('accepts multiple optional fields', () => {
    const result = updateTaskBodySchema.safeParse({
      title: 'New',
      description: 'New desc',
      status: TaskStatus.COMPLETED,
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty object (no fields)', () => {
    const result = updateTaskBodySchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe('taskIdParamSchema', () => {
  it('accepts non-empty id', () => {
    const result = taskIdParamSchema.safeParse({ id: 'task-123' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.id).toBe('task-123');
  });

  it('rejects empty id', () => {
    const result = taskIdParamSchema.safeParse({ id: '' });
    expect(result.success).toBe(false);
  });

  it('rejects missing id', () => {
    const result = taskIdParamSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
