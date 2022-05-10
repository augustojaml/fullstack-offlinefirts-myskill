import { opacify, setLightness } from 'polished';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.bg900};
  align-items: center;
`;

export const Header = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 0 ${RFPercentage(3)}px;
  padding-top: ${RFValue(48)}px;
`;

type TitleProps = {
  color?: string;
};

export const ProfileWrapper = styled.View`
  flex-direction: row;
`;

export const ProfileImage = styled.Image`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
`;

export const GreetingUser = styled.View`
  justify-content: center;
  margin-left: 16px;
`;

export const Greeting = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const User = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.colors.text};
`;

export const SkillsContent = styled.View`
  width: 100%;
  padding: ${RFPercentage(3)}px;
`;

export const SkillHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SkillTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const SkillQuantity = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.text};
  color: ${({ theme }) => setLightness(0.6, theme.colors.text)};
`;
