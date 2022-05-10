import { skillsRoutes } from './skillsRouter';
import { userRoutes } from './usersRouter';
import { Request, Response, Router } from 'express';

export const router = Router();

router.get('/test', (request: Request, response: Response) => {
  return response.json('Route test is ok ⛱');
});

router.use('/users', userRoutes);
router.use('/skills', skillsRoutes);
