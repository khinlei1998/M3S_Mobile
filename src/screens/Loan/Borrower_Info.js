import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {List, Provider, Modal, Portal} from 'react-native-paper';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {style} from '../../style/Individual_Loan_style';
import Icon from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';

import {
  borrower_type,
  condition_house,
  maritail_status,
  gender,
  emp_filter_item,
} from '../../common';
import TextInputFile from '../../components/TextInputFile';
import DropDownPicker from '../../components/DropDownPicker';
import DatePicker from '../../components/DatePicker';
import RadioButtonFile from '../../components/RadioButtonFile';
function Borrower_Info() {
  const [borrower_expanded, setBorrowerExpanded] = React.useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemValue, setSelectedItemValue] = useState('employee_name');

  const handleBorrowerToggle = () => {
    setBorrowerExpanded(!borrower_expanded);
  };
  const showCustomerSearch = () => {
    setModalVisible(true);
  };
  const hideModal = () => setModalVisible(false);
  const containerStyle = {
    // flex: 1,
    backgroundColor: '#e8e8e8',
    width: '85%',
    alignSelf: 'center',
  };
  const handleItemValueChange = itemValue => {
    setSelectedItemValue(itemValue);
  };
  return (
    <>
      <List.Accordion
        expanded={borrower_expanded}
        onPress={handleBorrowerToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Borrower Info">
        <View style={style.sub_container}>
          <Field
            data={borrower_type}
            name={'curr_business_date_status'}
            component={RadioButtonFile}
          />

          <Field
            name={'customer_no'}
            title={'Customer No'}
            component={TextInputFile}
            cus_width
            input_mode
            editable
          />
          <View style={style.sub_list_container}>
            <Field
              name={'nrc'}
              title={'NRC'}
              icon={'magnify'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
              handleTextInputFocus={showCustomerSearch}
              focusTextInput
            />

            <Field
              name={'borrower_name'}
              title={'Borrower Name'}
              component={TextInputFile}
              cus_width
              input_mode
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'application_no'}
              title={'Saving Code'}
              component={TextInputFile}
              cus_width
              input_mode
            />

            <Field
              name={'application_no'}
              title={'Phone Number'}
              component={TextInputFile}
              cus_width
              input_mode
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              data={gender}
              name={'gender'}
              title={'Gender'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
            />

            <Field
              name={'birthDate'}
              component={DatePicker}
              label={'date of birth'}
              icon={'calendar'}
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              data={maritail_status}
              name={'maritalStatus'}
              title={'Maritial Status'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
            />

            <Field
              name={'application_no'}
              title={'Address'}
              component={TextInputFile}
              cus_width
              input_mode
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'birthDate'}
              component={DatePicker}
              label={'Living Time in current address'}
              icon={'calendar'}
            />

            <Field
              name={'application_no'}
              title={'Number of family'}
              component={TextInputFile}
              cus_width
              input_mode
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'birthDate'}
              component={DatePicker}
              label={'Number of Students'}
              icon={'calendar'}
            />

            <Field
              name={'application_no'}
              title={'Number of Students'}
              component={TextInputFile}
              cus_width
              input_mode
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              data={condition_house}
              name={'maritalStatus'}
              title={'Condition of house'}
              component={DropDownPicker}
              pickerStyle={{
                width: 300,
              }}
            />

            <Field
              name={'application_no'}
              title={'OwnerShip of business'}
              component={TextInputFile}
              cus_width
              input_mode
            />
          </View>
        </View>
      </List.Accordion>

      <Provider>
        <Portal>
          <Modal
            useNativeDriver
            hideModalContentWhileAnimating
            dismissable={false}
            visible={modalVisible}
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
                      style={{
                        width: 200,
                        backgroundColor: 'white',
                        marginTop: 7,
                      }}
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

                  {/* <View style={{width: '50%'}}>
                  <Field
                    name={'searchtext'}
                    component={TextInputFile}
                    input_mode
                    inputmax={20}
                    icon={'magnify'}
                    handleTextInputFocus={handleSubmit(btnCusSearch)}
                  />
                </View> */}
                </View>
                {/* <ViewEmployee emp_data={all_emp} hideModal={hideModal} /> */}
                {/* <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  padding: 5,
                  margin: 20,
                }}>
                <Text
                  style={{
                    padding: 10,
                    flex: 1,
                    fontWeight: 'bold',
                  }}>
                  #
                </Text>
                <Text
                  style={{
                    flex: 1,

                    padding: 10,
                    fontWeight: 'bold',
                  }}>
                  Employee No
                </Text>
                <Text
                  style={{
                    flex: 1,

                    padding: 10,
                    fontWeight: 'bold',
                  }}>
                  Employee Name
                </Text>
                <Text
                  style={{
                    flex: 1,

                    padding: 10,
                    fontWeight: 'bold',
                  }}>
                  Positon Name
                </Text>
              </View>

              <FlatList
                data={all_emp}
                renderItem={item}
                keyExtractor={(item, index) => index.toString()}
              />

              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
                  OK
                </Button>
              </View> */}
              </View>
          </Modal>
        </Portal>
      </Provider>
    </>
  );
}
function mapStateToProps(state) {
  return {};
}

export default reduxForm({
  form: 'Individual_Loan_Form',
  // validate,
})(connect(mapStateToProps, {})(Borrower_Info));
