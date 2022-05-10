import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class Skill extends Model {
  static table = 'skills';

  @field('skillId')
  skillId: string;

  @field('userId')
  userId: string;

  @field('name')
  name: string;
}
