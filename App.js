import React, {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/navigations/RootNavigation';
import AuthNavigation from './src/navigations/AuthNavigation';
// import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import {AuthContext} from './src/components/context';
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/screens/SplashScreen';
import store from './src/redux/store';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import LoginScreen from './src/screens/Login/LoginScreen';
import SettingScreen from './src/screens/Setting/SettingScreen';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  PermissionsAndroid,
} from 'react-native';
import RNFS from 'react-native-fs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function App() {
  const [show_splash, showSplash] = useState(true);
  const [userID, setUserID] = React.useState(null);
  const [paths, setPaths] = useState([]);
  const Stack = createNativeStackNavigator();
  const sketchRef = useRef();

  const saveUserID = async user_id => {
    try {
      await AsyncStorage.setItem('user_id', user_id);
      setUserID(await AsyncStorage.getItem('user_id'));
    } catch (e) {
      console.log('error ::', e);
    }
  };
  const requestWriteStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Write Storage Permission',
          message:
            'App needs access to your device storage to save the signature image.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await AsyncStorage.setItem(
          'writeStoragePermission',
          PermissionsAndroid.RESULTS.GRANTED,
        );
        return true; // Permission granted
      } else {
        await AsyncStorage.setItem(
          'writeStoragePermission',
          PermissionsAndroid.RESULTS.DENIED,
        );
        return false; // Permission denied
      }
    } catch (error) {
      console.log('Error requesting write storage permission:', error);
    }
  };

  const removeUserID = async () => {
    try {
      await AsyncStorage.removeItem('user_id');
      setUserID(await AsyncStorage.getItem('user_id'));
    } catch (e) {
      console.log('error ::', e);
    }
  };

  global.db = SQLite.openDatabase(
    {
      name: 'M3SDB.db',
      createFromLocation: '~M3SDB.db',
      location: 'Library',
      readOnly: false,
    },
    success => {},
    error => {
      console.log('Error', error);
    },
  );

  useEffect(() => {
    const saveIp = async user_id => {
      try {
        await AsyncStorage.setItem('ip', 'd79b-103-116-58-130.ngrok-free.app');
        await AsyncStorage.setItem('port', '80');
      } catch (e) {
        console.log('error ::', e);
      }
    };
    const timer = setTimeout(() => {
      showSplash(false);
    }, 3000);

    requestWriteStoragePermission();
    saveIp();

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      {/* <NavigationContainer>
        {show_splash ? (
          <SplashScreen />
        ) : userID == null ? (
          <AuthContext.Provider value={{saveUserID, userID}}>
            <AuthNavigation />
          </AuthContext.Provider>
        ) : (
          <AuthContext.Provider value={{removeUserID}}>
            <RootNavigation />
          </AuthContext.Provider>
        )}
      </NavigationContainer> */}

      <NavigationContainer>
        {show_splash ? (
          <SplashScreen />
        ) : (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Setting"
              component={SettingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={RootNavigation}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}
const styles = StyleSheet.create({
  textInput: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  textInputContainer: {
    position: 'absolute',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39579A',
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: '#39579A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
