import { CreateUserUseCase } from '@application/users/CreateUserUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    //
    const { name, email, password } = request.body;
    const avatar = request.file?.filename;

    const createUser = container.resolve(CreateUserUseCase);
    await createUser.execute({ name, email, password, avatar });
    return response.json({ message: 'user created' });
  }
}
