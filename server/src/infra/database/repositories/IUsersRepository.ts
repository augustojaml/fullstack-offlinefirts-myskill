import { User } from 'domain/User';

export type ICreateUserData = {
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
};

export type IUpdateUserData = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  avatar?: string | null;
};

export interface IUsersRepository {
  create(data: ICreateUserData): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(userId: string): Promise<User | null>;
  update(data: IUpdateUserData): Promise<User | null>;
}
