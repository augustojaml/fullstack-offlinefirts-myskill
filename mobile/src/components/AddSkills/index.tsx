import { useTheme } from 'styled-components/native';
import { PlusCircle } from 'phosphor-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';

import { Container, IconContainer, InputText, Title } from './styled';
import { useSkill } from '@hooks/useSkill';

export function AddSkills() {
  const theme = useTheme();
  const { isLoadingSkills, addSkill } = useSkill();

  const [skill, setSkill] = useState('');

  async function handleAddSkill() {
    if (!skill) {
      return Alert.alert('Skill', 'Skill name obrigatório');
    }
    // console.log(skill);
    await addSkill(skill);
    setSkill('');
  }

  return (
    <>
      <Container>
        <InputText onChangeText={setSkill} value={skill} />
        <IconContainer onPress={handleAddSkill} disabled={isLoadingSkills}>
          {isLoadingSkills ? (
            <ActivityIndicator size={24} color={theme.colors.bg400} />
          ) : (
            <PlusCircle size={24} color={theme.colors.bg400} />
          )}
        </IconContainer>
      </Container>
    </>
  );
}
