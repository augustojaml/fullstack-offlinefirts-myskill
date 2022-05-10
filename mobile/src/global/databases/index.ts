import { appSchema } from '@nozbe/watermelondb/Schema';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import Database from '@nozbe/watermelondb/Database';

import { User } from './models/users/User';
import { UserSchema } from './models/users/UserSchema';
import { SkillSchema } from './models/skills/SkillSchema';
import { Skill } from './models/skills/Skill';

const schemas = appSchema({
  version: 4,
  tables: [UserSchema, SkillSchema],
});

const adapter = new SQLiteAdapter({
  schema: schemas,
});

export const database = new Database({
  adapter,
  modelClasses: [User, Skill],
});
