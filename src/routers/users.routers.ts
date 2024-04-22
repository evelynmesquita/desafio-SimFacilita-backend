import { Router } from 'express';
import { usersSchema } from '../schemas/users.schema';
import { sessionsSchema } from '../schemas/sessions.schema';
import { usersController } from '../controllers/users.controller';
import { usersUpdateSchema } from '../schemas/users.update.schema';
import { passwordUpdateSchema } from '../schemas/password.update.schema';
import { tokenValidation } from '../middlewares/token.validation.middleware';
import { validateSchemaMiddleware } from '../middlewares/schema.handler.middleware';

const usersRouter = Router();

usersRouter.get('/users', tokenValidation, usersController.getAllUsers);
usersRouter.get('/user', tokenValidation, usersController.getProfileById);
usersRouter.get('/user/:id', tokenValidation, usersController.getOtherUsersProfileById);
usersRouter.post('/signup', validateSchemaMiddleware(usersSchema), usersController.userRegister);
usersRouter.post('/signin', validateSchemaMiddleware(sessionsSchema), usersController.userLogin);
usersRouter.put('/user', tokenValidation, validateSchemaMiddleware(usersUpdateSchema), usersController.updateProfileId);
usersRouter.put('/user/update-password', tokenValidation, validateSchemaMiddleware(passwordUpdateSchema), usersController.updatePassword);
usersRouter.delete('/user', tokenValidation, usersController.deleteProfileId);

export { usersRouter };