import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  StyleSheet,
  PermissionsAndroid,
  TouchableHighlight,
} from 'react-native';
import React, { useState, useEffect, useRef, createRef } from 'react';
import DividerLine from '../../components/DividerLine';
import { style } from '../../style/Individual_Loan_style';
import { operations, city_code, Township_code, ward_code, village_code, location_code } from '../../common';
import RNFS from 'react-native-fs';
import Borrower_Modal from './Borrower_Modal';
// import {
//   SketchCanvas,
//   RNSketchCanvas,
// } from '@terrylinla/react-native-sketch-canvas';
// import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import SketchCanvas from '@terrylinla/react-native-sketch-canvas';
import {
  RadioButton,
  Button,
  List,
  Modal,
  Provider,
  Portal,
} from 'react-native-paper';
import { reduxForm, Field, change } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import TextInputFile from '../../components/TextInputFile';
import DropDownPicker from '../../components/DropDownPicker';
import { loan_type } from '../../common';
import DatePicker from '../../components/DatePicker';
import { Picker } from '@react-native-picker/picker';
import { emp_filter_item } from '../../common';
import { getAllLoan } from '../../query/AllLoan_query';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Borrower_Info from './Borrower_Info';
import Icon from 'react-native-vector-icons/Feather';
import { filterEmp } from '../../query/Employee_query';
import { filterCustomer } from '../../query/Customer_query';
import Co_Borrower_Info from './Co_Borrower_Info';
import Loan_Business_Info from './Loan_Business_Info';
import Borrower_Monthly_Income from './Borrower_Monthly_Income';
import { getAllLoanMax } from '../../query/LoanMax_query';
import Borrower_Current_Map from './Borrower_Current_Map';
import Borrower_Contract from './Borrower_Contract';
import Borrower_Sign from './Borrower_Sign';
import SignatureCapture from 'react-native-signature-capture';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { storeLoanData } from '../../query/AllLoan_query';
import { fetchEmpName } from '../../query/Employee_query';
import validate from './Validate';
// import RNFetchBlob from 'rn-fetch-blob';

const Borrower_modal = props => {
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
    await filterCustomer(selectedItemValue, values.searchtext)
      .then(data => (data.length > 0 ? setAllCus(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const btnSelectEmployee = item => {
    console.log('item', item.id);
    setSelectedValue(item.id);
    dispatch(change('Individual_Loan_Form', 'borrower_name', item.customer_nm));
    dispatch(
      change('Individual_Loan_Form', 'resident_rgst_id', item.resident_rgst_id),
    );
    dispatch(change('Individual_Loan_Form', 'customer_no', item.customer_no));
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

              <View style={{ width: '50%' }}>
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

const CoBorrower_modal = props => {
  const dispatch = useDispatch();
  const [co_borrowerselectedValue, setCoborrowerSelectedValue] = useState(null);

  const {
    all_co_borrower,
    co_borrower_modalVisible,
    hideCoBorrowerModal,
    selectedItemValue,
    handleItemValueChange,
    setAllCoBorrower,
    handleSubmit,
  } = props;
  const btnCusSearch = async values => {
    await filterCustomer(selectedItemValue, values.searchtext)
      .then(data =>
        data.length > 0 ? setAllCoBorrower(data) : alert('No data'),
      )
      .catch(error => console.log('error', error));
  };

  const btnSelectEmployee = item => {
    console.log('co item', item);
    setCoborrowerSelectedValue(item.id);
    dispatch(
      change('Individual_Loan_Form', 'co_brwer_rgst_id', item.resident_rgst_id),
    );
    dispatch(change('Individual_Loan_Form', 'co_brwer_name', item.customer_nm));
    dispatch(
      change('Individual_Loan_Form', 'co_customer_no', item.customer_no),
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
            status={
              co_borrowerselectedValue === item.id ? 'checked' : 'unchecked'
            }
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
          visible={co_borrower_modalVisible}
          onDismiss={hideCoBorrowerModal}
          contentContainerStyle={style.modal_container}>
          <View
            style={style.modal_header}
            onStartShouldSetResponder={() => hideCoBorrowerModal()}>
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

              <View style={{ width: '50%' }}>
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

            <FlatList
              data={all_co_borrower}
              renderItem={item}
              keyExtractor={(item, index) => index.toString()}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button
                onPress={() => hideCoBorrowerModal()}
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
    co_borrower_resetSignn,
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
              co_borrower_resetSignn();
            }}>
            <Text style={{ color: '#fff' }}>Reset</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const City_Modal = props => {
  const [city_selected, setCityselectedValue] = useState(null);

  const { handleSubmit, all_city, setAllCity, handleCityItemValueChange, selectedCityItemValue, modal_city_visible, hideCityModal, setCitySelectedItemValue } = props
  const btnCitySearch = async values => {
    await filterCustomer(selectedCityItemValue, values.searchtext)
      .then(data => (data.length > 0 ? setAllCity(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const btnSelectCity = item => {
    setCityselectedValue(item.id);
    dispatch(change('Individual_Loan_Form', 'city_code', item.city_code));
    dispatch(
      change('Individual_Loan_Form', 'city_name', item.city_name),
    );
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

              <View style={{ width: '50%' }}>
                <Field
                  name={'searchtext'}
                  component={TextInputFile}
                  input_mode
                  inputmax={20}
                  icon={'magnify'}
                  handleTextInputFocus={handleSubmit(btnCitySearch)}
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
  )
}

const Township_Modal = props => {
  const [township_selected, setTownshipselectedValue] = useState(null);

  const { handleSubmit, all_township, setAllTownship, handleTownshipItemValueChange, selectedTwonshipItemValue, modal_township_visible, hideTownshipModal, setTownshipSelectedItemValue } = props
  const btnTownshipSearch = async values => {
    await filterCustomer(selectedTwonshipItemValue, values.searchtext)
      .then(data => (data.length > 0 ? setAllTownship(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const btnSelectCity = item => {
    setTownshipselectedValue(item.id);
    dispatch(change('Individual_Loan_Form', 'township_code', item.township_code));
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

              <View style={{ width: '50%' }}>
                <Field
                  name={'searchtext'}
                  component={TextInputFile}
                  input_mode
                  inputmax={20}
                  icon={'magnify'}
                  handleTextInputFocus={handleSubmit(btnTownshipSearch)}
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
  )


}
const Village_Modal = props => {
  const [village_selected, setVillageselectedValue] = useState(null);

  const { hideVillageModal,
    modal_village_visible,
    setTownshipSelectedItemValue,
    selectedVillageItemValue,
    handleVllageItemValueChange,
    setAllVillage,
    handleSubmit, all_village } = props
  const btnVillageSearch = async values => {
    await filterCustomer(selectedVillageItemValue, values.searchtext)
      .then(data => (data.length > 0 ? setAllVillage(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const btnSelectVillage = item => {
    setVillageselectedValue(item.id);
    dispatch(change('Individual_Loan_Form', 'village_code', item.village_code));
    dispatch(
      change('Individual_Loan_Form', 'village_name', item.village_name),
    );
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

              <View style={{ width: '50%' }}>
                <Field
                  name={'searchtext'}
                  component={TextInputFile}
                  input_mode
                  inputmax={20}
                  icon={'magnify'}
                  handleTextInputFocus={handleSubmit(btnVillageSearch)}
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
  )


}

const Ward_Modal = props => {
  const [village_selected, setVillageselectedValue] = useState(null);
  console.log('modal_ward_visible', modal_ward_visible);
  const { hideWardModal,
    modal_ward_visible,
    setWardSelectedItemValue,
    selectedWardItemValue,
    handleWardItemValueChange,
    setAllWard,
    handleSubmit,
    all_ward } = props
  const btnWardSearch = async values => {
    await filterCustomer(selectedWardItemValue, values.searchtext)
      .then(data => (data.length > 0 ? setAllWard(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const btnSelectWard = item => {
    setVillageselectedValue(item.id);
    dispatch(change('Individual_Loan_Form', 'village_code', item.village_code));
    dispatch(
      change('Individual_Loan_Form', 'village_name', item.village_name),
    );
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
                <Field
                  name={'searchtext'}
                  component={TextInputFile}
                  input_mode
                  inputmax={20}
                  icon={'magnify'}
                  handleTextInputFocus={handleSubmit(btnWardSearch)}
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
  )


}

const Location_Modal = props => {
  const [location_selected, setLocationSelectedValue] = useState(null);
  const { hideLocationModal,
    modal_location_visible,
    setLocationSelectedItemValue,
    selectedLocationItemValue,
    handleLocationItemValueChange,
    setAllLocation,
    handleSubmit,
    all_location } = props
  const btnLocationSearch = async values => {
    await filterCustomer(selectedLocationItemValue, values.searchtext)
      .then(data => (data.length > 0 ? setAllLocation(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const btnSelectLocation = item => {
    setLocationSelectedValue(item.id);
    dispatch(change('Individual_Loan_Form', 'location_code', item.location_code));
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
                <Field
                  name={'searchtext'}
                  component={TextInputFile}
                  input_mode
                  inputmax={20}
                  icon={'magnify'}
                  handleTextInputFocus={handleSubmit(btnLocationSearch)}
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
  )


}



function Individual_Loan(props) {
  const dispatch = useDispatch();
  const [show_operation, setOperation] = useState('1');
  const [modalVisible, setModalVisible] = useState(false);
  const [co_borrower_modalVisible, setCoBorrowerModalVisible] = useState(false);
  const [selectedItemValue, setSelectedItemValue] = useState('employee_name');
  const [all_cus, setAllCus] = useState([]);
  const [all_co_borrower, setAllCoBorrower] = useState([]);
  const [loanexpanded, setLoanExpanded] = React.useState(true);
  const [loan_cycle_value, setLocanCycleValue] = useState('');
  const [loan_type_value, setLoanType] = useState();
  const [loan_max_data, setLoanMaxData] = useState([]);
  const [app_amount, setAppAmount] = useState(0);
  const [show_canvas, setCanvas] = useState(false);
  const [show_co_borrower_canvas, setCoBorrowerCanvas] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [co_borrower_filePath, setCoBorrowerFilePath] = useState('');
  const [empname, setEmpName] = useState('');
  const [modal_city_visible, setCityCodeModalVisible] = useState(false);
  const [modal_township_visible, setTownshipCodeModalVisible] = useState(false);
  const [selectedCityItemValue, setCitySelectedItemValue] = useState('city_code');
  const [all_city, setAllCity] = useState([]);
  const [selectedTownshipItemValue, setTownshipSelectedItemValue] = useState('township_code');
  const [selectedWardItemValue, setWardSelectedItemValue] = useState('ward_code');
  const [selectedVillageItemValue, setVillageSelectedItemValue] = useState('village_code');
  const [all_township, setAllTownship] = useState([]);
  const [all_village, setAllVillage] = useState([]);
  const [all_ward, setAllWard] = useState([]);
  const [all_location, setAllLocation] = useState([]);
  const [modal_village_visible, setVillageCodeModalVisible] = useState(false);
  const [modal_ward_visible, setWardCodeModalVisible] = useState(false);
  const [modal_location_visible, setLocationModalVisible] = useState(false);
  const [selectedLocationItemValue, setLocationSelectedItemValue] = useState('location_code');

  const { handleSubmit, totalnet, navigation } = props;
  const onSubmit = async values => {

    console.log('values', values);
    alert(JSON.stringify(values));
    await storeLoanData(values).then(result => {
      console.log(result);
    });
  };
  const showCustomerSearch = () => {
    setModalVisible(true);
  };
  const showCoBorrowerSearch = () => {
    setCoBorrowerModalVisible(true);
  };
  const showWardSearch = () => {
    setWardCodeModalVisible(true);
  };
  const handleItemValueChange = itemValue => {
    setSelectedItemValue(itemValue);
  };
  useEffect(() => {
    requestStoragePermission();
  }, []);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);

      if (
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Storage permissions granted');
      } else {
        console.log('Storage permissions denied');
      }
    } catch (error) {
      console.warn('Error requesting storage permissions:', error);
    }
  };
  const hideModal = () => setModalVisible(false);
  const hideCoBorrowerModal = () => setCoBorrowerModalVisible(false);

  const handleLoanToggle = () => {
    setLoanExpanded(!loanexpanded);
  };
  const loadData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    await getAllLoan().then(loan_data => {
      dispatch(
        change(
          'Individual_Loan_Form',
          'application_no',
          `10${user_id}TB${moment().format('YYYYMMDD')}${loan_data.length + 1}`,
        ),
      );
    });
    await getAllLoanMax().then(loan_max_data => {
      setLoanMaxData(loan_max_data);
      console.log('loan_max_data', loan_max_data);
    });

  };

  const hideSignModal = () => {
    setCanvas(!show_canvas);
  };
  const hideCoBorrowerSignModal = () => {
    setCoBorrowerCanvas(!show_co_borrower_canvas);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCalculate = () => {
    loan_max_data.map(value => {
      if (30 == loan_type_value) {
        dispatch(
          change('Individual_Loan_Form', 'loan_limit_amt', totalnet * 2),
        );
        setAppAmount(totalnet * 2);
      } else if (
        value.loan_cycle == loan_cycle_value &&
        value.loan_type == loan_type_value
      ) {
        dispatch(
          change(
            'Individual_Loan_Form',
            'loan_limit_amt',
            value.loan_limit_amount,
          ),
        );
        setAppAmount(value.loan_limit_amount);
      } else if (
        loan_cycle_value >= value.loan_cycle &&
        value.loan_type == loan_type_value
      ) {
        dispatch(
          change(
            'Individual_Loan_Form',
            'loan_limit_amt',
            value.loan_limit_amount,
          ),
        );
        setAppAmount(value.loan_limit_amount);
      }
    });
  };
  const saveSign = async () => {
    // sign.current.saveImage();

    const pathName = await sign.current.saveImage();
    console.log('pathName', pathName);

    // sign.current.saveImage().then(({ pathName }) => {
    //   RNFetchBlob.fs.mv(pathName, '/storage/emulated/0/Pictures/Signature.png')
    //     .then(() => {
    //       console.log('Signature saved successfully');
    //     })
    //     .catch((error) => {
    //       console.log('Error saving signature:', error);
    //     });
    // });
  };
  const co_borrower_saveSign = async () => {
    // sign.current.saveImage();

    const pathName = await co_borrower_sign.current.saveImage();
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

  const _onSaveEvent = async result => {
    // console.log('result',result.pathName);
    const pathName = result.pathName;
    // const targetPath = `${RNFS.ExternalStorageDirectoryPath}/Pictures/RNSketchCanvas//1.png`;
    // const fileName = `image_${Date.now()}.jpg`;
    // try {
    //   await RNFS.mkdir(RNFS.ExternalStorageDirectoryPath + '/Pictures/RNSketchCanvas/');
    //   await RNFS.moveFile(pathName, targetPath);

    //   console.log('Signature saved successfully');
    // } catch (error) {
    //   console.log('Error saving signature:', error);
    // }

    const directoryPath = `${RNFS.ExternalStorageDirectoryPath}/Pictures/RNSketchCanvas/`;
    let newFilePath;
    RNFS.mkdir(directoryPath)
      .then(() => {
        const fileName = `signature_${Date.now()}.png`;
        newFilePath = `${directoryPath}${fileName}`;
        console.log('old newFilePath', newFilePath);
        return RNFS.moveFile(pathName, newFilePath);
      })
      .then(() => {
        console.log('Signature saved successfully');
        console.log('newFilePath', newFilePath);
        setFilePath(newFilePath);
      })
      .catch(error => {
        console.log('Error saving signature:', error);
      });

    setCoBorrowerCanvas(false);
  };
  const _onCoBorrowerSaveEvent = async result => {
    // console.log('result',result.pathName);
    const pathName = result.pathName;
    // const targetPath = `${RNFS.ExternalStorageDirectoryPath}/Pictures/RNSketchCanvas//1.png`;
    // const fileName = `image_${Date.now()}.jpg`;
    // try {
    //   await RNFS.mkdir(RNFS.ExternalStorageDirectoryPath + '/Pictures/RNSketchCanvas/');
    //   await RNFS.moveFile(pathName, targetPath);

    //   console.log('Signature saved successfully');
    // } catch (error) {
    //   console.log('Error saving signature:', error);
    // }

    const directoryPath = `${RNFS.ExternalStorageDirectoryPath}/Pictures/RNSketchCanvas/`;
    let newFilePath;
    RNFS.mkdir(directoryPath)
      .then(() => {
        const fileName = `signature_${Date.now()}.png`;
        newFilePath = `${directoryPath}${fileName}`;
        console.log('old newFilePath', newFilePath);
        return RNFS.moveFile(pathName, newFilePath);
      })
      .then(() => {
        console.log('Signature saved successfully');
        console.log('newFilePath', newFilePath);
        setCoBorrowerFilePath(newFilePath);
      })
      .catch(error => {
        console.log('Error saving signature:', error);
      });

    setCanvas(false);
  };

  const hideCityModal = () => setCityCodeModalVisible(false);
  const hideTownshipModal = () => setTownshipCodeModalVisible(false);
  const hideVillageModal = () => setVillageCodeModalVisible(false);
  const hideWardModal = () => setWardCodeModalVisible(false);
  const hideLocationModal = () => setLocationModalVisible(false);

  const handleCityItemValueChange = itemValue => {
    setCitySelectedItemValue(itemValue);
  };
  const handleTownshipItemValueChange = itemValue => {
    setTownshipSelectedItemValue(itemValue);
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

  const sign = createRef();
  const co_borrower_sign = createRef();

  const showCitySearch = () => {
    setCityCodeModalVisible(true);
  }
  const showTownshipSearch = () => {
    setTownshipCodeModalVisible(true);
  }
  const showVillageSearch = () => {
    setVillageCodeModalVisible(true);
  }
  const showLocationSearch
    = () => {
      setLocationModalVisible(true);
    }



  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Text style={style.title_style}>Individual Loan Application</Text>
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
                  />

                  <Field
                    name={'product_type'}
                    title={'Product Type'}
                    component={TextInputFile}
                    cus_width
                    input_mode
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
                    onChange={value => setLocanCycleValue(value)}
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
                  />

                  <Field
                    name={'loan_code'}
                    title={'Loan Code'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'loan_charges'}
                    title={'Loan Charges'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                  />

                  <Field
                    name={'interest_rates'}
                    title={'Interest Rates'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                  />
                </View>
              </View>
            </List.Accordion>

            <Borrower_Info showCustomerSearch={showCustomerSearch}
              showCitySearch={showCitySearch}
              showTownshipSearch={showTownshipSearch}
              showVillageSearch={showVillageSearch}
              showWardSearch={showWardSearch} showLocationSearch={showLocationSearch} />



            <Co_Borrower_Info showCoBorrowerSearch={showCoBorrowerSearch}
            />
            <Loan_Business_Info />

            <Borrower_Monthly_Income
              handleCalculate={handleCalculate}
              app_amount={app_amount}
            />
            <Borrower_Current_Map />
            <Borrower_Contract />
            <Borrower_Sign
              setCanvas={setCanvas}
              show_canvas={show_canvas}
              showCanvas={showCanvas}
              navigation={navigation}
              filePath={filePath}
              co_borrower_filePath={co_borrower_filePath}
              setCoBorrowerCanvas={setCoBorrowerCanvas}
              show_co_borrower_canvas={show_co_borrower_canvas}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      <Borrower_modal
        handleSubmit={handleSubmit}
        setAllCus={setAllCus}
        modalVisible={modalVisible}
        hideModal={hideModal}
        handleItemValueChange={handleItemValueChange}
        selectedItemValue={selectedItemValue}
        all_cus={all_cus}
      />

      <CoBorrower_modal
        handleSubmit={handleSubmit}
        setAllCoBorrower={setAllCoBorrower}
        co_borrower_modalVisible={co_borrower_modalVisible}
        hideCoBorrowerModal={hideCoBorrowerModal}
        handleItemValueChange={handleItemValueChange}
        selectedItemValue={selectedItemValue}
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
      <City_Modal hideCityModal={hideCityModal}
        modal_city_visible={modal_city_visible}
        setCitySelectedItemValue={setCitySelectedItemValue}
        selectedCityItemValue={selectedCityItemValue}
        handleCityItemValueChange={handleCityItemValueChange}
        setAllCity={setAllCity} handleSubmit={handleSubmit} />

      <Township_Modal hideTownshipModal={hideTownshipModal}
        modal_township_visible={modal_township_visible}
        setTownshipSelectedItemValue={setTownshipSelectedItemValue}
        selectedTownshipItemValue={selectedTownshipItemValue}
        handleTownshipItemValueChange={handleTownshipItemValueChange}
        setAllTownship={setAllTownship} handleSubmit={handleSubmit} />

      <Village_Modal hideVillageModal={hideVillageModal}
        modal_village_visible={modal_village_visible}
        setTownshipSelectedItemValue={setTownshipSelectedItemValue}
        selectedVillageItemValue={selectedVillageItemValue}
        handleVllageItemValueChange={handleVllageItemValueChange}
        setAllVillage={setAllVillage}
        handleSubmit={handleSubmit} all_village={all_village} />

      <Ward_Modal hideWardModal={hideWardModal}
        modal_ward_visible={modal_ward_visible}
        setWardSelectedItemValue={setWardSelectedItemValue}
        selectedWardItemValue={selectedWardItemValue}
        handleWardItemValueChange={handleWardItemValueChange}
        setAllWard={setAllWard}
        handleSubmit={handleSubmit}
        all_ward={all_ward} />

      <Location_Modal hideLocationModal={hideLocationModal}
        modal_location_visible={modal_location_visible}
        setLocationSelectedItemValue={setLocationSelectedItemValue}
        selectedLocationItemValue={selectedLocationItemValue}
        handleLocationItemValueChange={handleLocationItemValueChange}
        setAllLocation={setAllLocation}
        handleSubmit={handleSubmit}
        all_location={all_location} />


    </>
  );
}

function mapStateToProps(state) {
  return {
    totalnet: state.monthly.totalnetincome,
  };
}

export default reduxForm({
  form: 'Individual_Loan_Form',
  validate,
})(connect(mapStateToProps, {})(Individual_Loan));
