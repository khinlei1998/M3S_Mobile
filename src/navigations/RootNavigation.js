import {View, Text, Image, SafeAreaView, ToastAndroid} from 'react-native';
import React, {useContext} from 'react';
import Home from '../screens/Dashboard/Home';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import {Divider} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../components/context';
import NewLoan from '../screens/NewLoan/NewLoan';
import CustomerSearch from '../screens/Customer/CustomerSearch';
import Customer_Management from '../screens/CustomerManagement/Customer_Management';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CustomDrawerContent(props) {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
          <Image
            source={require('../../assets/images/logo_shin_02.png')}
            style={{
              height: 100,
              resizeMode: 'contain',
              alignSelf: 'center',
              marginTop: 20,
            }}
          />
          {/* <DrawerItemList {...props} /> */}

          <DrawerItem
            labelStyle={{color: '#fff'}}
            icon={() => <Icon name="user" size={20} color="#fff" />} // Set the icon to an Ionicons icon
            label="Customer"
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />

          <DrawerItem
            labelStyle={{color: '#c7c7c7', marginLeft: 50}}
            label="Customer Search"
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Customer Serach')}
          />

          <DrawerItem
            labelStyle={{color: '#c7c7c7', marginLeft: 50}}
            label="Customer Management"
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Customer Management')}
          />

          <DrawerItem
            labelStyle={{color: '#c7c7c7', marginLeft: 50}}
            label="Survey"
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />
          <DrawerItem
            labelStyle={{color: '#fff'}}
            icon={() => <Icon name="dollar-sign" size={20} color="#fff" />} // Set the icon to an Ionicons icon
            label="New Loan Application"
            screenName="NewLoan"
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('NewLoan')}
          />

          <DrawerItem
            labelStyle={{color: '#c7c7c7', marginLeft: 50}}
            label="Agriculture Loan "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />

          <DrawerItem
            labelStyle={{color: '#c7c7c7', marginLeft: 50}}
            label="Reloan "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />

          <DrawerItem
            labelStyle={{color: '#c7c7c7', marginLeft: 50}}
            label="Individual Loan "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />

          <DrawerItem
            labelStyle={{color: '#c7c7c7', marginLeft: 50}}
            label="Group Loan "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />

          <DrawerItem
            labelStyle={{color: '#c7c7c7', marginLeft: 50}}
            label="Friend Loan "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />

          <DrawerItem
            labelStyle={{color: '#fff'}}
            icon={() => <Icon name="refresh-cw" size={20} color="#fff" />} // Set the icon to an Ionicons icon
            label="Synchronization "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />

          <DrawerItem
            labelStyle={{color: '#fff'}}
            icon={() => <Icon name="log-out" size={20} color="#fff" />} // Set the icon to an Ionicons icon
            label="Logout "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.removeUserID()}
          />
        </SafeAreaView>
      </DrawerContentScrollView>

      <Divider />

      <View
        style={{
          backgroundColor: '#0E162E',
          width: '80%',
          justifyContent: 'center',
          alignItems: 'center',
          height: '10%',
          marginTop: 20,
        }}>
        <Image
          source={require('../../assets/images/logo_bct_03.png')}
          style={{width: 150, height: 50}}
        />
      </View>

      <Text
        style={{
          color: '#c7c7c7',
          textAlign: 'center',
          marginTop: 20,
          marginBottom: 10,
        }}>
        (C)2020, IMB System all Right Reserved
      </Text>
    </View>
  );
}

export default function RootNavigation(props) {
  const {removeUserID} = useContext(AuthContext);

  const showToast = () => {
    ToastAndroid.show('Hello, World!', ToastAndroid.SHORT);
  };
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={showToast}>
            <Icon
              name="home"
              size={20}
              color="#fff"
              style={{marginRight: 20}}
            />
          </TouchableOpacity>
        ),
        drawerStyle: {
          backgroundColor: '#273050',
          activeTintColor: 'white',
          inactiveTintColor: 'white',
        },
        headerTintColor: '#fff',
        headerShown: true,
        headerStyle: {
          backgroundColor: '#232D57',
        },
        headerTitleStyle: {
          color: '#fff',
          alignSelf: 'center',
        },
        headerTitleAlign: 'center',
      }}
      // drawerContent={CustomDrawerContent}
      drawerContent={props => (
        <CustomDrawerContent removeUserID={removeUserID} {...props} />
      )}>
      <Drawer.Screen name="Home" component={Home} />

      <Drawer.Screen name="NewLoan" component={NewLoan} />

      <Drawer.Screen name="Customer Serach" component={CustomerSearch} />

      <Drawer.Screen name="Customer Management" component={Customer_Management} />

    </Drawer.Navigator>
  );
}
