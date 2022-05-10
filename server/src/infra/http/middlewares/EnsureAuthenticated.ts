import { AuthUsersSupport } from '@infra/config/supports/AuthUserSupport';
import { UsersPrismaRepository } from '@infra/database/repositories/prisma/UsersPrismaRepository';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from './AppError';

export const EnsureAuthenticated = {
  async user(request: Request, _: Response, next: NextFunction): Promise<void> {
    try {
      const headers = request.headers.authorization;

      if (!headers) {
        throw new AppError('Invalid token');
      }

      const token = headers.split(' ')[1];

      const { sub: userId } = verify(token, AuthUsersSupport.tokenHash) as { sub: string };

      const usersRepository = new UsersPrismaRepository();

      const findUser = await usersRepository.findById(userId);

      if (!findUser) {
        throw new AppError('Invalid token e/or user', 401);
      }

      request.user = {
        id: findUser.id,
      };
    } catch (error: any) {
      throw new AppError(error.message, 401);
    }
    next();
  },
};
