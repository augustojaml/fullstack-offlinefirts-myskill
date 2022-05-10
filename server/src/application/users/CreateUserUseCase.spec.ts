import { AppError } from '@infra/http/middlewares/AppError';
import { UsersInMemoryRepository } from '@test/repositories/UsersInMemoryRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

let createUser: CreateUserUseCase;
let userInMemory: UsersInMemoryRepository;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    userInMemory = new UsersInMemoryRepository();
    createUser = new CreateUserUseCase(userInMemory);
  });

  it('should be able create a new User', async () => {
    await expect(
      createUser.execute({
        name: 'fake-name',
        email: 'fake-email',
        password: 'fake-password',
        avatar: 'fake-avatar',
      })
    ).resolves.not.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new User with existent email', async () => {
    await createUser.execute({
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      avatar: 'fake-avatar',
    });

    await expect(
      createUser.execute({
        name: 'fake-name',
        email: 'fake-email',
        password: 'fake-password',
        avatar: 'fake-avatar',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
