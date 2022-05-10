import { User } from '@domain/User';
import { IStorageAdapter } from '@infra/adapter/storage/IStorageAdapter';
import { PasswordSupport } from '@infra/config/supports/PasswordSupport';
import { IUsersRepository } from '@infra/database/repositories/IUsersRepository';
import { AppError } from '@infra/http/middlewares/AppError';
import { inject, injectable } from 'tsyringe';

type IUpdateUserRequest = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
};

type IUpdateUserResponse = {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
};

const responseReturn = (updateResponse: User) => {
  return {
    id: updateResponse.id,
    name: updateResponse.props.name,
    email: updateResponse.props.email,
    avatar: updateResponse.props.avatar,
  };
};

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('IStorageAdapter')
    private storageAdapter: IStorageAdapter,

    @inject('IUsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: IUpdateUserRequest): Promise<IUpdateUserResponse> {
    const findUser = await this.usersRepository.findById(data.id);

    if (!findUser) {
      throw new AppError('Invalid user or operation not allowed');
    }

    if (data.avatar && findUser.props.avatar) {
      await this.storageAdapter.delete({ file: findUser.props.avatar, folder: 'avatar' });
      await this.storageAdapter.save({ file: data.avatar, folder: 'avatar' });
    }

    if (data.password) {
      data.password = await PasswordSupport.generateHash(data.password);
    }

    const updateResponse = await this.usersRepository.update(data);

    return responseReturn(updateResponse!);
  }
}
