import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SQLite from 'react-native-sqlite-storage';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './src/navigations/AuthNavigation';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import SplashScreen from './src/screens/SplashScreen';
import RootNavigation from './src/navigations/RootNavigation';
const App = () => {
  const [show_splash, showSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      showSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        {show_splash ? <SplashScreen /> : <AuthNavigation />}
        {/* {show_splash ? <SplashScreen /> : <RootNavigation />} */}
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
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
});

export default App;
