import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { InputComment } from '../protocols';
import { commentsService } from '../services/comments.services';

export async function createComment(req: Request, res: Response) {
  const session = res.locals;
  const { postId, comment } = req.body as InputComment;
  const newComment = await commentsService.createComment(session.userId, postId, comment);
  
  return res.status(httpStatus.CREATED).send(newComment);
}

export const commentsController = {
  createComment,
};
