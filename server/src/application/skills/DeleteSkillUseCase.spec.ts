import { CreateUserUseCase } from '@application/users/CreateUserUseCase';
import { AppError } from '@infra/http/middlewares/AppError';
import { SkillsInMemoryRepository } from '@test/repositories/SkillsInMemoryRepository';
import { UsersInMemoryRepository } from '@test/repositories/UsersInMemoryRepository';
import { CreateSkillUseCase } from './CreateSkillUseCase';
import { DeleteSkillUseCase } from './DeleteSkillUseCase';
import { ListSkillsByUserIdUseCase } from './ListSkillsByUserIdUseCase';

let userInMemory: UsersInMemoryRepository;
let skillsInMemory: SkillsInMemoryRepository;
let createUser: CreateUserUseCase;

let createSkill: CreateSkillUseCase;
let listSkillsByUserId: ListSkillsByUserIdUseCase;
let deleteSkill: DeleteSkillUseCase;

describe('DeleteSkillUseCase', () => {
  beforeEach(() => {
    userInMemory = new UsersInMemoryRepository();
    skillsInMemory = new SkillsInMemoryRepository();
    createUser = new CreateUserUseCase(userInMemory);
    createSkill = new CreateSkillUseCase(userInMemory, skillsInMemory);
    listSkillsByUserId = new ListSkillsByUserIdUseCase(userInMemory, skillsInMemory);
    deleteSkill = new DeleteSkillUseCase(skillsInMemory);
  });
  it('should be able to delete existent skill', async () => {
    await createUser.execute({
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      avatar: 'fake-avatar',
    });

    const findUser = await userInMemory.findByEmail('fake-email');

    await createSkill.execute({
      userId: findUser!.id,
      name: 'fake-skill-name-1',
    });

    await createSkill.execute({
      userId: findUser!.id,
      name: 'fake-skill-name-2',
    });

    await createSkill.execute({
      userId: findUser!.id,
      name: 'fake-skill-name-3',
    });

    const findSkill = await skillsInMemory.findByName('fake-skill-name-2');

    await deleteSkill.execute(findSkill!.id);

    const skills = await listSkillsByUserId.execute(findUser!.id);

    expect(skills.length).toEqual(2);
  });

  it('should be able to delete existent skill', async () => {
    await expect(deleteSkill.execute('no-existent-skill-id')).rejects.toBeInstanceOf(AppError);
  });
});
