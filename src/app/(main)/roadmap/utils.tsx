export const isLessonDone = (
  completedLessons: any,
  moduleIndex: number,
  lessonIndex: number
) => {
  return completedLessons?.[`${moduleIndex}-${lessonIndex}`];
};

export const isLessonUnlocked = (
  completedLessons: any,
  roadmap: any[],
  moduleIndex: number,
  lessonIndex: number
) => {
  if (moduleIndex === 0 && lessonIndex === 0) return true;

  // first lesson of module → check previous module completion
  if (lessonIndex === 0) {
    const prevModule = roadmap[moduleIndex - 1];

    return prevModule.lessons.every((_: any, idx: number) =>
      isLessonDone(completedLessons, moduleIndex - 1, idx)
    );
  }

  // inside module → check previous lesson
  return isLessonDone(
    completedLessons,
    moduleIndex,
    lessonIndex - 1
  );
};

export const getProgress = (
  completedLessons: any,
  roadmap: any[]
) => {
  const total = roadmap.reduce(
    (acc, m) => acc + m.lessons.length,
    0
  );

  const done = Object.keys(completedLessons).length;

  if (!total) return 0;

  return Math.floor((done / total) * 100);
};