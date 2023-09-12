import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import TextInputFile from '../../components/TextInputFile';
import {Field, reduxForm, change, reset} from 'redux-form';
import {connect, useDispatch, useSelector} from 'react-redux';
import DropDownPicker from '../../components/DropDownPicker';
import SettingScreen from '../Setting/SettingScreen';
import {languages} from '../../common';
import {Button, Modal, ActivityIndicator} from 'react-native-paper';
import {useNetInfo} from '@react-native-community/netinfo';
import {getEemployee_info} from '../../query/Employee_query';
import {selectUser} from '../../query/Employee_query';
import {AuthContext} from '../../components/context';
import validate from './Validate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sha256} from 'react-native-sha256';
import {encode} from 'base-64';
import {useTranslation} from 'react-i18next';
import {
  createCancelTokenSource,
  cancelRequest,
} from '../../components/CancelUtils';
import i18next from '../../../services/i18next';
import {saveLogin} from '../../redux/EmployeeReducer';
import {Checkbox} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';

let token;
function LoginScreen(props) {
  const {t} = useTranslation();
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const [id, setID] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const netInfo = useNetInfo();
  const {navigation, handleSubmit, saveLogin, ischecked} = props;
  const [show_modal, setShowModal] = useState(false);
  const {saveUserID, userID} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [prefix, setPrefix] = useState('');
  const hideModal = () => setModalVisible(false);
  //   const isChecked = useSelector((state) => state.checkbox.isChecked);
  const handleLngChange = value => {
    setPrefix(value); //show selected value
    i18next.changeLanguage(value);
  };

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
      const user_length = Object.keys(user).length;
      if (user_length > 0) {
        await saveUserID(user.user_id);

        // props.navigation.navigate('Home');
        await AsyncStorage.setItem('user_id', user.employee_no);
        // const user_id = await AsyncStorage.getItem('user_id');
        // ToastAndroid.show(`Welocome,[${user_id}]!`, ToastAndroid.SHORT);
        const user_id = await AsyncStorage.getItem('user_id');
        ToastAndroid.show(`Welocome,[${user_id}]!`, ToastAndroid.SHORT);

        if (rememberMe) {
          await AsyncStorage.setItem('savedlogin', user.user_id);
          // dispatch(reset('LoginForm'));
        } else {
          await AsyncStorage.removeItem('savedlogin');
        }
      }

      // const user = await selectUser('M00172', encodedString);

      // values.save_login_info &&
      // saveLoginInfo(JSON.stringify(values.save_login_info));
      // // reset('LoginForm');
      // const user_id = await AsyncStorage.getItem('user_id');
      // ToastAndroid.show(`Welocome,[${user_id}]!`, ToastAndroid.SHORT);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const btnSync = async () => {
    if (!netInfo.isConnected) {
      alert('Internet Connection is need');
    } else {
      setShowModal(true);
      token = await createCancelTokenSource(); // C
      getEemployee_info(token)
        .then(result => {
          if (result.response == 'success') {
            setShowModal(false);
            alert('Sync suucess');
          }
        })
        .catch(error => {
          console.log('sync error', error);
          if (error === 'Request canceled by user') {
            setShowModal(false);
            alert('Request canceled by user');
          } else {
            setShowModal(false);
            alert('Only Possible download in network');
          }
        });
    }
  };
  const containerStyle = {
    backgroundColor: '#fff',
    width: '60%',
    alignSelf: 'center',
  };
  const hidePgModal = () => {
    setShowModal(false);
  };

  const btncheck = () => {
    // saveLogin(!ischecked);
    setRememberMe(!rememberMe);
  };

  // const loadData = async () => {
  //   if (ischecked) {
  //     const user_id = await AsyncStorage.getItem('savedlogin');
  //     dispatch(change('LoginForm', 'user_id', user_id));
  //   } else {
  //     await AsyncStorage.removeItem('savedlogin');
  //   }
  // };

  // useEffect(() => {
  //   loadData();
  // }, [ischecked]);
  const loadData = async () => {
    const user_id = await AsyncStorage.getItem('savedlogin');
    if (user_id) {
      dispatch(change('LoginForm', 'user_id', user_id));
      setRememberMe(!rememberMe);
    }
  };
  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  return (
    <>
      {modalVisible ? (
        <SettingScreen visible={modalVisible} hideModal={hideModal} />
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{backgroundColor: '#232D57', flex: 1}}>
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
                  style={{marginLeft: 20}}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Icon
                  name="settings"
                  size={35}
                  color="#fff"
                  style={{marginLeft: 20}}
                />
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Image
                source={require('../../../assets/images/logo3.png')}
                style={{width: 130, height: 130}}
              />
              <View
                style={{flexDirection: 'row', marginTop: 10, marginBottom: 20}}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
                  BC NeO{' '}
                </Text>
                <Text style={{color: '#fff', fontSize: 20}}>Sales System</Text>
              </View>

              <Image
                source={require('../../../assets/images/default-user.png')}
                style={{width: 50, height: 50, marginTop: 10}}
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
                  height: 360,
                  padding: 20,
                }}>
                <Field
                  name={'user_id'}
                  title={t('ID or Email')}
                  component={TextInputFile}
                  defaultValue={id}
                  input_cusstyle
                />

                <Field
                  name={'password'}
                  title={t('Password')}
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
                  showDropChange={handleLngChange}
                  title={t('Select Language')}
                  prefix={prefix}
                />

                <View style={{marginTop: 20}}>
                  <Button
                    mode="contained"
                    onPress={handleSubmit(onSubmit)}
                    buttonColor={'#6870C3'}
                    style={{borderRadius: 0}}>
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
                  <Checkbox
                    status={rememberMe ? 'checked' : 'unchecked'}
                    onPress={() => btncheck()}
                    color="#fff" // Customize the checked color here
                    uncheckedColor="#fff" // Customize the unchecked color here
                  />
                  <Text style={{color: '#fff'}}>Save login Information</Text>
                </View>
              </View>
            </View>

            <Text style={{color: '#fff', textAlign: 'center', marginTop: 25}}>
              v 0.2.10
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

      {/* Pg bar */}
      <Modal visible={show_modal} contentContainerStyle={containerStyle}>
        <View style={{padding: 10, height: 150}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column', //column direction
              justifyContent: 'center',
              alignItems: 'center',

              padding: 8,
            }}>
            <View style={{flexDirection: 'row'}}>
              <ActivityIndicator size="15" color="#636Dc6" />
              <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>
                Employee Information is downloading..
              </Text>
            </View>
            <Button
              mode="outlined"
              onPress={() => {
                hidePgModal(), cancelRequest(token);
              }}
              style={{
                borderRadius: 0,
                padding: 5,
                width: '40%',
                top: 10,
              }}>
              {t('Cancel')}
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
}
function mapStateToProps(state) {
  return {
    ischecked: state.employees.save_login,
  };
}
export default reduxForm({
  form: 'LoginForm',
  validate,
})(connect(mapStateToProps, {saveLogin})(LoginScreen));
