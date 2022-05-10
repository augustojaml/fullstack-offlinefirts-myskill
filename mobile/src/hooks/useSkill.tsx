import { database } from '@global/databases';
import { Skill } from '@global/databases/models/skills/Skill';
import { api } from '@global/services/api';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from './useAuth';

interface ISkillProvider {
  children: ReactNode;
}

interface ISkill {
  id: string;
  name: string;
}

interface ISkillContext {
  skills: ISkill[];
  isLoadingSkills: boolean;
  isLoadingListSkill: boolean;
  addSkill(skill: string): Promise<void>;
}

const SkillContext = createContext({} as ISkillContext);

function SkillProvider({ children }: ISkillProvider) {
  const { user } = useAuth();

  const [isLoadingListSkill, setIsLoadingListSkill] = useState(false);
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);
  const [skills, setSkills] = useState<ISkill[]>([]);

  const skillsCollection = database.get<Skill>('skills');

  async function addSkill(skill: string) {
    try {
      setIsLoadingSkills(true);
      await api.post('/skills', { userId: user?.userId, name: skill });

      const newSkill = {
        id: String(new Date().getTime()),
        userId: user?.userId,
        name: skill,
      } as ISkill;

      skills.push(newSkill);
    } catch (error) {
    } finally {
      setIsLoadingSkills(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setIsLoadingListSkill(true);
        const response = await api.get('/skills');
        setSkills(response.data);
      } catch (error) {
        console.log(error);
        Alert.alert('Skill', 'Falha ao carregar skill');
      } finally {
        setIsLoadingListSkill(false);
      }
    })();
  }, []);

  return (
    <>
      <SkillContext.Provider value={{ skills, isLoadingSkills, isLoadingListSkill, addSkill }}>
        {children}
      </SkillContext.Provider>
    </>
  );
}

function useSkill() {
  return useContext(SkillContext);
}

export { SkillProvider, useSkill };
