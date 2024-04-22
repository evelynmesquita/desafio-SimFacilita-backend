import Joi from 'joi';
import { InputSession } from '../protocols';

export const sessionSchema = Joi.object<InputSession>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
