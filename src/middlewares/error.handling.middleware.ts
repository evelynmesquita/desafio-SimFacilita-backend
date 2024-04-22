import { Request, Response, NextFunction } from 'express';

export function handleApplicationErrors(err: any, _req: Request, res: Response, _next: NextFunction) {
    if (err?.type === 'application') {
        return res.status(err.code || 500).json({ error: err.message || 'Internal Server Error' });
    } else {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
