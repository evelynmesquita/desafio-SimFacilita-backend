import bcrypt from "bcrypt";
import prisma from "../database";
import { v4 as uuid } from 'uuid';
import { InputUpdateUsersWithId, InputUsers } from "../protocols";

async function createRegisterUser({
	name,
	lastName,
	birthday,
	phone,
	email,
	password,
	profileUrl
}: InputUsers) {
	const hash = bcrypt.hashSync(password, 6)
	return prisma.user.create({
		data: {
			name,
			lastName,
			birthday,
			phone,
			email,
			password: hash,
			profileUrl
		},
	});
};

async function createLoginUser(userId: number) {
	const uuidToken = uuid();

	return prisma.session.create({
		data: {
			userId,
			token: uuidToken
		},
		include: {
			User: true
		},
	});
};

async function findUsers(email: string) {
	return prisma.user.findFirst({
		where: { email: email },
	});
};

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
};

async function findUserById(id: number) {
	return prisma.user.findFirst({
		where: { id },
	});
};

async function findUserByToken(token: string) {
	return prisma.session.findFirst({
		where: { token },
		select: {
			id: true,
			userId: true,
			User: { select: { name: true } },
			token: true
		},
	});
};

async function findSessionByToken(token: string) {
	return prisma.session.findFirst({
		where: { token },
		select: { id: true, userId: true, User: { select: { name: true } }, token: true },
	});
}


async function userExists(email: string, id: number) {
	return prisma.user.findFirst({
		where: {
			email: email,
			id: { not: id },
		},
	});
};

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
};

async function findPasswordByUserId(id: number) {
	return prisma.user.findFirst({
		where: { id },
	});
}

async function updatePassword({ id, newPassword }) {
	return prisma.user.update({
		where: { id },
		data: { password: newPassword },
	});
};

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
	};
};


export const usersRepository = {
	createRegisterUser,
	createLoginUser,
	findUsers,
	findAllUsers,
	findUserById,
	findUserByToken,
	findSessionByToken,
	userExists,
	updateUserProfile,
	findPasswordByUserId,
	updatePassword,
	deleteUserProfile
};