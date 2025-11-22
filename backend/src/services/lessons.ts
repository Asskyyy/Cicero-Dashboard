import { db } from '@backend/db/db';

export const fetchLessons = async ({ take = 5, skip = 0 }) => {
  'use server';
  try {
    const [results, total] = await Promise.all([
      db.lessons.findMany({
        relationLoadStrategy: 'join',
        skip,
        take,
        select: {
          id: true,
          name: true,
          teacherId: true,
          cat: true,
          teacher: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      }),
      db.lessons.count(),
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
