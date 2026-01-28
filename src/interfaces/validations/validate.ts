import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export type ValidationSource = 'body' | 'params' | 'query';

/**
 * Middleware factory que valida req[source] con un schema Zod.
 * Si la validación falla, responde con 400 y los errores de Zod.
 * Si pasa, asigna el resultado tipado a req[source] y llama next().
 */
export function validate<T>(schema: ZodSchema<T>, source: ValidationSource = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[source]);
    if (result.success) {
      (req as Request & Record<ValidationSource, T>)[source] = result.data;
      next();
      return;
    }
    const error = result.error as ZodError;
    res.status(400).json({
      error: 'Validation error',
      details: error.errors.map((e: any) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
  };
}
