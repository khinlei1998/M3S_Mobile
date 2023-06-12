import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import TextInputFile from '../../components/TextInputFile';
import CheckBoxFile from '../../components/CheckBoxFile';
import { Field, reduxForm, setInitialValues, initialize } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import DropDownPicker from '../../components/DropDownPicker';
import SettingScreen from '../Setting/SettingScreen';
import { languages } from '../../common';
import { Button } from 'react-native-paper';
import { useNetInfo, NetInfo } from '@react-native-community/netinfo';
import { getEemployee_info } from '../../query/Employee_query';
import { selectUser } from '../../query/Employee_query';
import { AuthContext } from '../../components/context';
import validate from './Validate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reset, change } from 'redux-form';
import { sha256 } from 'react-native-sha256';
import { encode } from 'base-64';
import Spinner from 'react-native-loading-spinner-overlay';
import { getCustomer_info } from '../../query/Customer_query';
import { getNRC_info } from '../../query/NRCinfo_query';
import { getIndividual_loan } from '../../query/AllLoan_query';
import { getSurvey_Item } from '../../query/SurveyItem_query';
import { getCodeInfo } from '../../query/CodeInfo_quey';
import { getLoanMax } from '../../query/LoanMax_query';
function LoginScreen(props) {
  const dispatch = useDispatch();
  const [id, setID] = useState('');
  const [selectedItemValue, setSelectedItemValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const netInfo = useNetInfo();
  const { navigation, handleSubmit } = props;
  const { saveUserID, userID } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = React.useState(false);
  const hideModal = () => setModalVisible(false);

  useEffect(() => {
    // async function fetchData() {
    //   const userid = await AsyncStorage.getItem('user_id');
    //   const data = await AsyncStorage.getItem('login_info');
    //   if (data == 'true') {
    //     // dispatch(initialize('LoginForm', { user_id: 'MMUUu', }));
    //     // dispatch(change('LoginForm', 'user_id', 'myDefaultUsername'));
    //   } else {
    //     // dispatch(initialize('LoginForm', { user_id: '', }));
    //     // dispatch(change('LoginForm', 'user_id', ''));
    //   }
    // }
    // fetchData();
  }, []);

  const saveLoginInfo = async login_info => {
    try {
      await AsyncStorage.setItem('login_info', login_info);
    } catch (e) {
      console.log('error ::', e);
    }
  };

  const onSubmit = async (values, dispatch) => {
    try {
      let hashedPassword = await sha256(values.password);
      let changed_cap_password = hashedPassword.toUpperCase();
      let encodedString = encode(changed_cap_password);
      const user = await selectUser(values.user_id, encodedString);
      await saveUserID(user.user_id);
      // values.save_login_info &&
      //   saveLoginInfo(JSON.stringify(values.save_login_info));
      // // reset('LoginForm');
      const user_id = await AsyncStorage.getItem('user_id');
      ToastAndroid.show(`Welocome,[${user_id}]!`, ToastAndroid.SHORT);
    } catch (error) {
      alert(error);
      // Login failed
      console.log('Error:', error);
    }
  };

  const btnSync = async () => {
    if (!netInfo.isConnected) {
      alert('Internet Connection is need');
    } else {
      setIsLoading(true);
      getEemployee_info()
        .then(result => {
          if (result == 'success') {
            getCustomer_info().then(result => {
              if (result == 'success') {
                getNRC_info().then(result => {
                  if (result == 'success') {

                    // getIndividual_loan().then(result => {
                    //   if (result == 'success') {
                    getLoanMax().then(result => {
                      if (result == 'success') {
                        getSurvey_Item().then(result => {
                          if (result == 'success') {
                            getCodeInfo().then(result => {
                              if (result == 'success') {
                                setIsLoading(false);
                                alert('Sync success');

                              }
                            });
                          }
                        });
                      }
                    });
                    //   }
                    // });
                  }
                });
              }
            });
          }
        })
        .catch(error => {
          setIsLoading(false);
          console.log('doSomething failed with error:', error);
        });
    }
  };

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
                  size={35}
                  color="#fff"
                  style={{ marginLeft: 20 }}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Icon
                  name="settings"
                  size={35}
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
                  name={'user_id'}
                  title={'ID or Email'}
                  component={TextInputFile}
                  defaultValue={id}
                  input_cusstyle
                />

                <Field
                  name={'password'}
                  title={'Password'}
                  component={TextInputFile}
                  password
                  input_cusstyle
                  icon={'eye'}
                  showRightIcon
                />

                <Field
                  component={DropDownPicker}
                  name={'lng'}
                  data={languages}
                  pickerStyle={{
                    width: 355,
                  }}
                  title={'Select Language'}
                />

                <View style={{ marginTop: 20 }}>
                  <Button
                    mode="contained"
                    onPress={handleSubmit(onSubmit)}
                    buttonColor={'#6870C3'}
                    style={{ borderRadius: 0 }}>
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
                  {/* <Field
                    component={CheckBoxFile}
                    name={'save_login_info'}
                    testcheck={() => btncheck()}
                  /> */}
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

      <View style={{ position: 'absolute', top: '50%', right: 0, left: 0 }}>
        {isLoading ? (
          <Spinner visible={isLoading} textContent={'Please Wait'} />
        ) : (
          <Text></Text>
        )}
      </View>
    </>
  );
}

export default reduxForm({
  form: 'LoginForm',
  validate,
})(connect(null)(LoginScreen));
