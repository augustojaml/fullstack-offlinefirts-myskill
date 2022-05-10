import { Skill } from '@domain/Skill';
import { prisma } from '@infra/config/services/prisma';
import { ICreateSkillData, ISkillsRepository, IUpdateSkillData } from '../ISkillsRepository';

export class SkillsPrismaRepository implements ISkillsRepository {
  async create(data: ICreateSkillData): Promise<void> {
    const skill = Skill.create(data);

    await prisma.skills.create({
      data: {
        id: skill.id,
        ...skill.props,
      },
    });
  }

  async findByName(name: string): Promise<Skill | null> {
    const findSkill = await prisma.skills.findFirst({
      where: {
        name: name,
      },
    });

    if (!findSkill) {
      return null;
    }

    const { id, ...props } = findSkill;
    const user = Skill.create(props, findSkill.id);
    return user;
  }

  async update(data: IUpdateSkillData): Promise<Skill | null> {
    const findSkill = await this.findById(data.id);

    if (!findSkill) {
      return null;
    }

    const updateSkill = await prisma.skills.update({
      where: { id: data.id },
      data: {
        name: data.name ? data.name : findSkill.props.name,
      },
    });

    const { id, ...props } = updateSkill;

    const update = Skill.create(props, updateSkill.id);

    return update;
  }

  async delete(id: string): Promise<void> {
    await prisma.skills.delete({
      where: {
        id: id,
      },
    });
  }

  async findById(skillId: string): Promise<Skill | null> {
    const findSkill = await prisma.skills.findFirst({
      where: {
        id: skillId,
      },
    });

    if (!findSkill) {
      return null;
    }

    const { id, ...props } = findSkill;

    const user = Skill.create(props, findSkill.id);

    return user;
  }

  async findByUserId(userId: string): Promise<Skill[]> {
    const findSkills = await prisma.skills.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });

    const skills = findSkills.map((skill) => {
      const { id, ...props } = skill;
      return Skill.create(props, skill.id);
    });

    return skills;
  }
}
