import { Router } from 'express';
import { commentsSchema } from '../schemas/comments.schema';
import { commentsController } from '../controllers/comments.controller';
import { tokenValidation } from '../middlewares/token.validation.middleware';
import { validateSchemaMiddleware } from '../middlewares/schema.handler.middleware';

const commentsRouter = Router();

commentsRouter.post('/comments', tokenValidation, validateSchemaMiddleware(commentsSchema), commentsController.createComment);

export { commentsRouter };
