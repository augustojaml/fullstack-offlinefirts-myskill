import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Lock, Envelope } from 'phosphor-react-native';
import React, { useState } from 'react';
import { useTheme } from 'styled-components/native';

import { Container, Title, Form, Header, SignUpButtonText, SignUpButtonContainer } from './styled';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import { Alert } from 'react-native';

export function SignIn() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { signIn, isLoadingUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNavigationSignOut() {
    navigation.navigate('SignUp');
  }

  async function handleSign() {
    if (!email || !password) {
      return Alert.alert('SignIn', 'Usuário e/ou senha inválidos');
    }

    await signIn({ email, password });
  }

  return (
    <>
      <Container>
        <Form>
          <Header>
            <Title color={theme.colors.main900}>My</Title>
            <Title>Skill's</Title>
          </Header>
          <Input icon={Envelope} placeholder="Seu e-mail" onChangeText={setEmail} />
          <Input icon={Lock} placeholder="Sua senha" onChangeText={setPassword} />
          <Button title="Entrar" onPress={handleSign} isLoading={isLoadingUser} />
          <SignUpButtonContainer onPress={handleNavigationSignOut}>
            <SignUpButtonText>Criar conta</SignUpButtonText>
          </SignUpButtonContainer>
        </Form>
      </Container>
    </>
  );
}
