import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '@screens/User/SignIn';
import { SignUp } from '@screens/User/SignUp';

const { Navigator, Screen } = createNativeStackNavigator();

export function UsersStacksRoutes() {
  return (
    <>
      <Navigator initialRouteName={'SignIn'} screenOptions={{ headerShown: false }}>
        <Screen name="SignIn" component={SignIn} />
        <Screen name="SignUp" component={SignUp} />
      </Navigator>
    </>
  );
}
