import {View, Text, Image, Button} from 'react-native';
import React from 'react';
import {
  RadioButton,
  List,
  Modal,
  Provider,
  Portal,
  TextInput,
} from 'react-native-paper';
import {style} from '../../style/Individual_Loan_style';
import Icon from 'react-native-vector-icons/Feather';

export default function Indi_loan_fingerprint() {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <View>
      <Text>Indi_loan_fingerprint</Text>

      <Modal
        useNativeDriver
        hideModalContentWhileAnimating
        // dismissable={false}
        visible={visible}
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
            }}></View>
        </View>
      </Modal>
      <Button title="Press" onPress={()=>showModal()} />

      {/* <Image source={require('../../../assets/fingerprint/f1.jpeg')} /> */}
    </View>
  );
}
