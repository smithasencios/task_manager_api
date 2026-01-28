import { Router, Request, Response, NextFunction } from 'express';
import { TaskController } from '../controllers/TaskController';
import { CreateTaskUseCase } from '../../application/use-cases/CreateTaskUseCase';
import { GetTasksUseCase } from '../../application/use-cases/GetTasksUseCase';
import { UpdateTaskUseCase } from '../../application/use-cases/UpdateTaskUseCase';
import { DeleteTaskUseCase } from '../../application/use-cases/DeleteTaskUseCase';
import { FirestoreTaskRepository } from '../../infrastructure/repositories/FirestoreTaskRepository';
import { authMiddleware } from '../middleware/authMiddleware';
import { validate } from '../validations/validate';
import {
  createTaskBodySchema,
  updateTaskBodySchema,
  taskIdParamSchema,
  type TaskIdParam,
  type UpdateTaskBody,
} from '../validations/taskSchemas';

const router = Router();

router.use(authMiddleware);

const taskRepository = new FirestoreTaskRepository();
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const getTasksUseCase = new GetTasksUseCase(taskRepository);
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
const taskController = new TaskController(
    createTaskUseCase,
    getTasksUseCase,
    updateTaskUseCase,
    deleteTaskUseCase
);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Validation error
 */
router.post(
  '/',
  validate(createTaskBodySchema, 'body'),
  (req, res, next) => taskController.create(req, res, next)
);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/', (req, res, next) => taskController.getAll(req, res, next));

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: The updated task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
router.put(
  '/:id',
  validate(taskIdParamSchema, 'params'),
  validate(updateTaskBodySchema, 'body'),
  (req: Request<TaskIdParam, unknown, UpdateTaskBody>, res: Response, next: NextFunction) =>
    taskController.update(req, res, next)
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     responses:
 *       204:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 */
router.delete(
  '/:id',
  validate(taskIdParamSchema, 'params'),
  (req: Request<TaskIdParam>, res: Response, next: NextFunction) => taskController.delete(req, res, next)
);

export { router as taskRoutes };
