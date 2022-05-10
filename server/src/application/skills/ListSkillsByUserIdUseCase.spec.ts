import { AppError } from '@infra/http/middlewares/AppError';
import { CreateUserUseCase } from '@application/users/CreateUserUseCase';
import { SkillsInMemoryRepository } from '@test/repositories/SkillsInMemoryRepository';
import { UsersInMemoryRepository } from '@test/repositories/UsersInMemoryRepository';

import { ListSkillsByUserIdUseCase } from './ListSkillsByUserIdUseCase';
import { CreateSkillUseCase } from './CreateSkillUseCase';

let usersInMemory: UsersInMemoryRepository;
let skillsInMemory: SkillsInMemoryRepository;
let createUser: CreateUserUseCase;
let createSkill: CreateSkillUseCase;
let listSkillsByUserId: ListSkillsByUserIdUseCase;

describe('ListSkillsByUserIdUseCase', () => {
  beforeEach(() => {
    usersInMemory = new UsersInMemoryRepository();
    skillsInMemory = new SkillsInMemoryRepository();
    createUser = new CreateUserUseCase(usersInMemory);
    createSkill = new CreateSkillUseCase(usersInMemory, skillsInMemory);
    listSkillsByUserId = new ListSkillsByUserIdUseCase(usersInMemory, skillsInMemory);
  });

  it('should not be able to list skills with no-existent user', async () => {
    await expect(listSkillsByUserId.execute('no-existent-user-id')).rejects.toBeInstanceOf(
      AppError
    );
  });

  it('should be able to list skills with existent user', async () => {
    await createUser.execute({
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      avatar: 'fake-avatar',
    });

    const findUser = await usersInMemory.findByEmail('fake-email');

    await createSkill.execute({
      userId: findUser!.id,
      name: 'fake-skill-1',
    });

    await createSkill.execute({
      userId: findUser!.id,
      name: 'fake-skill-2',
    });

    await createSkill.execute({
      userId: findUser!.id,
      name: 'fake-skill-3',
    });

    const skills = await listSkillsByUserId.execute(findUser!.id);

    expect(skills).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userId: findUser!.id,
          name: 'fake-skill-1',
        }),
        expect.objectContaining({
          userId: findUser!.id,
          name: 'fake-skill-2',
        }),
        expect.objectContaining({
          userId: findUser!.id,
          name: 'fake-skill-3',
        }),
      ])
    );
  });
});
