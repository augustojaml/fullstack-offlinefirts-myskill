import { container } from 'tsyringe';
import { IStorageAdapter } from './storage/IStorageAdapter';
import { LocalStorageAdapter } from './storage/LocalStorageAdapter';

const diskStorage = {
  local: LocalStorageAdapter,
};

container.registerSingleton<IStorageAdapter>('IStorageAdapter', diskStorage['local']);
