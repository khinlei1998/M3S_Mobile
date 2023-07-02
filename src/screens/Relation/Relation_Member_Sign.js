import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect, createRef} from 'react';
import {reduxForm, Field, change, reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import {style} from '../../style/Relation_style';
import {List, Modal} from 'react-native-paper';
export default function Relation_Member_Sign(props) {
  const [relation_sign_expanded, setRelationSignExpanded] = useState(true);

  const handleRelationSignToggle = () => {
    setRelationSignExpanded(!relation_sign_expanded);
  };

  const {
    setCanvas,
    handleButtonClick,
    show_borrower_sign,
    signature2,
    signature1,
    signature3,
  } = props;
  return (
    <>
      <List.Accordion
        expanded={relation_sign_expanded}
        onPress={handleRelationSignToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Contract">
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            backgroundColor: '#FAFAFA',
            padding: 10,
          }}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  margin: 10,
                }}>
                <Text>Signature 1</Text>
                {signature1 == '' ? (
                  <TouchableOpacity onPress={() => handleButtonClick('btn1')}>
                    <Image
                      source={{
                        uri: `https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png`,
                      }}
                      style={{width: 100, height: 50, marginLeft: 10}}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => handleButtonClick('btn1')}>
                    <Image
                      // source={{uri: `file://${borrower_sign_path}`}}
                      source={{
                        uri: `data:image/png;base64,${signature1}`,
                      }}
                      style={{width: 100, height: 50, marginLeft: 10}}
                    />
                  </TouchableOpacity>
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  margin: 10,
                }}>
                <Text>Signature 3</Text>
                {signature3 == '' ? (
                  <TouchableOpacity onPress={() => handleButtonClick('btn3')}>
                    <Image
                      source={{
                        uri: `https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png`,
                      }}
                      style={{width: 100, height: 50, marginLeft: 10}}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => handleButtonClick('btn3')}>
                    <Image
                      // source={{uri: `file://${borrower_sign_path}`}}
                      source={{
                        uri: `data:image/png;base64,${signature3}`,
                      }}
                      style={{width: 100, height: 50, marginLeft: 10}}
                    />
                  </TouchableOpacity>
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  margin: 10,
                }}>
                <Text>Signature 5</Text>
                <TouchableOpacity>
                  <Image
                    source={{
                      uri: `https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png`,
                    }}
                    style={{width: 100, height: 50, marginLeft: 10}}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  margin: 10,
                }}>
                <Text>Signature 7</Text>
                <TouchableOpacity>
                  <Image
                    source={{
                      uri: `https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png`,
                    }}
                    style={{width: 100, height: 50, marginLeft: 10}}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  margin: 10,
                }}>
                <Text>Signature 9</Text>
                <TouchableOpacity>
                  <Image
                    source={{
                      uri: `https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png`,
                    }}
                    style={{width: 100, height: 50, marginLeft: 10}}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  margin: 10,
                }}>
                <Text>Signature 2</Text>
                <TouchableOpacity>
                  <Image
                    source={{
                      uri: `https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png`,
                    }}
                    style={{width: 100, height: 50, marginLeft: 10}}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  margin: 10,
                }}>
                <Text>Signature 4</Text>
                <TouchableOpacity>
                  <Image
                    source={{
                      uri: `https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png`,
                    }}
                    style={{width: 100, height: 50, marginLeft: 10}}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  margin: 10,
                }}>
                <Text>Signature 6</Text>
                <TouchableOpacity>
                  <Image
                    source={{
                      uri: `https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png`,
                    }}
                    style={{width: 100, height: 50, marginLeft: 10}}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  margin: 10,
                }}>
                <Text>Signature 8</Text>
                <TouchableOpacity>
                  <Image
                    source={{
                      uri: `https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png`,
                    }}
                    style={{width: 100, height: 50, marginLeft: 10}}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  margin: 10,
                }}>
                <Text>Signature 10</Text>
                <TouchableOpacity>
                  <Image
                    source={{
                      uri: `https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png`,
                    }}
                    style={{width: 100, height: 50, marginLeft: 5}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>
            {' '}
            I am personally
          </Text>
        </View>
      </List.Accordion>
    </>
  );
}
