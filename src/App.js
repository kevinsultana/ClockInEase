import {NavigationContainer} from '@react-navigation/native';

import Navigator from './routes';

export default function App() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
