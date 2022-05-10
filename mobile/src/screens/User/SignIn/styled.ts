import { setLightness, transparentize } from 'polished';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.bg900};
`;

export const Header = styled.View`
  flex-direction: row;
  margin-bottom: ${RFValue(40)}px;
`;

type TitleProps = {
  color?: string;
};

export const Title = styled.Text<TitleProps>`
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.title};
  color: ${({ theme, color }) => (color ? color : theme.colors.text)};
`;

export const Form = styled.View`
  width: 100%;
  padding: ${RFPercentage(3)}px;
  align-items: center;
`;

export const SignUpButtonContainer = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(56)}px;
  align-items: center;
  justify-content: center;
`;

export const SignUpButtonText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.main900};
  margin-top: 24px;
`;
