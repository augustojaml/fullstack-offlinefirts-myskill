import { IconButton } from '@components/IconButton/item';
import { SkillItem, tempSkills } from '@components/SkillItem';
import { useAuth } from '@hooks/useAuth';
import { Power } from 'phosphor-react-native';
import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import {
  Container,
  Header,
  ProfileWrapper,
  ProfileImage,
  GreetingUser,
  Greeting,
  User,
  SkillsContent,
  SkillHeader,
  SkillTitle,
  SkillQuantity,
} from './styled';

import avatarImg from '@assets/avatar.png';
import { useSkill } from '@hooks/useSkill';
import { useTheme } from 'styled-components/native';
import { AddSkills } from '@components/AddSkills';

export function Skills() {
  const theme = useTheme();
  const { user, signOut } = useAuth();
  const { skills, isLoadingSkills } = useSkill();

  return (
    <>
      <Container>
        <Header>
          <ProfileWrapper>
            {user?.avatar || user?.avatarPath ? (
              <ProfileImage source={{ uri: user?.avatarPath ? user.avatarPath : user.avatar }} />
            ) : (
              <ProfileImage source={avatarImg} />
            )}

            <GreetingUser>
              <Greeting>Ola, </Greeting>
              <User>{user?.name}</User>
            </GreetingUser>
          </ProfileWrapper>
          <IconButton icon={Power} onPress={signOut} />
        </Header>

        <SkillsContent>
          <AddSkills />

          <SkillHeader>
            <SkillTitle>Skill's</SkillTitle>
            {skills && (
              <SkillQuantity>
                {String(skills.length).padStart(2, '0')} skills cadastradas
              </SkillQuantity>
            )}
          </SkillHeader>

          {isLoadingSkills ? (
            <ActivityIndicator size={24} color={theme.colors.text} />
          ) : (
            <FlatList
              data={skills}
              keyExtractor={(item) => String(item.id)}
              contentContainerStyle={{ paddingVertical: RFPercentage(3), paddingBottom: 200 }}
              ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
              renderItem={({ item }) => <SkillItem item={item} />}
            />
          )}
        </SkillsContent>
      </Container>
    </>
  );
}
