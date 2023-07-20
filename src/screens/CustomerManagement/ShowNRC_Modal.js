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
  const { hideNRCModal, nrc_visible, nrc_statecode, nrc_prefix_code, setNRCPrefixCode } = props;
  console.log('nrc_statecode', nrc_statecode);
  const [nrc_prefix, setNRCPrefix] = useState([])
  const [prefix, setPrefix] = useState('')
  const handlePickerChange = async (newValue) => {
    console.log('newValue', newValue);
    setPrefix(newValue)
    // const indexOfSlash = newValue.indexOf('/');
    // const part1 = newValue.substring(0, indexOfSlash + 1);
    // const part2 = newValue.substring(indexOfSlash + 1);
    // console.log('part1', part1);
    // console.log('part2', part2);
    // Dispatch the change action to update the value in the Redux store

    await fetchStateName(newValue)
      .then(data => {
        console.log('data', data);
        const newArray = data.map(item => ({
          id: item.nrc_prefix_code,
          label: item.nrc_prefix_code,
          value: item.nrc_prefix_code,
        }));
        console.log('newArray', newArray);
        setNRCPrefix(newArray)
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '55%',
              }}>

              {/* <Field
                data={state}
                name={'nrc_statecode'}
                title={'PrefixCcode'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 150,
                }}
                onChange={handlePickerChange} // Pass the function to handle value change


              /> */}

              <Field
                data={nrc_statecode}
                name={'nrc_statecode'}
                title={'nrc_statecode'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 300,
                }}
                showDropChange={handlePickerChange}
                prefix={prefix} // Pass the callback function to the DropDownPicker component

              />

              {/* <Field
                data={nrc_statecode}
                name={'nrc_statecode'}
                title={'State Name'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 120,
                }}
                onChange={handlePickerChange} // Pass the function to handle value change


              /> */}

              {/* <Field
                data={nrc_prefix_code}
                name={'nrc_prefix'}
                title={'NRCPrefix'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 120,
                }}
              /> */}
              <Field
                data={nrc_prefix}
                name={'nrc_statecode'}
                title={'NRCPrefix'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 150,
                }}

              />
            </View>
            <View >
              <Field
                name={'nrcNo'}
                title={'NRC Number'}
                component={TextInputFile}
                input_mode
                inputmax={6}

              />
            </View>
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
              onPress={hideNRCModal}
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
