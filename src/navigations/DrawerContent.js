import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Divider } from 'react-native-paper';
import { AuthContext } from '../components/context';
import { useTranslation } from 'react-i18next';

export default function DrawerContent(props) {
  const navigation = useNavigation();
  // const { removeUserID } = useContext(AuthContext);
  const { t } = useTranslation();
  const handleDrawerItemPress = (screenName, title) => {
    navigation.navigate(t(screenName));
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
          <DrawerItem
            labelStyle={{ color: '#fff',fontSize:16 }}
            icon={() => <Icon name="user" size={20} color="#fff" />} // Set the icon to an Ionicons icon
            label={t("Home")}
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => handleDrawerItemPress('Home')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label={t("Customer Search")}
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => handleDrawerItemPress('Customer Search')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label={t("Customer Management")}
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() =>handleDrawerItemPress('Customer Management')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label={t("Survey")}
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => handleDrawerItemPress('Survey')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7',fontSize:16 }}
            label={t("New Loan Application")}
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            icon={() => <Icon name="dollar-sign" size={20} color="#fff" />}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label={t("Individual Loan Application")}
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() =>handleDrawerItemPress('Individual_loan')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label={t("Individual Staff Loan Application")}
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() =>handleDrawerItemPress('Indi_Staff_loan')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label={t("Group Loan Application")}
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => handleDrawerItemPress('Group Loan')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label={t("Cover Loan Application")}
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => handleDrawerItemPress('Cover Loan')}
          />

          <DrawerItem
            labelStyle={{ color: '#c7c7c7', marginLeft: 50 }}
            label={t("Reloan Application")}
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => handleDrawerItemPress('ReLoan')}
          />


          <DrawerItem
            labelStyle={{ color: '#fff',fontSize:16 }}
            icon={() => <Icon name="refresh-cw" size={20} color="#fff" />} // Set the icon to an Ionicons icon
            label={t("Synchronization")}
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            onPress={() => handleDrawerItemPress('Synchronization')}
          />

          <DrawerItem
            labelStyle={{ color: '#fff',fontSize:16 }}
            icon={() => <Icon name="log-out" size={20} color="#fff" />} // Set the icon to an Ionicons icon
            label={t("Logout")}
            activeBackgroundColor="transparent" // Set the activeBackgroundColor to transparent
            // onPress={() => removeUserID()}
            onPress={() => props.navigation.navigate('Login')}
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
