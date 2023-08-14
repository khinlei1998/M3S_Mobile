import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  CameraRoll,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import DividerLine from '../../components/DividerLine';
import {Avatar, Button, Card, Text, Divider, Modal} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {useNavigation} from '@react-navigation/native';

export default function Passport(props) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [image_uri, setImageUri] = useState('');
  const [btn_type, setType] = useState('');
  const [capturedFiles, setCapturedFiles] = useState(false);

  const retrive_loan_data = props.route.params.retrive_loan_data;
  const data = [
    {id: 1, name: 'Passport Photo', value: '12'},

    // Add more data as needed
  ];

  const handleView = async value => {
    let filePath = `/storage/emulated/0/Pictures/Camera/${retrive_loan_data.application_no}AT${value}F.jpg`;

    const fileExists = await RNFS.exists(filePath);
    if (fileExists) {
      const queryParam = `?timestamp=${Date.now()}`;

      setImageUri(
        `file:///storage/emulated/0/Pictures/Camera/${retrive_loan_data.application_no}AT${value}F.jpg${queryParam}`,
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
        const fileName = `${retrive_loan_data.application_no}AT12F.jpg`;
        const directory = `/storage/emulated/0/Pictures/Camera/`;
        const filePath = directory + fileName;
        const fileExists = await RNFS.exists(filePath);
        if (fileExists) {
          setCapturedFiles(true);
        }
      } catch (error) {
        console.log('Error checking file existence:', error);
      }
    };

    checkFileExists();
  }, [capturedFiles]);

  const handleImageUpload = async response => {
    setCapturedFiles(false);
    if (response.didCancel) {
      // User canceled the capture
      return;
    }

    if (response.error) {
      // Error occurred during image capture
      console.log('Image capture error:', response.error);
      return;
    }

    // Get the image URI
    const imageUri = response.assets[0].uri;

    try {
      const fileName = `${retrive_loan_data.application_no}AT12F.jpg`;
      const directory = `/storage/emulated/0/Pictures/Camera/`;
      const filePath = directory + fileName;
      await RNFS.mkdir(directory);
      // Rename the captured image file
      await RNFS.moveFile(imageUri, filePath);
      ToastAndroid.show(`Image Save Successfully!`, ToastAndroid.SHORT);

      const fileExists = await RNFS.exists(filePath);
      if (fileExists) {
        setCapturedFiles(true);
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
      console.log('Image capture error:', response.error);
      return;
    }

    // Get the image URI
    const imageUri = response.assets[0].uri;

    try {
      const fileName = `${retrive_loan_data.application_no}AT${type}F.jpg`;
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

  const handleDelete = async () => {
    try {
      const filePath = `/storage/emulated/0/Pictures/Camera/${retrive_loan_data.application_no}AT12F.jpg`;
      const fileExists = await RNFS.exists(filePath);
      if (fileExists) {
        await RNFS.unlink(filePath);
        setCapturedFiles(false);

        ToastAndroid.show(`Delete Successfully!`, ToastAndroid.SHORT);
      } else {
        // setCapturedFiles(prevFiles => prevFiles.filter(file => file !== type));
        ToastAndroid.show(`File does not exist:`, ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show(`Image saving error:`, ToastAndroid.SHORT);
      console.log('Image saving error:', error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{alignItems: 'center'}}>
        {/* <Card
          style={{
            width: 400,
            borderRadius: 0,
            height: 500,
            alignItems: 'center'
          }}>
          <Card.Content> */}
        {capturedFiles ? (
          <Image
            source={{
              uri: `file:///storage/emulated/0/Pictures/Camera/${
                retrive_loan_data.application_no
              }AT12F.jpg?timestamp=${Date.now()}`,
            }}
            style={{width: '100%', height: 200, resizeMode: 'contain'}}
          />
        ) : (
          <Image
            source={require('../../../assets/images/default_camera.jpeg')}
            style={{width: 300, height: 200}}
          />
        )}

        <Button
          onPress={() =>
            launchCamera(
              {
                saveToPhotos: false, // Prevent automatic saving
                mediaType: 'photo',
                includeBase64: false,
              },
              response => handleImageUpload(response),
            )
          }
          style={{
            width: 300,
            marginTop: 30,
            color: 'black',
            padding: 5,
          }}
          icon="camera"
          mode="contained">
          Take Photo
        </Button>

        <Button
          style={{
            width: 300,
            marginTop: 30,
            color: 'black',
            padding: 5,
          }}
          icon="cancel"
          mode="contained"
          onPress={() => handleDelete()}>
          Delete Photo
        </Button>

        <Button
          style={{
            width: 300,
            marginTop: 30,
            color: 'black',
            padding: 5,
          }}
          icon="chevron-back"
          mode="contained"
          onPress={() => handleDelete()}>
          Go Back
        </Button>
        {/* </Card.Content>
        </Card> */}
      </View>
    </View>
  );
}
