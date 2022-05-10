import express from 'express';

import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import '@infra/container';

import { router } from '@infra/http/routes';
import { AppError } from '@infra/http/middlewares/AppError';
import { LocalFilesSupport } from '@infra/config/supports/LocalFilesSupport';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(AppError.middleware);
app.use('/avatar', express.static(`${LocalFilesSupport.paths.storage}/avatar`));
