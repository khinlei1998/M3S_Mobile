import { View, Text } from 'react-native';
import React from 'react';
import { Provider, Portal, Modal, Button } from 'react-native-paper';
import DropDownPicker from '../../components/DropDownPicker';
import { gender } from '../../common';
import { Field, reduxForm, setInitialValues, initialize } from 'redux-form';
import { connect } from 'react-redux';

import TextInputFile from '../../components/TextInputFile';
function ShowNRC_Modal(props) {
  const { hideNRCModal, nrc_visible, nrc_statecode, nrc_prefix_code } = props;
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '50%',
              }}>

              <Field
                data={nrc_statecode}
                name={'nrc_statecode'}
                title={'Select State Code'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 160,
                }}
              />

              <Field
                data={nrc_prefix_code}
                name={'nrc_prefix'}
                title={'Select Prefix'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 160,
                }}
              />
            </View>
            <Field
              name={'nrcNo'}
              title={'NRC Number'}
              component={TextInputFile}
              input_mode
              inputmax={100}
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