export const UserLessons: any = {
  slug: 'userLessons',
  fields: [
    {
      name: 'lesson',
      type: 'relationship',
      relationTo: 'lessons',
      required: true,
    },
    {
      name: 'completed',
      type: 'checkbox',
      label: 'Completed',
      defaultValue: false,
    },
    {
      name: 'userLessonData',
      type: 'json',
      label: 'User Lesson Data',
    },
  ],
}
