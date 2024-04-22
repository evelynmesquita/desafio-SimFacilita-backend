import prisma from './../src/database';

export async function cleanDb() {
  await prisma.user.deleteMany({});
  await prisma.session.deleteMany({});
}
