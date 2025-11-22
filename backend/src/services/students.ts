import { db } from '@backend/db/db';

export const fetchStudents = async ({ take = 5, skip = 0 }) => {
  'use server';
  try {
    const [results, total] = await Promise.all([
      db.students.findMany({
        relationLoadStrategy: 'join',
        skip,
        take,
        select: {
          id: true,
          userId: true,
          name: true,
          onClassroom: {
            include: {
              classroom: {
                select: {
                  name: true,
                },
              },
            },
          },
          user: {
            select: {
              email: true,
              status: true,
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      }),
      db.students.count(),
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
