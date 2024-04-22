import prisma from '../database';

async function findPostById(postId: number) {
  return prisma.post.findFirst({
    where: { id: postId },
  });
}

async function createComment({ userId, postId, comment }) {
  return prisma.comment.create({
    data: {
      userId,
      postId,
      comment,
    },
  });
}

export const commentsRepository = {
  findPostById,
  createComment,
};