import { CreateSkillUseCase } from '@application/skills/CreateSkillUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateSkillsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name } = request.body;
    const createSkill = container.resolve(CreateSkillUseCase);

    await createSkill.execute({ name, userId });

    return response.send({ message: 'skill created' });
  }
}
