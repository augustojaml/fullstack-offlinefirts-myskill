import { AppError } from '@infra/http/middlewares/AppError';
import { FakeStorageAdapter } from '@test/adapter/FakeStorageAdapter';
import { UsersInMemoryRepository } from '@test/repositories/UsersInMemoryRepository';
import { CreateUserUseCase } from './CreateUserUseCase';
import { UpdateUserUseCase } from './UpdateUserUseCase';

let fakeStorage: FakeStorageAdapter;
let userInMemory: UsersInMemoryRepository;
let createUser: CreateUserUseCase;

let updateUser: UpdateUserUseCase;

describe('UpdateUserUseCase', () => {
  beforeEach(() => {
    fakeStorage = new FakeStorageAdapter();
    userInMemory = new UsersInMemoryRepository();
    createUser = new CreateUserUseCase(userInMemory);
    updateUser = new UpdateUserUseCase(fakeStorage, userInMemory);
  });

  it('should be able update user', async () => {
    await createUser.execute({
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      avatar: 'fake-avatar',
    });

    const findUser = await userInMemory.findByEmail('fake-email');

    const response = await updateUser.execute({
      id: findUser!.id,
      name: 'update-fake-name',
      email: 'update-fake-email',
      password: 'update-fake-password',
      avatar: 'update-fake-avatar',
    });

    expect(response).toEqual(
      expect.objectContaining({
        id: findUser!.id,
        name: 'update-fake-name',
        email: 'update-fake-email',
        avatar: 'update-fake-avatar',
      })
    );
  });

  it('should not be able update user with no-existent user', async () => {
    await expect(
      updateUser.execute({
        id: 'no-existent-user-id',
        name: 'update-fake-name',
        email: 'update-fake-email',
        password: 'update-fake-password',
        avatar: 'update-fake-avatar',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
