import { CreateUserUseCase } from '@application/users/CreateUserUseCase';
import { AppError } from '@infra/http/middlewares/AppError';
import { SkillsInMemoryRepository } from '@test/repositories/SkillsInMemoryRepository';
import { UsersInMemoryRepository } from '@test/repositories/UsersInMemoryRepository';
import { CreateSkillUseCase } from './CreateSkillUseCase';

let usersInMemory: UsersInMemoryRepository;
let skillInMemory: SkillsInMemoryRepository;
let createUser: CreateUserUseCase;
let createSkill: CreateSkillUseCase;

describe('CreateSkillUseCase', () => {
  beforeEach(() => {
    usersInMemory = new UsersInMemoryRepository();
    skillInMemory = new SkillsInMemoryRepository();
    createUser = new CreateUserUseCase(usersInMemory);
    createSkill = new CreateSkillUseCase(usersInMemory, skillInMemory);
  });

  it('should not be able to create skill with no-existent user', async () => {
    await expect(
      createSkill.execute({
        userId: 'no-existent-user-id',
        name: 'fake-skill-name',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create skill with name invalid', async () => {
    await expect(
      createSkill.execute({
        userId: 'no-existent-user-id',
        name: '',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create skill with existent skill name', async () => {
    await createUser.execute({
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      avatar: 'fake-avatar',
    });

    const findUser = await usersInMemory.findByEmail('fake-email');

    await createSkill.execute({
      userId: findUser!.id,
      name: 'fake-skill-name',
    });

    await expect(
      createSkill.execute({
        userId: findUser!.id,
        name: 'fake-skill-name',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able create new skill', async () => {
    await createUser.execute({
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      avatar: 'fake-avatar',
    });

    const findUser = await usersInMemory.findByEmail('fake-email');

    await expect(
      createSkill.execute({
        userId: findUser!.id,
        name: 'fake-skill-name',
      })
    ).resolves.not.toThrow();
  });
});
