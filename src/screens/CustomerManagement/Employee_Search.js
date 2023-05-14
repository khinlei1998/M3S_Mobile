import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Field, reduxForm, change} from 'redux-form';
import Icon from 'react-native-vector-icons/Feather';
import TextInputFile from '../../components/TextInputFile';
import {
  Modal,
  Portal,
  Button,
  Provider,
  Divider,
  TextInput,
} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {emp_filter_item} from '../../common';
import {filterEmp} from '../../query/Employee_query';
import ViewEmployee from './ViewEmployee';

function Employee_Search(props) {
  const testdata = [
    {
      id: 1,
      employee_name: 'ds',
      employee_no: '33',
    },
    {
      id: 2,
      employee_name: 'ds',
      employee_no: '33',
    },
    {
      id: 3,
      employee_name: 'ds',
      employee_no: '33',
    },
    {
      id: 4,
      employee_name: 'ds',
      employee_no: '33',
    },
    {
      id: 5,
      employee_name: 'ds',
      employee_no: '33',
    },
    {
      id: 6,
      employee_name: 'ds',
      employee_no: '33',
    },
    {
      id: 7,
      employee_name: 'ds',
      employee_no: '33',
    },
    {
      id: 8,
      employee_name: 'ds',
      employee_no: '33',
    },
    {
      id: 9,
      employee_name: 'ds',
      employee_no: '33',
    },
  ];
  const containerStyle = {
    backgroundColor: '#e8e8e8',
    width: '80%',
    alignSelf: 'center',
  };
  const {visible, hideModal, handleSubmit, dispatch} = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [all_emp, setAllEmp] = useState([]);

  const [selectedItemValue, setSelectedItemValue] = useState('employee_name');

  useEffect(() => {
    return () => {
      setAllEmp([]);
    };
  }, []);

  const handleSearch = async () => {
    await filterEmp(selectedItemValue, searchTerm)
      .then(data => (data.length > 0 ? setAllEmp(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const handleItemValueChange = itemValue => {
    setSelectedItemValue(itemValue);
  };

  const handleChangeText = newText => {
    setSearchTerm(newText);
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
            <View style={{padding: 10, height: 550}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{marginRight: 10}}>Search Item:</Text>

                  <Picker
                    selectedValue={selectedItemValue}
                    onValueChange={handleItemValueChange}
                    style={{width: 200, backgroundColor: 'white'}}
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

                <View style={{width: '50%'}}>
                  <TextInput
                    value={searchTerm}
                    onChangeText={handleChangeText}
                    right={
                      <TextInput.Icon
                        icon={'magnify'}
                        onPress={() => handleSearch()}
                      />
                    }
                    style={{
                      backgroundColor: 'white',
                    }}
                  />
                </View>
              </View>
              <ViewEmployee emp_data={all_emp} />

              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Button
                  mode="contained"
                  buttonColor={'#6870C3'}
                  style={{
                    borderRadius: 0,
                    width: 100,
                    marginTop: 10,
                    color: 'black',
                    marginLeft: 5,
                  }}>
                  OK
                </Button>
                <Button
                  onPress={() => hideModal()}
                  mode="contained"
                  buttonColor={'#6870C3'}
                  style={{
                    borderRadius: 0,
                    width: 100,
                    marginTop: 10,
                    color: 'black',
                    marginLeft: 5,
                  }}>
                  Cancel
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
      </Provider>
    </View>
  );
}

export default reduxForm({form: 'EmployeeSearch'})(Employee_Search);
