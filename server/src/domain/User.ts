import { AppModel } from '@core/domain/AppModel';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
  createdAt?: Date | null;
};

export class User extends AppModel<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  static create(props: UserProps, id?: string) {
    const data = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return data;
  }
}
