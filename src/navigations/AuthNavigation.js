import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import SettingScreen from '../screens/Setting/SettingScreen';
import TestScreen from '../screens/CustomerManagement/TestScreen';
import Customer_Management from '../screens/CustomerManagement/Customer_Management';
export default function AuthNavigation(props) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#01B0F1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      }}>
      <Stack.Screen
        name="Customer_Management"
        component={Customer_Management}
        options={{headerShown: false}}
      />

      {/* <Stack.Screen
        name="Test"
        component={TestScreen}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
