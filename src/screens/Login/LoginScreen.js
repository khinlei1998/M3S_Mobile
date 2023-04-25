import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import TextInputFile from '../../components/TextInputFile';
import ButtonFile from '../../components/ButtonFile';
import CheckBoxFile from '../../components/CheckBoxFile';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import DropDownPicker from '../../components/DropDownPicker';
import SettingScreen from '../Setting/SettingScreen';
import { languages } from '../../common';
import { Button } from 'react-native-paper';
import { useNetInfo, NetInfo } from '@react-native-community/netinfo'
import { getEemployee_info } from '../../query/Employee_query';
import { selectUser } from '../../query/Employee_query';
import { AuthContext } from '../../components/context';
function LoginScreen(props) {
  const netInfo = useNetInfo()
  const { navigation, handleSubmit } = props;
  const { saveUserID, } = useContext(AuthContext)

  const [modalVisible, setModalVisible] = React.useState(false);
  const hideModal = () => setModalVisible(false);


  const onSubmit = async (values) => {
    try {
      const user = await selectUser(values.email, values.password);
      console.log('user', user.user_id);
      saveUserID(user.user_id)
      // alert(JSON.stringify(values))
      alert('Login Success')

      // Login successful
    } catch (error) {
      // Login failed
      console.log('Error:', error);
    }

    // navigation.navigate('Home')
  }

  const doSomethingElse = () => {
    console.log(
      'reach'
    );
  }

  const btnSync = () => {
    if (!netInfo.isConnected) {
      alert('Internet Connection is need')
    } else {

      alert('Online')
      getEemployee_info()
        .then((result) => {
          console.log('doSomething completed successfully with result:', result);
          // Call the second function
          doSomethingElse();
        })
        .catch((error) => {
          // This code will be executed if doSomething throws an error
          console.log('doSomething failed with error:', error);
        });
    }
  }

  return (
    <>
      {modalVisible ? (
        <SettingScreen visible={modalVisible} hideModal={hideModal} />
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ backgroundColor: '#232D57', flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 20,
                marginRight: 10,
              }}>
              <TouchableOpacity onPress={() => btnSync()}>
                <Icon
                  name="download"
                  size={25}
                  color="#fff"
                  style={{ marginLeft: 20 }}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Icon
                  name="settings"
                  size={25}
                  color="#fff"
                  style={{ marginLeft: 20 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Image
                source={require('../../../assets/images/logo_shin_02.png')}
                style={{ width: 90, height: 90 }}
              />
              <View
                style={{ flexDirection: 'row', marginTop: 30, marginBottom: 20 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>
                  BC NeO{' '}
                </Text>
                <Text style={{ color: '#fff', fontSize: 20 }}>Sales System</Text>
              </View>

              <Image
                source={require('../../../assets/images/default-user.png')}
                style={{ width: 50, height: 50, marginTop: 20 }}
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <View
                style={{
                  borderWidth: 3, // Width of the border
                  borderColor: '#4C577F', // Color of the border
                  borderRadius: 10,
                  width: 400,
                  height: 400,
                  padding: 20,
                }}>
                <Field
                  name={'email'}
                  title={'ID or Email'}
                  component={TextInputFile}
                />

                <Field
                  name={'password'}
                  title={'Password'}
                  component={TextInputFile}
                  password

                />

                <Field component={DropDownPicker} name={'lng'} data={languages} />

                <View style={{ marginTop: 20 }}>
                  <Button mode="contained" onPress={handleSubmit(onSubmit)} buttonColor={'#6870C3'} style={{ borderRadius: 0 }}>
                    Login
                  </Button>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  <CheckBoxFile />
                  <Text style={{ color: '#fff' }}>Save login Information</Text>
                </View>
              </View>
            </View>

            <Text style={{ color: '#fff', textAlign: 'center', marginTop: 25 }}>
              v 0.1.19
            </Text>

            <Image
              source={require('../../../assets/images/logo_bct_02.png')}
              style={{
                width: 50,
                height: 90,
                alignSelf: 'center',
                marginTop: 40,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      )}

    </>
  );
}


export default reduxForm({ form: 'LoginForm' })(LoginScreen);

