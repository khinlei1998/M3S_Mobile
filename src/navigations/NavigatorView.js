import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TestScreen from '../screens/CustomerManagement/TestScreen';
import Home from '../screens/Dashboard/Home';
import Customer_Management from '../screens/CustomerManagement/Customer_Management';
import CustomerSearch from '../screens/Customer/CustomerSearch';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import Edit_Emp_Info from '../screens/EditCustManagement/Edit_Emp_Info';
import Synchronization_Screen from '../screens/Synchronization/Synchronization_Screen';
const StackNavigationData = [
  {
    name: 'Home',
    component: Home,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Survey',
    component: TestScreen,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Customer Management',
    component: Customer_Management,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Customer Search',
    component: CustomerSearch,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Edit_Emp_Info',
    component: Edit_Emp_Info,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Synchronization',
    component: Synchronization_Screen,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
];
const Stack = createNativeStackNavigator();

export default function NavigatorView() {
  const navigation = useNavigation();

  const headerLeftComponentMenu = () => {
    return (
      <Icon
        name="align-justify"
        size={20}
        color="#FFF"
        onPress={() => navigation.openDrawer()}
      />
      // <></>
    );
  };
  return (
    <Stack.Navigator
    //  screenOptions={{
    //     headerShown: false, // Hide the header in stack navigator screens
    // }}
    >
      {StackNavigationData.map((item, idx) => (
        <Stack.Screen
          key={`stack_item-${idx + 1}`}
          name={item.name}
          component={item.component}
          options={{
            headerTitleAlign: 'center',
            title: item.title,
            headerLeft: item.headerLeft || headerLeftComponentMenu,
            headerTintColor: '#FFF',
            headerTitleStyle: item.headerTitleStyle,
            headerStyle: {backgroundColor: '#273050'},
          }}
        />
      ))}
    </Stack.Navigator>
  );
}
