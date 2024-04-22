import cors from 'cors';
import 'express-async-errors';
import httpStatus from 'http-status';
import { usersRouter } from './routers/users.router';
import { handleApplicationErrors } from './middlewares/error.handling.middleware';
import express, { Request, Response } from 'express';

const app = express();

app
    .use(cors())
    .use(express.json())
    .get('/health', (req: Request, res: Response) => {
        res.status(httpStatus.OK).send("OK! 🚀");
    })
    .use('/', usersRouter)
    .use(handleApplicationErrors);

export default app;
