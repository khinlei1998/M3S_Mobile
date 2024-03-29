import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  CameraRoll,
  ToastAndroid,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import DividerLine from '../../components/DividerLine';
import { Avatar, Button, Card, Text, Divider, Modal } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { useNavigation } from '@react-navigation/native';

export default function Evidence(props) {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [image_uri, setImageUri] = useState('');
  const [btn_type, setType] = useState('');
  const [capturedFiles, setCapturedFiles] = useState([]);

  const data = [
    { id: 1, name: 'NRC Card (Front)', value: '01F' },
    { id: 2, name: 'NRC Card (Back)', value: '01B' },
    { id: 3, name: 'Guarantor NRC Card (Front)', value: '02F' },
    { id: 4, name: 'Guarantor NRC Card (Back)', value: '02B' },
    { id: 5, name: 'Co-borrower NRC Card (Front)', value: '03F' },
    { id: 6, name: 'Co-borrower NRC Card (Back)', value: '03B' },
    { id: 7, name: 'Family (Front)', value: '04F' },
    { id: 8, name: 'Family (Back)', value: '04B' },
    { id: 9, name: 'House Ownership (Front)', value: '05F' },
    { id: 10, name: 'House Ownership (Back)', value: '05B' },
    { id: 11, name: 'Recommendation (Front)', value: '06F' },
    { id: 12, name: 'Recommendation (Back)', value: '06B' },
    { id: 13, name: 'Business License (Front)', value: '07F' },
    { id: 14, name: 'Business License (Back)', value: '07B' },
    { id: 15, name: 'Land OwnerShip (Front)', value: '08F' },
    { id: 16, name: 'Land OwnerShip (Back)', value: '08B' },
    { id: 17, name: 'Tax Payment (Front)', value: '09F' },
    { id: 18, name: 'Tax Payment (Back)', value: '09B' },
    { id: 19, name: 'Insurance (Front)', value: '10F' },
    { id: 20, name: 'Insurance (Back)', value: '10B' },
    { id: 21, name: 'Etc (Front)', value: '11F' },
    { id: 22, name: 'Etc (Back)', value: '11B' },

    // Add more data as needed
  ];

  const retrive_loan_data = props.route.params.retrive_loan_data;

  const handleView = async value => {
    let filePath = `/storage/emulated/0/Pictures/Camera/${retrive_loan_data.application_no}AT${value}.jpg`;

    const fileExists = await RNFS.exists(filePath);
    if (fileExists) {
      const queryParam = `?timestamp=${Date.now()}`;

      setImageUri(
        `file:///storage/emulated/0/Pictures/Camera/${retrive_loan_data.application_no}AT${value}.jpg${queryParam}`,
      );
    } else {
      setImageUri('');
    }

    setType(value);
    setModalVisible(true);
  };

  useEffect(() => {
    const checkFileExists = async () => {
      try {
        for (const item of data) {
          const fileName = `${retrive_loan_data.application_no}AT${item.value}.jpg`;
          const directory = `/storage/emulated/0/Pictures/Camera/`;
          const filePath = directory + fileName;
          const fileExists = await RNFS.exists(filePath);
          if (fileExists) {
            setCapturedFiles(prevFiles => [...prevFiles, item.value]);
            // props.route.params.setFileExist(true)
          }
        }
      } catch (error) {
        console.log('Error checking file existence:', error);
      }
    };

    checkFileExists();
  }, []);

  const handleImageUpload = async (response, type) => {
    if (response.didCancel) {
      // User canceled the capture
      return;
    }

    if (response.error) {
      // Error occurred during image capture
      return;
    }

    // Get the image URI
    const imageUri = response.assets[0].uri;

    try {
      const fileName = `${retrive_loan_data.application_no}AT${type}.jpg`;
      const directory = `/storage/emulated/0/Pictures/Camera/`;
      const filePath = directory + fileName;
      await RNFS.mkdir(directory);
      // Rename the captured image file
      await RNFS.moveFile(imageUri, filePath);
      ToastAndroid.show(`Image Save Successfully!`, ToastAndroid.SHORT);

      const fileExists = await RNFS.exists(filePath);
      if (fileExists) {
        setCapturedFiles(prevFiles => [...prevFiles, type]);
      }
    } catch (error) {
      console.log('Image saving error:', error);
    }
  };

  const handleRecapture = async (response, type) => {
    if (response.didCancel) {
      // User canceled the capture
      return;
    }

    if (response.error) {
      // Error occurred during image capture
      return;
    }

    // Get the image URI
    const imageUri = response.assets[0].uri;

    try {
      const fileName = `${retrive_loan_data.application_no}AT${type}.jpg`;
      const directory = '/storage/emulated/0/Pictures/Camera/';
      const filePath = directory + fileName;

      // Unlink the previous file path if it exists
      const previousFileExists = await RNFS.exists(filePath);
      if (previousFileExists) {
        await RNFS.unlink(filePath);
      }

      // Move the captured image file
      await RNFS.mkdir(directory);
      await RNFS.moveFile(imageUri, filePath);
      ToastAndroid.show(`Image Update Successfully!`, ToastAndroid.SHORT);

      const fileExists = await RNFS.exists(filePath);
      if (fileExists) {
        setCapturedFiles(prevFiles => [...prevFiles, type]);
      }
    } catch (error) {
      console.log('Image saving error:', error);
    }
  };

  const handleDelete = async type => {
    try {
      const filePath = `/storage/emulated/0/Pictures/Camera/${retrive_loan_data.application_no}AT${type}.jpg`;
      const fileExists = await RNFS.exists(filePath);
      if (fileExists) {
        await RNFS.unlink(filePath);
        setCapturedFiles(prevFiles => prevFiles.filter(file => file !== type));

        ToastAndroid.show(`Delete Successfully!`, ToastAndroid.SHORT);
      } else {
        // setCapturedFiles(prevFiles => prevFiles.filter(file => file !== type));
        ToastAndroid.show(`File does not exist:`, ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show(`Image saving error:`, ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ height: 900, marginTop: 50 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            backgroundColor: '#fff',
            marginTop: 20,
          }}>
          <View
            style={{
              width: '90%',
              marginTop: 10,
              backgroundColor: '#d6d6d6',
              marginBottom: 15,
            }}>
            {data.map(item => (
              <Card
                style={{
                  borderRadius: 0,
                }}
                key={item.id}
              // onPress={() =>
              //   launchCamera(
              //     {
              //       saveToPhotos: false, // Prevent automatic saving
              //       mediaType: 'photo',
              //       includeBase64: false,
              //     },
              //     response => handleImageUpload(response, item.value),
              //   )
              // }
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
                    <View style={{ flexDirection: 'row' }}>
                      {capturedFiles.includes(item.value) ? (
                        <Image
                          source={{
                            uri: `file:///storage/emulated/0/Pictures/Camera/${retrive_loan_data.application_no
                              }AT${item.value}.jpg?timestamp=${Date.now()}`,
                          }}
                          style={{ width: 50, height: 50, marginRight: 10 }}
                        />
                      ) : (
                        <TouchableOpacity>
                          <Icon name="camera" size={50} color="#b8a1c4" onPress={() =>
                            launchCamera(
                              {
                                saveToPhotos: false, // Prevent automatic saving
                                mediaType: 'photo',
                                includeBase64: false,
                              },
                              response => handleImageUpload(response, item.value),
                            )
                          } />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={{
                          marginLeft: 30,
                          marginTop: 15,
                        }}>
                        <Icon
                          name="check"
                          size={30}
                          color={
                            capturedFiles.includes(item.value)
                              ? '#d41913'
                              : '#b8a1c4'
                          } // Change color based on captured files
                        />
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
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={() => handleView(item.value)}
                        style={{
                          marginLeft: 20,
                          marginTop: 15,
                        }}>
                        <Icon
                          name="eye"
                          size={25}
                          color={'green'} // Change color based on captured files
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          launchCamera(
                            {
                              saveToPhotos: false, // Prevent automatic saving
                              mediaType: 'photo',
                              includeBase64: false,
                            },
                            response => handleRecapture(response, item.value),
                          )
                        }
                        style={{
                          marginLeft: 20,
                          marginTop: 15,
                        }}>
                        <Icon
                          name="refresh-ccw"
                          size={25}
                          color={'#6870C3'} // Change color based on captured files
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDelete(item.value)}
                        style={{
                          marginLeft: 20,
                          marginTop: 15,
                        }}>
                        <Icon
                          name="x-circle"
                          size={27}
                          color={'#c24640'} // Change color based on captured files
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card.Content>
                <Divider />
              </Card>
            ))}
          </View>
        </ScrollView>
        <DividerLine />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          <Button
            onPress={() => navigation.goBack()}
            mode="contained"
            buttonColor={'#6870C3'}
            style={{
              borderRadius: 0,
              marginTop: 10,
              color: 'black',
              borderRadius: 5,
              padding: 5,
            }}>
            <Icon name="arrow-left" size={18} color="#fff" />
            Back
          </Button>
        </View>
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
            justifyContent: 'center',
          }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {image_uri ? (
              <Image
                source={{ uri: image_uri }}
                style={{ width: 350, height: 350 }}
              />
            ) : (
              <Icon name="camera-off" size={100} color="#b8a1c4" />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
