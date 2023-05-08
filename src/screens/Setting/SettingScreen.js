import {View, ToastAndroid} from 'react-native';
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  Divider,
} from 'react-native-paper';
import TextInputFile from '../../components/TextInputFile';
import React, {useState} from 'react';
import {Field, reduxForm, change} from 'redux-form';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SettingScreen(props) {
  const [showDefault, setShowDefault] = useState(false);

  const {visible, hideModal, handleSubmit, dispatch} = props;

  const containerStyle = {
    backgroundColor: 'white',
    width: '80%',
    alignSelf: 'center',
  };

  const onSubmit = async values => {
    try {
      await AsyncStorage.setItem('ip', values.ip);
      await AsyncStorage.setItem('port', values.port);
      alert(`Connect to ${await AsyncStorage.getItem('ip')} `);
    } catch (e) {
      // saving error
    }
    hideModal();
  };

  const btndefault = () => {
    setShowDefault(true);
    dispatch(
      change(
        'SettingForm',
        'ip',
        'sample-rest.onrender.com',
      ),
    );
    dispatch(change('SettingForm', 'port', '443'));
  };
  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <Provider>
        <Portal>
          <Modal
            theme={{
              colors: {
                backdrop: 'transparent',
              },
            }}
            animationType="fade"
            // transparent={true}
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <View
              style={{backgroundColor: '#232D57', padding: 25}}
              onStartShouldSetResponder={() => hideModal()}>
              <Icon
                name="x-circle"
                size={25}
                color="#fff"
                style={{
                  marginLeft: 20,
                  position: 'absolute',
                  top: 0,
                  right: 10,
                  top: 10,
                }}
              />
            </View>
            <View style={{backgroundColor: '#ededed', padding: 10}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View style={{width: '40%', marginTop: 20}}>
                  <Text>IP Address</Text>
                  <Text>ex)192.160.0.148, imbs.iptime.org</Text>
                </View>
                <View style={{width: '40%'}}>
                  <Field
                    component={TextInputFile}
                    name="ip"
                    showValue={showDefault}
                    defaultData={'sample-rest.onrender.com'}
                  />
                </View>
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View style={{width: '40%', marginTop: 20}}>
                  <Text>Port</Text>
                  <Text>Please Enter the Port Number</Text>
                </View>
                <View style={{width: '40%'}}>
                  <Field
                    component={TextInputFile}
                    name="port"
                    showValue={showDefault}
                    defaultData={'443'}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                }}>
                <Button
                  style={{borderRadius: 0}}
                  mode="contained"
                  onPress={handleSubmit(onSubmit)}>
                  Save
                </Button>

                <Button
                  style={{marginLeft: 10, borderRadius: 0}}
                  mode="outlined"
                  onPress={() => btndefault()}>
                  Default
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
      </Provider>
    </View>
  );
}

export default reduxForm({form: 'SettingForm'})(SettingScreen);
