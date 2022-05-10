import { CreateSkillUseCase } from '@application/skills/CreateSkillUseCase';
import { CreateUserUseCase } from '@application/users/CreateUserUseCase';
import { AppError } from '@infra/http/middlewares/AppError';
import { SkillsInMemoryRepository } from '@test/repositories/SkillsInMemoryRepository';
import { UsersInMemoryRepository } from '@test/repositories/UsersInMemoryRepository';
import { UpdateSkillUseCase } from './UpdateSkillUseCase';

let userInMemory: UsersInMemoryRepository;
let skillsInMemory: SkillsInMemoryRepository;
let createUser: CreateUserUseCase;
let createSkill: CreateSkillUseCase;
let updateSkill: UpdateSkillUseCase;

describe('UpdateSkillUseCase', () => {
  beforeEach(() => {
    userInMemory = new UsersInMemoryRepository();
    skillsInMemory = new SkillsInMemoryRepository();
    createUser = new CreateUserUseCase(userInMemory);
    createSkill = new CreateSkillUseCase(userInMemory, skillsInMemory);
    updateSkill = new UpdateSkillUseCase(userInMemory, skillsInMemory);
  });

  it('should not be able to create skills with no-existent user', async () => {
    await createUser.execute({
      name: 'fake-user-name',
      email: 'fake-user-email',
      password: 'fake-user-password',
    });

    const findUser = await userInMemory.findByEmail('fake-user-email');

    await createSkill.execute({
      userId: findUser!.id,
      name: 'fake-skill-name',
    });

    const findSkill = await skillsInMemory.findByName('fake-skill-name');

    await expect(
      updateSkill.execute({
        id: findSkill!.id,
        userId: 'no-existent-user',
        name: 'update-fake-skill-name',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update existent skill', async () => {
    await createUser.execute({
      name: 'fake-user-name',
      email: 'fake-user-email',
      password: 'fake-user-password',
    });

    const findUser = await userInMemory.findByEmail('fake-user-email');

    await createSkill.execute({
      userId: findUser!.id,
      name: 'fake-skill-name',
    });

    const findSkill = await skillsInMemory.findByName('fake-skill-name');

    const response = await updateSkill.execute({
      id: findSkill!.id,
      userId: findUser!.id,
      name: 'update-fake-skill-name',
    });

    expect(response).toEqual(
      expect.objectContaining({
        name: 'update-fake-skill-name',
      })
    );
  });
});
