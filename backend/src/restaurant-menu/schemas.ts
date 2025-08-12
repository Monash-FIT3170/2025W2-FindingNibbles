export const basicMenuSchema = {
  type: 'OBJECT',
  properties: {
    menu_items: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          name: { type: 'STRING' },
          description: { type: 'STRING' },
          price: { type: 'NUMBER' },
          category: { type: 'STRING' },
          explicit_dietary_tags: { type: 'ARRAY', items: { type: 'STRING' } },
          mentioned_ingredients: { type: 'ARRAY', items: { type: 'STRING' } },
        },
        required: ['name', 'mentioned_ingredients'],
      },
    },
  },
  required: ['menu_items'],
};

export const menuAnalysisSchema = {
  type: 'OBJECT',
  properties: {
    menu_items: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          name: { type: 'STRING' },
          description: { type: 'STRING' },
          price: { type: 'NUMBER' },
          dietaryTags: { type: 'ARRAY', items: { type: 'STRING' } },
          category: { type: 'STRING' },
        },
        required: ['name', 'dietaryTags'],
      },
    },
  },
  required: ['menu_items'],
};
