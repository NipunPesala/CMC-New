import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/Login/Login';
import NavigationScreen from '../Screens/BottomNavigation/NavigationScreen';
import SplashScreen from '../Screens/Splash/SplashScreen';
import SyncScreen from '../Screens/Sync/SyncScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
    return (

        <NavigationContainer independent={true}>
            {/* <Stack.Navigator initialRouteName="Login"> */}
            <Stack.Navigator initialRouteName="SplashScreen">

                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="BottomNavi" component={NavigationScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SyncScreen" component={SyncScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default RootNavigator;