import { Request, Response, NextFunction } from 'express';
import { ZodError, type ZodIssue } from 'zod';

interface HttpError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err);

  if (err instanceof ZodError) {
    const zodErr: ZodError = err;
    res.status(400).json({
      error: 'Validation error',
      details: zodErr.errors.map((e: ZodIssue) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  const httpError = err as HttpError;
  const status = httpError.statusCode ?? 500;
  const message = err instanceof Error ? err.message : 'Internal Server Error';
  res.status(status).json({ error: message });
};
