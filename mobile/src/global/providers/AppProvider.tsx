import { AuthProvider } from '@hooks/useAuth';
import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../theme';

interface IAppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: IAppProviderProps): JSX.Element => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </>
  );
};
