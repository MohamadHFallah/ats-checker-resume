import prisma from '@/lib/prisma';

export class InsufficientCreditsError extends Error {
  constructor() {
    super('Insufficient credits');
    this.name = 'InsufficientCreditsError';
  }
}

export async function reserveCredits(userId: string, credits: number) {
  if (process.env.NODE_ENV === 'development') {
    return
  }
  if (!Number.isInteger(credits) || credits < 1) {
    throw new Error('Credits must be a positive integer.');
  }

  const result = await prisma.user.updateMany({
    where: { id: userId, remainingCredits: { gte: credits } },
    data: { remainingCredits: { decrement: credits } },
  });

  if (result.count === 0) {
    throw new InsufficientCreditsError();
  }
}

export async function refundCredits(userId: string, credits: number) {
  if (process.env.NODE_ENV === 'development') {
    return
  }
  await prisma.user.update({
    where: { id: userId },
    data: { remainingCredits: { increment: credits } },
  });
}

export async function getCreditBalance(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { remainingCredits: true, plan: true },
  });
  return user;
}
