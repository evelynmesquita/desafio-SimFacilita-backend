import Joi from 'joi';
import { InputFollow } from '../protocols';

export const followsSchema = Joi.object<InputFollow>({
  followerId: Joi.number(),
});
