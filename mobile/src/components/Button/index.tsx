import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';

import { Container, Title } from './styled';

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  isLoading?: boolean;
  background?: string;
}

export function Button({ title = 'Button', isLoading = false, background, ...rest }: ButtonProps) {
  const theme = useTheme();

  return (
    <>
      <Container disabled={isLoading} {...rest}>
        {isLoading ? (
          <ActivityIndicator size={RFValue(24)} color={theme.colors.text} />
        ) : (
          <Title>{title}</Title>
        )}
      </Container>
    </>
  );
}
