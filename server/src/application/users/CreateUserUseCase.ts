import { PasswordSupport } from '@infra/config/supports/PasswordSupport';
import { IUsersRepository } from '@infra/database/repositories/IUsersRepository';
import { AppError } from '@infra/http/middlewares/AppError';
import { inject, injectable } from 'tsyringe';

type ICreateUserRequest = {
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
};

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('IUsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserRequest) {
    const findUser = await this.usersRepository.findByEmail(data.email);

    if (findUser) {
      throw new AppError('User already exists');
    }

    const hashPassword = await PasswordSupport.generateHash(data.password);

    await this.usersRepository.create({ ...data, password: hashPassword });
  }
}
