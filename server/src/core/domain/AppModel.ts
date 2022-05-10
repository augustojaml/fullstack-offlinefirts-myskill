import crypto from 'crypto';

export abstract class AppModel<T> {
  protected _id: string;
  public props: T;

  get id() {
    return this._id;
  }

  constructor(props: T, id?: string) {
    this.props = props;
    this._id = id ?? crypto.randomUUID();
  }
}
