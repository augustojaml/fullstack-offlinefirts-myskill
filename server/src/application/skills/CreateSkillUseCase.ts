import { inject, injectable } from 'tsyringe';

import { ISkillsRepository } from '@infra/database/repositories/ISkillsRepository';
import { IUsersRepository } from '@infra/database/repositories/IUsersRepository';
import { AppError } from '@infra/http/middlewares/AppError';

type ICreateSkillRequest = {
  userId: string;
  name: string;
};

@injectable()
export class CreateSkillUseCase {
  constructor(
    @inject('IUsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ISkillsRepository')
    private skillsRepository: ISkillsRepository
  ) {}

  async execute(data: ICreateSkillRequest) {
    if (!data.name) {
      throw new AppError('Field skill name required');
    }

    const findUser = await this.usersRepository.findById(data.userId);

    if (!findUser) {
      throw new AppError('Operation not allowed');
    }

    const findSkill = await this.skillsRepository.findByName(data.name);

    if (findSkill) {
      throw new AppError('Skill name already exists');
    }

    await this.skillsRepository.create(data);
  }
}
