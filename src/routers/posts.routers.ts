import { Router } from 'express';
import { postsSchema } from '../schemas/posts.schema';
import { postsController } from '../controllers/posts.controller';
import { tokenValidation } from '../middlewares/token.validation.middleware';
import { validateSchemaMiddleware } from '../middlewares/schema.handler.middleware';

const postsRouter = Router();

postsRouter.post('/timeline', tokenValidation, validateSchemaMiddleware(postsSchema), postsController.createPosts);
postsRouter.get('/timeline', tokenValidation, postsController.getAllPosts);
postsRouter.get('/timeline/:id', tokenValidation, postsController.getAllPostsById);

export { postsRouter };
