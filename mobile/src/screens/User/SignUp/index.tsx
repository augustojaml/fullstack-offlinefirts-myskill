import React, { useState } from 'react';
import { IconButton } from '@components/IconButton/item';

import * as ImagePicker from 'expo-image-picker';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ArrowLeft, Camera, Envelope, Lock, User } from 'phosphor-react-native';

import {
  ButtonCamContainer,
  Container,
  Form,
  Header,
  ImageWrapper,
  ProfileImage,
  Title,
} from './styled';
import { Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import avatarImg from '@assets/avatar.png';
import { useAuth } from '@hooks/useAuth';

export function SignUp() {
  const navigation = useNavigation();
  const { isLoadingUser, signUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');

  function handleNavigationGoBack() {
    navigation.goBack();
  }

  async function pickerAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    result.uri && setAvatar(result.uri);
  }

  async function handleSignUp() {
    if (!name || !email || !password) {
      return Alert.alert('SignUp', 'Preencha todos os campos');
    }
    await signUp({ name, email, password, avatar });

    navigation.navigate('SignIn');
  }

  return (
    <>
      <Container>
        <Header>
          <IconButton icon={ArrowLeft} alignItems="flex-start" onPress={handleNavigationGoBack} />
          <Title>Cadastro</Title>
          <View style={{ width: 40 }} />
        </Header>

        <ImageWrapper>
          {avatar ? <ProfileImage source={{ uri: avatar }} /> : <ProfileImage source={avatarImg} />}
          <ButtonCamContainer onPress={pickerAvatar}>
            <Camera />
          </ButtonCamContainer>
        </ImageWrapper>
        <Form>
          <Input icon={User} placeholder="Seu nome" onChangeText={setName} />
          <Input icon={Envelope} placeholder="Seu e-mail" onChangeText={setEmail} />
          <Input
            icon={Lock}
            placeholder="Seu password"
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Cadastrar" onPress={handleSignUp} isLoading={isLoadingUser} />
        </Form>
      </Container>
    </>
  );
}
