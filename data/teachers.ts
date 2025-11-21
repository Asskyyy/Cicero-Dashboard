import { db } from '@/lib/db';

export const fetchTeachers = async ({ take = 5, skip = 0 }) => {
  'use server';
  try {
    const [results, total] = await Promise.all([
      db.teachers.findMany({
        relationLoadStrategy: 'join',
        skip,
        take,
        select: {
          id: true,
          name: true,
          userId: true,
          user: {
            select: {
              email: true,
              gender: true,
              status: true,
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      }),
      db.teachers.count(),
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
