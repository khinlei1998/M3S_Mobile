import { View, Text, Image, SafeAreaView } from 'react-native';
import React from 'react';
import Home from '../screens/Dashboard/Home';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import { Divider } from 'react-native-paper';
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <Image source={require('../../assets/images/logo_shin_02.png')} style={{ height: 100, resizeMode: 'contain', alignSelf: 'center', marginTop: 20 }} />
          {/* <DrawerItemList {...props} activeBackgroundColor="white"/> */}

          <DrawerItem
            labelStyle={{ color: '#fff' }}
            icon={() => <Icon name="user" size={20} color="#fff" />} // Set the icon to an Ionicons icon
            label="Customer"
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />


          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label="Customer Search"
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label="Customer Management"
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label="Survey"
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />
          <DrawerItem
            labelStyle={{ color: '#fff', }}
            icon={() => <Icon name="dollar-sign" size={20} color="#fff" />} // Set the icon to an Ionicons icon
            label="New Loan Application"
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label="Agriculture Loan "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label="Reloan "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label="Individual Loan "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label="Group Loan "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label="Friend Loan "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />

          <DrawerItem
            labelStyle={{ color: '#fff' }}
            icon={() => <Icon name="refresh-cw" size={20} color="#fff" />} // Set the icon to an Ionicons icon
            label="Synchronization "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />

          <DrawerItem
            labelStyle={{ color: '#fff' }}
            icon={() => <Icon name="log-out" size={20} color="#fff" />} // Set the icon to an Ionicons icon
            label="Logout "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Home')}
          />
        </SafeAreaView>

      </DrawerContentScrollView>

      <Divider />

      <View
        style={{
          backgroundColor: "#0E162E", width: '80%',
          justifyContent: 'center', alignItems: 'center', height: '10%', marginTop: 20
        }}>
        <Image source={require('../../assets/images/logo_bct_03.png')} style={{ width: 150, height: 50 }} />
      </View>

      <Text style={{ color: '#c7c7c7', textAlign: 'center', marginTop: 20, marginBottom: 10 }}>(C)2020, IMB System all Right Reserved</Text>


    </View>
  );
}

export default function RootNavigation() {
  return (

    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#273050',
          activeTintColor: 'white',
          inactiveTintColor: 'white'
        },
      }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen name="Home" component={Home}

        options={{ activeTintColor: 'white', drawerIcon: () => <Icon name="user" size={23} color={'white'} /> }} />
    </Drawer.Navigator>
  );
}
