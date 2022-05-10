import { rgba } from 'polished';
import { TouchableOpacityProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity<TouchableOpacityProps>`
  width: 100%;
  background-color: ${({ theme, disabled }) =>
    !disabled ? theme.colors.main900 : rgba(theme.colors.main900, 0.3)};
  border-radius: ${RFValue(5)}px;
  height: ${RFValue(56)}px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text};
`;
