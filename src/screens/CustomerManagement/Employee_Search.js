import {
  View,
  Text,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Field, reduxForm,  } from 'redux-form';
import Icon from 'react-native-vector-icons/Feather';
import TextInputFile from '../../components/TextInputFile';
import {
  Modal,
  Portal,
  Button,
  Provider,
} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { emp_filter_item } from '../../common';
import { filterEmp } from '../../query/Employee_query';
import ViewEmployee from './ViewEmployee';
import { TestAction } from '../../redux/EmployeeReducer';
import { connect,  } from 'react-redux';
import { useTranslation } from 'react-i18next';

function Employee_Search(props) {
  const { t } = useTranslation();
  const containerStyle = {
    backgroundColor: '#e8e8e8',
    width: '85%',
    alignSelf: 'center',
  };
  const { visible, hideModal, handleSubmit, dispatch } = props;
  const [all_emp, setAllEmp] = useState([]);

  const [selectedItemValue, setSelectedItemValue] = useState('employee_name');

  useEffect(() => {
    return () => {
      setAllEmp([]);
    };
  }, []);
  const handleItemValueChange = itemValue => {
    setSelectedItemValue(itemValue);
  }

  const onSubmit = async(values) => {
    await filterEmp(selectedItemValue, values.searchtext)
    .then(data => (data.length > 0 ? setAllEmp(data) : alert('No data')))
    .catch(error => console.log('error', error));
  };

  return (
    <Provider>
      <Portal>
        <Modal
          dismissable={false}
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <View
            style={{ backgroundColor: '#232D57', padding: 25 }}
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
          <View style={{ padding: 10, height: 550 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 10 }}>Search Item:</Text>

                <Picker
                  selectedValue={selectedItemValue}
                  onValueChange={handleItemValueChange}
                  style={{ width: 200, backgroundColor: 'white',marginTop:7 }}
                  mode="dropdown">
                  {emp_filter_item.length > 0 &&
                    emp_filter_item.map(val => (
                      <Picker.Item
                        label={val.label}
                        value={val.value}
                        key={val.id}
                      />
                    ))}
                </Picker>
              </View>

              <View style={{ width: '50%' }}>
                <Field
                  name={'searchtext'}
                  component={TextInputFile}
                  input_mode
                  inputmax={20}
                  icon={'magnify'}
                  handleTextInputFocus={handleSubmit(onSubmit)}
                />


              </View>
            </View>
            <ViewEmployee emp_data={all_emp} hideModal={hideModal} />

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Button
                onPress={() => hideModal()}
                mode="contained"
                buttonColor={'#21316C'}
                style={{
                  borderRadius: 0,
                  width: 117,
                  marginTop: 10,
                  color: 'black',
                  marginLeft: 5,
                  height:44
                }}>
                {t("OK")}
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
}

export default reduxForm({
  form: 'Customer_ManagementForm',
})(connect(null, { TestAction })(Employee_Search));
