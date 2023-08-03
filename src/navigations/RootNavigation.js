import { View, Text, Image, SafeAreaView, ToastAndroid } from 'react-native';
import React, { useContext } from 'react';
import Home from '../screens/Dashboard/Home';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import { Divider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../components/context';
// import NewLoan from '../screens/NewLoan/NewLoan';
import CustomerSearch from '../screens/Customer/CustomerSearch';
import Customer_Management from '../screens/CustomerManagement/Customer_Management';
import Survey from '../screens/Survey/Survey';
import NavigatorView from './NavigatorView';
import DrawerContent from './DrawerContent';
const Drawer = createDrawerNavigator();

export default function RootNavigation(props) {
  const { removeUserID } = useContext(AuthContext);

  return (


    <Drawer.Navigator

      drawerPosition="right"
      drawerHideStatusBarOnOpen='true'
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
      drawerContent={(props) => <DrawerContent {...props} />}>

      <Drawer.Screen name="Homes" component={NavigatorView} />
    </Drawer.Navigator>
  );
}
