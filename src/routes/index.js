import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Home from '../screens/Home';
import Register from '../screens/Register';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: '#D9D9D9',
      }}>
      <Stack.Screen name="Splash Screen" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
