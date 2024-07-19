import { Block } from 'payload'

export const MultChoice: Block = {
  slug: 'multChoice',
  fields: [
    {
      name: 'question',
      type: 'text',
    },
    {
      name: 'answers',
      type: 'array',
      minRows: 2,
      fields: [
        {
          name: 'answerText',
          type: 'text',
        },
        {
          name: 'isCorrect',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
