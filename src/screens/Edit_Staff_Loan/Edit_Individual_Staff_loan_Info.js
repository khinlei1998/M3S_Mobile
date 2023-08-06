import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  PermissionsAndroid,
  TouchableHighlight,
  Image,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect, useRef, createRef, useMemo } from 'react';
import DividerLine from '../../components/DividerLine';
import { updateLoanData } from '../../query/AllLoan_query';
import { style } from '../../style/Individula_staff_Loan_Style';
import {
  operations,
  loan_type,
  emp_filter_item,
  city_code,
  Township_code,
  village_code,
  ward_code,
  location_code,
  cus_filter_item,
} from '../../common';
import { reduxForm, Field, change, reset, formValueSelector } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import BottomSheet from 'react-native-simple-bottom-sheet';
import {
  RadioButton,
  Button,
  List,
  Modal,
  Provider,
  Portal,
  TextInput,
} from 'react-native-paper';
import TextInputFile from '../../components/TextInputFile';
import DropDownPicker from '../../components/DropDownPicker';
import DatePicker from '../../components/DatePicker';
import Edit_Individual_staff_Emp_loan from './Edit_Individual_staff_Emp_loan';
import Edit_Individual_Staff_CoBorrower_Info from './Edit_Invidual_Staff_CoBorrower_Info';
import Edit_Individual_staff_Contract from './Edit_Individual_staff_Contract';
import Edit_Individual_Staff_Sign from './Edit_Individual_Staff_Sign';
import { getAllLoan } from '../../query/AllLoan_query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { filterCustomer } from '../../query/Customer_query';
import { getAllCustomer } from '../../query/Customer_query';
import SignatureCapture from 'react-native-signature-capture';
import RNFS from 'react-native-fs';
import { filterEmp } from '../../query/Employee_query';
import { storeStaffLoanData } from '../../query/StaffLoan_query';
import { setStaffLoanUpdateStatus } from '../../redux/LoanReducer';
import {
  deleteStaffLoan_ByID,
  updateStaffLoanData,
} from '../../query/StaffLoan_query';
import { getGuarantorData } from '../../query/Guarantor_query';
import { getExceptionalApproval } from '../../query/Exceptional_Approval_query';
import { getRelationData } from '../../query/RelationShip_query';
import { getEvaluationData } from '../../query/AreaEvaluation_query';
import { updateGuarantor } from '../../query/Guarantor_query';
import { filterCustomerByEmpno } from '../../query/Customer_query';
import validate from '../Staff_Loan/Validate';
const Borrower_Sign_Modal = props => {
  const {
    show_canvas,
    hideSignModal,
    setCanvas,
    _onSaveEvent,
    _onDragEvent,
    saveSign,
    resetSign,
    sign,
  } = props;
  console.log('show_canvas', show_canvas);
  return (
    <Modal
      visible={show_canvas}
      animationType="slide"
      transparent={true}
      useNativeDriver
      hideModalContentWhileAnimating
      dismissable={false}
      onDismiss={hideSignModal}>
      <View
        style={{
          backgroundColor: '#232D57',
          padding: 25,
          width: 400,
          alignSelf: 'center',
        }}
        onStartShouldSetResponder={() => setCanvas(!show_canvas)}>
        <Icon
          name="x-circle"
          size={25}
          color="#fff"
          style={style.cancel_icon_style}
        />
      </View>
      <View
        style={{
          backgroundColor: '#F5FCFF',
          width: 400,
          height: 300,
          alignSelf: 'center',
        }}>
        <SignatureCapture
          style={{
            flex: 1,
          }}
          ref={sign}
          onSaveEvent={_onSaveEvent}
          onDragEvent={_onDragEvent}
          showNativeButtons={false}
          showTitleLabel={false}
          minStrokeWidth={10}
          maxStrokeWidth={10}
          // saveImageFileInExtStorage
          // backgroundColor="transparent"
          viewMode={'portrait'}
        />
        <View style={{ flexDirection: 'row' }}>
          <TouchableHighlight
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              height: 50,
              backgroundColor: '#6870C3',
              margin: 10,
            }}
            onPress={() => {
              saveSign();
            }}>
            <Text style={{ color: '#fff' }}>Save</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              height: 50,
              backgroundColor: '#6870C3',
              margin: 10,
            }}
            onPress={() => {
              resetSign();
            }}>
            <Text style={{ color: '#fff' }}>Reset</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const Co_Borrower_Sign_Modal = props => {
  const {
    show_co_borrower_canvas,
    hideCoBorrowerSignModal,
    setCoBorrowerCanvas,
    _onCoBorrowerSaveEvent,
    co_borrower_saveSign,
    co_borrower_resetSign,
    co_borrower_sign,
  } = props;
  return (
    <Modal
      visible={show_co_borrower_canvas}
      animationType="slide"
      transparent={true}
      useNativeDriver
      hideModalContentWhileAnimating
      dismissable={false}
      onDismiss={hideCoBorrowerSignModal}>
      <View
        style={{
          backgroundColor: '#232D57',
          padding: 25,
          width: 400,
          alignSelf: 'center',
        }}
        onStartShouldSetResponder={() =>
          setCoBorrowerCanvas(!show_co_borrower_canvas)
        }>
        <Icon
          name="x-circle"
          size={25}
          color="#fff"
          style={style.cancel_icon_style}
        />
      </View>
      <View
        style={{
          backgroundColor: '#F5FCFF',
          width: 400,
          height: 300,
          alignSelf: 'center',
        }}>
        <SignatureCapture
          style={{
            flex: 1,
          }}
          ref={co_borrower_sign}
          onSaveEvent={_onCoBorrowerSaveEvent}
          showNativeButtons={false}
          showTitleLabel={false}
          saveImageFileInExtStorage
          minStrokeWidth={10}
          maxStrokeWidth={10}
          // backgroundColor="transparent"
          viewMode={'portrait'}
        />
        <View style={{ flexDirection: 'row' }}>
          <TouchableHighlight
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              height: 50,
              backgroundColor: '#6870C3',
              margin: 10,
            }}
            onPress={() => {
              co_borrower_saveSign();
            }}>
            <Text style={{ color: '#fff' }}>Save</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              height: 50,
              backgroundColor: '#6870C3',
              margin: 10,
            }}
            onPress={() => {
              co_borrower_resetSign();
            }}>
            <Text style={{ color: '#fff' }}>Reset</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const Emp_No_Search_modal = props => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(null);
  const [emp_data, setEmpData] = React.useState('');

  const {
    all_cus,
    modalVisible,
    hideModal,
    selectedItemValue,
    handleItemValueChange,
    setAllCus,
    handleSubmit,
    retrive_staff_loan_data,
  } = props;

  const onChangeEmpText = inputText => {
    setEmpData(inputText);
  };

  const btnEmpSearch = async () => {
    console.log('selectedValue', selectedItemValue);
    await filterCustomerByEmpno(selectedItemValue, emp_data)
      .then(data => (data.length > 0 ? setAllCus(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };
  const btnSelectEmployee = item => {
    setSelectedValue(item.serial_no);
    dispatch(
      change('Edit_Individual_Staff_Loan_Form', 'borrower_name', item.employee_name),
    );
    dispatch(
      change(
        'Edit_Individual_Staff_Loan_Form',
        'resident_rgst_id',
        item.resident_rgst_id,
      ),
    );
    dispatch(
      change('Edit_Individual_Staff_Loan_Form', 'employee_no', item.employee_no),
    );
  };

  const item = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 10,
        }}>
        <Text
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
          {item.employee_no}
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
          {item.tel_no == null ? 'No Data' : item.tel_no}
        </Text>

        <View>
          <RadioButton
            value={item.id}
            status={selectedValue === item.serial_no ? 'checked' : 'unchecked'}
            onPress={() => btnSelectEmployee(item)}
          />
        </View>

        {/* <Field component={RadioButton}/> */}
      </View>
    );
  };
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 10 }}>Search Item:</Text>

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

              <View style={{ width: '40%' }}>
                <TextInput
                  style={{
                    backgroundColor: '#fff',
                    marginTop: 10,
                    width: 250,
                    borderColor: '#303030',
                    borderWidth: 0.5,
                  }}
                  value={emp_data}
                  onChangeText={onChangeEmpText}
                  right={
                    <TextInput.Icon
                      icon={'magnify'}
                      onPress={() => btnEmpSearch()}
                    />
                  }
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
                Phone Number
              </Text>
            </View>

            <FlatList
              data={all_cus}
              renderItem={item}
              keyExtractor={(item, index) => index.toString()}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
};

const CoBorrower_NRC_Search_modal = props => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(null);
  const [cus_data, setCusData] = React.useState('');

  const {
    CoBorrowerhideModal,
    co_borrower_modal_visible,
    setAllCoBorrower,
    all_co_borrower,
    selectedItemValue,
    handleItemValueChange,
    handleSubmit,
  } = props;

  const onChangeCusText = inputText => {
    setCusData(inputText);
  };

  const btnCusSearch = async () => {
    console.log('selectedItemValue', selectedItemValue);
    console.log('cus_data',cus_data);
    await filterCustomer(selectedItemValue, cus_data)
      .then(data =>
        data.length > 0 ? setAllCoBorrower(data) : alert('No data'),
      )
      .catch(error => console.log('error', error));
  };
  const btnSelectCustomer = item => {
    setSelectedValue(item.id);
    dispatch(
      change(
        'Edit_Individual_Staff_Loan_Form',
        'co_customer_no',
        item.co_customer_no,
      ),
    );
    dispatch(
      change('Edit_Individual_Staff_Loan_Form', 'co_brwer_name', item.customer_nm),
    );
    dispatch(
      change(
        'Edit_Individual_Staff_Loan_Form',
        'resident_rgst_id',
        item.resident_rgst_id,
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Staff_Loan_Form',
        'co_brwer_rgst_id',
        item.resident_rgst_id,
      ),
    );
  };

  const item = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 10,
        }}>
        <Text
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
        </Text>

        <View>
          <RadioButton
            value={item.id}
            status={selectedValue === item.id ? 'checked' : 'unchecked'}
            onPress={() => btnSelectCustomer(item)}
          />
        </View>
      </View>
    );
  };
  return (
    <Provider>
      <Portal>
        <Modal
          useNativeDriver
          hideModalContentWhileAnimating
          dismissable={false}
          visible={co_borrower_modal_visible}
          onDismiss={CoBorrowerhideModal}
          contentContainerStyle={style.modal_container}>
          <View
            style={style.modal_header}
            onStartShouldSetResponder={() => CoBorrowerhideModal()}>
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 10 }}>Search Item:</Text>

                <Picker
                  selectedValue={selectedItemValue}
                  onValueChange={handleItemValueChange}
                  style={{
                    width: 200,
                    backgroundColor: 'white',
                    marginTop: 7,
                  }}
                  mode="dropdown">
                  {cus_filter_item.length > 0 &&
                    cus_filter_item.map(val => (
                      <Picker.Item
                        label={val.label}
                        value={val.value}
                        key={val.id}
                      />
                    ))}
                </Picker>
              </View>

              <View style={{ width: '40%' }}>
                <TextInput
                  style={{
                    backgroundColor: '#fff',
                    marginTop: 10,
                    width: 250,
                    borderColor: '#303030',
                    borderWidth: 0.5,
                  }}
                  value={cus_data}
                  onChangeText={onChangeCusText}
                  right={
                    <TextInput.Icon
                      icon={'magnify'}
                      onPress={() => btnCusSearch()}
                    />
                  }
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

            <FlatList
              data={all_co_borrower}
              renderItem={item}
              keyExtractor={(item, index) => index.toString()}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button
                onPress={() => CoBorrowerhideModal()}
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
};

const City_Modal = props => {
  const [city_selected, setCityselectedValue] = useState(null);
  const [city_text, set_cityText] = useState('');

  const {
    handleSubmit,
    all_city,
    setAllCity,
    handleCityItemValueChange,
    selectedCityItemValue,
    modal_city_visible,
    hideCityModal,
    setCitySelectedItemValue,
  } = props;
  const btnCitySearch = async () => {
    await filterCustomer(selectedCityItemValue, city_text)
      .then(data => (data.length > 0 ? setAllCity(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const onChangeCityText = inputText => {
    set_cityText(inputText);
  };

  const btnSelectCity = item => {
    setCityselectedValue(item.id);
    dispatch(change('Individual_Loan_Form', 'city_code', item.city_code));
    dispatch(change('Individual_Loan_Form', 'city_name', item.city_name));
  };

  const city_item = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 10,
        }}>
        <Text
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
          {item.city_code}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.city_name}
        </Text>

        <View>
          <RadioButton
            value={item.id}
            status={city_selected === item.id ? 'checked' : 'unchecked'}
            onPress={() => btnSelectCity(item)}
          />
        </View>
      </View>
    );
  };
  return (
    <Provider>
      <Portal>
        <Modal
          useNativeDriver
          hideModalContentWhileAnimating
          dismissable={false}
          visible={modal_city_visible}
          onDismiss={hideCityModal}
          contentContainerStyle={style.modal_container}>
          <View
            style={style.modal_header}
            onStartShouldSetResponder={() => hideCityModal()}>
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 10 }}>Search Item:</Text>

                <Picker
                  selectedValue={selectedCityItemValue}
                  onValueChange={handleCityItemValueChange}
                  style={{
                    width: 200,
                    backgroundColor: 'white',
                    marginTop: 7,
                  }}
                  mode="dropdown">
                  {city_code.length > 0 &&
                    city_code.map(val => (
                      <Picker.Item
                        label={val.label}
                        value={val.value}
                        key={val.id}
                      />
                    ))}
                </Picker>
              </View>

              <View style={{ width: '40%' }}>
                {/* <Field
                  name={'searchtext'}
                  component={TextInputFile}
                  input_mode
                  inputmax={20}
                  icon={'magnify'}
                  handleTextInputFocus={handleSubmit(btnCitySearch)}
                /> */}
                <TextInput
                  style={{
                    backgroundColor: '#fff',
                    marginTop: 10,
                    width: 250,
                    borderColor: '#303030',
                    borderWidth: 0.5,
                  }}
                  value={city_text}
                  onChangeText={onChangeCityText}
                  right={
                    <TextInput.Icon
                      icon={'magnify'}
                      onPress={() => btnCitySearch()}
                    />
                  }
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
                City Code
              </Text>
              <Text
                style={{
                  flex: 1,

                  padding: 10,
                  fontWeight: 'bold',
                }}>
                City Name
              </Text>
            </View>

            <FlatList
              data={all_city}
              renderItem={city_item}
              keyExtractor={(item, index) => index.toString()}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button
                onPress={() => hideCityModal()}
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
};

const Township_Modal = props => {
  const [township_selected, setTownshipselectedValue] = useState(null);
  const [township_text, setTownshipText] = useState('');

  const {
    handleSubmit,
    all_township,
    setAllTownship,
    handleTownshipItemValueChange,
    selectedTwonshipItemValue,
    modal_township_visible,
    hideTownshipModal,
    setTownshipSelectedItemValue,
  } = props;
  console.log('modal_township_visible', modal_township_visible);
  const btnTownshipSearch = async values => {
    await filterCustomer(selectedTwonshipItemValue, values.searchtext)
      .then(data => (data.length > 0 ? setAllTownship(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const btnSelectCity = item => {
    setTownshipselectedValue(item.id);
    dispatch(
      change('Individual_Loan_Form', 'township_code', item.township_code),
    );
    dispatch(
      change('Individual_Loan_Form', 'township_name', item.township_name),
    );
  };

  const township_item = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 10,
        }}>
        <Text
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
          {item.township_code}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.township_name}
        </Text>

        <View>
          <RadioButton
            value={item.id}
            status={city_selected === item.id ? 'checked' : 'unchecked'}
            onPress={() => btnSelectCity(item)}
          />
        </View>
      </View>
    );
  };
  const onChangeTownshipText = inputText => {
    setTownshipText(inputText);
  };
  return (
    <Provider>
      <Portal>
        <Modal
          useNativeDriver
          hideModalContentWhileAnimating
          dismissable={false}
          visible={modal_township_visible}
          onDismiss={hideTownshipModal}
          contentContainerStyle={style.modal_container}>
          <View
            style={style.modal_header}
            onStartShouldSetResponder={() => hideTownshipModal()}>
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 10 }}>Search Item:</Text>

                <Picker
                  selectedValue={selectedTwonshipItemValue}
                  onValueChange={handleTownshipItemValueChange}
                  style={{
                    width: 200,
                    backgroundColor: 'white',
                    marginTop: 7,
                  }}
                  mode="dropdown">
                  {Township_code.length > 0 &&
                    Township_code.map(val => (
                      <Picker.Item
                        label={val.label}
                        value={val.value}
                        key={val.id}
                      />
                    ))}
                </Picker>
              </View>

              <View style={{ width: '40%' }}>
                {/* <Field
                  name={'searchtext'}
                  component={TextInputFile}
                  input_mode
                  inputmax={20}
                  icon={'magnify'}
                  handleTextInputFocus={handleSubmit(btnTownshipSearch)}
                /> */}

                <TextInput
                  style={{
                    backgroundColor: '#fff',
                    marginTop: 10,
                    width: 250,
                    borderColor: '#303030',
                    borderWidth: 0.5,
                  }}
                  value={township_text}
                  onChangeText={onChangeTownshipText}
                  right={
                    <TextInput.Icon
                      icon={'magnify'}
                      onPress={() => btnTownshipSearch()}
                    />
                  }
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
                Township Code
              </Text>
              <Text
                style={{
                  flex: 1,

                  padding: 10,
                  fontWeight: 'bold',
                }}>
                Township Name
              </Text>
            </View>

            <FlatList
              data={all_township}
              renderItem={township_item}
              keyExtractor={(item, index) => index.toString()}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button
                onPress={() => hideTownshipModal()}
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
};
const Village_Modal = props => {
  const [village_selected, setVillageselectedValue] = useState(null);
  const [village_text, setVillage_Text] = useState('');

  const {
    hideVillageModal,
    modal_village_visible,
    setTownshipSelectedItemValue,
    selectedVillageItemValue,
    handleVllageItemValueChange,
    setAllVillage,
    handleSubmit,
    all_village,
  } = props;
  const btnVillageSearch = async () => {
    await filterCustomer(selectedVillageItemValue, village_text)
      .then(data => (data.length > 0 ? setAllVillage(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const btnSelectVillage = item => {
    setVillageselectedValue(item.id);
    dispatch(change('Individual_Loan_Form', 'village_code', item.village_code));
    dispatch(change('Individual_Loan_Form', 'village_name', item.village_name));
  };

  const onChangeVillageText = inputText => {
    setVillage_Text(inputText);
  };

  const village_item = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 10,
        }}>
        <Text
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
          {item.village_code}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.village_name}
        </Text>

        <View>
          <RadioButton
            value={item.id}
            status={village_selected === item.id ? 'checked' : 'unchecked'}
            onPress={() => btnSelectVillage(item)}
          />
        </View>
      </View>
    );
  };
  return (
    <Provider>
      <Portal>
        <Modal
          useNativeDriver
          hideModalContentWhileAnimating
          dismissable={false}
          visible={modal_village_visible}
          onDismiss={hideVillageModal}
          contentContainerStyle={style.modal_container}>
          <View
            style={style.modal_header}
            onStartShouldSetResponder={() => hideVillageModal()}>
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 10 }}>Search Item:</Text>

                <Picker
                  selectedValue={selectedVillageItemValue}
                  onValueChange={handleVllageItemValueChange}
                  style={{
                    width: 200,
                    backgroundColor: 'white',
                    marginTop: 7,
                  }}
                  mode="dropdown">
                  {village_code.length > 0 &&
                    village_code.map(val => (
                      <Picker.Item
                        label={val.label}
                        value={val.value}
                        key={val.id}
                      />
                    ))}
                </Picker>
              </View>

              <View style={{ width: '40%' }}>
                {/* <Field
                  name={'searchtext'}
                  component={TextInputFile}
                  input_mode
                  inputmax={20}
                  icon={'magnify'}
                  handleTextInputFocus={handleSubmit(btnVillageSearch)}
                /> */}
                <TextInput
                  style={{
                    backgroundColor: '#fff',
                    marginTop: 10,
                    width: 250,
                    borderColor: '#303030',
                    borderWidth: 0.5,
                  }}
                  value={village_text}
                  onChangeText={onChangeVillageText}
                  right={
                    <TextInput.Icon
                      icon={'magnify'}
                      onPress={() => btnVillageSearch()}
                    />
                  }
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
                Village Code
              </Text>
              <Text
                style={{
                  flex: 1,

                  padding: 10,
                  fontWeight: 'bold',
                }}>
                Village Name
              </Text>
            </View>

            <FlatList
              data={all_village}
              renderItem={village_item}
              keyExtractor={(item, index) => index.toString()}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button
                onPress={() => hideVillageModal()}
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
};

const Ward_Modal = props => {
  const [village_selected, setVillageselectedValue] = useState(null);
  const [ward_text, setWard_Text] = useState('');
  const {
    hideWardModal,
    modal_ward_visible,
    setWardSelectedItemValue,
    selectedWardItemValue,
    handleWardItemValueChange,
    setAllWard,
    handleSubmit,
    all_ward,
  } = props;
  const btnWardSearch = async () => {
    await filterCustomer(selectedWardItemValue, ward_text)
      .then(data => (data.length > 0 ? setAllWard(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const btnSelectWard = item => {
    setVillageselectedValue(item.id);
    dispatch(change('Individual_Loan_Form', 'village_code', item.village_code));
    dispatch(change('Individual_Loan_Form', 'village_name', item.village_name));
  };
  const onChangeWardText = inputText => {
    setWard_Text(inputText);
  };

  const ward_item = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 10,
        }}>
        <Text
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
          {item.ward_code}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.ward_name}
        </Text>

        <View>
          <RadioButton
            value={item.id}
            status={village_selected === item.id ? 'checked' : 'unchecked'}
            onPress={() => btnSelectWard(item)}
          />
        </View>
      </View>
    );
  };
  return (
    <Provider>
      <Portal>
        <Modal
          useNativeDriver
          hideModalContentWhileAnimating
          dismissable={false}
          visible={modal_ward_visible}
          onDismiss={hideWardModal}
          contentContainerStyle={style.modal_container}>
          <View
            style={style.modal_header}
            onStartShouldSetResponder={() => hideWardModal()}>
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 10 }}>Search Item:</Text>

                <Picker
                  selectedValue={selectedWardItemValue}
                  onValueChange={handleWardItemValueChange}
                  style={{
                    width: 200,
                    backgroundColor: 'white',
                    marginTop: 7,
                  }}
                  mode="dropdown">
                  {ward_code.length > 0 &&
                    ward_code.map(val => (
                      <Picker.Item
                        label={val.label}
                        value={val.value}
                        key={val.id}
                      />
                    ))}
                </Picker>
              </View>

              <View style={{ width: '50%' }}>
                {/* <Field
                  name={'searchtext'}
                  component={TextInputFile}
                  input_mode
                  inputmax={20}
                  icon={'magnify'}
                  handleTextInputFocus={handleSubmit(btnWardSearch)}
                /> */}
                <TextInput
                  style={{
                    backgroundColor: '#fff',
                    marginTop: 10,
                    width: 250,
                    borderColor: '#303030',
                    borderWidth: 0.5,
                  }}
                  value={ward_text}
                  onChangeText={onChangeWardText}
                  right={
                    <TextInput.Icon
                      icon={'magnify'}
                      onPress={() => btnWardSearch()}
                    />
                  }
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
                Ward Code
              </Text>
              <Text
                style={{
                  flex: 1,

                  padding: 10,
                  fontWeight: 'bold',
                }}>
                Ward Name
              </Text>
            </View>

            <FlatList
              data={all_ward}
              renderItem={ward_item}
              keyExtractor={(item, index) => index.toString()}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button
                onPress={() => hideWardModal()}
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
};

const Location_Modal = props => {
  const [location_selected, setLocationSelectedValue] = useState(null);
  const [location_text, setLocation_Text] = useState('');
  const {
    hideLocationModal,
    modal_location_visible,
    setLocationSelectedItemValue,
    selectedLocationItemValue,
    handleLocationItemValueChange,
    setAllLocation,
    handleSubmit,
    all_location,
  } = props;
  const btnLocationSearch = async () => {
    await filterCustomer(selectedLocationItemValue, location_text)
      .then(data => (data.length > 0 ? setAllLocation(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const onChangeLocationText = inputText => {
    setLocation_Text(inputText);
  };

  const btnSelectLocation = item => {
    setLocationSelectedValue(item.id);
    dispatch(
      change('Individual_Loan_Form', 'location_code', item.location_code),
    );
    dispatch(
      change('Individual_Loan_Form', 'location_name', item.location_name),
    );
  };

  const location_item = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 10,
        }}>
        <Text
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
          {item.location_code}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.location_name}
        </Text>

        <View>
          <RadioButton
            value={item.id}
            status={location_selected === item.id ? 'checked' : 'unchecked'}
            onPress={() => btnSelectLocation(item)}
          />
        </View>
      </View>
    );
  };
  return (
    <Provider>
      <Portal>
        <Modal
          useNativeDriver
          hideModalContentWhileAnimating
          dismissable={false}
          visible={modal_location_visible}
          onDismiss={hideLocationModal}
          contentContainerStyle={style.modal_container}>
          <View
            style={style.modal_header}
            onStartShouldSetResponder={() => hideLocationModal()}>
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 10 }}>Search Item:</Text>

                <Picker
                  selectedValue={selectedLocationItemValue}
                  onValueChange={handleLocationItemValueChange}
                  style={{
                    width: 200,
                    backgroundColor: 'white',
                    marginTop: 7,
                  }}
                  mode="dropdown">
                  {location_code.length > 0 &&
                    location_code.map(val => (
                      <Picker.Item
                        label={val.label}
                        value={val.value}
                        key={val.id}
                      />
                    ))}
                </Picker>
              </View>

              <View style={{ width: '50%' }}>
                {/* <Field
                  name={'searchtext'}
                  component={TextInputFile}
                  input_mode
                  inputmax={20}
                  icon={'magnify'}
                  handleTextInputFocus={handleSubmit(btnLocationSearch)}
                /> */}
                <TextInput
                  style={{
                    backgroundColor: '#fff',
                    marginTop: 10,
                    width: 250,
                    borderColor: '#303030',
                    borderWidth: 0.5,
                  }}
                  value={location_text}
                  onChangeText={onChangeLocationText}
                  right={
                    <TextInput.Icon
                      icon={'magnify'}
                      onPress={() => btnLocationSearch()}
                    />
                  }
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
                Location Code
              </Text>
              <Text
                style={{
                  flex: 1,

                  padding: 10,
                  fontWeight: 'bold',
                }}>
                Location Name
              </Text>
            </View>

            <FlatList
              data={all_location}
              renderItem={location_item}
              keyExtractor={(item, index) => index.toString()}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button
                onPress={() => hideLocationModal()}
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
};

function Individual_Staff_loan_Info(props) {
  const {
    entryDate,
    salary_amount,
    setStaffLoanUpdateStatus,
    navigation,
    update_status,
    retrive_staff_loan_data,
  } = props;
  const dispatch = useDispatch();
  const [selectedItemValue, setSelectedItemValue] = useState('customer_nm');

  const [show_operation, setOperation] = useState('2');
  const [loanexpanded, setLoanExpanded] = React.useState(true);
  const [show_canvas, setCanvas] = useState(false);

  const [all_loandata, setAllLoanData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [all_cus, setAllCus] = useState([]);
  const [all_co_borrower, setAllCoBorrower] = useState([]);
  const [all_city, setAllCity] = useState([]);
  const [all_township, setAllTownship] = useState([]);
  const [all_village, setAllVillage] = useState([]);
  const [all_ward, setAllWard] = useState([]);
  const [all_location, setAllLocation] = useState([]);
  const [exceptional_data, setExceptionalData] = useState([]);
  const [guarantor_data, setGuarantorData] = useState([]);
  const [relation_data, setRelationData] = useState([]);
  const [evaluation_data, setEvaluationData] = useState([]);
  const [modal_city_visible, setCityCodeModalVisible] = useState(false);
  const [selectedCityItemValue, setCitySelectedItemValue] =
    useState('city_code');
  const [filePath, setFilePath] = useState('');
  const [co_borrower_filePath, setCoBorrowerFilePath] = useState('');
  const [selectedTownshipItemValue, setTownshipSelectedItemValue] =
    useState('township_code');
  const [selectedWardItemValue, setWardSelectedItemValue] =
    useState('ward_code');
  const [selectedVillageItemValue, setVillageSelectedItemValue] =
    useState('village_code');
  const [modal_village_visible, setVillageCodeModalVisible] = useState(false);
  const [modal_ward_visible, setWardCodeModalVisible] = useState(false);
  const [modal_location_visible, setLocationModalVisible] = useState(false);
  const [modal_township_visible, setTownshipCodeModalVisible] = useState(false);
  const [selectedLocationItemValue, setLocationSelectedItemValue] =
    useState('location_code');
  const [co_borrower_modal_visible, setCoBorrowerModalVisible] =
    useState(false);
  const [borrower_sign_path, setBorrowerSignPath] = useState('');
  const [show_borrower_sign, setShowBorrowerSign] = useState('');
  const [coborrower_sign_path, setCoBorrowerSignPath] = useState('');
  const [show_coborrower_sign, setShowCoBorrowerSign] = useState('');
  const [showCanvas, setShowCanvas] = useState(false);
  const [working_month, setWorkingMonth] = useState();
  const [loan_limit_amount, setLoanLimitAmount] = useState(0);
  const { handleSubmit } = props;
  const handleLoanToggle = () => {
    setLoanExpanded(!loanexpanded);
  };

  const [show_co_borrower_canvas, setCoBorrowerCanvas] = useState(false);

  const loadData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    await getAllLoan().then(loan_data => {
      setAllLoanData(loan_data);
      // dispatch(
      //   change(
      //     'Individual_Staff_Loan_Form',
      //     'application_no',
      //     `20${user_id}TB${moment().format('YYYYMMDD')}${loan_data.length + 1}`,
      //   ),
      // );
      // dispatch(
      //   change(
      //     'Individual_Staff_Loan_Form',
      //     'product_type',
      //     `Individual Staff Loan`,
      //   ),
      // );
    });
    await getExceptionalApproval(retrive_staff_loan_data.application_no).then(
      data => {
        console.log('setExceptionalData', data);
        setExceptionalData(data);
      },
    );
    await getGuarantorData(retrive_staff_loan_data.application_no).then(
      data => {
        setGuarantorData(data);
      },
    );
    await getRelationData(retrive_staff_loan_data.application_no).then(data => {
      setRelationData(data);
    });
    await getEvaluationData(retrive_staff_loan_data.application_no).then(
      data => {
        setEvaluationData(data);
      },
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const RenderBottomSheet = () =>
    useMemo(() => {
      return (
        <BottomSheet isOpen={false} wrapperStyle={{ backgroundColor: '#3E3E84' }}>
          <View style={{ padding: 5, marginLeft: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="paperclip" size={25} color="#fff" />
              <Text style={{ color: '#fff', fontSize: 20, marginLeft: 10 }}>
                Document Submit
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  marginBottom: 16,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    update_status == true && guarantor_data.length == 0
                      ? props.navigation.navigate('Guarantor', {
                        retrive_loan_data: retrive_staff_loan_data,
                      })
                      : update_status == true && guarantor_data.length > 0
                        ? props.navigation.navigate('Edit Guarantor', {
                          guarantor_data,
                        })
                        : ToastAndroid.show(
                          `Only update can modify`,
                          ToastAndroid.SHORT,
                        )
                  }
                  style={{
                    width: 250,
                    height: 40,
                    backgroundColor:
                      guarantor_data.length > 0 ? '#3E3E84' : '#242157',
                    margin: 10,
                  }}>
                  {guarantor_data.length > 0 ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 5,
                      }}>
                      <View
                        style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="check" size={20} color="#ede72d" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          Guarantor Form
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 5,
                      }}>
                      <View
                        style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="paperclip" size={20} color="#fff" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          Guarantor Form
                        </Text>
                      </View>
                      <Icon name="chevron-right" size={25} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    update_status == true && evaluation_data.length == 0
                      ? props.navigation.navigate('Area Evaluation', {
                        retrive_loan_data: retrive_staff_loan_data,
                      })
                      : update_status == true && evaluation_data.length > 0
                        ? props.navigation.navigate('Edit Area Evaluation', {
                          evaluation_data,
                        })
                        : ToastAndroid.show(
                          `Only update can modify`,
                          ToastAndroid.SHORT,
                        )
                  }
                  // onPress={() =>
                  //   props.navigation.navigate('Area Evaluation', {
                  //     retrive_staff_loan_data,
                  //   })
                  // }
                  style={{
                    width: 250,
                    height: 40,
                    backgroundColor:
                      evaluation_data.length > 0 ? '#3E3E84' : '#242157',
                    margin: 10,
                  }}>
                  {evaluation_data.length > 0 ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 5,
                      }}>
                      <View
                        style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="check" size={20} color="#ede72d" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          Area Evaluation Form
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 5,
                      }}>
                      <View
                        style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="paperclip" size={20} color="#fff" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          Area Evaluation Form
                        </Text>
                      </View>
                      <Icon name="chevron-right" size={25} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    update_status == true && relation_data.length == 0
                      ? props.navigation.navigate('Relation Form', {
                        retrive_loan_data: retrive_staff_loan_data,
                      })
                      : update_status == true && relation_data.length > 0
                        ? props.navigation.navigate('Edit Relation', {
                          relation_data,
                        })
                        : ToastAndroid.show(
                          `Only update can modify`,
                          ToastAndroid.SHORT,
                        )
                  }
                  style={{
                    width: 250,
                    height: 40,
                    backgroundColor:
                      relation_data.length > 0 ? '#3E3E84' : '#242157',
                    margin: 10,
                  }}>
                  {relation_data.length > 0 ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 5,
                      }}>
                      <View
                        style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="check" size={20} color="#ede72d" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          RelationShip Form
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 5,
                      }}>
                      <View
                        style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="paperclip" size={20} color="#fff" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          RelationShip Form
                        </Text>
                      </View>
                      <Icon name="chevron-right" size={25} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginBottom: 16,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('Evidence', {
                      retrive_loan_data: retrive_staff_loan_data,
                    })
                  }
                  style={{
                    width: 250,
                    height: 40,
                    backgroundColor: '#242157',
                    margin: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      margin: 5,
                    }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                      <Icon name="paperclip" size={20} color="#fff" />
                      <Text style={{ color: '#fff', marginLeft: 5 }}>
                        Evidence Document Form
                      </Text>
                    </View>
                    <Icon name="chevron-right" size={25} color="#fff" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    update_status == true && exceptional_data.length == 0
                      ? props.navigation.navigate('Exceptional_Approvel_Form', {
                        retrive_loan_data: retrive_staff_loan_data,
                      })
                      : update_status == true && exceptional_data.length > 0
                        ? props.navigation.navigate(
                          'Edit_Exceptional_Approvel_Form',
                          { exceptional_data },
                        )
                        : ToastAndroid.show(
                          `Only update can modify`,
                          ToastAndroid.SHORT,
                        )
                  }
                  style={{
                    width: 250,
                    height: 40,
                    backgroundColor:
                      exceptional_data.length > 0 ? '#3E3E84' : '#242157',
                    margin: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      margin: 5,
                    }}>
                    {exceptional_data.length > 0 ? (
                      <View
                        style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="check" size={20} color="#ede72d" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          Exceptional Approval Request...
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="paperclip" size={20} color="#fff" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          Exceptional Approval Request...
                        </Text>
                        <Icon name="chevron-right" size={25} color="#fff" />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 250,
                    height: 40,
                    backgroundColor: '#242157',
                    margin: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      margin: 5,
                    }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                      <Icon name="paperclip" size={20} color="#fff" />
                      <Text style={{ color: '#fff', marginLeft: 5 }}>
                        Passport Photo
                      </Text>
                    </View>
                    <Icon name="chevron-right" size={25} color="#fff" />
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  marginBottom: 16,
                  justifyContent: 'center',
                }}>
                <Button
                  onPress={() => alert('Hello')}
                  mode="contained"
                  buttonColor={'#0480B7'}
                  style={{
                    borderRadius: 0,
                    width: 130,
                    height: 70,
                    borderRadius: 10,
                    justifyContent: 'center',
                  }}>
                  Save
                </Button>

                <Button
                  disabled={true}
                  mode="contained"
                  buttonColor={'#6870C3'}
                  style={{
                    borderRadius: 0,
                    width: 130,
                    height: 70,
                    borderRadius: 10,
                    justifyContent: 'center',
                    marginTop: 5,
                  }}>
                  Cancel
                </Button>
              </View>
            </View>
          </View>
        </BottomSheet>
      );
    }, [guarantor_data, exceptional_data, relation_data, evaluation_data]);

  useEffect(() => {
    loadData();
  }, []);
  console.log('retrive_staff_loan_data', retrive_staff_loan_data);
  useEffect(() => {

    retrive_staff_loan_data.loan_limit_amt
      ? setLoanLimitAmount(retrive_staff_loan_data.loan_limit_amt)
      : setLoanLimitAmount(0);
    //setWorkingMonth
    const staff_loan_data = Object.assign({}, retrive_staff_loan_data, {
      loan_cycle: retrive_staff_loan_data.loan_cycle
        ? retrive_staff_loan_data.loan_cycle.toString()
        : '',
      loanterm_cnt: retrive_staff_loan_data.loanterm_cnt
        ? retrive_staff_loan_data.loanterm_cnt.toString()
        : '',
      application_amt: retrive_staff_loan_data.application_amt
        ? retrive_staff_loan_data.application_amt.toString()
        : '',
      salary_amount: retrive_staff_loan_data.tot_sale_income
        ? retrive_staff_loan_data.tot_sale_income.toString()
        : '',
    });
    if (
      retrive_staff_loan_data.borrower_sign != '' &&
      retrive_staff_loan_data.borrower_sign != 'undefined'
    ) {
      setBorrowerSignPath(retrive_staff_loan_data.borrower_sign);
    }
    if (
      retrive_staff_loan_data.co_borrower_sign != '' &&
      retrive_staff_loan_data.co_borrower_sign != 'undefined'
    ) {
      setCoBorrowerSignPath(retrive_staff_loan_data.co_borrower_sign);
    }
    props.initialize(staff_loan_data);
    if (retrive_staff_loan_data.product_type == '20') {
      dispatch(
        change(
          'Edit_Individual_Staff_Loan_Form',
          'product_type',
          `Individual Staff Loan`,
        ),
      );
    }
    if (
      retrive_staff_loan_data.entry_date != '' &&
      retrive_staff_loan_data.entry_date != 'undefined'
    ) {
      const today = moment();
      const monthDiff = today.diff(retrive_staff_loan_data.entry_date, 'months'); // Calculate month difference
      console.log('monthDiff', monthDiff);
      setWorkingMonth(monthDiff);
    }
    console.log('staff_loan_data', staff_loan_data);
  }, []);

  const saveSignatureToInternalStorage = async (image_encode, index) => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      // Request write storage permission
      // const granted = await requestWriteStoragePermission();
      const granted = await AsyncStorage.getItem('writeStoragePermission');

      if (granted) {
        // Generate a unique filename for the image
        const filename = `20${user_id}${moment().format('YYYYMMDD')}${all_loandata.length + 1
          }SG${index}.jpg`;
        const directory = '/storage/emulated/0/Pictures/Signature/';
        const filePath = directory + filename;
        await RNFS.mkdir(directory);

        // Write the base64-encoded image data to the destination path
        await RNFS.writeFile(filePath, image_encode, 'base64');

        // Check if the file exists
        const fileExists = await RNFS.exists(filePath);
        return filePath;
      } else {
        console.log('Write storage permission denied.');
        return null;
      }
    } catch (error) {
      console.log('Error saving signature:', error);
      return null;
    }
  };

  const onSubmit = async values => {
    if (show_operation == '4') {
      await deleteStaffLoan_ByID(values).then(response => {
        if (response == 'success') {
          ToastAndroid.show('Delete Success', ToastAndroid.SHORT);
          props.navigation.navigate('Home');
        }
      });
    } else {
      try {
        // Save the images
        let borrowerImagePath, coBorrowerImagePath;
        if (show_borrower_sign) {
          borrowerImagePath = await saveSignatureToInternalStorage(
            show_borrower_sign,
            '01',
          );
        }

        if (show_coborrower_sign) {
          coBorrowerImagePath = await saveSignatureToInternalStorage(
            show_coborrower_sign,
            '02',
          );
        }
        const loan_data = Object.assign({}, values, {
          borrower_sign: borrowerImagePath
            ? borrowerImagePath
            : values.borrower_sign,
          co_borrower_sign: coBorrowerImagePath
            ? coBorrowerImagePath
            : values.co_borrower_sign,
          loan_limit_amt: loan_limit_amount,

          product_type: 20,
        });
        console.log('loan_data', loan_data);
        await updateLoanData(loan_data).then(result => {
          if (result == 'success') {
            dispatch(reset('Edit_Individual_Staff_Loan_Form'));

            ToastAndroid.show(`Update Successfully!`, ToastAndroid.SHORT);
            props.navigation.navigate('Home');
          }
        });
      } catch (error) {
        console.log('Error:', error);
      }
    }

  };

  const showCustomerSearch = () => {
    setModalVisible(true);
  };
  const hideModal = () => setModalVisible(false);
  const CoBorrowerhideModal = () => setCoBorrowerModalVisible(false);

  const hideCityModal = () => setCityCodeModalVisible(false);
  const hideTownshipModal = () => setTownshipCodeModalVisible(false);
  const hideVillageModal = () => setVillageCodeModalVisible(false);
  const hideWardModal = () => setWardCodeModalVisible(false);
  const hideLocationModal = () => setLocationModalVisible(false);

  const handleTownshipItemValueChange = itemValue => {
    setTownshipSelectedItemValue(itemValue);
  };
  const hideSignModal = () => {
    setCanvas(!show_canvas);
  };
  const handleVllageItemValueChange = itemValue => {
    setVillageSelectedItemValue(itemValue);
  };
  const handleWardItemValueChange = itemValue => {
    setWardSelectedItemValue(itemValue);
  };

  const handleLocationItemValueChange = itemValue => {
    setLocationSelectedItemValue(itemValue);
  };

  const showCitySearch = () => {
    setCityCodeModalVisible(true);
  };
  const handleCityItemValueChange = itemValue => {
    setCitySelectedItemValue(itemValue);
  };

  const showTownshipSearch = () => {
    setTownshipCodeModalVisible(true);
  };
  const showVillageSearch = () => {
    setVillageCodeModalVisible(true);
  };
  const showLocationSearch = () => {
    setLocationModalVisible(true);
  };
  const showWardSearch = () => {
    setWardCodeModalVisible(true);
  };
  const showCoBorrowerSearch = () => {
    setCoBorrowerModalVisible(true);
  };
  const _onSaveEvent = async result => {
    setShowBorrowerSign(result.encoded);
    if (result.encoded) {
      setBorrowerSignPath('');
    }

    setCanvas(false);
  };
  const resetSign = () => {
    sign.current.resetImage();
  };
  const co_borrower_resetSign = () => {
    co_borrower_sign.current.resetImage();
  };

  const _onDragEvent = () => {
    console.log('dragged');
  };
  const _onCoBorrowerSaveEvent = async result => {
    // setCoBorrowerSignPath(result.pathName);
    setShowCoBorrowerSign(result.encoded);
    if (result.encoded) {
      setCoBorrowerSignPath('');
    }

    setCoBorrowerCanvas(false);
  };
  const sign = createRef();
  const co_borrower_sign = createRef();
  const saveSign = async () => {
    const pathName = await sign.current.saveImage();
  };
  const co_borrower_saveSign = async () => {
    await co_borrower_sign.current.saveImage();
  };
  const hideCoBorrowerSignModal = () => {
    setCoBorrowerCanvas(!show_co_borrower_canvas);
  };
  const workingDateRef = useRef(null);

  const handleCalculate = () => {
    console.log('working_month', working_month);
    console.log('salary_amount', salary_amount);

    if (working_month >= 0 && working_month <= 5) {
      setLoanLimitAmount(0);
    } else if (working_month >= 6 && working_month <= 12) {
      setLoanLimitAmount(salary_amount * 1.5);
    } else if (working_month >= 13 && working_month <= 35) {
      setLoanLimitAmount(salary_amount * 2);
    } else if (36 >= 13 && working_month <= 10000) {
      setLoanLimitAmount(salary_amount * 3.5);
    } else {
      setLoanLimitAmount(0);
    }
  };
  const filtered_operations = operations.filter(item => item.value != 1);
  const btnChangeOperation = newValue => {
    setOperation(newValue);
    //Inquiry
    if (newValue == 2 || newValue == 4) {
      setStaffLoanUpdateStatus(false);
    } else {
      setStaffLoanUpdateStatus(true);
    }
  };
  useEffect(() => {
    if (update_status == true) {
      setOperation('3');
    }
  }, [update_status]);
  const handleItemValueChange = itemValue => {
    setSelectedItemValue(itemValue);
  };
  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Text style={style.title_style}>
              Individual Staff Loan Application
            </Text>
            <DividerLine />

            <View style={style.continer}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {filtered_operations.map((option, index) => (
                  <RadioButton.Group
                    key={index}
                    onValueChange={newValue => btnChangeOperation(newValue)}
                    value={show_operation}>
                    <View
                      key={option.value}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <RadioButton.Item
                        // disabled={option.value !== show_operation}
                        label={option.label}
                        value={option.value}
                        color="#000"
                        labelStyle={{ marginLeft: 5 }}
                      />
                    </View>
                  </RadioButton.Group>
                ))}
              </View>
              <Button
                disabled={
                  update_status == true && show_operation == '3'
                    ? false
                    : update_status == false && show_operation == '4'
                      ? false
                      : true
                }
                onPress={handleSubmit(onSubmit)}
                mode="contained"
                buttonColor={'#6870C3'}
                style={style.btnStyle}>
                OK
              </Button>
            </View>
            <DividerLine />

            <List.Accordion
              expanded={loanexpanded}
              onPress={handleLoanToggle}
              style={style.list_container}
              titleStyle={style.list_title}
              title="Loan Info">
              <View style={style.sub_container}>
                <View style={style.sub_list_container}>
                  <Field
                    name={'application_no'}
                    title={'Application No'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                    require
                  />

                  <Field
                    name={'product_type'}
                    title={'Product Type'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    data={loan_type}
                    name={'loan_type'}
                    title={'Type of Loan'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 300,
                    }}
                    enabled={update_status == true ? false : true}
                  />

                  <Field
                    name={'application_date'}
                    component={DatePicker}
                    label={'Application Date'}
                    icon={'calendar'}
                    editable={update_status == true ? false : true}
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'loan_cycle'}
                    title={'Loan Cycle'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                    editable={update_status == true ? false : true}
                  />

                  <Field
                    name={'loanterm_cnt'}
                    title={'Loan Term'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                    editable={update_status == true ? false : true}
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'application_amt'}
                    title={'Loan Apply Amount'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                    require
                    editable={update_status == true ? false : true}
                  />

                  <Field
                    name={'loan_code'}
                    title={'Loan Code'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable={update_status == true ? false : true}
                  />
                </View>
              </View>
            </List.Accordion>

            <Edit_Individual_staff_Emp_loan
              showCitySearch={showCitySearch}
              showCustomerSearch={showCustomerSearch}
              showTownshipSearch={showTownshipSearch}
              showVillageSearch={showVillageSearch}
              showWardSearch={showWardSearch}
              showLocationSearch={showLocationSearch}
              handleCalculate={handleCalculate}
              setWorkingMonth={setWorkingMonth}
              loan_limit_amount={loan_limit_amount}
              setLoanLimitAmount={setLoanLimitAmount}
              working_month={working_month}
              workingDateRef={workingDateRef}
            />
            <Edit_Individual_Staff_CoBorrower_Info
              showCoBorrowerSearch={showCoBorrowerSearch}
            />
            <Edit_Individual_staff_Contract />
            <Edit_Individual_Staff_Sign
              setCanvas={setCanvas}
              show_canvas={show_canvas}
              showCanvas={showCanvas}
              navigation={navigation}
              filePath={filePath}
              co_borrower_filePath={co_borrower_filePath}
              setCoBorrowerCanvas={setCoBorrowerCanvas}
              show_co_borrower_canvas={show_co_borrower_canvas}
              borrower_sign_path={borrower_sign_path}
              show_borrower_sign={show_borrower_sign}
              show_coborrower_sign={show_coborrower_sign}
              coborrower_sign_path={coborrower_sign_path}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      <RenderBottomSheet />

      <Emp_No_Search_modal
        hideModal={hideModal}
        modalVisible={modalVisible}
        setAllCus={setAllCus}
        all_cus={all_cus}
        selectedItemValue={selectedItemValue}
        handleItemValueChange={handleItemValueChange}
      />

      <City_Modal
        hideCityModal={hideCityModal}
        modal_city_visible={modal_city_visible}
        setCitySelectedItemValue={setCitySelectedItemValue}
        selectedCityItemValue={selectedCityItemValue}
        handleCityItemValueChange={handleCityItemValueChange}
        setAllCity={setAllCity}
        handleSubmit={handleSubmit}

      />

      <Township_Modal
        hideTownshipModal={hideTownshipModal}
        modal_township_visible={modal_township_visible}
        setTownshipSelectedItemValue={setTownshipSelectedItemValue}
        selectedTownshipItemValue={selectedTownshipItemValue}
        handleTownshipItemValueChange={handleTownshipItemValueChange}
        setAllTownship={setAllTownship}
        handleSubmit={handleSubmit}
      />

      <Village_Modal
        hideVillageModal={hideVillageModal}
        modal_village_visible={modal_village_visible}
        setTownshipSelectedItemValue={setTownshipSelectedItemValue}
        selectedVillageItemValue={selectedVillageItemValue}
        handleVllageItemValueChange={handleVllageItemValueChange}
        setAllVillage={setAllVillage}
        handleSubmit={handleSubmit}
        all_village={all_village}
      />

      <Ward_Modal
        hideWardModal={hideWardModal}
        modal_ward_visible={modal_ward_visible}
        setWardSelectedItemValue={setWardSelectedItemValue}
        selectedWardItemValue={selectedWardItemValue}
        handleWardItemValueChange={handleWardItemValueChange}
        setAllWard={setAllWard}
        handleSubmit={handleSubmit}
        all_ward={all_ward}
      />

      <Location_Modal
        hideLocationModal={hideLocationModal}
        modal_location_visible={modal_location_visible}
        setLocationSelectedItemValue={setLocationSelectedItemValue}
        selectedLocationItemValue={selectedLocationItemValue}
        handleLocationItemValueChange={handleLocationItemValueChange}
        setAllLocation={setAllLocation}
        handleSubmit={handleSubmit}
        all_location={all_location}
      />

      <CoBorrower_NRC_Search_modal
        CoBorrowerhideModal={CoBorrowerhideModal}
        co_borrower_modal_visible={co_borrower_modal_visible}
        setAllCoBorrower={setAllCoBorrower}
        all_co_borrower={all_co_borrower}
        selectedItemValue={selectedItemValue}
        handleItemValueChange={handleItemValueChange}

      />
      <Borrower_Sign_Modal
        show_canvas={show_canvas}
        hideSignModal={hideSignModal}
        setCanvas={setCanvas}
        _onSaveEvent={_onSaveEvent}
        _onDragEvent={_onDragEvent}
        saveSign={saveSign}
        resetSign={resetSign}
        sign={sign}
      />

      <Co_Borrower_Sign_Modal
        show_co_borrower_canvas={show_co_borrower_canvas}
        hideCoBorrowerSignModal={hideCoBorrowerSignModal}
        setCoBorrowerCanvas={setCoBorrowerCanvas}
        _onCoBorrowerSaveEvent={_onCoBorrowerSaveEvent}
        co_borrower_saveSign={co_borrower_saveSign}
        co_borrower_resetSign={co_borrower_resetSign}
        co_borrower_sign={co_borrower_sign}
      />
    </>
  );
}
const selector = formValueSelector('Edit_Individual_Staff_Loan_Form');

function mapStateToProps(state) {
  const entryDate = selector(state, 'entry_date');
  const salary_amount = selector(state, 'salary_amount');
  return {
    update_status: state.loan.staff_loan_update_status,
    retrive_staff_loan_data: state.loan.edit_loandata,
    entryDate,
    salary_amount,
  };
}

export default reduxForm({
  form: 'Edit_Individual_Staff_Loan_Form',
  validate,
})(
  connect(mapStateToProps, { setStaffLoanUpdateStatus })(
    Individual_Staff_loan_Info,
  ),
);
