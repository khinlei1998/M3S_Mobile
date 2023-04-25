import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigations/RootNavigation';
import AuthNavigation from './src/navigations/AuthNavigation';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import { AuthContext } from './src/components/context';
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/screens/SplashScreen';

export default function App() {
  const [show_splash, showSplash] = useState(true);
  const [userID, setUserID] = React.useState(null);

  const saveUserID = async (user_id) => {
    try {
      await AsyncStorage.setItem('user_id', user_id);
      setUserID(await AsyncStorage.getItem('user_id'))

    } catch (e) {
      console.log('error ::', e)
    }
  }

  global.db = SQLite.openDatabase(
    {
      name: 'M3SDB.db',
      createFromLocation: '~M3SDB.db',
      location: 'Library',
    },
    success => {
      console.log('DB Connection Created');
    },
    error => {
      console.log('Error', error);
    },
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      showSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <Provider store={store}>
      <NavigationContainer>
        {show_splash ? <SplashScreen />
          :
          userID == null ? (
            <AuthContext.Provider value={{ saveUserID, }}>
              <AuthNavigation />

            </AuthContext.Provider>
          ) : (
            <AuthContext.Provider value={userID} >
              <RootNavigation />
            </AuthContext.Provider>
          )}
      </NavigationContainer>
    </Provider>
  );
}
