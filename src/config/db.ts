import { logger } from '..';
import { PrismaClient } from '../generated/prisma';

export const initalizePrisma = async (): Promise<PrismaClient> => {
  const prisma = new PrismaClient();

  try {
    await prisma.$connect();
    logger.info('Connected to database via prisma');
  } catch (error: unknown) {
    logger.error(`Failed to connect to database via prisma: ${error}`);
    // Fail early if connection cannot be made
    process.exit(1);
  }

  return prisma;
};
