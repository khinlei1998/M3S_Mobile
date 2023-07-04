import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableHighlight,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, createRef} from 'react';
import DividerLine from '../../components/DividerLine';
import {reduxForm, Field, change, reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import RNFS from 'react-native-fs';

import {
  Button,
  RadioButton,
  List,
  Provider,
  Portal,
  Modal,
  TextInput,
} from 'react-native-paper';
import {operations, emp_filter_item} from '../../common';
import {style} from '../../style/Relation_style';
import TextInputFile from '../../components/TextInputFile';
import DatePicker from '../../components/DatePicker';
import Relation_CoBorrower from './Relation_CoBorrower';
import Relation_Info from './Relation_Info';
import Relation_Contract from './Relation_Contract';
import Relation_Member_Sign from './Relation_Member_Sign';
import Icon from 'react-native-vector-icons/Feather';
import SignatureCapture from 'react-native-signature-capture';
import {storeRelation} from '../../query/RelationShip_query';
import {useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
const SignModal = props => {
  const {
    _onSaveEvent,
    saveSign,
    resetSign,
    sign,
    modalVisible,
    setModalVisible,
  } = props;
  return (
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
  );
};
function Relation_Form(props) {
  const navigation = useNavigation();

  const {handleSubmit} = props;
  const [show_operation, setOperation] = useState('1');
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
    try {
      // Save the images
      let borrowerImagePath;
      let saveImageError = false;

      if (signature1_path) {
        borrowerImagePath = await saveSignatureToInternalStorage(
          signature1,
          '05',
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
      if (signature2_path) {
        borrowerImagePath = await saveSignatureToInternalStorage(
          signature2,
          '06',
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
      if (signature3_path) {
        borrowerImagePath = await saveSignatureToInternalStorage(
          signature3,
          '07',
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
      // Add more cases for other buttons if needed
      default:
        break;
    }
  };

  const saveSign = async () => {
    // const pathName = await sign.current.saveImage();
    if (sign) {
      const pathName = await sign.saveImage();
      console.log('pathName', pathName);
      setSignature(pathName);
    }
  };
  const resetSign = () => {
    if (sign) {
      sign.resetImage();
      setSignature(null);
    }
  };
  const retrive_loan_data = props.route.params.retrive_loan_data;
  console.log('retrive_loan_data', retrive_loan_data);

  const loadData = async () => {
    let initialize_data = {
      application_no: retrive_loan_data.application_no,
      application_date: retrive_loan_data.application_date,
      resident_rgst_id: retrive_loan_data.guarantor_nm,
      borrower_name: retrive_loan_data.resident_rgst_id,
      application_amt: retrive_loan_data.application_amt.toString()
        ? retrive_loan_data.application_amt.toString()
        : '',
      addr: retrive_loan_data.birth_date,
      relation_no: retrive_loan_data.application_no.replace(/.*?(M)/, 'RIM'),
    };
    props.initialize(initialize_data);
  };
  useEffect(() => {
    loadData();
  }, []);
  // const sign = useRef(null);

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
            <Relation_CoBorrower />
            <Relation_Info />
            <Relation_Contract />
            <Relation_Member_Sign
              show_borrower_sign={show_borrower_sign}
              handleButtonClick={handleButtonClick}
              signature1={signature1}
              signature2={signature2}
              signature3={signature3}
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
      {/* <SignModal
        _onSaveEvent={_onSaveEvent}
        saveSign={saveSign}
        resetSign={resetSign}
        sign={sign}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      /> */}
    </>
  );
}
function mapStateToProps(state) {
  return {};
}

export default reduxForm({
  form: 'Relation_Form',
})(connect(mapStateToProps, {})(Relation_Form));
