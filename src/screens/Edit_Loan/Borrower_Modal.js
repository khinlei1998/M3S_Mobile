import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import {Provider, Modal, Portal, Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {reduxForm, Field, change} from 'redux-form';
import {style} from '../../style/Individual_Loan_style';
import {emp_filter_item} from '../../common';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';
import TextInputFile from '../../components/TextInputFile';
import {filterCustomer} from '../../query/Customer_query';
import RadioButton from 'react-native-paper';
function Borrower_Modal(props) {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(null);

  const {
    all_cus,
    modalVisible,
    hideModal,
    selectedItemValue,
    handleItemValueChange,
    setAllCus,
    handleSubmit,
  } = props;
  const btnCusSearch = async values => {
    console.log('selectedItemValue',selectedItemValue);
    await filterCustomer(selectedItemValue, values.searchtext)
      .then(data => (data.length > 0 ? setAllCus(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const btnSelectEmployee = item => {
    setSelectedValue(item.id);
    dispatch(change('Individual_Loan_Form', 'borrower_name', item.customer_nm));
    dispatch(change('Individual_Loan_Form', 'nrc_no', item.resident_rgst_id));
  };
  const item = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 10,
        }}>
        {/* <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {index + 1}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.customer_nm}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.resident_rgst_id}
        </Text>

        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.tel_no == null ? 'No Data' : item.tel_no}
        </Text> */}

        <View>
          <RadioButton
            value={item.id}
            status={selectedValue === item.id ? 'checked' : 'unchecked'}
            onPress={() => btnSelectEmployee(item)}
          />
        </View>

        {/* <Field component={RadioButton}/> */}
      </View>
    );
  };
  console.log('all_cs', all_cus);

  return (
    <Provider>
      <Portal>
        <Modal
          useNativeDriver
          hideModalContentWhileAnimating
          dismissable={false}
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={style.modal_container}>
          <View
            style={style.modal_header}
            onStartShouldSetResponder={() => hideModal()}>
            <Icon
              name="x-circle"
              size={25}
              color="#fff"
              style={style.cancel_icon_style}
            />
          </View>
          <View style={style.modal_body_container}>
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

              <View style={{width: '50%'}}>
                <Field
                  name={'searchtext'}
                  component={TextInputFile}
                  input_mode
                  inputmax={20}
                  icon={'magnify'}
                  handleTextInputFocus={handleSubmit(btnCusSearch)}
                />
              </View>
            </View>
            <View
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
                Name
              </Text>
              <Text
                style={{
                  flex: 1,

                  padding: 10,
                  fontWeight: 'bold',
                }}>
                NRC
              </Text>
              <Text
                style={{
                  flex: 1,

                  padding: 10,
                  fontWeight: 'bold',
                }}>
                Phone Number
              </Text>
            </View>
            {all_cus &&
            <FlatList
              data={all_cus}
              renderItem={item}
              keyExtractor={(item, index) => index.toString()}
            />
}

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
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
}

function mapStateToProps(state) {
  return {};
}

export default reduxForm({
  form: 'Individual_Loan_Form',
  // validate,
})(connect(mapStateToProps, {})(Borrower_Modal));
