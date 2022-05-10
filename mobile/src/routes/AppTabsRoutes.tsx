import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Skills } from '@screens/Skills';
import { Profile } from '@screens/User/Profile';
import { ListDashes, User } from 'phosphor-react-native';
import { opacify, transparentize } from 'polished';
import curriedTransparentize from 'polished/lib/color/transparentize';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components/native';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabsRoutes() {
  const theme = useTheme();

  return (
    <>
      <Navigator
        initialRouteName={'Skills'}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.main900,
          tabBarInactiveTintColor: transparentize(0.7, theme.colors.main900),
          tabBarShowLabel: false,
          tabBarStyle: {
            paddingVertical: Platform.OS === 'ios' ? 20 : 0,
            height: 78,
            backgroundColor: theme.colors.bg600,
          },
        }}
      >
        <Screen
          name="Skills"
          component={Skills}
          options={{
            tabBarIcon: ({ color }) => <ListDashes weight="bold" size={24} color={color} />,
          }}
        />
        <Screen
          name="ProfileUser"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => <User weight="bold" size={24} color={color} />,
          }}
        />
      </Navigator>
    </>
  );
}
