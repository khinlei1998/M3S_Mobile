import {View, Text, Image} from 'react-native';
import React, {useRef} from 'react';
import {Modal} from 'react-native-paper';
import {style} from '../../style/Individual_Loan_style';
import Icon from 'react-native-vector-icons/Feather';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import ViewShot from 'react-native-view-shot';

export default function Borrower_Fg_Modal(props) {
  const {
    show_bor_fg_modal,
    hideBorrFigModal,
    timerCount,
    show_borrower_fig,
    imageSource,
    modalContent,
    setCapturedFiles,
    setBorFgImg,
    all_loandata
  } = props;
  console.log('all_loandata',all_loandata);
  const viewShotRef = useRef(null);

  const saveFig = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    try {
      const granted = await AsyncStorage.getItem('writeStoragePermission');

      if (granted) {
        // const filename = `${
        //   Math.floor(Math.random() * 100000) + modalContent
        // }.jpg`;
        const filename = `1.jpg`;
        const directory = '/storage/emulated/0/Pictures/Fingerprint/';
        const filePath = directory + filename;
        await RNFS.mkdir(directory);
        viewShotRef.current.capture().then(uri => {
          RNFS.moveFile(uri, filePath)
            .then(async () => {
              alert('Image saved successfully!');
              setBorFgImg(false);
              const fileExists = await RNFS.exists(filePath);
              if (fileExists) {
                setCapturedFiles(prevFiles => [...prevFiles, modalContent]);
              }
            })
            .catch(err => {
              console.log('Error moving image:', err.message);
            });
        });
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };
  return (
    <Modal
      useNativeDriver
      hideModalContentWhileAnimating
      dismissable={false}
      visible={show_bor_fg_modal}
      onDismiss={hideBorrFigModal}
      contentContainerStyle={style.modal_container}>
      <View
        style={style.modal_header}
        onStartShouldSetResponder={() => hideBorrFigModal()}>
        <Icon
          name="x-circle"
          size={25}
          color="#fff"
          style={style.cancel_icon_style}
        />
      </View>
      <View style={{padding: 10, height: 550, backgroundColor: '#fff'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 30}}>
              00:0{timerCount}
            </Text>
            {show_borrower_fig && (
              <>
                <ViewShot ref={viewShotRef}>
                  <Image
                    source={imageSource}
                    style={{marginVertical: 20, height: 300}}
                  />
                </ViewShot>

                <Button
                  onPress={() => saveFig(imageSource)}
                  mode="contained"
                  buttonColor={'#21316C'}
                  style={{width: 150, height: 44}}>
                  Save
                </Button>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
