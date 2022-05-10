import { AppError } from '@infra/http/middlewares/AppError';
import { UsersInMemoryRepository } from '@test/repositories/UsersInMemoryRepository';
import { AuthUserUseCase } from './AuthUserUseCase';
import { CreateUserUseCase } from './CreateUserUseCase';

let userInMemory: UsersInMemoryRepository;
let createUser: CreateUserUseCase;
let authUser: AuthUserUseCase;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    userInMemory = new UsersInMemoryRepository();
    createUser = new CreateUserUseCase(userInMemory);
    authUser = new AuthUserUseCase(userInMemory);
  });

  it('should not be able to authenticate with invalid name and password', async () => {
    await createUser.execute({
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      avatar: 'fake-avatar',
    });

    await expect(
      authUser.execute({
        email: '',
        password: '',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able able to authenticate user ', async () => {
    await createUser.execute({
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      avatar: 'fake-avatar',
    });

    const authResponse = await authUser.execute({
      email: 'fake-email',
      password: 'fake-password',
    });

    expect(authResponse).toHaveProperty('token');
  });

  it('should not be able to authenticate with invalid email', async () => {
    await expect(
      authUser.execute({
        email: 'no-existent-fake-email',
        password: 'fake-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with invalid password', async () => {
    await createUser.execute({
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      avatar: 'fake-avatar',
    });

    await expect(
      authUser.execute({
        email: 'fake-email',
        password: 'no-existent-fake-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
