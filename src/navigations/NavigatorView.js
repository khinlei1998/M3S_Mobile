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
import Individual_Loan from '../screens/Loan/Individual_Loan';
import Edit_Individual_Loan from '../screens/Edit_Loan/Edit_Individual_Loan';
import Individual_Staff_loan_Info from '../screens/Staff_Loan/Individual_Staff_loan_Info';
import Exceptional_Approvel_Form from '../screens/Exceptional_Approval_Request/Exceptional_Approvel_Form';
import Show_Borrower_Map from '../screens/Loan/Show_Borrower_Map';
import Edit_Show_Borrower_Map from '../screens/Edit_Loan/Edit_Show_Borrower_Map';
import Edit_Individual_Staff_loan_Info from '../screens/Edit_Staff_Loan/Edit_Individual_Staff_loan_Info';
import Edit_Exceptional_Approvel_Form from '../screens/Edit_Exceptional_Approval_Request/Edit_Exceptional_Approvel_Form';
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
    name: 'Individual_loan',
    component: Individual_Loan,
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
  {
    name: 'Edit_Individual_Loan',
    component: Edit_Individual_Loan,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Indi_Staff_loan',
    component: Individual_Staff_loan_Info,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Exceptional_Approvel_Form',
    component: Exceptional_Approvel_Form,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Borrower Map',
    component: Show_Borrower_Map,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Edit Borrower Map',
    component: Edit_Show_Borrower_Map,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Edit_Individual_Staff_loan_Info',
    component: Edit_Individual_Staff_loan_Info,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Edit_Exceptional_Approvel_Form',
    component: Edit_Exceptional_Approvel_Form,
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
    <Stack.Navigator>
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
