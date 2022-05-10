import {
  ICreateUserData,
  IUpdateUserData,
  IUsersRepository,
} from '@infra/database/repositories/IUsersRepository';
import { User } from '@domain/User';

export class UsersInMemoryRepository implements IUsersRepository {
  private repository: User[] = [];

  async create(data: ICreateUserData): Promise<void> {
    const repo = User.create(data);
    this.repository.push(repo);
  }

  async findByEmail(email: string): Promise<User | null> {
    const findUser = this.repository.find((user) => user.props.email === email);

    if (!findUser) {
      return null;
    }

    return findUser;
  }

  async update(data: IUpdateUserData): Promise<User | null> {
    let findUser = this.repository.find((user) => user.id === user.id);

    if (!findUser) {
      return null;
    }

    const updateUser = User.create(
      {
        name: data.name ? data.name : findUser.props.name,
        email: data.email ? data.email : findUser.props.email,
        password: data.password ? data.password : findUser.props.password,
        avatar: data.avatar ? data.avatar : findUser.props.avatar,
      },
      data.id
    );

    const foundIndex = this.repository.findIndex((user) => user.id === findUser!.id);

    this.repository[foundIndex] = updateUser;

    return updateUser;
  }

  async findById(userId: string): Promise<User | null> {
    const findUser = this.repository.find((user) => user.id === userId);

    if (!findUser) {
      return null;
    }

    return findUser;
  }
}
