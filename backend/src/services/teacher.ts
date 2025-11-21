import { db } from '@backend/db/db';

export const getSchedulebyTeacherId = async (userId?: string) => {
  if (!userId) return null;
  try {
    const res = await db.teachers.findUnique({
      where: {
        userId,
      },
      include: {
        lesson: {
          include: {
            schedule: {
              include: {
                classroom: true,
              },
            },
          },
        },
      },
    });
    return res;
  } finally {
    await db.$disconnect();
  }
};
export const getAssignmentbyTeacherId = async (userId?: string) => {
  if (!userId) return null;
  try {
    const res = await db.teachers.findUnique({
      where: {
        userId,
      },
      include: {
        lesson: {
          include: {
            assingment: {
              include: {
                classroom: true,
              },
            },
          },
        },
      },
    });
    return res;
  } finally {
    await db.$disconnect();
  }
};
export const getLessonbyTeacherId = async (userId?: string) => {
  'use server';
  if (!userId) return { data: [] };
  try {
    const res = await db.lessons.findMany({
      where: {
        teacherId: userId,
      },
      select: {
        id: true,
        teacherId: true,
        name: true,
        cat: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return {
      data: res,
    };
  } finally {
    await db.$disconnect();
  }
};
