import { Router } from 'express';
import multer from 'multer';

import { LocalFilesSupport } from '@infra/config/supports/LocalFilesSupport';
import { CreateUsersController } from '../controller/users/CreateUsersController';
import { AuthUsersController } from '../controller/users/AuthUsersController';
import { UpdateUsersController } from '../controller/users/UpdateUsersController';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

export const userRoutes = Router();

const upload = multer(LocalFilesSupport.upload(`${LocalFilesSupport.paths.storage}/avatar`));

const createUsersController = new CreateUsersController();
const authUsersController = new AuthUsersController();
const updateUsersController = new UpdateUsersController();

userRoutes.post('/', upload.single('avatar'), createUsersController.handle);

userRoutes.post('/auth', authUsersController.handle);

userRoutes.put(
  '/update',
  EnsureAuthenticated.user,
  upload.single('avatar'),
  updateUsersController.handle
);
