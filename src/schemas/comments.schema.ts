import Joi from 'joi';
import { InputComment } from '../protocols';

export const commentsSchema = Joi.object<InputComment>({
  userId: Joi.number(),
  postId: Joi.number().required(),
  comment: Joi.string().required(),
});
