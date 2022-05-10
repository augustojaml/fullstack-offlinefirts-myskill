import { TouchableOpacityProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ContainerProps extends TouchableOpacityProps {
  alignItems: 'flex-start' | 'center' | 'flex-end';
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;

  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};
  justify-content: center;
`;

export const Title = styled.Text``;
