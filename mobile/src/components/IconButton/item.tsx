import { ArrowLeft, IconProps, Power } from 'phosphor-react-native';
import React, { FC } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container } from './styled';

interface IconButtonProps extends TouchableOpacityProps {
  icon?: FC<IconProps>;
  alignItems?: 'flex-start' | 'center' | 'flex-end';
}

export function IconButton({ icon: Icon = Power, alignItems = 'center', ...rest }: IconButtonProps) {
  const theme = useTheme()
  
  return (
    <>
      <Container alignItems={alignItems} {...rest }>
        <Icon weight="regular" color={theme.colors.main900} />
      </Container>
    </>
  );
}
