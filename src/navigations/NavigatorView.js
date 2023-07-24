import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestScreen from '../screens/CustomerManagement/TestScreen';
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
    name: 'Synchronization',
    component: Synchronization_Screen,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'ReLoan',
    component: Reloan_Form,
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
  {
    name: 'Survey',
    component: Survey,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Edit_Reloan',
    component: Edit_Reloan_Form,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Cover Loan',
    component: Cover_Loan_Form,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Edit Group Loan',
    component: Edit_Group_Loan_Form,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Edit_Cover_Loan',
    component: Edit_Cover_Loan_Form,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Group Loan',
    component: Group_Loan_Form,
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
    name: 'Edit Guarantor',
    component: Edit_Guarantor_Form,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Area Evaluation',
    component: Area_Evaluation_Form,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Edit Area Evaluation',
    component: Edit_Area_Evaluation_Form,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Edit Relation',
    component: EditRelation_Form,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Guarantor',
    component: Guarantor_Form,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },
  {
    name: 'Relation Form',
    component: Relation_Form,
    // headerLeft: headerLeftComponent,
    headerTitleStyle: {
      color: '#FFF',
      fontSize: 18,
    },
  },


  {
    name: 'Evidence',
    component: Evidence,
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
            headerStyle: { backgroundColor: '#273050' },
          }}
        />
      ))}
    </Stack.Navigator>
  );
}
