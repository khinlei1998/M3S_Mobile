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
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect, useRef, createRef, useMemo} from 'react';
import DividerLine from '../../components/DividerLine';
import {style} from '../../style/Individual_Loan_style';
import {getExceptionalApproval} from '../../query/Exceptional_Approval_query';
import {updateLoanData} from '../../query/AllLoan_query';
import {
  operations,
  city_code,
  Township_code,
  ward_code,
  village_code,
  location_code,
} from '../../common';
import RNFS from 'react-native-fs';
import {getGuarantorData} from '../../query/Guarantor_query';
import {
  RadioButton,
  Button,
  List,
  Modal,
  Provider,
  Portal,
} from 'react-native-paper';
import {reduxForm, Field, change,reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import TextInputFile from '../../components/TextInputFile';
import DropDownPicker from '../../components/DropDownPicker';
import {loan_type, emp_filter_item} from '../../common';
import DatePicker from '../../components/DatePicker';
import {Picker} from '@react-native-picker/picker';
import {getAllLoan} from '../../query/AllLoan_query';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Borrower_Info from './Edit_Borrower_Info';
import Icon from 'react-native-vector-icons/Feather';
import {filterCustomer} from '../../query/Customer_query';
import Co_Borrower_Info from './Edit_Co_Borrower_Info';
import Loan_Business_Info from './EditLoan_Business_Info';
import Borrower_Monthly_Income from './Edit_Borrower_Monthly_Income';
import {getAllLoanMax} from '../../query/LoanMax_query';
import Borrower_Current_Map from './Edit_Borrower_Current_Map';
import Borrower_Contract from './Edit_Borrower_Contract';
import Borrower_Sign from './Edit_Borrower_Sign';
import SignatureCapture from 'react-native-signature-capture';
import {storeLoanData} from '../../query/AllLoan_query';
import validate from './Edit_loan_Validate';
import {TextInput} from 'react-native-paper';
import BottomSheet from 'react-native-simple-bottom-sheet';
import {
  resetMonthlyIncome,
  totalFamilyIncome,
  totalIncome,
  totalExpense,
  totalFamilyExpense,
  totalNetBusiness,
  totalNetFamily,
  updateTotalSum,
  totalLoanAmt,
} from '../../redux/MonthlyReducer';
import {getEvaluationData} from '../../query/AreaEvaluation_query';
import {deleteLoan_ByID} from '../../query/AllLoan_query';
// import RNFetchBlob from 'rn-fetch-blob';
import {useIsFocused} from '@react-navigation/native';
import {
  setUpdateStatus,
  setGuarantor_UpdateStatus,
} from '../../redux/LoanReducer';
import {getAllExceptionalApproval} from '../../query/Exceptional_Approval_query';
import {getRelationData} from '../../query/RelationShip_query';
import {cus_filter_item} from '../../common';
import {interest_rate} from '../../common';
// import {RenderBottomSheet} from '../../components/RenderBotttomSheet';
const Borrower_modal = props => {
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
    // alert('oo')
    await filterCustomer(selectedItemValue, emp_data)
      .then(data => (data.length > 0 ? setAllCus(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const btnSelectEmployee = item => {
    setSelectedValue(item.id);
    dispatch(
      change('Edit_Individual_Loan_Form', 'borrower_name', item.customer_nm),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'resident_rgst_id',
        item.resident_rgst_id,
      ),
    );
    dispatch(
      change('Edit_Individual_Loan_Form', 'customer_no', item.customer_no),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'saving_acct_num',
        item.saving_acct_num,
      ),
    );
    dispatch(change('Edit_Individual_Loan_Form', 'tel_no', item.tel_no));
    dispatch(change('Edit_Individual_Loan_Form', 'gender', item.gender));
    dispatch(
      change('Edit_Individual_Loan_Form', 'birth_date', item.birth_date),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'marital_status',
        item.marital_status,
      ),
    );
    dispatch(
      change('Edit_Individual_Loan_Form', 'address_type', item.address_type),
    );
    dispatch(change('Edit_Individual_Loan_Form', 'addr', item.addr));
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'curr_resident_date',
        item.curr_resident_date,
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'family_num',
        item.family_num ? item.family_num.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'hghschl_num',
        item.hghschl_num ? item.hghschl_num.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'university_num',
        item.university_num ? item.university_num.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'house_ocpn_type',
        item.house_ocpn_type ? item.house_ocpn_type.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'business_own_type',
        item.business_own_type,
      ),
    );
    //business info

    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'workplace_name',
        item.workplace_name,
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'workplace_type',
        item.workplace_type,
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'workplace_date',
        item.workplace_date,
      ),
    );
    dispatch(
      change('Edit_Individual_Loan_Form', 'employee_num', item.employee_num),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'co_borrower_address_type',
        item.co_borrower_address_type,
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'workplace_addr',
        item.workplace_addr,
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'curr_workplace_date',
        item.curr_workplace_date,
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'business_sttn_flg',
        item.business_sttn_flg,
      ),
    );
    dispatch(
      change('Edit_Individual_Loan_Form', 'land_own_type', item.land_own_type),
    );

    dispatch(
      change('Edit_Individual_Loan_Form', 'land_scale', item.land_scale),
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
                {/* <Field
                  name={'searchtext'}
                  component={TextInputFile}
                  input_mode
                  inputmax={20}
                  icon={'magnify'}
                  handleTextInputFocus={handleSubmit(btnCusSearch)}
                /> */}
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

const CoBorrower_modal = props => {
  const dispatch = useDispatch();
  const [co_borrowerselectedValue, setCoborrowerSelectedValue] = useState(null);
  const [co_borrower_data, setCoBorrowerText] = useState('');

  const {
    all_co_borrower,
    co_borrower_modalVisible,
    hideCoBorrowerModal,
    selectedItemValue,
    handleItemValueChange,
    setAllCoBorrower,
    handleSubmit,
  } = props;
  const btnCusSearch = async () => {
    await filterCustomer(selectedItemValue, co_borrower_data)
      .then(data =>
        data.length > 0 ? setAllCoBorrower(data) : alert('No data'),
      )
      .catch(error => console.log('error', error));
  };

  const btnSelectEmployee = item => {
    setCoborrowerSelectedValue(item.id);
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'co_brwer_rgst_id',
        item.resident_rgst_id,
      ),
    );
    dispatch(
      change('Edit_Individual_Loan_Form', 'co_brwer_name', item.customer_nm),
    );
    dispatch(
      change('Edit_Individual_Loan_Form', 'co_customer_no', item.customer_no),
    );
    dispatch(
      change('Edit_Individual_Loan_Form', 'co_brwer_birth_dt', item.birth_date),
    );
    dispatch(
      change('Edit_Individual_Loan_Form', 'co_brwer_tel_no', item.tel_no),
    );
    dispatch(
      change('Edit_Individual_Loan_Form', 'co_occupation', item.occupation),
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

  const onChangeCoBorrowerText = inputvalues => {
    setCoBorrowerText(inputvalues);
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

              <View style={{width: '50%'}}>
                {/* <Field
                  name={'searchtext'}
                  component={TextInputFile}
                  input_mode
                  inputmax={20}
                  icon={'magnify'}
                  handleTextInputFocus={handleSubmit(btnCusSearch)}
                /> */}
                <TextInput
                  style={{
                    backgroundColor: '#fff',
                    marginTop: 10,
                    width: 250,
                    borderColor: '#303030',
                    borderWidth: 0.5,
                  }}
                  value={co_borrower_data}
                  onChangeText={onChangeCoBorrowerText}
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
              co_borrower_resetSignn();
            }}>
            <Text style={{color: '#fff'}}>Reset</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
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

function Edit_Individual_Loan(props) {
  const dispatch = useDispatch();
  const [show_operation, setOperation] = useState('2');
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
  const [selectedCityItemValue, setCitySelectedItemValue] =
    useState('city_code');
  const [exceptional_data, setExceptionalData] = useState([]);
  const [guarantor_data, setGuarantorData] = useState([]);
  const [all_city, setAllCity] = useState([]);
  const [selectedTownshipItemValue, setTownshipSelectedItemValue] =
    useState('township_code');
  const [selectedWardItemValue, setWardSelectedItemValue] =
    useState('ward_code');
  const [selectedVillageItemValue, setVillageSelectedItemValue] =
    useState('village_code');
  const [all_township, setAllTownship] = useState([]);
  const [all_village, setAllVillage] = useState([]);
  const [all_ward, setAllWard] = useState([]);
  const [all_location, setAllLocation] = useState([]);
  const [modal_village_visible, setVillageCodeModalVisible] = useState(false);
  const [modal_ward_visible, setWardCodeModalVisible] = useState(false);
  const [modal_location_visible, setLocationModalVisible] = useState(false);
  const [borrower_sign_path, setBorrowerSignPath] = useState('');
  const [borrower_map, setBorrowerMap] = useState('');
  const [show_borrower_sign, setShowBorrowerSign] = useState('');
  const [coborrower_sign_path, setCoBorrowerSignPath] = useState('');
  const [show_coborrower_sign, setShowCoBorrowerSign] = useState('');
  const [renderCount, setRenderCount] = useState(0);
  const [relation_data, setRelationData] = useState([]);
  const [evaluation_data, setEvaluationData] = useState([]);

  // const [update_status, setUpdateStatus] = useState(false);
  const [selectedLocationItemValue, setLocationSelectedItemValue] =
    useState('location_code');
  const [all_loandata, setAllLoanData] = useState([]);
  const {
    retrive_loan_data,
    handleSubmit,
    totalnet,
    navigation,
    resetMonthlyIncome,
    totalFamilyIncome,
    totalIncome,
    totalExpense,
    totalFamilyExpense,
    totalNetBusiness,
    totalNetFamily,
    updateTotalSum,
    totalLoanAmt,
    update_status,
    setUpdateStatus,
    except_app_status,
    setGuarantor_UpdateStatus,
  } = props;
  console.log('retrive_loan_data', retrive_loan_data);
  useEffect(() => {
    const loan_data = Object.assign({}, retrive_loan_data, {
      loan_cycle: retrive_loan_data.loan_cycle
        ? retrive_loan_data.loan_cycle.toString()
        : '',
      loanterm_cnt: retrive_loan_data.loanterm_cnt
        ? retrive_loan_data.loanterm_cnt.toString()
        : '',
      application_amt: retrive_loan_data.application_amt
        ? retrive_loan_data.application_amt.toString()
        : '',
      family_num: retrive_loan_data.family_num
        ? retrive_loan_data.family_num.toString()
        : '',
      hghschl_num: retrive_loan_data.hghschl_num
        ? retrive_loan_data.hghschl_num.toString()
        : '',
      university_num: retrive_loan_data.university_num
        ? retrive_loan_data.university_num.toString()
        : '',
      employee_num: retrive_loan_data.employee_num
        ? retrive_loan_data.employee_num.toString()
        : '',
      land_scale: retrive_loan_data.land_scale
        ? retrive_loan_data.land_scale.toString()
        : '',

      tot_sale_income: retrive_loan_data.tot_sale_income
        ? retrive_loan_data.tot_sale_income.toString()
        : '',
      tot_sale_expense: retrive_loan_data.tot_sale_expense
        ? retrive_loan_data.tot_sale_expense.toString()
        : '',
      rawmaterial_expans: retrive_loan_data.rawmaterial_expans
        ? retrive_loan_data.rawmaterial_expans.toString()
        : '',
      wrkp_rent_expns: retrive_loan_data.wrkp_rent_expns
        ? retrive_loan_data.wrkp_rent_expns.toString()
        : '',
      employee_expns: retrive_loan_data.employee_expns
        ? retrive_loan_data.employee_expns.toString()
        : '',
      trnsrt_expns: retrive_loan_data.trnsrt_expns
        ? retrive_loan_data.trnsrt_expns.toString()
        : '',
      bus_utlbil_expns: retrive_loan_data.bus_utlbil_expns
        ? retrive_loan_data.bus_utlbil_expns.toString()
        : '',
      tel_expns: retrive_loan_data.tel_expns
        ? retrive_loan_data.tel_expns.toString()
        : '',
      tax_expns: retrive_loan_data.tax_expns
        ? retrive_loan_data.tax_expns.toString()
        : '',
      goods_loss_expns: retrive_loan_data.goods_loss_expns
        ? retrive_loan_data.goods_loss_expns.toString()
        : '',
      othr_expns_1: retrive_loan_data.othr_expns_1
        ? retrive_loan_data.othr_expns_1.toString()
        : '',
      othr_expns_2: retrive_loan_data.othr_expns_2
        ? retrive_loan_data.othr_expns_2.toString()
        : '',
      fmly_tot_income: retrive_loan_data.fmly_tot_income
        ? retrive_loan_data.fmly_tot_income.toString()
        : '',
      fmly_tot_expense: retrive_loan_data.fmly_tot_expense
        ? retrive_loan_data.fmly_tot_expense.toString()
        : '',
      food_expns: retrive_loan_data.food_expns
        ? retrive_loan_data.food_expns.toString()
        : '',
      house_mngt_expns: retrive_loan_data.house_mngt_expns
        ? retrive_loan_data.house_mngt_expns.toString()
        : '',
      utlbil_expns: retrive_loan_data.utlbil_expns
        ? retrive_loan_data.utlbil_expns.toString()
        : '',
      edct_expns: retrive_loan_data.edct_expns
        ? retrive_loan_data.edct_expns.toString()
        : '',
      healthy_expns: retrive_loan_data.healthy_expns
        ? retrive_loan_data.healthy_expns.toString()
        : '',
      fmly_trnsrt_expns: retrive_loan_data.fmly_trnsrt_expns
        ? retrive_loan_data.fmly_trnsrt_expns.toString()
        : '',
      fmly_tax_expns: retrive_loan_data.fmly_tax_expns
        ? retrive_loan_data.fmly_tax_expns.toString()
        : '',
      finance_expns: retrive_loan_data.finance_expns
        ? retrive_loan_data.finance_expns.toString()
        : '',
      fmly_otr_expns: retrive_loan_data.fmly_otr_expns
        ? retrive_loan_data.fmly_otr_expns.toString()
        : '',
    });
    if (
      retrive_loan_data.borrower_sign != '' &&
      retrive_loan_data.borrower_sign != 'undefined'
    ) {
      setBorrowerSignPath(retrive_loan_data.borrower_sign);
    }
    // if (
    //   retrive_loan_data.borrower_map != '' &&
    //   retrive_loan_data.borrower_map != 'undefined'
    // ) {
    //   setBorrowerMap(retrive_loan_data.borrower_map);
    // }
    if (
      retrive_loan_data.co_borrower_sign != '' &&
      retrive_loan_data.co_borrower_sign != 'undefined'
    ) {
      setCoBorrowerSignPath(retrive_loan_data.co_borrower_sign);
    }

    props.initialize(loan_data);
    if (retrive_loan_data.product_type == '40') {
      dispatch(
        change('Edit_Individual_Loan_Form', 'product_type', `Cover Loan`),
      );
    } else if (retrive_loan_data.product_type == '30') {
      dispatch(
        change('Edit_Individual_Loan_Form', 'product_type', `Group Loan`),
      );
    } else if (retrive_loan_data.product_type == '50') {
      dispatch(change('Edit_Individual_Loan_Form', 'product_type', `ReLoan`));
    } else {
      dispatch(
        change('Edit_Individual_Loan_Form', 'product_type', `Individual Loan`),
      );
    }
  }, []);

  useEffect(() => {
    totalIncome(
      retrive_loan_data.tot_sale_income
        ? parseFloat(retrive_loan_data.tot_sale_income)
        : 0,
    );
    totalExpense(
      retrive_loan_data.tot_sale_expense
        ? parseFloat(retrive_loan_data.tot_sale_expense)
        : 0,
    );
    totalFamilyIncome(
      retrive_loan_data.fmly_tot_income
        ? parseFloat(retrive_loan_data.fmly_tot_income)
        : 0,
    );
    totalFamilyExpense(
      retrive_loan_data.fmly_tot_expense
        ? parseFloat(retrive_loan_data.fmly_tot_expense)
        : 0,
    );
    updateTotalSum(
      retrive_loan_data.total_net ? parseFloat(retrive_loan_data.total_net) : 0,
    );
    totalLoanAmt(retrive_loan_data.loan_limit_amt);
  }, []);

  // const saveBorrowerSign = async (borrower_sign_path) => {
  //   const user_id = await AsyncStorage.getItem('user_id');
  //   const directoryPath = `${RNFS.ExternalStorageDirectoryPath}/Pictures/Signature/`;
  //   let newFilePath;

  //   try {
  //     await RNFS.mkdir(directoryPath);
  //     const fileName = `10${user_id}TB${moment().format('YYYYMMDD')}${all_loandata.length + 1}SG01.jpg`;
  //     newFilePath = `${directoryPath}${fileName}`;
  //     console.log('old newFilePath', newFilePath);
  //     await RNFS.moveFile(borrower_sign_path, newFilePath);
  //     console.log('Signature saved successfully');
  //     console.log('newFilePath', newFilePath);
  //     // setBorrowerSignPath(newFilePath);
  //     return newFilePath;
  //   } catch (error) {
  //     console.log('Error saving signature:', error);
  //     throw error;
  //   }
  // };

  // const saveCoBorrowerSign = async (coborrower_sign_path, suffix) => {
  //   const user_id = await AsyncStorage.getItem('user_id');
  //   const directoryPath = `${RNFS.ExternalStorageDirectoryPath}/Pictures/Signature/`;
  //   let newFilePath;

  //   try {
  //     await RNFS.mkdir(directoryPath);
  //     const fileName = `10${user_id}TB${moment().format('YYYYMMDD')}${all_loandata.length + 1}SG02.jpg`;
  //     newFilePath = `${directoryPath}${fileName}`;
  //     console.log('coborrower old newFilePath', newFilePath);
  //     await RNFS.moveFile(coborrower_sign_path, newFilePath);
  //     console.log('Signature saved successfully');
  //     console.log('Co newFilePath', newFilePath);
  //     // setBorrowerSignPath(newFilePath);
  //     return newFilePath;
  //   } catch (error) {
  //     console.log('Error saving signature:', error);
  //     throw error;
  //   }
  // };

  // const saveSignatureToInternalStorage = async (signatureData, index) => {
  //   const user_id = await AsyncStorage.getItem('user_id');
  //   try {
  //     // Get the path to the application's internal storage directory
  //     const internalDir = RNFS.DocumentDirectoryPath;
  //     console.log('internalDir', internalDir);

  //     // Create the target directory path
  //     const directoryPath = `${internalDir}/SignatureImages`;

  //     // Check if the directory exists, and create it if it doesn't
  //     const dirExists = await RNFS.exists(directoryPath);
  //     if (!dirExists) {
  //       await RNFS.mkdir(directoryPath);
  //     }

  //     // Generate a unique file name for the signature image
  //     const fileName = `10${user_id}TB${moment().format('YYYYMMDD')}${
  //       all_loandata.length + 1
  //     }SG${index}.jpg`;

  //     // Construct the file path
  //     const filePath = `${directoryPath}/${fileName}`;

  //     // Save the signature image to the internal storage
  //     await RNFS.writeFile(filePath, signatureData, 'base64');

  //     console.log('Signature saved successfully:', filePath);
  //     return fileName;
  //   } catch (error) {
  //     console.log('Error saving signature:', error);
  //     throw error;
  //   }
  // };
  const saveSignatureToInternalStorage = async (image_encode, index) => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      // Request write storage permission
      // const granted = await requestWriteStoragePermission();
      const granted = await AsyncStorage.getItem('writeStoragePermission');

      if (granted) {
        // Generate a unique filename for the image
        const filename = `10${user_id}${moment().format('YYYYMMDD')}${
          all_loandata.length + 1
        }SG${index}.jpg`;
        const directory = '/storage/emulated/0/Pictures/Signature/';
        const filePath = directory + filename;
        await RNFS.mkdir(directory);

        // Write the base64-encoded image data to the destination path
        await RNFS.writeFile(filePath, image_encode, 'base64');

        // Check if the file exists
        const fileExists = await RNFS.exists(filePath);
        console.log('File exists:', fileExists);

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
      await deleteLoan_ByID(values).then(response => {
        if (response == 'success') {
          alert('Delete Success');
          // setUpdateStatus(false);
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
          console.log(
            'Co-Borrower image saved successfully:',
            coBorrowerImagePath,
          );
        }

        const loan_data = Object.assign({}, values, {
          borrower_sign: borrowerImagePath
            ? borrowerImagePath
            : values.borrower_sign,
          co_borrower_sign: coBorrowerImagePath
            ? coBorrowerImagePath
            : values.co_borrower_sign,
            product_type:10
        });
        await updateLoanData(loan_data).then(result => {
          if (result == 'success') {
            dispatch(reset('Edit_Individual_Loan_Form'));
            resetMonthlyIncome();

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
      } else {
        console.log('Storage permissions denied');
      }
    } catch (error) {
      console.warn('Error requesting storage permissions:', error);
    }
  };
  const isFocused = useIsFocused();
  const hideModal = () => setModalVisible(false);
  const hideCoBorrowerModal = () => setCoBorrowerModalVisible(false);

  const handleLoanToggle = () => {
    setLoanExpanded(!loanexpanded);
  };
  const loadData = async () => {
    setRenderCount(prevCount => prevCount + 1);
    const user_id = await AsyncStorage.getItem('user_id');

    await getAllLoan().then(loan_data => {
      setAllLoanData(loan_data);
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
    });
    await getExceptionalApproval(retrive_loan_data.application_no).then(
      data => {
        setExceptionalData(data);
      },
    );
    await getGuarantorData(retrive_loan_data.application_no).then(data => {
      setGuarantorData(data);
    });
    await getRelationData(retrive_loan_data.application_no).then(data => {
      setRelationData(data);
    });
    await getEvaluationData(retrive_loan_data.application_no).then(data => {
      setEvaluationData(data);
    });

    const fileExists = await RNFS.exists(
      `/storage/emulated/0/Pictures/RNSketchCanvas/${retrive_loan_data.application_no}MP01.jpg`,
    );
    console.log('sync file exist', fileExists);

    if (fileExists) {
      setBorrowerMap(
        `/storage/emulated/0/Pictures/RNSketchCanvas/${retrive_loan_data.application_no}MP01.jpg`,
      );
    }
  };

  const hideSignModal = () => {
    setCanvas(!show_canvas);
  };
  const hideCoBorrowerSignModal = () => {
    setCoBorrowerCanvas(!show_co_borrower_canvas);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  useEffect(() => {
    if (update_status == true) {
      setOperation('3');
    }
  }, [update_status]);

  const handleCalculate = () => {
    loan_max_data.map(value => {
      if (30 == loan_type_value) {
        dispatch(
          change('Edit_Individual_Loan_Form', 'loan_limit_amt', totalnet * 2),
        );
        setAppAmount(totalnet * 2);
        totalLoanAmt(totalnet * 2);
      } else if (
        value.loan_cycle == loan_cycle_value &&
        value.loan_type == loan_type_value
      ) {
        dispatch(
          change(
            'Edit_Individual_Loan_Form',
            'loan_limit_amt',
            value.loan_limit_amount,
          ),
        );
        setAppAmount(value.loan_limit_amount);
        totalLoanAmt(value.loan_limit_amount);
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
        totalLoanAmt(value.loan_limit_amount);
      }
    });
  };
  const saveSign = async () => {
    // sign.current.saveImage();

    const pathName = await sign.current.saveImage();
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
    setShowBorrowerSign(result.encoded);
    if (result.encoded) {
      setBorrowerSignPath('');
    }
    setCanvas(false);
  };
  const _onCoBorrowerSaveEvent = async result => {
    // setCoBorrowerSignPath(result.pathName);
    setShowCoBorrowerSign(result.encoded);
    if (result.encoded) {
      setCoBorrowerSignPath('');
    }

    setCoBorrowerCanvas(false);
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
  const filtered_operations = operations.filter(item => item.value != 1);
  const btnChangeOperation = newValue => {
    setOperation(newValue);
    if (newValue == 2 || newValue == 4) {
      setUpdateStatus(false);
    } else {
      setUpdateStatus(true);
    }
  };

  const RenderBottomSheet = () =>
    useMemo(() => {
      return (
        <BottomSheet isOpen={false} wrapperStyle={{backgroundColor: '#3E3E84'}}>
          <View style={{padding: 5, marginLeft: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="paperclip" size={25} color="#fff" />
              <Text style={{color: '#fff', fontSize: 20, marginLeft: 10}}>
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
                          retrive_loan_data,
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
                        style={{alignItems: 'center', flexDirection: 'row'}}>
                        <Icon name="check" size={20} color="#ede72d" />
                        <Text style={{color: '#fff', marginLeft: 5}}>
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
                        style={{alignItems: 'center', flexDirection: 'row'}}>
                        <Icon name="paperclip" size={20} color="#fff" />
                        <Text style={{color: '#fff', marginLeft: 5}}>
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
                          retrive_loan_data,
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
                  //     retrive_loan_data,
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
                        style={{alignItems: 'center', flexDirection: 'row'}}>
                        <Icon name="check" size={20} color="#ede72d" />
                        <Text style={{color: '#fff', marginLeft: 5}}>
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
                        style={{alignItems: 'center', flexDirection: 'row'}}>
                        <Icon name="paperclip" size={20} color="#fff" />
                        <Text style={{color: '#fff', marginLeft: 5}}>
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
                          retrive_loan_data,
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
                        style={{alignItems: 'center', flexDirection: 'row'}}>
                        <Icon name="check" size={20} color="#ede72d" />
                        <Text style={{color: '#fff', marginLeft: 5}}>
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
                        style={{alignItems: 'center', flexDirection: 'row'}}>
                        <Icon name="paperclip" size={20} color="#fff" />
                        <Text style={{color: '#fff', marginLeft: 5}}>
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
                      retrive_loan_data,
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
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                      <Icon name="paperclip" size={20} color="#fff" />
                      <Text style={{color: '#fff', marginLeft: 5}}>
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
                          retrive_loan_data,
                        })
                      : update_status == true && exceptional_data.length > 0
                      ? props.navigation.navigate(
                          'Edit_Exceptional_Approvel_Form',
                          {exceptional_data},
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
                        style={{alignItems: 'center', flexDirection: 'row'}}>
                        <Icon name="check" size={20} color="#ede72d" />
                        <Text style={{color: '#fff', marginLeft: 5}}>
                          Exceptional Approval Request...
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{alignItems: 'center', flexDirection: 'row'}}>
                        <Icon name="paperclip" size={20} color="#fff" />
                        <Text style={{color: '#fff', marginLeft: 5}}>
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
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                      <Icon name="paperclip" size={20} color="#fff" />
                      <Text style={{color: '#fff', marginLeft: 5}}>
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

  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Text style={style.title_style}>Individual Loan Application</Text>
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
                        label={option.label}
                        value={option.value}
                        color="#000"
                        labelStyle={{marginLeft: 5}}
                        // disabled={
                        //   option.value === '3'
                        // }
                        //&& filtered_cus_data.sync_status === '02'
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
                  />

                  <Field
                    name={'product_type'}
                    title={'Product Type'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable={update_status == true ? false : true}
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
                    onChange={value => setLocanCycleValue(value)}
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

                <View style={style.sub_list_container}>
                  <Field
                    name={'loan_charges'}
                    title={'Loan Charges'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                    editable={update_status == true ? false : true}
                  />

                  <Field
                    data={interest_rate}
                    name={'interest_rates'}
                    title={'Interest Rates'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 300,
                    }}
                    enabled={update_status == true ? false : true}
                  />
                </View>
              </View>
            </List.Accordion>

            <Borrower_Info
              showCustomerSearch={showCustomerSearch}
              showCitySearch={showCitySearch}
              showTownshipSearch={showTownshipSearch}
              showVillageSearch={showVillageSearch}
              showWardSearch={showWardSearch}
              showLocationSearch={showLocationSearch}
            />

            <Co_Borrower_Info showCoBorrowerSearch={showCoBorrowerSearch} />
            <Loan_Business_Info />

            <Borrower_Monthly_Income
              handleCalculate={handleCalculate}
              app_amount={app_amount}
            />
            <Borrower_Current_Map
              borrower_map={borrower_map}
              navigation={navigation}
              // has_borrower_map={
              //   retrive_loan_data && retrive_loan_data.borrower_map
              // }
            />
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
              all_loandata={all_loandata}
              borrower_sign_path={borrower_sign_path}
              show_borrower_sign={show_borrower_sign}
              show_coborrower_sign={show_coborrower_sign}
              coborrower_sign_path={coborrower_sign_path}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      <RenderBottomSheet />

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
    </>
  );
}

function mapStateToProps(state) {
  return {
    totalnet: state.monthly.totalnetincome,
    retrive_loan_data: state.loan.edit_loandata,
    update_status: state.loan.update_status,
    except_app_status: state.loan.except_app_status,
  };
}

export default reduxForm({
  form: 'Edit_Individual_Loan_Form',
  // validate,
})(
  connect(mapStateToProps, {
    totalFamilyIncome,
    totalIncome,
    totalExpense,
    totalFamilyExpense,
    totalNetBusiness,
    totalNetFamily,
    updateTotalSum,
    resetMonthlyIncome,
    totalLoanAmt,
    setUpdateStatus,
    setGuarantor_UpdateStatus,
  })(Edit_Individual_Loan),
);
