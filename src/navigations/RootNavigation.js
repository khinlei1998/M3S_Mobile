import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NavigatorView from './NavigatorView';
import DrawerContent from './DrawerContent';
import LoginScreen from '../screens/Login/LoginScreen';
import Home from '../screens/Dashboard/Home';
import Customer_Management from '../screens/CustomerManagement/Customer_Management';
const Drawer = createDrawerNavigator();

export default function RootNavigation(props) {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerHideStatusBarOnOpen="true"
      drawerStyle={{
        backgroundColor: '#273050',
        activeTintColor: 'white',
        inactiveTintColor: 'white',
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#273050',
          activeTintColor: 'white',
          inactiveTintColor: 'white',
          width: 350,
        },
        headerTintColor: '#fff',
        headerShown: false,
        headerStyle: {
          backgroundColor: '#232D57',
        },
        headerTitleStyle: {
          color: '#fff',
          alignSelf: 'center',
        },
        headerTitleAlign: 'center',
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Customer Management" component={Customer_Management} />
    </Drawer.Navigator>
  );
}
