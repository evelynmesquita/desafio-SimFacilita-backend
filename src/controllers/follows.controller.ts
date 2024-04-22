import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { followsService } from '../services/follows.services';

export async function getFollowers(req: Request, res: Response) {
  const followerId = Number(req.params.id);
  const result = await followsService.getFollowers(followerId);

  return res.status(httpStatus.OK).send(result);
}

export async function getFollowing(req: Request, res: Response) {
  const session = res.locals;
  const result = await followsService.getFollowing(session.userId);

  return res.status(httpStatus.OK).send(result);
}

export async function followOrUnfollowUser(req: Request, res: Response) {
  const followedId = Number(req.params.id);
  const session = res.locals;
  const result = await followsService.followOrUnfollowUser(session.userId, followedId);

  return res.status(httpStatus.OK).send(result);
}

export const followsController = {
  getFollowers,
  getFollowing,
  followOrUnfollowUser,
};
