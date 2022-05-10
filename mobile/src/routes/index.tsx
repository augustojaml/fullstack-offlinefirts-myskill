import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import { AppTabsRoutes } from './AppTabsRoutes';
import { UsersStacksRoutes } from './UsersStacksRoutes';
import { SkillProvider } from '@hooks/useSkill';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SignIn: undefined;
      SignUp: undefined;
      Skills: undefined;
      Profile: undefined;
    }
  }
}

export function Routes() {
  const { user } = useAuth();
  return (
    <>
      <NavigationContainer>
        {user ? (
          <SkillProvider>
            <AppTabsRoutes />
          </SkillProvider>
        ) : (
          <UsersStacksRoutes />
        )}
      </NavigationContainer>
    </>
  );
}
