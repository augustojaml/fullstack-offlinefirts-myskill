import { UsersPrismaRepository } from '../database/repositories/prisma/UsersPrismaRepository';
import { ISkillsRepository } from '@infra/database/repositories/ISkillsRepository';
import { IUsersRepository } from '@infra/database/repositories/IUsersRepository';
import { container } from 'tsyringe';

import '@infra/adapter';
import { SkillsPrismaRepository } from '@infra/database/repositories/prisma/SkillsPrismaRepository';

container.registerSingleton<IUsersRepository>('IUsersRepository', UsersPrismaRepository);
container.registerSingleton<ISkillsRepository>('ISkillsRepository', SkillsPrismaRepository);
