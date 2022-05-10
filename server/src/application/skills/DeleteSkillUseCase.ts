import { ISkillsRepository } from '@infra/database/repositories/ISkillsRepository';
import { AppError } from '@infra/http/middlewares/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteSkillUseCase {
  constructor(
    @inject('ISkillsRepository')
    private skillsRepository: ISkillsRepository
  ) {}

  async execute(id: string) {
    const findSkill = await this.skillsRepository.findById(id);

    if (!findSkill) {
      throw new AppError('Invalid skill or operation not allowed');
    }

    await this.skillsRepository.delete(id);
  }
}
