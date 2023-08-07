import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Divider } from 'react-native-paper';
import { AuthContext } from '../components/context';

export default function DrawerContent(props) {
  const navigation = useNavigation();
  const { removeUserID } = useContext(AuthContext);

  const handleDrawerItemPress = (screenName, title) => {
    navigation.navigate(screenName);
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <Image
            source={require('../../assets/images/logo3.png')}
            style={{
              height: 100,
              resizeMode: 'contain',
              alignSelf: 'center',
              marginTop: 20,
            }}
          />
          {/* <DrawerItemList {...props} /> */}

          <DrawerItem
            labelStyle={{ color: '#fff' }}
            icon={() => <Icon name="user" size={20} color="#fff" />} // Set the icon to an Ionicons icon
            label="Home"
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => handleDrawerItemPress('Home')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label="Customer Search"
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => handleDrawerItemPress('Customer Search')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label="Customer Management"
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Customer Management')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label="Survey"
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => handleDrawerItemPress('Survey')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', }}
            label="New Loan Application"
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            icon={() => <Icon name="dollar-sign" size={20} color="#fff" />}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label="Individual Loan Application "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Individual_loan')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label="Individual Staff Loan Application "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Indi_Staff_loan')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label="Group Loan Application "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Group Loan')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label="Cover Loan Application "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Cover Loan')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label="Reloan Application "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('ReLoan')}
          />


          <DrawerItem
            labelStyle={{ color: '#fff' }}
            icon={() => <Icon name="refresh-cw" size={20} color="#fff" />} // Set the icon to an Ionicons icon
            label="Synchronization "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => props.navigation.navigate('Synchronization')}
          />

          <DrawerItem
            labelStyle={{ color: '#fff' }}
            icon={() => <Icon name="log-out" size={20} color="#fff" />} // Set the icon to an Ionicons icon
            label="Logout "
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => removeUserID()}
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
          style={{ width: 150, height: 50 }}
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
