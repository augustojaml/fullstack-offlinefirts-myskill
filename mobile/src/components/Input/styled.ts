import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  background: ${({ theme }) => theme.colors.text};

  flex-direction: row;
  align-items: center;

  height: ${RFValue(56)}px;
  border-radius: ${RFValue(5)}px;
  overflow: hidden;
  margin-bottom: ${RFValue(16)}px;
`;

export const IconContainer = styled.View`
  width: ${RFValue(56)}px;
  height: ${RFValue(56)}px;
  align-items: center;
  justify-content: center;
`;

export const InputText = styled(TextInput)`
  font-family: ${({ theme }) => theme.fonts.text};
  flex: 1;
  padding-right: 16px;
`;

export const Title = styled.Text``;
