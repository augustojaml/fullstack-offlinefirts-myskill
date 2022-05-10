import { ListSkillsByUserIdUseCase } from '@application/skills/ListSkillsByUserIdUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListSkillsByUserIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const listSkillsByUserId = container.resolve(ListSkillsByUserIdUseCase);

    const skills = await listSkillsByUserId.execute(userId);

    return response.json(skills);
  }
}
