import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import DividerLine from '../../components/DividerLine';
import {Button} from 'react-native-paper';
export default function Sync_Download_Screen() {
  return (
    <View style={{marginTop: 20, marginLeft: 10, marginRight: 10, flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 10}}>
          Download Information
        </Text>

        <TouchableOpacity onPress={() => alert('pp')}>
          <Icon
            name="rotate-cw"
            size={30}
            color="#000"
            style={{marginRight: 15}}
          />
        </TouchableOpacity>
      </View>

      <DividerLine cuswidth />
      <View
        style={{
          flexDirection: 'row',
          borderRadius: 5,
          padding: 5,
          margin: 10,
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
          Size
        </Text>
        <Text
          style={{
            flex: 1,

            padding: 10,
            fontWeight: 'bold',
          }}>
          Last Sync date:
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          marginBottom: 10,
          alignSelf: 'center',
        }}>
        <Button
          style={{
            borderRadius: 0,
            width: 120,
            marginTop: 10,
            color: 'black',
            marginLeft: 5,
            padding: 5,
          }}
          mode="outlined"
          onPress={() => console.log('Button Pressed')}>
          Download
        </Button>
      </View>
    </View>
  );
}
