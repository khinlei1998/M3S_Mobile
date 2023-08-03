import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Provider, Portal, Modal, Button } from 'react-native-paper';
import DropDownPicker from '../../components/DropDownPicker';
import { Field, reduxForm, setInitialValues, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { fetchStateName } from '../../query/NRCinfo_query';
import TextInputFile from '../../components/TextInputFile';
import { state } from '../../common';
import { gender } from '../../common';
function ShowNRC_Modal(props) {
  const {
    hideNRCModal,
    nrc_visible,
    nrc_statecode,
    nrc_prefix_code,
    setNRCPrefixCode,
    setPrefix,
    btnCancel,
    prefix,
  } = props;
  const [state_name, setStateName] = useState('');
  const [nrc_prefix, setNRCPrefix] = useState([]);

  const handlePickerChange = async newValue => {
    setPrefix(newValue);
    const indexOfSlash = newValue.indexOf('/');
    const prefix_code = newValue.substring(0, indexOfSlash + 1);
    const state_name = newValue.substring(indexOfSlash + 1);

    await fetchStateName(prefix_code)
      .then(data => {
        const state_code_data = data.map(item => ({
          id: item.state_name,
          label: item.state_name,
          value: item.state_name,
        }));
        setStateName(state_code_data);

        const newArray = data.map(item => ({
          id: item.nrc_prefix_code,
          label: item.nrc_prefix_code,
          value: item.nrc_prefix_code,
        }));
        console.log('newArray', newArray);
        setNRCPrefix(newArray);
      })
      .catch(error => console.log(error));
  };
  return (
    <Provider>
      <Portal>
        <Modal
          visible={nrc_visible}
          onDismiss={hideNRCModal}
          contentContainerStyle={{
            backgroundColor: '#FFF',
            width: '95%',
            alignSelf: 'center',
            padding: 15,
            borderColor: '#0E162E',
            borderWidth: 1,
            margin: 20,
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '50%',
              }}>
              <Field
                data={nrc_statecode}
                name={'nrc_state_code'}
                title={'Prefix Code'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 150,
                }}
                showDropChange={handlePickerChange}
                prefix={prefix} // Pass the callback function to the DropDownPicker component
              />

              <Field
                data={nrc_prefix}
                name={'nrc_prefix_code'}
                title={'State Code'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 150,
                }}
              />
            </View>
            <Field
              name={'nrcNo'}
              title={'NRC Number'}
              component={TextInputFile}
              input_mode
              inputmax={6}
            // nrc_cusstyle
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Button
              mode="contained"
              contentStyle={{ width: 100, padding: 3 }}
              onPress={hideNRCModal}
              buttonColor={'#6870C3'}
              style={{ borderRadius: 0, margin: 10 }}>
              OK
            </Button>
            <Button
              mode="contained"
              contentStyle={{ width: 100, padding: 4 }}
              onPress={btnCancel}
              buttonColor={'#6870C3'}
              style={{ borderRadius: 0, margin: 10 }}>
              Cancel
            </Button>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
}

export default reduxForm({
  form: 'Customer_ManagementForm',
})(connect(null, {})(ShowNRC_Modal));
