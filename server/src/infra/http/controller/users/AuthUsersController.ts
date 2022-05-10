import { AuthUserUseCase } from '@application/users/AuthUserUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class AuthUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authUser = container.resolve(AuthUserUseCase);

    const auth = await authUser.execute({ email, password });

    return response.json(auth);
  }
}
