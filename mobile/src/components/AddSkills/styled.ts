import { TextInput } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${RFPercentage(3)}px;

  flex-direction: row;
`;

export const IconContainer = styled.TouchableOpacity`
  width: 56px;
  height: 56px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.main900};
`;

export const InputText = styled(TextInput)`
  font-family: ${({ theme }) => theme.fonts.text};
  color: ${({ theme }) => theme.colors.main900};
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
`;

export const Title = styled.Text``;
