import React from 'react';

import { StatusBar } from 'expo-status-bar';
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  useFonts,
} from '@expo-google-fonts/montserrat';

import { Baloo2_800ExtraBold } from '@expo-google-fonts/baloo-2';

import { AppProvider } from '@global/providers/AppProvider';

import { Splash } from '@components/Splash';
import { SignUp } from '@screens/User/SignUp';
import { Skills } from '@screens/Skills';
import { SignIn } from '@screens/User/SignIn';
import { Routes } from '@routes/index';

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Baloo2_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Splash />;
  }

  return (
    <>
      <AppProvider>
        <StatusBar style="light" backgroundColor="transparent" translucent />
        <Routes />
      </AppProvider>
    </>
  );
}
