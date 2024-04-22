import prisma from '../database';
import { InputUpdateUsersWithId, InputUsers } from '../protocols';
import { v4 as uuid } from 'uuid';
import bcrypt from "bcrypt"

async function createUserRegister({ name, lastName, birthday, phone, email, password, profileUrl }: InputUsers) {
  const hash = bcrypt.hashSync(password, 10) 
  return prisma.user.create({
    data: { name, lastName, birthday, phone, email, password: hash, profileUrl },
  });
}

async function findUsers(email: string) {
  return prisma.user.findFirst({
    where: { email: email },
  });
}

async function createUserLogin(userId: number) {
  const tokenUuid = uuid();

  return prisma.session.create({
    data: { userId, token: tokenUuid },
    include: {User: true}
  });
}

async function findSessionByToken(token: string) {
  return prisma.session.findFirst({
    where: { token },
    select: { id: true, userId: true, User: {select: { name: true}}, token: true },
  });
}

async function findUserProfileById(id: number) {
  return prisma.user.findFirst({
    where: { id },
  });
}

async function existingUser(email: string, id: number) {
  return prisma.user.findFirst({
    where: {
      email: email,
      id: {
        not: id,
      },
    },
  });
}

async function updateUserProfile({ id, name, lastName, birthday, phone, email, profileUrl }: InputUpdateUsersWithId) { 
  return prisma.user.update({
    where: { id },
    data: {
      name,
      lastName,
      birthday,
      phone,
      email,
      profileUrl,

    },
  });
}

async function findAllUsers() {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      lastName: true,
      profileUrl: true,
    },
  });

  return result;
}

async function findPasswordByUserId(id: number) {
  return prisma.user.findFirst({
    where: { id },
  });
}


async function updatePasswordRepo({id, newPassword }) {
  return prisma.user.update({
    where: { id },
    data: {
      password: newPassword

    },
  });
}

async function deleteUserProfile(userId: number) {
  try {
    const userPosts = await prisma.post.findMany({
      where: { userId },
      select: { id: true },
    });

    const userSessions = await prisma.session.findMany({
      where: { userId },
      select: { id: true },
    });

    const postIds = userPosts.map((post) => post.id);
    const sessionIds = userSessions.map((session) => session.id);

    await prisma.$transaction([
      prisma.comment.deleteMany({ where: { postId: { in: postIds } } }),
      prisma.post.deleteMany({ where: { userId } }),
      prisma.follow.deleteMany({ where: { OR: [{ followerId: userId }, { followedId: userId }] } }),
      prisma.session.deleteMany({ where: { id: { in: sessionIds } } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);
  } catch (error) {
    console.error('Error deleting user profile:', error);
    throw error;
  }
}


export const usersRepository = {
  createUserRegister,
  findUsers,
  createUserLogin,
  findSessionByToken,
  findUserProfileById,
  updateUserProfile,
  findAllUsers,
  deleteUserProfile,
  existingUser,
  updatePasswordRepo,
  findPasswordByUserId
};
