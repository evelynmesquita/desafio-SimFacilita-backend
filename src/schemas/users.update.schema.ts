import Joi from 'joi';
import { InputUsers } from '../protocols';

export const usersUpdateSchema = Joi.object<InputUsers>({
  name: Joi.string().allow(""),
  lastName: Joi.string().allow(""),
  birthday: Joi.string().isoDate().isoDate().allow(""),
  phone: Joi.string().allow(""),
  email: Joi.string().email().allow(""),
  profileUrl: Joi.string().uri().allow(""),
});
