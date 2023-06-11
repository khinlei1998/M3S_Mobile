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
import React, {useState, useEffect, useRef, createRef} from 'react';
import DividerLine from '../../components/DividerLine';
import {style} from '../../style/Individual_Loan_style';
import {operations} from '../../common';
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
import {reduxForm, Field, change} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import TextInputFile from '../../components/TextInputFile';
import DropDownPicker from '../../components/DropDownPicker';
import {loan_type} from '../../common';
import DatePicker from '../../components/DatePicker';
import {Picker} from '@react-native-picker/picker';
import {emp_filter_item} from '../../common';
import {getAllLoan} from '../../query/AllLoan_query';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Borrower_Info from './Borrower_Info';
import Icon from 'react-native-vector-icons/Feather';
import {filterEmp} from '../../query/Employee_query';
import {filterCustomer} from '../../query/Customer_query';
import Co_Borrower_Info from './Co_Borrower_Info';
import Loan_Business_Info from './Loan_Business_Info';
import Borrower_Monthly_Income from './Borrower_Monthly_Income';
import {getAllLoanMax} from '../../query/LoanMax_query';
import Borrower_Current_Map from './Borrower_Current_Map';
import Borrower_Contract from './Borrower_Contract';
import Borrower_Sign from './Borrower_Sign';
import SignatureCapture from 'react-native-signature-capture';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {storeLoanData} from '../../query/AllLoan_query';
import { fetchEmpName } from '../../query/Employee_query';
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

  const {handleSubmit, totalnet, navigation} = props;
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

  const sign = createRef();
  const co_borrower_sign = createRef();

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

            <Borrower_Info showCustomerSearch={showCustomerSearch} />
            <Co_Borrower_Info showCoBorrowerSearch={showCoBorrowerSearch} />
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

      {/* <Borrower_Modal
        handleSubmit={handleSubmit}
        setAllCus={setAllCus}
        modalVisible={modalVisible}
        hideModal={hideModal}
        handleItemValueChange={handleItemValueChange}
        selectedItemValue={selectedItemValue}
        all_cus={all_cus}
      /> */}

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

      {/* <Modal
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
      </Modal> */}
    </>
  );
}
const styles = StyleSheet.create({
  textInput: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  textInputContainer: {
    position: 'absolute',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    width: 600,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39579A',
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: '#39579A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

function mapStateToProps(state) {
  return {
    totalnet: state.monthly.totalnetincome,
  };
}

export default reduxForm({
  form: 'Individual_Loan_Form',
  // validate,
})(connect(mapStateToProps, {})(Individual_Loan));
