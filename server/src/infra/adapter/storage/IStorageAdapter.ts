export type StorageAdapterProps = {
  file: string;
  folder: string;
};

export interface IStorageAdapter {
  save(data: StorageAdapterProps): Promise<string>;
  delete(data: StorageAdapterProps): Promise<void>;
}
