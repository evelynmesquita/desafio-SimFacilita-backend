import Joi from 'joi';
import { InputUsers } from '../protocols';

export const usersSchema = Joi.object<InputUsers>({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  birthday: Joi.string().isoDate().isoDate().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  profileUrl: Joi.string().uri().required(),
});
