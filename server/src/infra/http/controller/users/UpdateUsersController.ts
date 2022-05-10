import { UpdateUserUseCase } from '@application/users/UpdateUserUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UpdateUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const { name, email, password } = request.body;
    const avatar = request.file?.filename;

    const updateUser = container.resolve(UpdateUserUseCase);

    const user = await updateUser.execute({ id: userId, name, email, password, avatar });

    return response.json(user);
  }
}
