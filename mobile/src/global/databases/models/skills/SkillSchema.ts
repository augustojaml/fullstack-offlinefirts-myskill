import { tableSchema } from '@nozbe/watermelondb/Schema';

export const SkillSchema = tableSchema({
  name: 'skills',
  columns: [
    {
      name: 'skillId',
      type: 'string',
    },
    {
      name: 'userId',
      type: 'string',
    },
    {
      name: 'name',
      type: 'string',
    },
  ],
});
