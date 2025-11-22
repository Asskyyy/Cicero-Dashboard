import { Prisma, UserRole } from '@prisma/client';

import { db } from '@backend/db/db';

export const fetchUsers = async ({
  take = 5,
  skip = 0,
  query,
}: {
  query?: string;
  take: number;
  skip: number;
}) => {
  'use server';
  try {
    const baseWhere: Prisma.UserWhereInput = {
      name: query ? { contains: query, mode: Prisma.QueryMode.insensitive } : undefined,
      //hided for development purpose
      //NOT: {
      //  role: UserRole.ADMIN,
      //},
    };

    const [results, total] = await Promise.all([
      db.user.findMany({
        where: baseWhere,
        relationLoadStrategy: 'join',
        skip,
        take,
        select: {
          id: true,
          email: true,
          role: true,
          name: true,
          status: true,
        },
        orderBy: {
          name: 'asc',
        },
      }),
      db.user.count({ where: baseWhere }),
    ]);

    return {
      data: results,
      metadata: {
        hasNextPage: skip + take < total,
        totalPages: Math.ceil(total / take),
      },
    };
  } finally {
    await db.$disconnect();
  }
};
