import { User } from '@domain/User';
import { prisma } from '@infra/config/services/prisma';
import { ICreateUserData, IUpdateUserData, IUsersRepository } from '../IUsersRepository';

export class UsersPrismaRepository implements IUsersRepository {
  //
  async create(data: ICreateUserData): Promise<void> {
    const user = User.create(data);
    await prisma.users.create({
      data: {
        id: user.id,
        ...user.props,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const findUser = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!findUser) {
      return null;
    }

    const { id, ...props } = findUser;
    const user = User.create(props, findUser.id);
    return user;
  }

  async findById(userId: string): Promise<User | null> {
    const findUser = await prisma.users.findFirst({
      where: {
        id: userId,
      },
    });

    if (!findUser) {
      return null;
    }

    const { id, ...props } = findUser;

    const user = User.create(props, findUser.id);

    return user;
  }

  async update(data: IUpdateUserData): Promise<User | null> {
    const findUser = await this.findById(data.id);

    if (!findUser) {
      return null;
    }

    const updateUser = await prisma.users.update({
      where: { id: data.id },
      data: {
        name: data.name ? data.name : findUser.props.name,
        email: data.email ? data.email : findUser.props.email,
        password: data.password ? data.password : findUser.props.password,
        avatar: data.avatar ? data.avatar : findUser.props.avatar,
      },
    });

    const { id, ...props } = updateUser;

    const update = User.create(props, updateUser.id);

    return update;
  }
}
