import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  CameraRoll,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import DividerLine from '../../components/DividerLine';
import {Avatar, Button, Card, Text, Divider, Modal} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function Evidence(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [nrc_uri, setNrcUri] = useState('');
  const [gurantor_uri, setGuarantorUri] = useState('');
  const [coborrower_uri, setCoBorrowerUri] = useState('');
  const [response, setResponse] = useState(null);
  const [modalContent, setModalContent] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const [btn_type, setType] = useState('');

  const data = [
    {id: 1, name: 'NRC Card', value: 'btn1'},
    {id: 2, name: 'Guarantor NRC Card', value: 'btn2'},
    {id: 3, name: 'Co-borrower NRC Card', value: 'btn3'},
    // Add more data as needed
  ];
  const handleButtonClick = value => {
    setType(value);
    setModalVisible(true);
  };
  const handleImageUpload = (response, type) => {
    console.log('response', response);
    console.log('type', type);
    if (response.assets !== undefined && response.assets.length > 0) {
      switch (type) {
        case 'btn1':
          setNrcUri(response.assets[0].uri);
          // setResponse(JSON.stringify(response));
          break;
        case 'btn2':
          setGuarantorUri(response.assets[0].uri);
          // setResponse(JSON.stringify(response));
          break;
        case 'btn3':
          setCoBorrowerUri(response.assets[0].uri);
          // setResponse(JSON.stringify(response));
          break;
        // Add more cases for other buttons if needed
        default:
          break;
      }
    }
  };

  // const retrive_loan_data = props.route.params.retrive_loan_data;
  // console.log('retrive_loan_data', retrive_loan_data);

  // const loadData = async () => {
  //   let initialize_data = {
  //     application_no: retrive_loan_data.application_no,
  //     application_date: retrive_loan_data.application_date,
  //     resident_rgst_id: retrive_loan_data.guarantor_nm,
  //     borrower_name: retrive_loan_data.resident_rgst_id,
  //     application_amt: retrive_loan_data.application_amt.toString()
  //       ? retrive_loan_data.application_amt.toString()
  //       : '',
  //     addr: retrive_loan_data.birth_date,
  //     relation_no: retrive_loan_data.application_no.replace(/.*?(M)/, 'RIM'),
  //   };
  //   props.initialize(initialize_data);
  // };
  // useEffect(() => {
  //   loadData();
  // }, []);
  console.log('btntype',btn_type);
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View style={{width: '90%', marginTop: 10, backgroundColor: '#d6d6d6'}}>
        {data.map(item => (
          <Card
            style={{
              borderRadius: 0,
            }}
            key={item.id}
            onPress={() =>
              launchCamera(
                {
                  saveToPhotos: true, // Set this to false to prevent automatic saving
                  mediaType: 'photo',
                  includeBase64: false,
                },
                data => handleImageUpload(data, item.value),
              )
            }
            // onPress={() => handleButtonClick(item.value)}
          >
            <Card.Content
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                margin: 10,
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity>
                    <Icon name="camera" size={50} color="#b8a1c4" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => alert('kk')}
                    style={{
                      marginLeft: 30,
                      marginTop: 15,
                    }}>
                    <Icon name="check" size={30} color="#b8a1c4" />
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginLeft: 30,
                      fontWeight: 'bold',
                      fontSize: 18,
                      marginTop: 15,
                    }}>
                    {item.name}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Button
                    onPress={() => handleButtonClick(item.value)}
                    mode="contained"
                    buttonColor={'#6870C3'}
                    style={{
                      borderRadius: 10,
                      width: 90,
                      marginTop: 10,
                      color: 'black',
                      marginLeft: 5,
                    }}>
                    View
                  </Button>

                  <Button
                    mode="contained"
                    buttonColor={'#6870C3'}
                    style={{
                      borderRadius: 10,
                      width: 95,
                      marginTop: 10,
                      color: 'black',
                      marginLeft: 5,
                    }}>
                    Capture
                  </Button>
                  <Button
                    mode="contained"
                    buttonColor={'#6870C3'}
                    style={{
                      borderRadius: 10,
                      width: 100,
                      marginTop: 10,
                      color: 'black',
                      marginLeft: 5,
                    }}>
                    Delete
                  </Button>
                </View>
              </View>
            </Card.Content>
            <Divider />
          </Card>
        ))}
      </View>

      {/* Modal Box */}
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
            width: 450,
            alignSelf: 'center',
          }}
          onStartShouldSetResponder={() => setModalVisible(!modalVisible)}>
          <Icon
            name="x-circle"
            size={25}
            color="#fff"
            style={{
              marginLeft: 20,
              position: 'absolute',
              top: 0,
              right: 10,
              top: 10,
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: '#F5FCFF',
            width: 450,
            height: 500,
            alignSelf: 'center',
          }}>
          <Text>{modalContent}</Text>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {btn_type == 'btn1' ? (
              <Image
                source={{uri: nrc_uri}}
                style={{width: 350, height: 350}}
              />
            ) : (
              <></>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
