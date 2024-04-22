import Joi from 'joi';
import { InputPosts } from '../protocols';

export const postsSchema = Joi.object<InputPosts>({
  userId: Joi.number(),
  description: Joi.string().required(),
});
