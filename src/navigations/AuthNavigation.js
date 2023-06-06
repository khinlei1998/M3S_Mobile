import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import SettingScreen from '../screens/Setting/SettingScreen';
import TestScreen from '../screens/CustomerManagement/TestScreen';
import Customer_Management from '../screens/CustomerManagement/Customer_Management';
import Edit_Emp_Info from '../screens/EditCustManagement/Edit_Emp_Info';
import CustomerSearch from '../screens/Customer/CustomerSearch';
import Synchronization_Screen from '../screens/Synchronization/Synchronization_Screen';
import Individual_Loan from '../screens/Loan/Individual_Loan';
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
      {/* <Stack.Screen
        name="Customer Management"
        component={Customer_Management}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="Customer Search"
        component={CustomerSearch}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Edit_Emp_Info"
        component={Edit_Emp_Info}
        options={{headerShown: false}}
      /> */}

      <Stack.Screen
        name="Individual Loan"
        component={Individual_Loan}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Synchronization"
        component={Synchronization_Screen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      /> */}
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
