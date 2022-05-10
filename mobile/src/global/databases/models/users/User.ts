import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class User extends Model {
  static table = 'users';

  @field('userId')
  userId: string;

  @field('name')
  name: string;

  @field('email')
  email: string;

  @field('avatar')
  avatar: string;

  @field('avatarPath')
  avatarPath: string;

  @field('token')
  token: string;
}
