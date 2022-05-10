import { User } from '@domain/User';
import { AppModel } from '@core/domain/AppModel';

export type SkillProps = {
  name: string;
  userId: string;
  createdAt?: Date | null;
};

export class Skill extends AppModel<SkillProps> {
  private constructor(props: SkillProps, id?: string) {
    super(props, id);
  }

  static create(props: SkillProps, id?: string) {
    const data = new Skill(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return data;
  }
}
