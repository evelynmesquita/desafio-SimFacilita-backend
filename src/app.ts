import cors from 'cors';
import 'express-async-errors';
import httpStatus from 'http-status';
import express, { Request, Response, json } from 'express';

const app = express();

app
    .use(cors())
    .use(express.json())
    .get('/health', (req: Request, res: Response) => {
        res.status(httpStatus.OK).send("OK! 🚀");
    })

export default app;
