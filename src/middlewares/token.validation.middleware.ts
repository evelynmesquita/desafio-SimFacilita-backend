import { invalidTokenError } from '../errors/errors';
import { usersRepository } from '../repositories/users.repository';
import { Request, Response, NextFunction } from 'express';

export async function tokenValidation(req: Request, res: Response, next: NextFunction) {
    console.log('req', req.headers.authorization)
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).send('You did not pass the token');

    const session = await usersRepository.findSessionByToken(token);
    if (!session) throw invalidTokenError('This token is not valid.');

    res.locals = session;

    next();
}
