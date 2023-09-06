import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Dashboard/Home';
import Customer_Management from '../screens/CustomerManagement/Customer_Management';
import CustomerSearch from '../screens/Customer/CustomerSearch';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
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
import Area_Evaluation_Form from '../screens/Area Evaluation/Area_Evaluation_Form';
import Edit_Area_Evaluation_Form from '../screens/Edit_Area Evaluation/Edit_Area_Evaluation_Form';
import EditRelation_Form from '../screens/Edit_Relation/EditRelation_Form';
import Relation_Form from '../screens/Relation/Relation_Form';
import Edit_Guarantor_Form from '../screens/Edit_GuarantorForm/Edit_Guarantor_Form';
import Guarantor_Form from '../screens/GuarantorForm/Guarantor_Form';
import Evidence from '../screens/Evidence/Evidence';
import Group_Loan_Form from '../screens/Group_Loan/Group_Loan_Form';
import Edit_Group_Loan_Form from '../screens/Edit_Group_Loan/Edit_Group_Loan_Form';
import Edit_Cover_Loan_Form from '../screens/Edit_Cover Loan/Edit_Cover_Loan_Form';
import Cover_Loan_Form from '../screens/Cover Loan/Cover_Loan_Form';
import Reloan_Form from '../screens/Relaon/Reloan_Form';
import Edit_Reloan_Form from '../screens/Edit_Relaon/Edit_Reloan_Form';
import Survey from '../screens/Survey/Survey';
import Passport from '../screens/Passport/Passport';
import { useTranslation } from 'react-i18next';
import LoginScreen from '../screens/Login/LoginScreen';
const Stack = createNativeStackNavigator();

export default function NavigatorView(props) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  // const headerLeftComponentMenu = () => {
  //   return (
  //     <Icon
  //       name="align-justify"
  //       size={20}
  //       color="#FFF"
  //       onPress={() => navigation.openDrawer()}
  //     />
  //     // <></>
  //   );
  // };
  const StackNavigationData = [

    {
      name: t('Home'),
      component: Home,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Login'),
      component: LoginScreen,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Synchronization'),
      component: Synchronization_Screen,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('ReLoan'),
      component: Reloan_Form,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Passport'),
      component: Passport,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Edit_Exceptional_Approvel_Form'),
      title: 'Exceptional Approval ',
      component: Edit_Exceptional_Approvel_Form,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Survey'),
      component: Survey,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Edit_Reloan'),
      title: 'Reloan',
      component: Edit_Reloan_Form,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Cover Loan'),
      component: Cover_Loan_Form,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Edit Group Loan'),
      title: 'Group Loan',
      component: Edit_Group_Loan_Form,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Edit_Cover_Loan'),
      title: 'Cover Loan',
      component: Edit_Cover_Loan_Form,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Group Loan'),
      component: Group_Loan_Form,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },

    {
      name: t('Customer Management'),
      component: Customer_Management,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Customer Search'),
      component: CustomerSearch,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Edit_Emp_Info'),
      component: Edit_Emp_Info,
      title: 'Customer Management',
      // headerLeft: headerLeftComponent,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Individual_loan'),
      title: 'Individual Loan Application',
      component: Individual_Loan,
      // headerLeft: headerLeftComponent,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },

    {
      name: t('Edit_Individual_Loan'),
      component: Edit_Individual_Loan,
      title: 'Individual Loan Application',
      // headerLeft: headerLeftComponent,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Indi_Staff_loan'),
      component: Individual_Staff_loan_Info,
      title: 'Individual Staff Loan Application',
      // headerLeft: headerLeftComponent,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Exceptional_Approvel_Form'),
      component: Exceptional_Approvel_Form,
      title: 'Exceptional Approval',
      // headerLeft: headerLeftComponent,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Borrower Map'),
      component: Show_Borrower_Map,
      // headerLeft: headerLeftComponent,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Edit Borrower Map'),
      title: 'Borrower Map',
      component: Edit_Show_Borrower_Map,
      // headerLeft: headerLeftComponent,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Edit_Individual_Staff_loan_Info'),
      component: Edit_Individual_Staff_loan_Info,
      title: 'Individual Staff Loan Application',
      // headerLeft: headerLeftComponent,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Edit Guarantor'),
      component: Edit_Guarantor_Form,
      title: 'Guarantor',
      // headerLeft: headerLeftComponent,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Area Evaluation'),
      component: Area_Evaluation_Form,
      // headerLeft: headerLeftComponent,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Edit Area Evaluation'),
      title: 'Area Evaluation',
      component: Edit_Area_Evaluation_Form,
      // headerLeft: headerLeftComponent,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Edit Relation'),
      title: 'Relation',
      component: EditRelation_Form,
      // headerLeft: headerLeftComponent,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Guarantor'),
      component: Guarantor_Form,
      // headerLeft: headerLeftComponent,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    {
      name: t('Relation Form'),
      component: Relation_Form,
      // headerLeft: headerLeftComponent,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },

    {
      name: t('Evidence'),
      component: Evidence,
      // headerLeft: headerLeftComponent,
      headerTitleStyle: {
        color: '#FFF',
        fontSize: 18,
      },
    },
    //login
  ];
  const renderRightIcon = () => {
    console.log('prfops', props.navigation.navigate);
    // Customize this function to render the right icon as you wish
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate(t('Home'))}>
        <Icon name="home" size={30} color="#fff" />
      </TouchableOpacity>
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
            // drawerLabel: () => item.name == 'Login' && null,
            // headerShown: item.name == 'Login' ? false : true,
            headerTitleAlign: 'center',
            title: item.title,
            headerTitle: item.title, // Use headerTitle instead of title

            headerLeft: item.headerLeft,
            headerRight: renderRightIcon, // Add the custom icon to the right

            headerTintColor: '#FFF',
            headerTitleStyle: item.headerTitleStyle,
            headerStyle: { backgroundColor: '#273050' },
          }}
        />
      ))}
    </Stack.Navigator>
  );
}
