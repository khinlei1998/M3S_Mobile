import {View, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import DividerLine from '../../components/DividerLine';
import {Avatar, Button, Card, Text, Divider, Modal} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function Evidence() {
  const [modalVisible, setModalVisible] = useState(false);
  const [image_uri, setImageUri] = useState('');
  const [response, setResponse] = useState(null);

  const data = [
    {id: 1, name: 'NRC Card'},
    {id: 2, name: 'Guarantor NRC Card'},
    {id: 3, name: 'Co-borrower NRC Card'},
    // Add more data as needed
  ];
  const handleIconPress = () => {
    setModalVisible(true);
  };
  const handleImageUpload = response => {
    if (response.assets !== undefined && response.assets.length > 0) {
      setImageUri(response.assets[0].uri);
      setResponse(JSON.stringify(response));
    }
  };
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
            onPress={() => handleIconPress()}>
            <Card.Content
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                margin: 10,
              }}>
              <TouchableOpacity>
                <Icon name="camera" size={60} color="#b8a1c4" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => alert('kk')}
                style={{
                  marginLeft: 30,
                }}>
                <Icon name="check" size={30} color="#b8a1c4" />
              </TouchableOpacity>
              <Text
                style={{
                  marginLeft: 30,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                {item.name}
              </Text>
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
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {image_uri != '' ? (
              <Image
                source={{uri: image_uri}}
                style={{width: 350, height: 350}}
              />
            ) : (
              <TouchableOpacity
                onPress={() =>
                  launchCamera(
                    {
                      saveToPhotos: true,
                      mediaType: 'photo',
                      includeBase64: false,
                    },
                    data => handleImageUpload(data),
                  )
                }>
                <Icon name="camera" size={350} color="#b8a1c4" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
