import Joi from 'joi';
import { InputPasswordChange } from '../protocols';

export const passwordUpdateSchema = Joi.object<InputPasswordChange>({
  actualPassword: Joi.string().required(),
  newPassword: Joi.string().required()
});
