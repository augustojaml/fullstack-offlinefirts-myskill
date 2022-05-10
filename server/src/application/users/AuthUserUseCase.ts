import { User } from '@domain/User';
import { AuthUsersSupport } from '@infra/config/supports/AuthUserSupport';
import { PasswordSupport } from '@infra/config/supports/PasswordSupport';
import { IUsersRepository } from '@infra/database/repositories/IUsersRepository';
import { AppError } from '@infra/http/middlewares/AppError';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

type AuthUserRequest = {
  email: string;
  password: string;
};

type IAuthUserResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
  };
  token: string;
};

const authUserResponse = (user: User, token: string): IAuthUserResponse => {
  return {
    user: {
      id: user.id,
      name: user.props.name,
      email: user.props.email,
      avatar: user.props.avatar,
    },
    token: token,
  };
};

@injectable()
export class AuthUserUseCase {
  constructor(
    @inject('IUsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: AuthUserRequest): Promise<IAuthUserResponse> {
    if (!data.email || !data.password) {
      throw new AppError('User or password invalid');
    }

    const findUser = await this.usersRepository.findByEmail(data.email);

    if (!findUser) {
      throw new AppError('User or password invalid');
    }

    const comparePassword = await PasswordSupport.compareHash(
      data.password,
      findUser.props.password
    );

    if (!comparePassword) {
      throw new AppError('User and/or password invalid');
    }

    const token = sign({}, AuthUsersSupport.tokenHash, {
      subject: findUser.id,
      expiresIn: AuthUsersSupport.tokenExpireIn,
    });

    return authUserResponse(findUser, token);
  }
}
