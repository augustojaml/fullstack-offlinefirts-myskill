import fs from 'fs';
import { resolve } from 'path';
import { LocalFilesSupport } from '@infra/config/supports/LocalFilesSupport';

import { IStorageAdapter, StorageAdapterProps } from './IStorageAdapter';

export class LocalStorageAdapter implements IStorageAdapter {
  //
  async save(data: StorageAdapterProps): Promise<string> {
    await fs.promises.rename(
      resolve(`${LocalFilesSupport.paths.storage}/${data.folder}`, data.file),
      resolve(`${LocalFilesSupport.paths.storage}/${data.folder}`, data.file)
    );
    return data.file;
  }

  async delete(data: StorageAdapterProps): Promise<void> {
    const filename = resolve(`${LocalFilesSupport.paths.storage}/${data.folder}`, data.file);
    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }
    await fs.promises.unlink(filename);
  }
}
