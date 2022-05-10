import React, { useEffect, useState } from 'react';
import { IconButton } from '@components/IconButton/item';

import * as ImagePicker from 'expo-image-picker';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ArrowLeft, Camera, Envelope, User } from 'phosphor-react-native';

import {
  ButtonCamContainer,
  Container,
  Form,
  Header,
  ImageWrapper,
  ProfileImage,
  Title,
} from './styled';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';

import avatarImg from '@assets/avatar.png';
import { api } from '@global/services/api';
import { useTheme } from 'styled-components';

interface PickerResult {
  cancelled: string;
  uri: string;
  type: string;
  height: number;
  width: string;
}

export function Profile() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { user, updateUser, isLoadingUser, offlineSynchronize } = useAuth();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<string | undefined>(undefined);

  function handleNavigationGoBack() {
    navigation.goBack();
  }

  let pickerAvatar = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    /**
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
     */

    let { cancelled, uri } = (await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      allowsEditing: false,
    })) as unknown as PickerResult;

    if (cancelled) {
      return;
    }

    setAvatar(uri);
  };

  async function handleUpdate() {
    const data = { name, avatar };
    await updateUser(data);
    navigation.navigate('Skills');
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
          <ProfileImage
            source={{ uri: avatar ? avatar : user?.avatarPath ? user.avatarPath : user?.avatar }}
          />

          <ButtonCamContainer onPress={pickerAvatar}>
            <Camera />
          </ButtonCamContainer>
        </ImageWrapper>
        <Form>
          <Input
            icon={User}
            placeholder="Seu nome"
            onChangeText={setName}
            defaultValue={user?.name}
          />
          <Input icon={Envelope} placeholder="Seu e-mail" value={user?.email} editable={false} />
          {/* <Input placeholder="Novo password" onChangeText={setPassword} /> */}
          <Button title="Atualizar" onPress={handleUpdate} isLoading={isLoadingUser} />

          {/* <TouchableOpacity
            onPress={offlineSynchronize}
            style={{
              width: '100%',
              padding: 16,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}
          >
            <Text
              style={{ fontSize: 18, fontFamily: theme.fonts.medium, color: theme.colors.main900 }}
            >
              Enviar
            </Text>
          </TouchableOpacity> */}
        </Form>
      </Container>
    </>
  );
}
