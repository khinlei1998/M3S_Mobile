import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect, createRef} from 'react';
import DividerLine from '../../components/DividerLine';
import {reduxForm, Field, change, reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import RNFS from 'react-native-fs';
import {Button, RadioButton, List, Modal} from 'react-native-paper';
import {operations, emp_filter_item} from '../../common';
import {style} from '../../style/Relation_style';
import TextInputFile from '../../components/TextInputFile';
import DatePicker from '../../components/DatePicker';
import EditRelation_CoBorrower from './EditRelation_CoBorrower';
import EditRelation_Info from './EditRelation_Info';
import EditRelation_Contract from './EditRelation_Contract';
import EditRelation_Member_Sign from './EditRelation_Member_Sign';
import Icon from 'react-native-vector-icons/Feather';
import SignatureCapture from 'react-native-signature-capture';
import {storeRelation} from '../../query/RelationShip_query';
import {useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {getAllLoan_By_application_no} from '../../query/AllLoan_query';
import {setRelation_UpdateStatus} from '../../redux/LoanReducer';
// import validate from './Validate';

function Edit_Relation_Form(props) {
  const navigation = useNavigation();
  const {handleSubmit, setRelation_UpdateStatus,relation_update_status} = props;
  const [show_operation, setOperation] = useState('2');
  const [relation_expanded, setRelationExpanded] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [signature, setSignature] = useState(null);
  const [show_borrower_sign, setShowBorrowerSign] = useState('');
  const [signature1, setSignature1] = useState('');
  const [signature1_path, setSignature1Path] = useState('');
  const [signature2, setSignature2] = useState('');
  const [signature2_path, setSignature2Path] = useState('');
  const [signature3, setSignature3] = useState('');
  const [signature3_path, setSignature3Path] = useState('');
  const [signature5, setSignature5] = useState('');
  const [signature5_path, setSignature5Path] = useState('');
  const [signature4, setSignature4] = useState('');
  const [signature4_path, setSignature4Path] = useState('');
  const [signature6, setSignature6] = useState('');
  const [signature6_path, setSignature6Path] = useState('');
  const [signature7, setSignature7] = useState('');
  const [signature7_path, setSignature7Path] = useState('');
  const [signature8, setSignature8] = useState('');
  const [signature8_path, setSignature8Path] = useState('');
  const [signature9, setSignature9] = useState('');
  const [signature9_path, setSignature9Path] = useState('');
  const [signature10, setSignature10] = useState('');
  const [signature10_path, setSignature10Path] = useState('');
  const [show_canvas, setCanvas] = useState(false);
  const [show_co_borrower_canvas, setCoBorrowerCanvas] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [borrower_sign_path, setBorrowerSignPath] = useState('');
  const [coborrower_sign_path, setCoBorrowerSignPath] = useState('');
  const [show_coborrower_sign, setShowCoBorrowerSign] = useState('');

  const Borrower_Sign_Modal = props => {
    const {
      _onSaveBorrowerEvent,
      saveBorrowerSign,
      resetBorrowerSign,
      borrower_sign,
      show_canvas,
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
            ref={borrower_sign}
            onSaveEvent={_onSaveBorrowerEvent}
            showNativeButtons={false}
            showTitleLabel={false}
            minStrokeWidth={10}
            maxStrokeWidth={10}
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
                saveBorrowerSign();
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
                resetBorrowerSign();
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

  const borrower_sign = createRef(null);
  const co_borrower_sign = createRef();

  const handleRelationToggle = () => {
    setRelationExpanded(!relation_expanded);
  };
  const saveSignatureToInternalStorage = async (image_encode, index) => {
    try {
      // Request write storage permission
      const granted = await AsyncStorage.getItem('writeStoragePermission');

      if (granted) {
        // Generate a unique filename for the image
        const filename = `${retrive_loan_data.application_no}SG${index}.jpg`;
        console.log('filename', filename);

        const directory = '/storage/emulated/0/Pictures/Signature/';
        const filePath = directory + filename;
        await RNFS.mkdir(directory);
        // Write the base64-encoded image data to the destination path
        await RNFS.writeFile(filePath, image_encode, 'base64');
        console.log('filePath', filePath);

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
    console.log('json', JSON.stringify(values));
    try {
      // Save the images
      let SignatureImagePath;
      let borrowerImagePath;
      let coBorrowerImagePath;
      let saveImageError = false;

      if (signature1_path) {
        SignatureImagePath = await saveSignatureToInternalStorage(
          signature1,
          '05',
        );
        if (!SignatureImagePath) {
          saveImageError = true;
          ToastAndroid.show(
            'Error! Borrower Sign cannot save',
            ToastAndroid.SHORT,
          );
        } else {
          console.log('Borrower image saved successfully:', borrowerImagePath);
        }
      }
      if (signature2_path) {
        SignatureImagePath = await saveSignatureToInternalStorage(
          signature2,
          '06',
        );
        if (!SignatureImagePath) {
          saveImageError = true;
          ToastAndroid.show(
            'Error! Borrower Sign cannot save',
            ToastAndroid.SHORT,
          );
        } else {
          console.log('Borrower image saved successfully:', borrowerImagePath);
        }
      }
      if (signature3_path) {
        SignatureImagePath = await saveSignatureToInternalStorage(
          signature3,
          '07',
        );
        if (!SignatureImagePath) {
          saveImageError = true;
          ToastAndroid.show(
            'Error! Borrower Sign cannot save',
            ToastAndroid.SHORT,
          );
        } else {
          console.log('Borrower image saved successfully:', borrowerImagePath);
        }
      }
      if (borrower_sign_path) {
        borrowerImagePath = await saveSignatureToInternalStorage(
          show_borrower_sign,
          '03',
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
          '04',
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

      if (!saveImageError) {
        await storeRelation(values).then(result => {
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

  const handleButtonClick = content => {
    setModalContent(content);
    setModalVisible(true);
  };
  const _onSaveEvent = async result => {
    // Extract the signature image data from the result
    const {pathName, encoded} = result;
    console.log('Path name:', pathName);
    switch (modalContent) {
      case 'btn1':
        setSignature1(encoded);
        setSignature1Path(pathName);
        setModalVisible(!modalVisible);
        break;
      case 'btn2':
        setSignature2(encoded);
        setSignature2Path(pathName);
        setModalVisible(!modalVisible);
        break;
      case 'btn3':
        setSignature3(encoded);
        setSignature3Path(pathName);
        setModalVisible(!modalVisible);
        break;
      case 'btn5':
        setSignature5(encoded);
        setSignature5Path(pathName);
        setModalVisible(!modalVisible);
        break;
      case 'btn4':
        setSignature4(encoded);
        setSignature4Path(pathName);
        setModalVisible(!modalVisible);
        break;
      case 'btn6':
        setSignature6(encoded);
        setSignature6Path(pathName);
        setModalVisible(!modalVisible);
        break;
      case 'btn7':
        setSignature7(encoded);
        setSignature7Path(pathName);
        setModalVisible(!modalVisible);
        break;
      case 'btn8':
        setSignature8(encoded);
        setSignature8Path(pathName);
        setModalVisible(!modalVisible);
        break;
      case 'btn9':
        setSignature9(encoded);
        setSignature9Path(pathName);
        setModalVisible(!modalVisible);
        break;
      case 'btn10':
        setSignature10(encoded);
        setSignature10Path(pathName);
        setModalVisible(!modalVisible);
        break;
      // Add more cases for other buttons if needed
      default:
        break;
    }
  };
  const _onSaveBorrowerEvent = async result => {
    setBorrowerSignPath(result.pathName);
    setShowBorrowerSign(result.encoded);
    setCanvas(false);
  };

  const saveSign = async () => {
    if (sign) {
      const pathName = await sign.saveImage();
      setSignature(pathName);
    }
  };
  const saveBorrowerSign = async () => {
    await borrower_sign.current.saveImage();
  };

  const resetSign = () => {
    if (sign) {
      sign.resetImage();
      setSignature(null);
    }
  };
  const resetBorrowerSign = () => {
    borrower_sign.current.resetImage();
  };
  const co_borrower_saveSign = async () => {
    await co_borrower_sign.current.saveImage();
  };
  const retrive_relation_data = props.route.params.relation_data[0];

  const loadData = async () => {
    props.initialize(retrive_relation_data);
    const borrowefileExists = await RNFS.exists(
      `/storage/emulated/0/Pictures/Signature/${retrive_relation_data.application_no}SG03.jpg`,
    );
    if (borrowefileExists) {
      setBorrowerSignPath(retrive_relation_data.application_no + 'SG03.jpg');
    }
    const co_borrowerfileExists = await RNFS.exists(
      `/storage/emulated/0/Pictures/Signature/${retrive_relation_data.application_no}SG04.jpg`,
    );
    if (co_borrowerfileExists) {
      setCoBorrowerSignPath(retrive_relation_data.application_no + 'SG04.jpg');
    }
    const sign1Exists = await RNFS.exists(
      `/storage/emulated/0/Pictures/Signature/${retrive_relation_data.application_no}SG05.jpg`,
    );
    if (sign1Exists) {
      setSignature1Path(retrive_relation_data.application_no + 'SG05.jpg');
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  const hideSignModal = () => {
    setCanvas(!show_canvas);
  };
  const hideCoBorrowerSignModal = () => {
    setCoBorrowerCanvas(!show_co_borrower_canvas);
  };
  const co_borrower_resetSign = () => {
    co_borrower_sign.current.resetImage();
  };
  const _onCoBorrowerSaveEvent = async result => {
    setCoBorrowerSignPath(result.pathName);
    setShowCoBorrowerSign(result.encoded);

    setCoBorrowerCanvas(false);
  };
  const filtered_operations = operations.filter(item => item.value != 1);
  const btnChangeOperation = newValue => {
    setOperation(newValue);
    if (newValue == 2) {
      setRelation_UpdateStatus(false);
    } else {
      setRelation_UpdateStatus(true);
    }
  };
  console.log('retrive_relation_data', retrive_relation_data);
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
              RelationShip Form
            </Text>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              (Attached To Application)
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
              expanded={relation_expanded}
              onPress={handleRelationToggle}
              style={style.list_container}
              titleStyle={style.list_title}
              title="Borrower Info">
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
                    name={'transaction_date'}
                    component={DatePicker}
                    label={'Application Date'}
                    editable={true}
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'resident_rgst_id'}
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
                    name={'borrower_nrc'}
                    title={'Address'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                  />
                </View>
              </View>
            </List.Accordion>
            <EditRelation_CoBorrower />
            <EditRelation_Info />
            <EditRelation_Contract
              setCanvas={setCanvas}
              show_canvas={show_canvas}
              showCanvas={showCanvas}
              borrower_sign_path={borrower_sign_path}
              show_borrower_sign={show_borrower_sign}
              show_coborrower_sign={show_coborrower_sign}
              coborrower_sign_path={coborrower_sign_path}
              setCoBorrowerCanvas={setCoBorrowerCanvas}
            />
            <EditRelation_Member_Sign
              show_borrower_sign={show_borrower_sign}
              handleButtonClick={handleButtonClick}
              signature1={signature1}
              signature2={signature2}
              signature3={signature3}
              signature5={signature5}
              signature4={signature4}
              signature6={signature6}
              signature7={signature7}
              signature8={signature8}
              signature9={signature9}
              signature10={signature10}
              signature1_path={signature1_path}
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

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        useNativeDriver
        hideModalContentWhileAnimating
        dismissable={false}>
        <View
          style={{
            backgroundColor: '#232D57',
            padding: 25,
            width: 400,
            alignSelf: 'center',
          }}
          onStartShouldSetResponder={() => setModalVisible(!modalVisible)}>
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
          <Text>{modalContent}</Text>
          <SignatureCapture
            style={{
              flex: 1,
            }}
            ref={ref => (sign = ref)}
            onSaveEvent={_onSaveEvent}
            showNativeButtons={false}
            showTitleLabel={false}
            minStrokeWidth={10}
            maxStrokeWidth={10}
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

      <Borrower_Sign_Modal
        show_canvas={show_canvas}
        hideSignModal={hideSignModal}
        setCanvas={setCanvas}
        _onSaveBorrowerEvent={_onSaveBorrowerEvent}
        // _onDragEvent={_onDragEvent}
        saveBorrowerSign={saveBorrowerSign}
        resetBorrowerSign={resetBorrowerSign}
        borrower_sign={borrower_sign}
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
  return {
    relation_update_status: state.loan.relation_update_status,

  };
}

export default reduxForm({
  form: 'Edit_Relation_Form',
  // validate,
})(connect(mapStateToProps, {setRelation_UpdateStatus})(Edit_Relation_Form));
