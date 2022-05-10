import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { DeleteSkillUseCase } from '@application/skills/DeleteSkillUseCase';

export class DeleteSkillController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteSkill = container.resolve(DeleteSkillUseCase);
    await deleteSkill.execute(id);
    return response.json({ message: 'skill deleted' });
  }
}
