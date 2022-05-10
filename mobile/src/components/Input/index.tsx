import { Question, IconProps } from 'phosphor-react-native';
import React, { FC } from 'react';
import { TextInputProps } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

import { Container, IconContainer, InputText } from './styled';

interface InputProps extends TextInputProps {
  icon?: FC<IconProps>;
}

export function Input({ icon: Icon = Question, ...rest }: InputProps) {
  const theme = useTheme();

  return (
    <>
      <Container>
        <IconContainer>
          <Icon weight="regular" color={theme.colors.main900} />
        </IconContainer>
        <InputText {...rest} />
      </Container>
    </>
  );
}
