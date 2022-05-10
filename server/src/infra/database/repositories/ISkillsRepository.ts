import { Skill } from '@domain/Skill';
export type ICreateSkillData = {
  name: string;
  userId: string;
};

export type IUpdateSkillData = {
  id: string;
  name: string;
  userId: string;
};

export interface ISkillsRepository {
  create(data: ICreateSkillData): Promise<void>;
  findByName(name: string): Promise<Skill | null>;
  update(data: IUpdateSkillData): Promise<Skill | null>;
  delete(id: string): Promise<void>;
  findById(skillId: string): Promise<Skill | null>;
  findByUserId(userId: string): Promise<Skill[]>;
}
