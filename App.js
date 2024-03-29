import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/navigations/RootNavigation';
import AuthNavigation from './src/navigations/AuthNavigation';
import {Provider} from 'react-redux';
import {AuthContext} from './src/components/context';
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/screens/SplashScreen';
import store from './src/redux/store';
import {StyleSheet, PermissionsAndroid, Text} from 'react-native';
export default function App() {
  const [show_splash, showSplash] = useState(true);
  const [userID, setUserID] = React.useState(null);
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
      setUserID(null);
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
        await AsyncStorage.setItem('ip', 'bbda-103-231-92-41.ngrok-free.app');
        // await AsyncStorage.setItem('ip', '192.168.177.107');
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

  useEffect(() => {
    async function loadStoredUserID() {
      try {
        const storedUserID = await AsyncStorage.getItem('user_id');
        if (storedUserID) {
          setUserID(storedUserID);
        }
      } catch (e) {
        console.log('Error loading user ID:', e);
      }
    }

    loadStoredUserID();
  }, []);


  return (
    <Provider store={store}>
      <NavigationContainer>
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
