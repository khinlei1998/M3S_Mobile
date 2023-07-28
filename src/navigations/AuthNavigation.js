import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import SettingScreen from '../screens/Setting/SettingScreen';
import TestScreen from '../screens/CustomerManagement/TestScreen';
import Customer_Management from '../screens/CustomerManagement/Customer_Management';
import Edit_Emp_Info from '../screens/EditCustManagement/Edit_Emp_Info';
import CustomerSearch from '../screens/Customer/CustomerSearch';
import Synchronization_Screen from '../screens/Synchronization/Synchronization_Screen';
import Individual_Loan from '../screens/Loan/Individual_Loan';
import Home from '../screens/Dashboard/Home';
import Edit_Individual_Loan from '../screens/Edit_Loan/Edit_Individual_Loan';
import Individual_Staff_loan_Info from '../screens/Staff_Loan/Individual_Staff_loan_Info';
import Edit_Individual_Staff_loan_Info from '../screens/Edit_Staff_Loan/Edit_Individual_Staff_loan_Info';
import Show_Borrower_Map from '../screens/Loan/Show_Borrower_Map';
import Exceptional_Approvel_Form from '../screens/Exceptional_Approval_Request/Exceptional_Approvel_Form';
import Edit_Show_Borrower_Map from '../screens/Edit_Loan/Edit_Show_Borrower_Map';
import Edit_Exceptional_Approvel_Form from '../screens/Edit_Exceptional_Approval_Request/Edit_Exceptional_Approvel_Form';
import Evidence from '../screens/Evidence/Evidence';
import Guarantor_Form from '../screens/GuarantorForm/Guarantor_Form';
import Edit_Guarantor_Form from '../screens/Edit_GuarantorForm/Edit_Guarantor_Form';
import Relation_Form from '../screens/Relation/Relation_Form';
import Area_Evaluation_Form from '../screens/Area Evaluation/Area_Evaluation_Form';
import EditRelation_Form from '../screens/Edit_Relation/EditRelation_Form';
import Edit_Area_Evaluation_Form from '../screens/Edit_Area Evaluation/Edit_Area_Evaluation_Form';
import Group_Loan_Form from '../screens/Group_Loan/Group_Loan_Form';
import Edit_Group_Loan_Form from '../screens/Edit_Group_Loan/Edit_Group_Loan_Form';
import Cover_Loan_Form from '../screens/Cover Loan/Cover_Loan_Form';
import Edit_Cover_Loan_Form from '../screens/Edit_Cover Loan/Edit_Cover_Loan_Form';
import Reloan_Form from '../screens/Relaon/Reloan_Form';
import Survey from '../screens/Survey/Survey';
import Edit_Reloan_Form from '../screens/Edit_Relaon/Edit_Reloan_Form';
// import Reloan_Form from '../screens/Relaon/Reloan_Form';
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
        name="Customer Search"
        component={CustomerSearch}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Customer Management"
        component={Customer_Management}
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name="Synchronization"
        component={Synchronization_Screen}
        options={{ headerShown: false }}
      />



      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Individual_loan"
        component={Individual_Loan}
        options={{ headerShown: false }}
      />




      <Stack.Screen
        name="ReLoan"
        component={Reloan_Form}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit_Emp_Info"
        component={Edit_Emp_Info}
        options={{ headerShown: false }}
      />



      {/* <Stack.Screen
        name="Group Loan"
        component={Group_Loan_Form}
        options={{headerShown: false}}
      />
    

      {/* <Stack.Screen
        name="Cover Loan"
        component={Cover_Loan_Form}
        options={{headerShown: false}}
      /> */}

      {/* <Stack.Screen
        name="Indi_Staff_loan"
        component={Individual_Staff_loan_Info}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit_Cover_Loan"
        component={Edit_Cover_Loan_Form}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Survey"
        component={Survey}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Edit_Reloan"
        component={Edit_Reloan_Form}
        options={{ headerShown: false }}
      /> */}

      {/* <Stack.Screen
        name="Survey"
        component={Survey}
        options={{headerShown: false}}
      />

      {/* <Stack.Screen
        name="Indi_Staff_loan"
        component={Individual_Staff_loan_Info}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Edit_Cover_Loan"
        component={Edit_Cover_Loan_Form}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="Edit_Reloan"
        component={Edit_Reloan_Form}
        options={{headerShown: false}}
      /> */}

      {/* <Stack.Screen
        name="Edit Group Loan"
        component={Edit_Group_Loan_Form}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Borrower Map"
        component={Show_Borrower_Map}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Area Evaluation"
        component={Area_Evaluation_Form}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Edit Area Evaluation"
        component={Edit_Area_Evaluation_Form}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Evidence"
        component={Evidence}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Edit Borrower Map"
        component={Edit_Show_Borrower_Map}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Exceptional_Approvel_Form"
        component={Exceptional_Approvel_Form}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Relation Form"
        component={Relation_Form}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Relation"
        component={EditRelation_Form}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Guarantor"
        component={Guarantor_Form}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Edit Guarantor"
        component={Edit_Guarantor_Form}
        options={{ headerShown: false }}
      />

      

      <Stack.Screen
        name="Edit_Individual_Loan"
        component={Edit_Individual_Loan}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit_Individual_Staff_loan_Info"
        component={Edit_Individual_Staff_loan_Info}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit_Exceptional_Approvel_Form"
        component={Edit_Exceptional_Approvel_Form}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
