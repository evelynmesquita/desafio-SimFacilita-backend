import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

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
