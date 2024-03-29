import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Provider, Portal, Modal, Button } from 'react-native-paper';
import DropDownPicker from '../../components/DropDownPicker';
import { gender } from '../../common';
import { Field, reduxForm, setInitialValues, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { fetchStateName } from '../../query/NRCinfo_query';
import TextInputFile from '../../components/TextInputFile';
import { useTranslation } from 'react-i18next';

function ShowNRC_Modal(props) {
  const { t } = useTranslation();

  const {
    hideNRCModal,
    nrc_visible,
    nrc_statecode,
    nrc_prefix_code,
    update_status,
    prefix,
    setPrefix,
    btnCancel
  } = props;
  const [nrc_prefix, setNRCPrefix] = useState([]);
  const [state_name, setStateName] = useState('');

  const handlePickerChange = async newValue => {
    setPrefix(newValue);
    const indexOfSlash = newValue.indexOf('/');
    const prefix_code = newValue.substring(0, indexOfSlash + 1);
    const state_name = newValue.substring(indexOfSlash + 1);

    await fetchStateName(prefix_code)
      .then(data => {
        const tt = data.map(item => ({
          id: item.state_name,
          label: item.state_name,
          value: item.state_name,
        }));
        setStateName(tt);

        const newArray = data.map(item => ({
          id: item.nrc_prefix_code,
          label: item.nrc_prefix_code,
          value: item.nrc_prefix_code,
        }));
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '50%',
              }}>
              <Field
                data={nrc_statecode}
                name={'nrc_state_code'}
                title={'Select State COde'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 160,
                  marginRight: 10,
                }}
                prefix={prefix}
                showDropChange={handlePickerChange}
                enabled={update_status == true ? false : true}
              />

              <Field
                data={nrc_prefix}
                name={'nrc_prefix_code'}
                title={'Select Code'}
                component={DropDownPicker}
                pickerStyle={{
                  width: 160,
                }}
                enabled={update_status == true ? false : true}
              />
            </View>
            <Field
              name={'nrc_no'}
              title={'NRC Number'}
              component={TextInputFile}
              input_mode
              inputmax={100}
              enabled={update_status == true ? false : true}
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
              contentStyle={{ width: 117,height:44 }}
              onPress={hideNRCModal}
              buttonColor={'#21316C'}
              style={{ borderRadius: 0, margin: 10 }}>
              {t("OK")}
            </Button>
            <Button
              mode="contained"
              contentStyle={{ width: 117,height:44 }}
              onPress={btnCancel}
              buttonColor={'#21316C'}
              style={{ borderRadius: 0, margin: 10 }}>
              {t("Cancel")}
            </Button>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
}
function mapStateToProps(state) {
  return {
    update_status: state.customers.update_status,
  };
}

export default reduxForm({
  form: 'Customer_ManagementForm',
})(connect(mapStateToProps, {})(ShowNRC_Modal));
