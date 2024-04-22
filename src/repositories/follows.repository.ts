import prisma from '../database';

async function createFollow(followerId: number, followedId: number) {
  return prisma.follow.create({
    data: { followerId, followedId },
  });
}

async function deleteFollow(followerId: number, followedId: number) {
  return prisma.follow.deleteMany({
    where: { followerId, followedId },
  });
}

async function findFollowers(userId: number) {
  return prisma.follow.findMany({
    where: { followedId: userId },
    select: { followerId: true },
  });
}

async function findFollowing(userId: number) {
  return prisma.follow.findMany({
    where: { followerId: userId },
    select: { followedId: true },
  });
}

async function userToFollowExist(followedId: number) {
  return prisma.user.findUnique({
    where: { id: followedId },
  });
}

async function isFollowing(followerId: number, followedId: number): Promise<boolean> {
  const existingFollow = await prisma.follow.findFirst({
    where: {
      AND: [{ followerId: followerId }, { followedId: followedId }],
    },
  });

  return Boolean(existingFollow);
}

export const followsRepository = {
  createFollow,
  deleteFollow,
  findFollowers,
  findFollowing,
  userToFollowExist,
  isFollowing,
};