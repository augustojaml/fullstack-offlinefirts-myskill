import { IStorageAdapter, StorageAdapterProps } from '@infra/adapter/storage/IStorageAdapter';

export class FakeStorageAdapter implements IStorageAdapter {
  async save(data: StorageAdapterProps): Promise<string> {
    return 'fake-file.png';
  }
  async delete(data: StorageAdapterProps): Promise<void> {
    // console.log('file-deleted ', data.file);
  }
}
