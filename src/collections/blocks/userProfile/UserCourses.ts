export const UserCourses: any = {
  slug: 'userCourses',
  fields: [
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
    },
    {
      name: 'completed',
      type: 'checkbox',
      label: 'Completed',
      defaultValue: false,
    },
    {
      name: 'userCourseData',
      type: 'json',
      label: 'User Course Data',
    },
  ],
}
