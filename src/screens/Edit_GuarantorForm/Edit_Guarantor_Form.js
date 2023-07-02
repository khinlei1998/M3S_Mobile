import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect, createRef} from 'react';
import DividerLine from '../../components/DividerLine';
import {operations, emp_filter_item} from '../../common';
import {reduxForm, Field, change, reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import RNFS from 'react-native-fs';
import {storeGuarantor} from '../../query/Guarantor_query';
import {
  Button,
  RadioButton,
  List,
  Provider,
  Portal,
  Modal,
  TextInput,
} from 'react-native-paper';
import SignatureCapture from 'react-native-signature-capture';
import {style} from '../../style/Guarantor_style';
import TextInputFile from '../../components/TextInputFile';
import DatePicker from '../../components/DatePicker';
import Edit_Guarantor_Info from './Edit_Guarantor_Info';
import Edit_Guarantor_Business_Info from './Edit_Guarantor_Business_Info';
import Edit_Guarantor_Contract from './Edit_Guarantor_Contract';
import Edit_Guarantor_Sign from './Edit_Guarantor_Sign';
import {filterCustomer} from '../../query/Customer_query';
import Icon from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {setGuarantor_UpdateStatus} from '../../redux/LoanReducer';
import { deleteGuarantor_ByID } from '../../query/Guarantor_query';
// imprort validate from './Validate';
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

const Guarantor_modal = props => {
  const dispatch = useDispatch();
  const [guarantor_selectedvalue, setGuarantorSelectedValue] = useState(null);
  const [guarantor_text, setGuarantorText] = useState('');

  const {
    handleItemValueChange,
    selectedItemValue,
    gurarantor_modalVisible,
    hideGuarantorModal,
    setAllGuarantor,
    all_guarantor,
    setGuarantorName,
    guarantor_update_status,
  } = props;
  const btnGuarantorSearch = async () => {
    await filterCustomer(selectedItemValue, guarantor_text)
      .then(data =>
        data.length > 0 ? setAllGuarantor(data) : alert('No data'),
      )
      .catch(error => console.log('error', error));
  };

  const btnSelectGuarantor = item => {
    console.log('item', item);
    setGuarantorSelectedValue(item.id);
    dispatch(
      change('Edit_Guarantor_Form', 'resident_rgst_id', item.resident_rgst_id),
    );
    dispatch(change('Edit_Guarantor_Form', 'guarantor_nm', item.customer_nm));
    dispatch(change('Edit_Guarantor_Form', 'gender', item.gender));
    dispatch(change('Edit_Guarantor_Form', 'birth_date', item.birth_date));
    dispatch(
      change('Edit_Guarantor_Form', 'maritail_status', item.maritail_status),
    );
    dispatch(change('Edit_Guarantor_Form', 'address_type', item.address_type));
    dispatch(change('Edit_Guarantor_Form', 'addr', item.addr));
    dispatch(
      change(
        'Edit_Guarantor_Form',
        'curr_resident_date',
        item.curr_resident_date,
      ),
    );
    dispatch(change('Edit_Guarantor_Form', 'tel_no', item.tel_no));
    dispatch(
      change('Edit_Guarantor_Form', 'house_ocpn_type', item.house_ocpn_type),
    );
    dispatch(
      change(
        'Edit_Guarantor_Form',
        'business_own_type',
        item.business_own_type,
      ),
    );
    // show guarnator name

    setGuarantorName(item.customer_nm);
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
              guarantor_selectedvalue === item.id ? 'checked' : 'unchecked'
            }
            onPress={() => btnSelectGuarantor(item)}
          />
        </View>
      </View>
    );
  };

  const onChangeGuarantorText = inputvalues => {
    setGuarantorText(inputvalues);
  };
  return (
    <Provider>
      <Portal>
        <Modal
          useNativeDriver
          hideModalContentWhileAnimating
          dismissable={false}
          visible={gurarantor_modalVisible}
          onDismiss={hideGuarantorModal}
          contentContainerStyle={style.modal_container}>
          <View
            style={style.modal_header}
            onStartShouldSetResponder={() => hideGuarantorModal()}>
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
                <TextInput
                  style={{
                    backgroundColor: '#fff',
                    marginTop: 10,
                    width: 250,
                    borderColor: '#303030',
                    borderWidth: 0.5,
                  }}
                  value={guarantor_text}
                  onChangeText={onChangeGuarantorText}
                  right={
                    <TextInput.Icon
                      icon={'magnify'}
                      onPress={() => btnGuarantorSearch()}
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
              data={all_guarantor}
              renderItem={item}
              keyExtractor={(item, index) => index.toString()}
            />

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Button
                onPress={() => hideGuarantorModal()}
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
function Edit_Guarantor_Form(props) {
  const navigation = useNavigation();
  const {handleSubmit, guarantor_update_status, setGuarantor_UpdateStatus} =
    props;
  const retrive_guarantor_data = props.route.params.guarantor_data[0];
  const [show_operation, setOperation] = useState('2');
  const [selectedItemValue, setSelectedItemValue] = useState('employee_name');
  const [show_canvas, setCanvas] = useState(false);
  const [borrower_sign_path, setBorrowerSignPath] = useState('');
  const [show_borrower_sign, setShowBorrowerSign] = useState('');

  const [gurarantor_modalVisible, setGuarantorModalVisible] = useState(false);
  const [borroer_info_exxpanded, setBorrowerInfoExpanded] = useState(true);
  const [all_guarantor, setAllGuarantor] = useState([]);
  const [guarantor_name, setGuarantorName] = useState('');

  const saveSignatureToInternalStorage = async (image_encode, index) => {
    try {
      // Request write storage permission
      const granted = await AsyncStorage.getItem('writeStoragePermission');

      if (granted) {
        // Generate a unique filename for the image
        const filename = `${retrive_loan_data.application_no}SG15.jpg`;
        console.log('Guarantor filename', filename);

        // Define the destination path in the app's internal storage
        let destinationPath;
        if (Platform.OS === 'android') {
          destinationPath = `${RNFS.ExternalDirectoryPath}/${filename}`;
        } else if (Platform.OS === 'ios') {
          destinationPath = `${RNFS.LibraryDirectoryPath}/${filename}`;
        } else {
          console.log('Unsupported platform.');
          return null;
        }

        // Write the base64-encoded image data to the destination path
        await RNFS.writeFile(destinationPath, image_encode, 'base64');
        console.log('destinationPath', destinationPath);

        // Check if the file exists
        const fileExists = await RNFS.exists(destinationPath);
        console.log('File exists:', fileExists);

        return destinationPath;
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
      await deleteGuarantor_ByID(values.guarantee_no).then(
        response => {
          if (response == 'success') {
            alert('Delete Success');
            navigation.goBack();
            // setUpdateStatus(false);
            // props.navigation.navigate('Home');
          }
        },
      );
    }
    // try {
    //   // Save the images
    //   let borrowerImagePath;
    //   let saveImageError = false;

    //   if (borrower_sign_path) {
    //     borrowerImagePath = await saveSignatureToInternalStorage(
    //       show_borrower_sign,
    //       '01',
    //     );
    //     if (!borrowerImagePath) {
    //       saveImageError = true;
    //       ToastAndroid.show(
    //         'Error! Borrower Sign cannot save',
    //         ToastAndroid.SHORT,
    //       );
    //     } else {
    //       console.log('Borrower image saved successfully:', borrowerImagePath);
    //     }
    //   }

    //   if (!saveImageError) {
    //     await storeGuarantor(values).then(result => {
    //       if (result == 'success') {
    //         ToastAndroid.show('Create Successfully!', ToastAndroid.SHORT);
    //         navigation.goBack();
    //       }
    //     });
    //   }
    // } catch (error) {
    //   console.log('Error:', error);
    // }
  };
  const handleBorrowerToggle = () => {
    setBorrowerInfoExpanded(!borroer_info_exxpanded);
  };
  const hideSignModal = () => {
    setCanvas(!show_canvas);
  };

  const handleItemValueChange = itemValue => {
    setSelectedItemValue(itemValue);
  };

  const loadData = async () => {
    const initialize_guarantor_data = Object.assign(
      {},
      retrive_guarantor_data,
      {
        employee_num: retrive_guarantor_data.employee_num
          ? retrive_guarantor_data.employee_num.toString()
          : '',
        land_scale: retrive_guarantor_data.land_scale
          ? retrive_guarantor_data.land_scale.toString()
          : '',
      },
    );
    const fileExists = await RNFS.exists(
      `/storage/emulated/0/Pictures/Signature/${retrive_guarantor_data.application_no}SG15.jpg`,
    );
    if (fileExists) {
      setBorrowerSignPath(retrive_guarantor_data.application_no + 'SG15.jpg');
    }
    props.initialize(initialize_guarantor_data);
    setGuarantorName(retrive_guarantor_data.guarantor_nm);
  };
  useEffect(() => {
    loadData();
  }, []);
  const showGuarantorSearch = () => {
    setGuarantorModalVisible(true);
  };
  const hideGuarantorModal = () => setGuarantorModalVisible(false);

  const _onSaveEvent = async result => {
    setBorrowerSignPath(result.pathName);
    setShowBorrowerSign(result.encoded);

    setCanvas(false);
  };
  const sign = createRef();

  const _onDragEvent = () => {
    console.log('dragged');
  };
  const resetSign = () => {
    sign.current.resetImage();
  };

  const saveSign = async () => {
    const pathName = await sign.current.saveImage();
  };
  const filtered_operations = operations.filter(item => item.value != 1);
  const btnChangeOperation = newValue => {
    setOperation(newValue);
    if (newValue == 2) {
      setGuarantor_UpdateStatus(false);
    } else {
      setGuarantor_UpdateStatus(true);
    }
  };
  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                marginTop: 20,
                color: '#273050',
                fontWeight: 'bold',
              }}>
              Guarantor Form
            </Text>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              (Attach To Application)
            </Text>
            <DividerLine />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 15,
              }}>
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
                        labelStyle={{marginLeft: 5}}
                      />
                    </View>
                  </RadioButton.Group>
                ))}
              </View>
            </View>
            <DividerLine />
            <List.Accordion
              expanded={borroer_info_exxpanded}
              onPress={handleBorrowerToggle}
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
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'borrower_nrc'}
                    title={'Borrower NRC'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                  />

                  <Field
                    name={'borrower_name'}
                    title={'Borrower Name'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                  />
                </View>
                <View style={style.sub_list_container}>
                  <Field
                    name={'application_amt'}
                    title={'Loan Apply Amount'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                  />

                  <Field
                    name={'guarantee_date'}
                    component={DatePicker}
                    label={'Application Date'}
                    editable={true}
                  />
                </View>
              </View>
            </List.Accordion>
            <Edit_Guarantor_Info showGuarantorSearch={showGuarantorSearch} />
            <Edit_Guarantor_Business_Info />
            <Edit_Guarantor_Contract
              retrive_guarantor_data={retrive_guarantor_data}
              guarantor_name={guarantor_name}
            />
            <Edit_Guarantor_Sign
              setCanvas={setCanvas}
              show_canvas={show_canvas}
              borrower_sign_path={borrower_sign_path}
              show_borrower_sign={show_borrower_sign}
              guarantor_name={guarantor_name}
            />
            <DividerLine />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              <Button
                disabled={guarantor_update_status == true ? false : true}
                onPress={handleSubmit(onSubmit)}
                mode="contained"
                buttonColor={
                  guarantor_update_status == true ? '#6870C3' : '#cccccc'
                }
                style={{
                  borderRadius: 0,
                  marginTop: 10,
                  color: 'black',
                  borderRadius: 5,
                  padding: 5,
                }}>
                <Icon name="paperclip" size={18} color="#fff" />
                Document Submit
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      <Guarantor_modal
        hideGuarantorModal={hideGuarantorModal}
        gurarantor_modalVisible={gurarantor_modalVisible}
        setAllGuarantor={setAllGuarantor}
        all_guarantor={all_guarantor}
        selectedItemValue={selectedItemValue}
        handleItemValueChange={handleItemValueChange}
        setGuarantorName={setGuarantorName}
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
    </>
  );
}
function mapStateToProps(state) {
  return {
    guarantor_update_status: state.loan.gurantor_update_status,
  };
}

export default reduxForm({
  form: 'Edit_Guarantor_Form',
  // validate,
})(connect(mapStateToProps, {setGuarantor_UpdateStatus})(Edit_Guarantor_Form));
