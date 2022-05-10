import { tableSchema } from '@nozbe/watermelondb/Schema';

export const UserSchema = tableSchema({
  name: 'users',
  columns: [
    {
      name: 'userId',
      type: 'string',
    },
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'email',
      type: 'string',
    },
    {
      name: 'avatar',
      type: 'string',
    },
    {
      name: 'avatarPath',
      type: 'string',
    },
    {
      name: 'token',
      type: 'string',
    },
  ],
});
