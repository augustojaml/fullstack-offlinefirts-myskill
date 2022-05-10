import { Skill } from '@domain/Skill';
import { ISkillsRepository } from '@infra/database/repositories/ISkillsRepository';
import { IUsersRepository } from '@infra/database/repositories/IUsersRepository';
import { AppError } from '@infra/http/middlewares/AppError';
import { inject, injectable } from 'tsyringe';

type UpdateSkillRequest = {
  id: string;
  userId: string;
  name: string;
};

type SkillResponse = {
  id: string;
  userId: string;
  name: string;
};

@injectable()
export class UpdateSkillUseCase {
  constructor(
    @inject('IUsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ISkillsRepository')
    private skillsRepository: ISkillsRepository
  ) {}

  async execute(data: UpdateSkillRequest): Promise<SkillResponse | null> {
    const findUser = await this.usersRepository.findById(data.userId);

    if (!findUser) {
      throw new AppError('Invalid user or operation not allowed');
    }

    const updateSkill = await this.skillsRepository.update(data);

    const skillResponse = (skill: Skill): SkillResponse => {
      return {
        id: skill.id,
        userId: skill.props.userId,
        name: skill.props.name,
      };
    };

    return skillResponse(updateSkill!);
  }
}
