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
import React, { useState, useEffect, createRef } from 'react';
import DividerLine from '../../components/DividerLine';
import { operations, emp_filter_item } from '../../common';
import { reduxForm, Field, change, reset } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import RNFS from 'react-native-fs';
import { storeGuarantor } from '../../query/Guarantor_query';
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
import { style } from '../../style/Guarantor_style';
import TextInputFile from '../../components/TextInputFile';
import DatePicker from '../../components/DatePicker';
import Guarantor_Info from './Guarantor_Info';
import Guarantor_Business_Info from './Guarantor_Business_Info';
import Guarantor_Contract from './Guarantor_Contract';
import Guarantor_Sign from './Guarantor_Sign';
import { filterCustomer } from '../../query/Customer_query';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import validate from './Validate';
import { getAllLoan_By_application_no } from '../../query/AllLoan_query';
import moment from 'moment';
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
  } = props;
  const btnGuarantorSearch = async () => {
    await filterCustomer(selectedItemValue, guarantor_text)
      .then(data =>
        data.length > 0 ? setAllGuarantor(data) : alert('No data'),
      )
      .catch(error => console.log('error', error));
  };

  const btnSelectGuarantor = item => {
    setGuarantorSelectedValue(item.id);
    dispatch(change('Guarantor_Form', 'guarantor_no', item.customer_no));
    dispatch(change('Guarantor_Form', 'guarantor_nm', item.customer_nm));
    dispatch(change('Guarantor_Form', 'gender', item.gender));
    dispatch(change('Guarantor_Form', 'birth_date', item.birth_date));
    dispatch(change('Guarantor_Form', 'maritail_status', item.maritail_status));
    dispatch(change('Guarantor_Form', 'address_type', item.address_type));
    dispatch(change('Guarantor_Form', 'addr', item.addr));
    dispatch(
      change('Guarantor_Form', 'curr_resident_date', item.curr_resident_date),
    );
    dispatch(
      change('Guarantor_Form', 'resident_rgst_id', item.resident_rgst_id),
    );

    dispatch(change('Guarantor_Form', 'tel_no', item.tel_no));
    dispatch(change('Guarantor_Form', 'house_ocpn_type', item.house_ocpn_type));
    dispatch(
      change('Guarantor_Form', 'business_own_type', item.business_own_type),
    );
    // show guarnator name

    setGuarantorName(item.customer_nm);
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
                <TextInput
                  style={{
                    backgroundColor: '#fff',
                    marginTop: 10,
                    width: 300,
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

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
function Guarantor_Form(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { handleSubmit } = props;
  const retrive_loan_data = props.route.params.retrive_loan_data;
  const [show_operation, setOperation] = useState('1');
  const [selectedItemValue, setSelectedItemValue] = useState('employee_name');
  const [show_canvas, setCanvas] = useState(false);
  const [borrower_sign_path, setBorrowerSignPath] = useState('');
  const [show_borrower_sign, setShowBorrowerSign] = useState('');
  const [gurarantor_modalVisible, setGuarantorModalVisible] = useState(false);
  const [borroer_info_exxpanded, setBorrowerInfoExpanded] = useState(true);
  const [all_guarantor, setAllGuarantor] = useState([]);
  const [guarantor_name, setGuarantorName] = useState('');
  const [guarantee_date, setGuaranteeDate] = useState('')

  const saveSignatureToInternalStorage = async (image_encode, index) => {
    try {
      // Request write storage permission
      const granted = await AsyncStorage.getItem('writeStoragePermission');

      if (granted) {
        // Generate a unique filename for the image
        const filename = `${retrive_loan_data.application_no}SG15.jpg`;

        const directory = '/storage/emulated/0/Pictures/Signature/';
        const filePath = directory + filename;
        await RNFS.mkdir(directory);

        // Define the destination path in the app's internal storage
        // let destinationPath;
        // if (Platform.OS === 'android') {
        //   destinationPath = `${RNFS.ExternalDirectoryPath}/${filename}`;
        // } else if (Platform.OS === 'ios') {
        //   destinationPath = `${RNFS.LibraryDirectoryPath}/${filename}`;
        // } else {
        //   console.log('Unsupported platform.');
        //   return null;
        // }

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
    try {
      // Save the images
      let borrowerImagePath;
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

      if (!saveImageError) {
        const guarantor_form_data = Object.assign({}, values, {
          guarantee_date: moment().format('YYYY/MM/DD'),

        });
        await storeGuarantor(guarantor_form_data).then(result => {
          if (result == 'success') {
            ToastAndroid.show('Create Successfully!', ToastAndroid.SHORT);
            navigation.goBack();
          }
        });
      }
    } catch (error) {
      console.log('Error:', error);
    }
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
    await getAllLoan_By_application_no(retrive_loan_data.application_no).then(indi_data => {
      console.log('indi_data',indi_data);
      let initialize_data = {
        application_no: retrive_loan_data.application_no,
        application_date: indi_data[0].application_date,
        borrower_nrc: indi_data[0].resident_rgst_id,
        borrower_name: indi_data[0].borrower_name,
        application_amt: indi_data[0].application_amt.toString()
          ? indi_data[0].application_amt.toString()
          : '',
        guarantee_no: retrive_loan_data.application_no.replace(/.*?(M)/, 'GTM'),
      };
      console.log('initialize_data',initialize_data);
      props.initialize(initialize_data);
    })
    setGuaranteeDate(moment().format('YYYY/MM/DD'))
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
  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
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
                    name={'application_date'}
                    component={DatePicker}
                    label={'Application Date'}
                    editable={true}
                  />
                </View>
              </View>
            </List.Accordion>
            <Guarantor_Info showGuarantorSearch={showGuarantorSearch} />
            <Guarantor_Business_Info />
            <Guarantor_Contract
              retrive_loan_data={retrive_loan_data}
              guarantor_name={guarantor_name}
            />
            <Guarantor_Sign
              setCanvas={setCanvas}
              show_canvas={show_canvas}
              borrower_sign_path={borrower_sign_path}
              show_borrower_sign={show_borrower_sign}
              guarantor_name={guarantor_name}
              guarantee_date={guarantee_date}
            />
            <DividerLine />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              <Button
                onPress={handleSubmit(onSubmit)}
                mode="contained"
                buttonColor={'#6870C3'}
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
  return {};
}

export default reduxForm({
  form: 'Guarantor_Form',
  validate,
})(connect(mapStateToProps, {})(Guarantor_Form));
