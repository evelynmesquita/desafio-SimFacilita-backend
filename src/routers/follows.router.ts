import { Router } from 'express';
import { followsSchema } from '../schemas/follows.schema';
import { followsController } from '../controllers/follows.controller';
import { tokenValidation } from '../middlewares/token.validation.middleware';
import { validateSchemaMiddleware } from '../middlewares/schema.handling.middleware';

const followsRouter = Router();

followsRouter.post('/follow/:id', tokenValidation, validateSchemaMiddleware(followsSchema), followsController.followOrUnfollowUser);
followsRouter.get('/followers/:id', tokenValidation, followsController.getFollowers);
followsRouter.get('/following/:id', tokenValidation, followsController.getFollowing);

export { followsRouter };
