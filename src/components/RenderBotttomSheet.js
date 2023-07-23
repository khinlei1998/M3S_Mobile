import {View, Text, TouchableOpacity} from 'react-native';
import React, {useMemo} from 'react';
import BottomSheet from 'react-native-simple-bottom-sheet';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { ToastAndroid } from 'react-native';
export const RenderBottomSheet = () =>
  useMemo(() => {
    return (
      <BottomSheet
        isOpen={false}
        wrapperStyle={{backgroundColor: '#3E3E84'}}>
        <View style={{padding: 5, marginLeft: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="paperclip" size={25} color="#fff" />
            <Text style={{color: '#fff', fontSize: 20, marginLeft: 10}}>
              Document Submit
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'column',
                marginBottom: 16,
              }}>
              <TouchableOpacity
                onPress={() =>
                  ToastAndroid.show(
                    `Only update can modify`,
                    ToastAndroid.SHORT,
                  )
                }
                style={{
                  width: 250,
                  height: 40,
                  backgroundColor: '#242157',
                  margin: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 5,
                  }}>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Icon name="paperclip" size={20} color="#fff" />
                    <Text style={{color: '#fff', marginLeft: 5}}>
                      Guarantor Form
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={25} color="#fff" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  ToastAndroid.show(
                        `Only update can modify`,
                        ToastAndroid.SHORT,
                      )
                }
                style={{
                  width: 250,
                  height: 40,
                  backgroundColor: '#242157',
                  margin: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 5,
                  }}>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Icon name="paperclip" size={20} color="#fff" />
                    <Text style={{color: '#fff', marginLeft: 5}}>
                      Area Evaluation Form
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={25} color="#fff" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  ToastAndroid.show(
                        `Only update can modify`,
                        ToastAndroid.SHORT,
                      )
                }
                style={{
                  width: 250,
                  height: 40,
                  backgroundColor: '#242157',
                  margin: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 5,
                  }}>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Icon name="paperclip" size={20} color="#fff" />
                    <Text style={{color: '#fff', marginLeft: 5}}>
                      RelationShip Form
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={25} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginBottom: 16,
              }}>
              <TouchableOpacity
                onPress={() =>
               ToastAndroid.show(
                        `Only update can modify`,
                        ToastAndroid.SHORT,
                      )
                }
                style={{
                  width: 250,
                  height: 40,
                  backgroundColor: '#242157',
                  margin: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 5,
                  }}>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Icon name="paperclip" size={20} color="#fff" />
                    <Text style={{color: '#fff', marginLeft: 5}}>
                      Evidence Document Form
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={25} color="#fff" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  ToastAndroid.show(
                        `Only update can modify`,
                        ToastAndroid.SHORT,
                      )
                }
                style={{
                  width: 250,
                  height: 40,
                  backgroundColor: '#242157',
                  margin: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 5,
                  }}>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Icon name="paperclip" size={20} color="#fff" />
                    <Text style={{color: '#fff', marginLeft: 5}}>
                      Exceptional Approval Request...
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={25} color="#fff" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                 ToastAndroid.show(
                        `Only update can modify`,
                        ToastAndroid.SHORT,
                      )
                }
                style={{
                  width: 250,
                  height: 40,
                  backgroundColor: '#242157',
                  margin: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 5,
                  }}>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Icon name="paperclip" size={20} color="#fff" />
                    <Text style={{color: '#fff', marginLeft: 5}}>
                      Passport Photo
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={25} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'column',
                marginBottom: 16,
                justifyContent: 'center',
              }}>
              <Button
                mode="contained"
                buttonColor={'#0480B7'}
                style={{
                  borderRadius: 0,
                  width: 130,
                  height: 70,
                  borderRadius: 10,
                  justifyContent: 'center',
                }}>
                Save
              </Button>

              <Button
              disabled
                mode="contained"
                buttonColor={'#6870C3'}
                style={{
                  borderRadius: 0,
                  width: 130,
                  height: 70,
                  borderRadius: 10,
                  justifyContent: 'center',
                  marginTop: 5,
                }}>
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </BottomSheet>
    );
  }, []);
