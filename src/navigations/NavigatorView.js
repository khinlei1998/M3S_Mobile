import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestScreen from '../screens/CustomerManagement/TestScreen';
import Home from '../screens/Dashboard/Home'
import Customer_Management from '../screens/CustomerManagement/Customer_Management';
import CustomerSearch from '../screens/Customer/CustomerSearch';

const StackNavigationData = [
    {
        name: 'Home',
        component: Home,
        // headerLeft: headerLeftComponent,
        headerTitleStyle: {
            color: '#FFF',
            fontSize: 18,
        }
    },
    {
        name: 'Survey',
        component: TestScreen,
        // headerLeft: headerLeftComponent,
        headerTitleStyle: {
            color: '#FFF',
            fontSize: 18,
        }
    },
    {
        name: 'Customer Management',
        component: Customer_Management,
        // headerLeft: headerLeftComponent,
        headerTitleStyle: {
            color: '#FFF',
            fontSize: 18,
        }
    },
    {
        name: 'Customer Search',
        component: CustomerSearch,
        // headerLeft: headerLeftComponent,
        headerTitleStyle: {
            color: '#FFF',
            fontSize: 18,
        }
    },
]
const Stack = createNativeStackNavigator();

export default function NavigatorView() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false, // Hide the header in stack navigator screens
        }}>
            {StackNavigationData.map((item, idx) => (
                <Stack.Screen
                    key={`stack_item-${idx + 1}`}
                    name={item.name}

                    component={item.component}
                    options={{
                        title: item.title,
                        headerLeft: item.headerLeft,
                        headerTintColor: '#5da7ec',
                        headerTitleStyle: item.headerTitleStyle,
                    }}
                />
            ))}
        </Stack.Navigator>
    )
}