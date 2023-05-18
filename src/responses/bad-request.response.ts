export default {
  schema: {
    type: 'object',
    example: {
      message: [
        {
          target: {
            email: 'string',
            password: 'string',
          },
          value: 'string',
          property: 'string',
          children: [],
          constraints: {},
        },
      ],
      error: 'Bad Request',
    },
  },
  description: '400. ValidationException',
}