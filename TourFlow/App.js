import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Tabs from './src/navigation/Tabs';
import LocationSingle from './src/screens/LocationManagement/LocationSingleView';
import GuideInformation from './src/screens/GuideManagement/GuideInformation';

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Splash' component={Splash} options={{ headerShown : false}} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown : false}} />
        <Stack.Screen name='Initial' component={Tabs} options={{ headerShown : false}} />

        <Stack.Screen name='LocationSingle' component={LocationSingle} options={{ headerShown : false}} />
        <Stack.Screen name='GuideSingle' component={GuideInformation} options={{ headerShown : false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;