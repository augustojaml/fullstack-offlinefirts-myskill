import { Request, Response } from 'express';

import { UpdateSkillUseCase } from '@application/skills/UpdateSkillUseCase';
import { container } from 'tsyringe';

export class UpdateSkillsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name } = request.body;
    const { id } = request.params;

    const updateSkills = container.resolve(UpdateSkillUseCase);

    const update = await updateSkills.execute({ id, userId, name });

    return response.json(update);
  }
}
