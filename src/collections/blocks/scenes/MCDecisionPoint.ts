export const MCDecisionPoint: any = {
  slug: 'mcDecisionPoint',
  fields: [
    {
      name: 'sceneText',
      type: 'textarea',
    },
    {
      name: 'cloudinaryUrl',
      type: 'text',
    },
    {
      name: 'question',
      type: 'text',
    },
    {
      name: 'answerChoices',
      type: 'array',
      fields: [
        {
          name: 'answerText',
          type: 'text',
        },
        {
          name: 'answerMessage',
          type: 'textarea',
        },
        {
          name: 'decisionSlug',
          type: 'text',
        },
      ],
    },
  ],
}
