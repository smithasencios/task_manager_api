import { z } from 'zod';
import { TaskStatus } from '../../domain/entities/Task';

/** Schema para el body de creación de tarea */
export const createTaskBodySchema = z.object({
  title: z.string().min(1, 'Title is required').max(500),
  description: z.string().min(1, 'Description is required').max(2000),
  status: z.nativeEnum(TaskStatus).optional().default(TaskStatus.PENDING),
});

const updateTaskBodyObjectSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  description: z.string().min(1).max(2000).optional(),
  status: z.nativeEnum(TaskStatus).optional(),
});

/** Schema para el body de actualización de tarea (todos los campos opcionales) */
export const updateTaskBodySchema = updateTaskBodyObjectSchema.refine(
  (data: z.infer<typeof updateTaskBodyObjectSchema>) => Object.keys(data).length > 0,
  { message: 'At least one field (title, description, status) is required' }
);

/** Schema para el parámetro :id en la ruta */
export const taskIdParamSchema = z.object({
  id: z.string().min(1, 'Task ID is required'),
});

export type CreateTaskBody = z.infer<typeof createTaskBodySchema>;
export type UpdateTaskBody = z.infer<typeof updateTaskBodySchema>;
export type TaskIdParam = z.infer<typeof taskIdParamSchema>;
