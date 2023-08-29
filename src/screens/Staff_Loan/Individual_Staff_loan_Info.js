import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import React, { useState, useEffect, useRef, createRef } from 'react';
import DividerLine from '../../components/DividerLine';
import { style } from '../../style/Individula_staff_Loan_Style';
import {
  operations,
  loan_type,
  emp_filter_item,
  cus_filter_item,
  sav_product_type,
} from '../../common';
import { reduxForm, Field, change, reset, formValueSelector } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import validate from './Validate';
import { RenderBottomSheet } from '../../components/RenderBotttomSheet';
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
import { getAllLoan } from '../../query/AllLoan_query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { filterCustomer } from '../../query/Customer_query';
import SignatureCapture from 'react-native-signature-capture';
import RNFS from 'react-native-fs';
import { storeStaffLoanData } from '../../query/StaffLoan_query';
import { filterCustomerByEmpno } from '../../query/Customer_query';
import { filterTownship } from '../../query/Township_query';
import City_Modal from '../../components/City_Modal';
import Township_Modal from '../../components/Township_Modal';
import Village_Modal from '../../components/Village_Modal';
import { filterVillage } from '../../query/Village_query';
import Ward_Model from '../../components/Ward_Model';
import { filterWard } from '../../query/Ward_query';
import Location_Modal from '../../components/Location_Modal';
import { filterLocation, filterCity } from '../../query/CodeInfo_quey';
import { useTranslation } from 'react-i18next';

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

const Cus_No_Search_modal = props => {
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
    setBorrowerName,
    setLoanLimitAmount
  } = props;
  const { t } = useTranslation();

  const onChangeEmpText = inputText => {
    setEmpData(inputText);
  };

  const btnEmpSearch = async () => {
    await filterCustomerByEmpno(selectedItemValue, emp_data)
      .then(data => (data.length > 0 ? setAllCus(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };
  const btnSelectEmployee = item => {
    setLoanLimitAmount(0)
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
      change('Individual_Staff_Loan_Form', 'employee_no', item.employee_no),
    );
    dispatch(
      change('Individual_Staff_Loan_Form', 'entry_date', item.entry_date),
    );
    dispatch(
      change(
        'Individual_Staff_Loan_Form',
        'position_title_nm',
        item.position_title_nm,
      ),
    );
    dispatch(
      change('Individual_Staff_Loan_Form', 'branch_code', item.branch_code),
    );
    dispatch(
      change(
        'Individual_Staff_Loan_Form',
        'salary_rating_code',
        JSON.stringify(item.salary_rating_code),
      ),
    );
    dispatch(
      change('Individual_Staff_Loan_Form', 'customer_no', item.customer_no),
    );
    dispatch(
      change(
        'Individual_Staff_Loan_Form',
        'saving_acct_num',
        item.saving_acct_num,
      ),
    );
    dispatch(change('Individual_Staff_Loan_Form', 'tel_no', item.tel_no));
    dispatch(change('Individual_Staff_Loan_Form', 'gender', item.gender));
    dispatch(
      change('Individual_Staff_Loan_Form', 'birth_date', item.birth_date),
    );
    dispatch(
      change(
        'Individual_Staff_Loan_Form',
        'marital_status',
        JSON.stringify(item.marital_status),
      ),
    );
    dispatch(
      change(
        'Individual_Staff_Loan_Form',
        'address_type',
        JSON.stringify(item.address_type),
      ),
    );
    dispatch(change('Individual_Staff_Loan_Form', 'addr', item.addr));
    dispatch(
      change(
        'Individual_Staff_Loan_Form',
        'salary_amount',
        JSON.stringify(item.tot_sale_income),
      ),
    );
    setBorrowerName(item.customer_nm)
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
                buttonColor={'#21316C'}
                style={{
                  borderRadius: 0,
                  width: 115,
                  marginTop: 10,
                  color: 'black',
                  marginLeft: 5,
                }}>
                {t("OK")}
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
  const { t } = useTranslation();
  const {
    CoBorrowerhideModal,
    co_borrower_modal_visible,
    setAllCoBorrower,
    all_co_borrower,
    selectedItemValue,
    handleItemValueChange,
    setCoBorrowerName
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
    setSelectedValue(item.id);
    dispatch(
      change(
        'Individual_Staff_Loan_Form',
        'co_customer_no',
        item.co_customer_no,
      ),
    );
    dispatch(
      change('Individual_Staff_Loan_Form', 'co_brwer_name', item.customer_nm),
    );
    dispatch(
      change(
        'Individual_Staff_Loan_Form',
        'co_brwer_birth_dt',
        item.birth_date,
      ),
    );
    dispatch(
      change('Individual_Staff_Loan_Form', 'co_brwer_tel_no', item.tel_no),
    );
    dispatch(
      change('Individual_Staff_Loan_Form', 'co_occupation', item.occupation),
    );

    dispatch(
      change(
        'Individual_Staff_Loan_Form',
        'co_brwer_rgst_id',
        item.resident_rgst_id,
      ),
    );
    setCoBorrowerName(item.customer_nm)

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
                buttonColor={'#21316C '}
                style={{
                  borderRadius: 0,
                  width: 115,
                  marginTop: 10,
                  color: 'black',
                  marginLeft: 5,
                }}>
                {t("OK")}
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};
const onChangeLocationText = textvalues => {
  setLocationText(textvalues);
};

function Individual_Staff_loan_Info(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [show_operation, setOperation] = useState('1');
  const [loanexpanded, setLoanExpanded] = React.useState(true);
  const [show_canvas, setCanvas] = useState(false);
  const [all_loandata, setAllLoanData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [all_cus, setAllCus] = useState([]);
  const [all_co_borrower, setAllCoBorrower] = useState([]);
  const [filePath, setFilePath] = useState('');
  const [co_borrower_filePath, setCoBorrowerFilePath] = useState('');
  const [co_borrower_modal_visible, setCoBorrowerModalVisible] =
    useState(false);
  // Villgae
  const [modal_village_visible, setVillageCodeModalVisible] = useState(false);
  const [all_village, setAllVillage] = useState([]);
  const [selected_villagevalue, setSelectedVillageValue] = useState(null);
  const [villageselectedItemValue, setVillageSelectedValue] =
    useState('village_code');
  //township
  const [modal_township_visible, setTownshipCodeModalVisible] = useState(false);
  const [all_township, setAllTownship] = useState([]);
  const [townshipselectedItemValue, setSelectedTownshipItemValue] =
    useState('ts_code');
  const [selected_tspvalue, setSelectedTspValue] = useState(null);
  const [township_text, setTownshipText] = useState('');

  //city
  const [selected_cityvalue, setSelectedCityValue] = useState(null);
  const [modal_city_visible, setCityCodeModalVisible] = useState(false);
  const [selectedCityItemValue, setSelectedCityItemValue] =
    useState('code_value');
  const [all_city, setAllCity] = useState([]);
  const [city_text, set_cityText] = useState('');

  //Ward
  const [modal_ward_visible, setWardCodeModalVisible] = useState(false);
  const [all_ward, setAllWard] = useState([]);
  const [wardselectedItemValue, setSelectedWardItemValue] =
    useState('ward_code');
  const [selected_wardvalue, setSelectedWardValue] = useState(null);
  const [village_text, setVillageText] = useState('');
  const [ward_text, setWardText] = useState('');
  //location
  const [modal_location_visible, setLocationModalVisible] = useState(false);
  const [selectedLocationItemValue, setLocationSelectedItemValue] =
    useState('code_value');
  const [selected_locationvalue, setSelectedLocationValue] = useState(null);
  const [all_location, setAllLocation] = useState([]);
  const [location_text, setLocationText] = useState('');
  const [loading, setLoading] = useState(false);
  const [borrower_sign_path, setBorrowerSignPath] = useState('');
  const [show_borrower_sign, setShowBorrowerSign] = useState('');
  const [coborrower_sign_path, setCoBorrowerSignPath] = useState('');
  const [show_coborrower_sign, setShowCoBorrowerSign] = useState('');
  const [showCanvas, setShowCanvas] = useState(false);
  const [working_month, setWorkingMonth] = useState();
  const [loan_limit_amount, setLoanLimitAmount] = useState(0);
  const { handleSubmit, navigation, entryDate, salary_amount } = props;
  const handleLoanToggle = () => {
    setLoanExpanded(!loanexpanded);
  };
  const [selectedItemValue, setSelectedItemValue] = useState('customer_nm');
  const [borrower_name, setBorrowerName] = useState('');
  const [coborrower_name, setCoBorrowerName] = useState('');
  const [show_co_borrower_canvas, setCoBorrowerCanvas] = useState(false);

  const loadData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    await getAllLoan().then(loan_data => {
      setAllLoanData(loan_data);
      dispatch(
        change(
          'Individual_Staff_Loan_Form',
          'application_no',
          `20${user_id}${moment().format('YYYYMMDD')}${loan_data.length + 1}`,
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
  const onChangeCityText = inputText => {
    set_cityText(inputText);
  };

  useEffect(() => {
    loadData();
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
    try {
      // Save the images
      let borrowerImagePath, coBorrowerImagePath;
      let saveImageError = false;

      if (borrower_sign_path) {
        borrowerImagePath = await saveSignatureToInternalStorage(
          show_borrower_sign,
          '01',
        );
        if (!borrowerImagePath) {
          saveImageError = true;
          ToastAndroid.show(
            'Error! Borrower Sign cannot save',
            ToastAndroid.SHORT,
          );
        } else {
          console.log('Borrower image saved successfully:', borrowerImagePath);
        }
      }

      if (coborrower_sign_path) {
        coBorrowerImagePath = await saveSignatureToInternalStorage(
          show_coborrower_sign,
          '02',
        );
        if (!coBorrowerImagePath) {
          saveImageError = true;
          ToastAndroid.show(
            'Error! Co-Borrower Sign cannot save',
            ToastAndroid.SHORT,
          );
        } else {
          console.log(
            'Co-Borrower image saved successfully:',
            coBorrowerImagePath,
          );
        }
      }
      const exists = await RNFS.exists(filePath);
      if (exists) {
        console.log('exist');
      } else {
        console.log('no exist');
      }
      if (!saveImageError) {
        const staff_loan = Object.assign({}, values, {
          borrower_sign: borrowerImagePath,
          co_borrower_sign: coBorrowerImagePath,
          loan_limit_amt: loan_limit_amount,
          product_type: '20',
        });

        console.log('staff_loan', staff_loan);

        await storeStaffLoanData(staff_loan).then(result => {
          if (result == 'success') {
            dispatch(reset('Individual_Staff_Loan_Form'));

            ToastAndroid.show('Create Successfully!', ToastAndroid.SHORT);
            props.navigation.navigate('Home');
          }
        });
      }
    } catch (error) {
      console.log('Error:', error);
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
    setSelectedTownshipItemValue(itemValue);
  };
  const hideSignModal = () => {
    setCanvas(!show_canvas);
  };

  const handleLocationItemValueChange = itemValue => {
    setLocationSelectedItemValue(itemValue);
  };

  const showCitySearch = () => {
    setCityCodeModalVisible(true);
  };
  const handleCityItemValueChange = itemValue => {
    setSelectedCityItemValue(itemValue);
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
    const today = moment();
    const working_month = today.diff(entryDate, 'months'); // Calculate month difference
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
  const handleItemValueChange = itemValue => {
    setSelectedItemValue(itemValue);
  };
  const city_item = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 15,
        }}>
        <Text
          style={{
            padding: 10,
            flex: 0.5,
          }}>
          {index + 1}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
            marginLeft: 10,
          }}>
          {item.code_value}
        </Text>
        <Text
          style={{
            padding: 8,
            flex: 1,
            marginLeft: 10,
          }}>
          {item.code_short_desc}
        </Text>

        <View>
          <RadioButton
            value={item.city_code}
            status={
              selected_cityvalue === item.code_value ? 'checked' : 'unchecked'
            }
            onPress={() => btnSelectCity(item)}
          />
        </View>
      </View>
    );
  };
  const btnSelectCity = item => {
    setSelectedCityValue(item.code_value);
    setSelectedTspValue(null); //selected Township value
    setSelectedVillageValue(null);
    setAllTownship([]);
    setAllVillage([]);
    dispatch(
      change('Individual_Staff_Loan_Form', 'city_code', item.code_value),
    );
    dispatch(
      change('Individual_Staff_Loan_Form', 'city_name', item.code_short_desc),
    );
    dispatch(change('Individual_Staff_Loan_Form', 'ts_code', ''));
    dispatch(change('Individual_Staff_Loan_Form', 'ts_name', ''));
    dispatch(change('Individual_Staff_Loan_Form', 'village_code', ''));
    dispatch(change('Individual_Staff_Loan_Form', 'village_name', ''));
    dispatch(change('Individual_Staff_Loan_Form', 'ward_code', ''));
    dispatch(change('Individual_Staff_Loan_Form', 'ward_name', ''));
  };

  const btnCitySearch = async () => {
    setLoading(!loading);
    await filterCity(selectedCityItemValue, city_text)
      .then(data => {
        if (data.length > 0) {
          setAllCity(data);
        } else {
          setAllCity(data);
          alert('No data');
        }
        setLoading(false);
      })
      .catch(error => {
        alert('Something Wrong');
        setAllCity([]);
        setLoading(false);
      });
  };
  const township_item = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 15,
        }}>
        <Text
          style={{
            padding: 10,
            flex: 0.5,
          }}>
          {index + 1}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
            marginLeft: 10,
          }}>
          {item.ts_code}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
            marginLeft: 10,
          }}>
          {item.ts_name}
        </Text>

        <View>
          <RadioButton
            value={item.ts_code}
            status={
              selected_tspvalue === item.ts_code ? 'checked' : 'unchecked'
            }
            onPress={() => btnSelectTownship(item)}
          />
        </View>
      </View>
    );
  };
  const btnSelectTownship = item => {
    setSelectedTspValue(item.ts_code);
    setSelectedVillageValue(null);
    setAllVillage([]);
    setAllWard([]);
    dispatch(change('Individual_Staff_Loan_Form', 'ts_code', item.ts_code));
    dispatch(change('Individual_Staff_Loan_Form', 'ts_name', item.ts_name));
    dispatch(change('Individual_Staff_Loan_Form', 'village_code', ''));
    dispatch(change('Individual_Staff_Loan_Form', 'village_name', ''));
    dispatch(change('Individual_Staff_Loan_Form', 'ward_code', ''));
    dispatch(change('Individual_Staff_Loan_Form', 'ward_name', ''));
  };
  const btnTownshipSearch = async () => {
    setLoading(!loading);
    await filterTownship(
      townshipselectedItemValue,
      township_text,
      selected_cityvalue,
    )
      .then(data => {
        if (data.length > 0) {
          setAllTownship(data);
        } else {
          setAllTownship(data);
          alert('No data');
        }
        setLoading(false);
      })
      .catch(error => {
        alert('Something Wrong');
        setAllTownship([]);
        setLoading(false);
      });
  };
  const onChangeTownshipText = textvalues => {
    setTownshipText(textvalues);
  };
  const village_item = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 15,
        }}>
        <Text
          style={{
            padding: 10,
            flex: 0.5,
          }}>
          {index + 1}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
            marginLeft: 10,
          }}>
          {item.village_code}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
            marginLeft: 10,
          }}>
          {item.village_name}
        </Text>

        <View>
          <RadioButton
            value={item.village_code}
            status={
              selected_villagevalue === item.village_code
                ? 'checked'
                : 'unchecked'
            }
            onPress={() => btnSelectVillage(item)}
          />
        </View>
      </View>
    );
  };
  const btnSelectVillage = item => {
    setSelectedVillageValue(item.village_code);
    dispatch(
      change('Individual_Staff_Loan_Form', 'village_code', item.village_code),
    );
    dispatch(
      change('Individual_Staff_Loan_Form', 'village_name', item.village_name),
    );
  };
  const btnVillageSearch = async () => {
    await filterVillage(
      villageselectedItemValue,
      village_text,
      selected_tspvalue,
    )
      .then(data => {
        if (data.length > 0) {
          setAllVillage(data);
        } else {
          setAllVillage(data);
          alert('No data');
        }
        setLoading(false);
      })
      .catch(error => {
        alert('Something Wrong');
        setAllVillage([]);
        setLoading(false);
      });
  };
  const onChangeVillageText = textvalues => {
    setVillageText(textvalues);
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
          {item.code_value}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.code_short_desc}
        </Text>

        <View>
          <RadioButton
            value={item.code_value}
            status={
              selected_locationvalue === item.code_value
                ? 'checked'
                : 'unchecked'
            }
            onPress={() => btnSelectLocation(item)}
          />
        </View>
      </View>
    );
  };
  const btnSelectLocation = item => {
    setSelectedLocationValue(item.code_value);
    dispatch(
      change('Individual_Staff_Loan_Form', 'location_code', item.code_value),
    );
    dispatch(
      change('Individual_Staff_Loan_Form', 'location_name', item.code_short_desc),
    );
  };
  const ward_item = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 15,
        }}>
        <Text
          style={{
            padding: 10,
            flex: 0.5,
          }}>
          {index + 1}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
            marginLeft: 10,
          }}>
          {item.ward_code}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
            marginLeft: 10,
          }}>
          {item.ward_name}
        </Text>

        <View>
          <RadioButton
            value={item.ward_code}
            status={
              selected_wardvalue === item.ward_code ? 'checked' : 'unchecked'
            }
            onPress={() => btnSelectWard(item)}
          />
        </View>
      </View>
    );
  };
  const btnSelectWard = item => {
    setSelectedWardValue(item.ward_code);
    dispatch(change('Individual_Staff_Loan_Form', 'ward_code', item.ward_code));
    dispatch(change('Individual_Staff_Loan_Form', 'ward_name', item.ward_name));
  };
  const btnWardSearch = async () => {
    await filterWard(wardselectedItemValue, ward_text, selected_tspvalue)
      .then(data => {
        if (data.length > 0) {
          setAllWard(data);
        } else {
          setAllWard(data);
          alert('No data');
        }
        setLoading(false);
      })
      .catch(error => {
        alert('Something Wrong');
        setAllWard([]);
        setLoading(false);
      });
  };
  const onChangeWardText = textvalues => {
    setWardText(textvalues);
  };
  const btnLocationSearch = async () => {
    await filterLocation(selectedLocationItemValue, location_text)
      .then(data => {
        if (data.length > 0) {
          setAllLocation(data);
        } else {
          setAllLocation(data);
          alert('No data');
        }
        setLoading(false);
      })
      .catch(error => {
        alert('Something Wrong');
        setAllLocation([]);
        setLoading(false);
      });
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
                        labelStyle={{ marginLeft: 5 }}
                      />
                    </View>
                  </RadioButton.Group>
                ))}
              </View>

              <Button
                onPress={handleSubmit(onSubmit)}
                mode="contained"
                buttonColor={'#21316C'}
                style={style.btnStyle}>
                {t("OK")}
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
                <View style={style.sub_list_container}>
                  <Field
                    data={sav_product_type}
                    name={'sv_pr_type'}
                    title={'Saving Product Type'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 300,
                    }}
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
              handleCalculate={handleCalculate}
              setWorkingMonth={setWorkingMonth}
              loan_limit_amount={loan_limit_amount}
              setLoanLimitAmount={setLoanLimitAmount}
              working_month={working_month}
              workingDateRef={workingDateRef}
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
              borrower_name={borrower_name}
              coborrower_name={coborrower_name}


            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <RenderBottomSheet />

      <Cus_No_Search_modal
        hideModal={hideModal}
        modalVisible={modalVisible}
        setAllCus={setAllCus}
        all_cus={all_cus}
        selectedItemValue={selectedItemValue}
        handleItemValueChange={handleItemValueChange}
        setBorrowerName={setBorrowerName}
        setLoanLimitAmount={setLoanLimitAmount}
      />

      <City_Modal
        modal_city_visible={modal_city_visible}
        hideCityModal={hideCityModal}
        selectedItemValue={selectedItemValue}
        handleCityItemValueChange={handleCityItemValueChange}
        selected_cityvalue={selected_cityvalue}
        btnCitySearch={btnCitySearch}
        city_text={city_text}
        onChangeCityText={onChangeCityText}
        loading={loading}
        all_city={all_city}
        city_items={city_item}
        selectedCityItemValue={selectedCityItemValue}
      />

      <Township_Modal
        all_township={all_township}
        loading={loading}
        btnTownshipSearch={btnTownshipSearch}
        onChangeTownshipText={onChangeTownshipText}
        township_text={township_text}
        hideTownshipModal={hideTownshipModal}
        modal_township_visible={modal_township_visible}
        townshipselectedItemValue={townshipselectedItemValue}
        township_item={township_item}
        handleTownshipItemValueChange={handleTownshipItemValueChange}
      />

      <Village_Modal
        village_item={village_item}
        btnVillageSearch={btnVillageSearch}
        onChangeVillageText={onChangeVillageText}
        village_text={village_text}
        modal_village_visible={modal_village_visible}
        hideVillageModal={hideVillageModal}
        villageselectedItemValue={villageselectedItemValue}
        all_village={all_village}
        setVillageSelectedValue={setVillageSelectedValue}
      />

      <Ward_Model
        all_ward={all_ward}
        ward_item={ward_item}
        btnWardSearch={btnWardSearch}
        ward_text={ward_text}
        onChangeWardText={onChangeWardText}
        modal_ward_visible={modal_ward_visible}
        hideWardModal={hideWardModal}
        wardselectedItemValue={wardselectedItemValue}
        handleItemValueChange={handleItemValueChange}
        setSelectedWardItemValue={setSelectedWardItemValue}
        loading={loading}
      />
      <Location_Modal
        location_item={location_item}
        btnLocationSearch={btnLocationSearch}
        location_text={location_text}
        modal_location_visible={modal_location_visible}
        hideLocationModal={hideLocationModal}
        selectedLocationItemValue={selectedLocationItemValue}
        handleLocationItemValueChange={handleLocationItemValueChange}
        onChangeLocationText={onChangeLocationText}
        all_location={all_location}
        setLocationSelectedItemValue={setLocationSelectedItemValue}
      />

      <CoBorrower_NRC_Search_modal
        CoBorrowerhideModal={CoBorrowerhideModal}
        co_borrower_modal_visible={co_borrower_modal_visible}
        setAllCoBorrower={setAllCoBorrower}
        all_co_borrower={all_co_borrower}
        setCoBorrowerName={setCoBorrowerName}
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
const selector = formValueSelector('Individual_Staff_Loan_Form');

function mapStateToProps(state) {
  const entryDate = selector(state, 'entry_date');
  const defaultSalaryAmount = selector(state, 'salary_amount');
  const salary_amount = defaultSalaryAmount || 0;

  return {
    entryDate,
    salary_amount,
    // update_status: state.loan.update_status,
  };
}

export default reduxForm({
  form: 'Individual_Staff_Loan_Form',
  validate,
  initialValues: {
    cst_new_exist_flg: 'N',
    village_status: '1',

  },
})(connect(mapStateToProps, {})(Individual_Staff_loan_Info));
