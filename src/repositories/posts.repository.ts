import prisma from '../database';

async function findSessionByUserId(userId: number) {
    return prisma.session.findFirst({
        where: { userId },
    });
}

async function createPost({ userId, description }) {
    return prisma.post.create({
        data: { userId, description },
    });
}

async function findAllPosts() {
    const result = await prisma.post.findMany({
        include: {
            Comment: {
                include: {
                    User: {
                        select: {
                            name: true,
                            lastName: true,
                            profileUrl: true,
                        },
                    },
                },
            },
            User: {
                select: {
                    name: true,
                    lastName: true,
                    profileUrl: true,
                },
            },
        },
    });

    return result;
}

async function findUserPostsById(id: number) {
    return prisma.post.findMany({
        where: { userId: id },
        include: {
            Comment: {
                include: {
                    User: {
                        select: {
                            name: true,
                            lastName: true,
                            profileUrl: true,
                        },
                    },
                },
            },
            User: {
                select: {
                    name: true,
                    lastName: true,
                    profileUrl: true,
                },
            },
        },
    });
}

export const postsRepository = {
    findSessionByUserId,
    createPost,
    findAllPosts,
    findUserPostsById,
};
