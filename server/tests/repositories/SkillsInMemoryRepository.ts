import { Skill } from '@domain/Skill';
import {
  ICreateSkillData,
  ISkillsRepository,
  IUpdateSkillData,
} from '@infra/database/repositories/ISkillsRepository';

export class SkillsInMemoryRepository implements ISkillsRepository {
  private repository: Skill[] = [];

  async create(data: ICreateSkillData): Promise<void> {
    const object = Skill.create(data);
    this.repository.push(object);
  }

  async findByName(name: string): Promise<Skill | null> {
    const findSkill = this.repository.find((skill) => skill.props.name === name) || null;
    return findSkill;
  }

  async update(data: IUpdateSkillData): Promise<Skill | null> {
    let findSkill = this.repository.find((skill) => skill.id === data.id);

    if (!findSkill) {
      return null;
    }

    const updateSkill = Skill.create(
      {
        ...findSkill.props,
        name: data.name ? data.name : findSkill.props.name,
      },
      data.id
    );

    const foundIndex = this.repository.findIndex((user) => user.id === findSkill!.id);

    this.repository[foundIndex] = updateSkill;

    return updateSkill;
  }

  async delete(skillId: string): Promise<void> {
    this.repository = this.repository.filter((skill) => skill.id !== skillId);
  }

  async findById(id: string): Promise<Skill | null> {
    const findSkill = this.repository.find((skill) => skill.id === id) || null;
    return findSkill;
  }

  async findByUserId(userId: string): Promise<Skill[]> {
    const findSkills = this.repository.filter((skill) => skill.props.userId === userId);
    return findSkills;
  }
}
