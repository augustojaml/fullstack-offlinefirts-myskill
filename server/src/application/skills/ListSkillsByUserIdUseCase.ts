import { Skill } from '@domain/Skill';
import { ISkillsRepository } from '@infra/database/repositories/ISkillsRepository';
import { IUsersRepository } from '@infra/database/repositories/IUsersRepository';
import { AppError } from '@infra/http/middlewares/AppError';
import { inject, injectable } from 'tsyringe';

type ListSkillsByUserIdResponse = {
  id: string;
  userId: string;
  name: string;
};

@injectable()
export class ListSkillsByUserIdUseCase {
  constructor(
    @inject('IUsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ISkillsRepository')
    private skillsRepository: ISkillsRepository
  ) {}

  async execute(userId: string): Promise<ListSkillsByUserIdResponse[]> {
    const findUser = await this.usersRepository.findById(userId);

    if (!findUser) {
      throw new AppError('Invalid skil or operation not allowed');
    }

    const skills = await this.skillsRepository.findByUserId(userId);

    const listSkillsResponse = (skills: Skill[]): ListSkillsByUserIdResponse[] => {
      return skills.map((skill) => {
        return {
          id: skill.id,
          userId: skill.props.userId,
          name: skill.props.name,
        };
      });
    };

    return listSkillsResponse(skills);
  }
}
