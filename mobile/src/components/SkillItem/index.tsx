import { PencilSimple, Trash } from 'phosphor-react-native';
import React from 'react';
import { useTheme } from 'styled-components/native';

import { Container, Title, Actions, IconButtonContainer } from './styled';

export interface SkillItemProps {
  id: string;
  name: string;
}

export interface SkillsProps {
  item: SkillItemProps;
}

export const tempSkills: SkillItemProps[] = [
  {
    id: '123',
    name: 'Skill name 123',
  },
  {
    id: '124',
    name: 'Skill name 124',
  },
  {
    id: '125',
    name: 'Skill name 125',
  },
];

export function SkillItem({ item }: SkillsProps) {
  const theme = useTheme();

  return (
    <>
      <Container>
        <Title>{item.name}</Title>
        <Actions>
          <IconButtonContainer>
            <PencilSimple weight="regular" color={theme.colors.main900} />
          </IconButtonContainer>
          <IconButtonContainer>
            <Trash weight="regular" color={theme.colors.main900} />
          </IconButtonContainer>
        </Actions>
      </Container>
    </>
  );
}
