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
import React, {useState, useEffect, useRef, createRef} from 'react';
import DividerLine from '../../components/DividerLine';
import {style} from '../../style/Individula_staff_Loan_Style';
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
import {reduxForm, Field, change, reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';
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
import Individual_staff_Emp_loan from './Individual_staff_Emp_loan';
import Invidual_Staff_CoBorrower_Info from './Invidual_Staff_CoBorrower_Info';
import Individual_staff_Contract from './Individual_staff_Contract';
import Individual_Staff_Sign from './Individual_Staff_Sign';
import {getAllLoan} from '../../query/AllLoan_query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {filterCustomer} from '../../query/Customer_query';
import {getAllCustomer} from '../../query/Customer_query';
import SignatureCapture from 'react-native-signature-capture';

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
        <View style={{flexDirection: 'row'}}>
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
            <Text style={{color: '#fff'}}>Save</Text>
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
            <Text style={{color: '#fff'}}>Reset</Text>
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
        <View style={{flexDirection: 'row'}}>
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
            <Text style={{color: '#fff'}}>Save</Text>
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
            <Text style={{color: '#fff'}}>Reset</Text>
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
  } = props;

  const onChangeEmpText = inputText => {
    setEmpData(inputText);
  };

  const btnCusSearch = async () => {
    await filterCustomer(selectedItemValue, emp_data)
      .then(data => (data.length > 0 ? setAllCus(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };
  const btnSelectEmployee = item => {
    setSelectedValue(item.id);
    dispatch(
      change('Individual_Staff_Loan_Form', 'borrower_name', item.customer_nm),
    );
    dispatch(
      change(
        'Individual_Staff_Loan_Form',
        'resident_rgst_id',
        item.resident_rgst_id,
      ),
    );
    dispatch(
      change('Individual_Staff_Loan_Form', 'employee_no', item.customer_no),
    );
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
          {item.customer_no}
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
            status={selectedValue === item.id ? 'checked' : 'unchecked'}
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

              <View style={{width: '40%'}}>
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
    await filterCustomer(selectedItemValue, cus_data)
      .then(data =>
        data.length > 0 ? setAllCoBorrower(data) : alert('No data'),
      )
      .catch(error => console.log('error', error));
  };
  const btnSelectCustomer = item => {
    console.log('item', item);
    setSelectedValue(item.id);
    dispatch(
      change('Individual_Staff_Loan_Form', 'co_brwer_name', item.customer_nm),
    );
    dispatch(
      change(
        'Individual_Staff_Loan_Form',
        'resident_rgst_id',
        item.resident_rgst_id,
      ),
    );
    dispatch(
      change(
        'Individual_Staff_Loan_Form',
        'co_brwer_rgst_id',
        item.resident_rgst_id,
      ),
    );
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

              <View style={{width: '40%'}}>
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

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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

  const city_item = ({item, index}) => {
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{marginRight: 10}}>Search Item:</Text>

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

              <View style={{width: '40%'}}>
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

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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

  const township_item = ({item, index}) => {
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{marginRight: 10}}>Search Item:</Text>

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

              <View style={{width: '40%'}}>
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

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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

  const village_item = ({item, index}) => {
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{marginRight: 10}}>Search Item:</Text>

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

              <View style={{width: '40%'}}>
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

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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

  const ward_item = ({item, index}) => {
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{marginRight: 10}}>Search Item:</Text>

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

              <View style={{width: '50%'}}>
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

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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

  const location_item = ({item, index}) => {
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{marginRight: 10}}>Search Item:</Text>

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

              <View style={{width: '50%'}}>
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

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
  const {navigation}=props
  const dispatch = useDispatch();

  const [show_operation, setOperation] = useState('1');
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

  const {handleSubmit} = props;
  const handleLoanToggle = () => {
    setLoanExpanded(!loanexpanded);
  };

  const [show_co_borrower_canvas, setCoBorrowerCanvas] = useState(false);

  const loadData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    await getAllLoan().then(loan_data => {
      console.log('loan_data', loan_data);
      setAllLoanData(loan_data);
      dispatch(
        change(
          'Individual_Staff_Loan_Form',
          'application_no',
          `20${user_id}TB${moment().format('YYYYMMDD')}${loan_data.length + 1}`,
        ),
      );
      dispatch(
        change(
          'Individual_Staff_Loan_Form',
          'product_type',
          `Individual Staff Loan`,
        ),
      );
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = () => {};
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
    setBorrowerSignPath(result.pathName);
    setShowBorrowerSign(result.encoded);
    // if (result && result.encoded) {
    //   try {
    //     // Save the signature to the internal storage
    //     const savedFilePath = await saveSignatureToInternalStorage(result.encoded);

    //     // Do something with the saved file path
    //     console.log('Saved signature file path:', savedFilePath);
    //   } catch (error) {
    //     // Handle the error
    //     console.log('Error:', error);
    //   }
    // }
    // setBorrowerSignPath(result.pathName);
    // setShowBorrowerSign(result.encoded)

    // const pathName = result.pathName;
    // console.log('pathName', pathName);
    // const user_id = await AsyncStorage.getItem('user_id');

    // const directoryPath = `${RNFS.ExternalStorageDirectoryPath}/Pictures/Signature/`;
    // let newFilePath;
    // //RNFS.mkdir(directoryPath) is called to create the directory if it doesn't exist
    // RNFS.mkdir(directoryPath)
    //   .then(() => {
    //     const fileName = `10${user_id}TB${moment().format('YYYYMMDD')}${all_loandata.length + 1}SG01.jpg`;
    //     newFilePath = `${directoryPath}${fileName}`;
    //     console.log('old newFilePath', newFilePath);
    //     //to move the signature image from its current pathName to the new newFilePath
    //     return RNFS.moveFile(pathName, newFilePath);
    //   })
    //   .then(() => {
    //     console.log('Signature saved successfully');
    //     console.log('newFilePath', newFilePath);
    //     setBorrowerSignPath(newFilePath)
    //   })
    //   .catch(error => {
    //     console.log('Error saving signature:', error);
    //   });

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
    setCoBorrowerSignPath(result.pathName);
    setShowCoBorrowerSign(result.encoded);

    setCoBorrowerCanvas(false);
  };
  const sign = createRef();
  const co_borrower_sign = createRef();
  const saveSign = async () => {
    // sign.current.saveImage();

    const pathName = await sign.current.saveImage();
    console.log('pathName', pathName);
  };
  const co_borrower_saveSign = async () => {
    // sign.current.saveImage();

    const pathName = await co_borrower_sign.current.saveImage();
  };
  const hideCoBorrowerSignModal = () => {
    setCoBorrowerCanvas(!show_co_borrower_canvas);
  };
  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Text style={style.title_style}>
              Individual Staff Loan Application
            </Text>
            <DividerLine />

            <View style={style.continer}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {operations.map((option, index) => (
                  <RadioButton.Group
                    key={index}
                    onValueChange={newValue => setOperation(newValue)}
                    value={show_operation}>
                    <View
                      key={option.value}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <RadioButton.Item
                        disabled={option.value !== show_operation}
                        label={option.label}
                        value={option.value}
                        color="#000"
                        labelStyle={{marginLeft: 5}}
                      />
                    </View>
                  </RadioButton.Group>
                ))}
              </View>
              <Button
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
                    onChange={value => setLoanType(value)}
                  />

                  <Field
                    name={'application_date'}
                    component={DatePicker}
                    label={'Application Date'}
                    icon={'calendar'}
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
                  />

                  <Field
                    name={'loanterm_cnt'}
                    title={'Loan Term'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
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
                  />

                  <Field
                    name={'loan_code'}
                    title={'Loan Code'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                  />
                </View>
              </View>
            </List.Accordion>

            <Individual_staff_Emp_loan
              showCitySearch={showCitySearch}
              showCustomerSearch={showCustomerSearch}
              showTownshipSearch={showTownshipSearch}
              showVillageSearch={showVillageSearch}
              showWardSearch={showWardSearch}
              showLocationSearch={showLocationSearch}
            />
            <Invidual_Staff_CoBorrower_Info
              showCoBorrowerSearch={showCoBorrowerSearch}
            />
            <Individual_staff_Contract />
            <Individual_Staff_Sign
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
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      <Emp_No_Search_modal
        hideModal={hideModal}
        modalVisible={modalVisible}
        setAllCus={setAllCus}
        all_cus={all_cus}
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

function mapStateToProps(state) {
  return {};
}

export default reduxForm({
  form: 'Individual_Staff_Loan_Form',
  // validate,
})(connect(mapStateToProps, {})(Individual_Staff_loan_Info));