import { UpdateSkillsController } from './../controller/skills/UpdateSkillsController';
import { Router } from 'express';

import { CreateSkillsController } from '../controller/skills/CreateSkillsController';
import { ListSkillsByUserIdController } from '../controller/skills/ListSkillsByUserIdController';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';
import { DeleteSkillController } from '../controller/skills/DeleteSkillController';

export const skillsRoutes = Router();

const createSkillsController = new CreateSkillsController();
const listSkillsByUserId = new ListSkillsByUserIdController();
const updateSkillsController = new UpdateSkillsController();
const deleteSkillController = new DeleteSkillController();

skillsRoutes.post('/', EnsureAuthenticated.user, createSkillsController.handle);
skillsRoutes.get('/', EnsureAuthenticated.user, listSkillsByUserId.handle);
skillsRoutes.put('/:id', EnsureAuthenticated.user, updateSkillsController.handle);
skillsRoutes.delete('/:id', EnsureAuthenticated.user, deleteSkillController.handle);
