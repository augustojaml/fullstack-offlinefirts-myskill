import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bg600};
  padding: 24px 16px;
  border-radius: ${RFValue(5)}px;

  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const Actions = styled.View`
  flex-direction: row;
`;

export const IconButtonContainer = styled.TouchableOpacity`
  margin-left: 16px;
`;
