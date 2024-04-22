import cors from 'cors';
import 'express-async-errors';
import httpStatus from 'http-status';
import express, { Request, Response } from 'express';
import { usersRouter } from './routers/users.routers';
import { postsRouter } from './routers/posts.routers';
import { followsRouter } from './routers/follows.routers';
import { commentsRouter } from './routers/comments.routers';
import { handleApplicationErrors } from './middlewares/error.handling.middleware';

const app = express();

app
  .use(cors())
  .use(express.json())
  .get('/health', (req: Request, res: Response) => {
    res.status(httpStatus.OK).send("Server ok and responding!");
  })
  .use('/', usersRouter)
  .use('/', postsRouter)
  .use('/', commentsRouter)
  .use('/', followsRouter)
  .use(handleApplicationErrors);

export default app;
