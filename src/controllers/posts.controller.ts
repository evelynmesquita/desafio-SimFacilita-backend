import httpStatus from 'http-status';
import { InputPosts } from '../protocols';
import { Request, Response } from 'express';
import { postsService } from '../services/posts.services';

export async function createPosts(req: Request, res: Response) {
  const session = res.locals;
  const { description } = req.body as InputPosts;
  const result = await postsService.createPost(session.userId, description);

  return res.status(httpStatus.CREATED).send(result);
}

export async function getAllPosts(_req: Request, res: Response) {
  const result = await postsService.findAllPosts();

  return res.status(httpStatus.OK).send(result);
}

export async function getAllPostsById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const userPosts = await postsService.getAllPostsById(id);

  res.status(httpStatus.OK).send(userPosts);
}

export const postsController = {
  createPosts,
  getAllPosts,
  getAllPostsById,
};
