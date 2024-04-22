import { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';

export function validateSchemaMiddleware(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      convert: false,
    });
    if (error) {
      return res.status(422).send({ type: 'invalid body!', message: error.message });
    }
    next();
  };
}