import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect, createRef} from 'react';
import {reduxForm, Field, change, reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import {style} from '../../style/Relation_style';
import {List, Modal} from 'react-native-paper';
 function Edit_Relation_Member_Sign(props) {
  const {relation_update_status}=props
  const [relation_sign_expanded, setRelationSignExpanded] = useState(true);

  const handleRelationSignToggle = () => {
    setRelationSignExpanded(!relation_sign_expanded);
  };

  const {
    setCanvas,
    show_canvas,
    signature2,
    signature1,
    signature3,
    signature5,
    signature4,
    signature6,
    signature7,
    signature8,
    signature9,
    signature10,
    signature1_path,
    signature2_path,
    signature3_path,
    signature4_path,
    signature5_path,
    signature6_path,
    signature7_path,
    signature8_path,
    signature9_path,
    signature10_path,
    btnShowBorrowerSign,
    handleButtonClick
  } = props;
  console.log('relation_update_status',relation_update_status);
  const queryParam = `?timestamp=${Date.now()}`;

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

                {signature1_path == '' && signature1 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true
                        ? handleButtonClick('btn1')
                        : ''
                    }>
                    <Image
                      source={require('../../../assets/images/default-sign.png')}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : signature1_path && signature1 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true && handleButtonClick('btn1')
                    }>
                    <Image
                      source={{
                        uri: `file:///storage/emulated/0/Pictures/Signature/${signature1_path}${queryParam}`,
                      }}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : (
                  signature1 &&
                  signature1_path && (
                    <TouchableOpacity
                      onPress={() =>
                        relation_update_status == true &&
                        handleButtonClick('btn1')
                      }>
                      <Image
                        source={{
                          uri: `data:image/png;base64,${signature1}`,
                        }}
                        style={{width: 100, height: 50}}
                      />
                    </TouchableOpacity>
                  )
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  margin: 10,
                }}>
                <Text>Signature 3</Text>
                {signature3_path == '' && signature3 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true
                        ? handleButtonClick('btn3')
                        : ''
                    }>
                    <Image
                      source={require('../../../assets/images/default-sign.png')}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : signature3_path && signature3 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true && handleButtonClick('btn3')
                    }>
                    <Image
                      source={{
                        uri: `file:///storage/emulated/0/Pictures/Signature/${signature3_path}${queryParam}`,
                      }}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : (
                  signature3 &&
                  signature3_path && (
                    <TouchableOpacity
                      onPress={() =>
                        relation_update_status == true &&
                        handleButtonClick('btn3')
                      }>
                      <Image
                        source={{
                          uri: `data:image/png;base64,${signature3}`,
                        }}
                        style={{width: 100, height: 50}}
                      />
                    </TouchableOpacity>
                  )
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  margin: 10,
                }}>
                <Text>Signature 5</Text>
                {signature5_path == '' && signature5 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true
                        ? handleButtonClick('btn5')
                        : ''
                    }>
                    <Image
                      source={require('../../../assets/images/default-sign.png')}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : signature5_path && signature5 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true && handleButtonClick('btn5')
                    }>
                    <Image
                      source={{
                        uri: `file:///storage/emulated/0/Pictures/Signature/${signature5_path}${queryParam}`,
                      }}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : (
                  signature5 &&
                  signature5_path && (
                    <TouchableOpacity
                      onPress={() =>
                        relation_update_status == true &&
                        handleButtonClick('btn5')
                      }>
                      <Image
                        source={{
                          uri: `data:image/png;base64,${signature5}`,
                        }}
                        style={{width: 100, height: 50}}
                      />
                    </TouchableOpacity>
                  )
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  margin: 10,
                }}>
                <Text>Signature 7</Text>
                {signature7_path == '' && signature7 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true
                        ?  handleButtonClick('btn7')
                        : ''
                    }>
                    <Image
                      source={require('../../../assets/images/default-sign.png')}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : signature7_path && signature7 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true && handleButtonClick('btn7')
                    }>
                    <Image
                      source={{
                        uri: `file:///storage/emulated/0/Pictures/Signature/${signature7_path}${queryParam}`,
                      }}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : (
                  signature7 &&
                  signature7_path && (
                    <TouchableOpacity
                      onPress={() =>
                        relation_update_status == true &&
                        handleButtonClick('btn7')
                      }>
                      <Image
                        source={{
                          uri: `data:image/png;base64,${signature7}`,
                        }}
                        style={{width: 100, height: 50}}
                      />
                    </TouchableOpacity>
                  )
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  margin: 10,
                }}>
                <Text>Signature 9</Text>
                {signature9_path == '' && signature9 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true
                        ?  handleButtonClick('btn9')
                        : ''
                    }>
                    <Image
                      source={require('../../../assets/images/default-sign.png')}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : signature9_path && signature9 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true && handleButtonClick('btn9')
                    }>
                    <Image
                      source={{
                        uri: `file:///storage/emulated/0/Pictures/Signature/${signature9_path}${queryParam}`,
                      }}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : (
                  signature9 &&
                  signature9_path && (
                    <TouchableOpacity
                      onPress={() =>
                        relation_update_status == true &&
                        handleButtonClick('btn9')
                      }>
                      <Image
                        source={{
                          uri: `data:image/png;base64,${signature9}`,
                        }}
                        style={{width: 100, height: 50}}
                      />
                    </TouchableOpacity>
                  )
                )}
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
                {signature2_path == '' && signature2 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true
                        ?  handleButtonClick('btn2')
                        : ''
                    }>
                    <Image
                      source={require('../../../assets/images/default-sign.png')}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : signature2_path && signature2 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true && handleButtonClick('btn2')
                    }>
                    <Image
                      source={{
                        uri: `file:///storage/emulated/0/Pictures/Signature/${signature2_path}${queryParam}`,
                      }}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : (
                  signature2 &&
                  signature2_path && (
                    <TouchableOpacity
                      onPress={() =>
                        relation_update_status == true &&
                        handleButtonClick('btn2')
                      }>
                      <Image
                        source={{
                          uri: `data:image/png;base64,${signature2}`,
                        }}
                        style={{width: 100, height: 50}}
                      />
                    </TouchableOpacity>
                  )
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  margin: 10,
                }}>
                <Text>Signature 4</Text>
                {signature4_path == '' && signature4 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true
                        ?  handleButtonClick('btn4')
                        : ''
                    }>
                    <Image
                      source={require('../../../assets/images/default-sign.png')}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : signature4_path && signature4 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true && handleButtonClick('btn4')
                    }>
                    <Image
                      source={{
                        uri: `file:///storage/emulated/0/Pictures/Signature/${signature4_path}${queryParam}`,
                      }}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : (
                  signature4 &&
                  signature4_path && (
                    <TouchableOpacity
                      onPress={() =>
                        relation_update_status == true &&
                        handleButtonClick('btn4')
                      }>
                      <Image
                        source={{
                          uri: `data:image/png;base64,${signature4}`,
                        }}
                        style={{width: 100, height: 50}}
                      />
                    </TouchableOpacity>
                  )
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  margin: 10,
                }}>
                <Text>Signature 6</Text>
                {signature6_path == '' && signature6 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true
                        ? handleButtonClick('btn6')
                        : ''
                    }>
                    <Image
                      source={require('../../../assets/images/default-sign.png')}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : signature6_path && signature6 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true && handleButtonClick('btn6')
                    }>
                    <Image
                      source={{
                        uri: `file:///storage/emulated/0/Pictures/Signature/${signature6_path}${queryParam}`,
                      }}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : (
                  signature6 &&
                  signature6_path && (
                    <TouchableOpacity
                      onPress={() =>
                        relation_update_status == true &&
                        handleButtonClick('btn6')
                      }>
                      <Image
                        source={{
                          uri: `data:image/png;base64,${signature6}`,
                        }}
                        style={{width: 100, height: 50}}
                      />
                    </TouchableOpacity>
                  )
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  margin: 10,
                }}>
                <Text>Signature 8</Text>
                {signature8_path == '' && signature8 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true
                        ? handleButtonClick('btn8')
                        : ''
                    }>
                    <Image
                      source={require('../../../assets/images/default-sign.png')}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : signature8_path && signature8 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true && handleButtonClick('btn8')
                    }>
                    <Image
                      source={{
                        uri: `file:///storage/emulated/0/Pictures/Signature/${signature8_path}${queryParam}`,
                      }}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : (
                  signature8 &&
                  signature8_path && (
                    <TouchableOpacity
                      onPress={() =>
                        relation_update_status == true &&
                        handleButtonClick('btn8')
                      }>
                      <Image
                        source={{
                          uri: `data:image/png;base64,${signature8}`,
                        }}
                        style={{width: 100, height: 50}}
                      />
                    </TouchableOpacity>
                  )
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  margin: 10,
                }}>
                <Text>Signature 10</Text>
                {signature10_path == '' && signature10 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true
                        ? handleButtonClick('btn10')
                        : ''
                    }>
                    <Image
                      source={require('../../../assets/images/default-sign.png')}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : signature10_path && signature10 == '' ? (
                  <TouchableOpacity
                    onPress={() =>
                      relation_update_status == true && handleButtonClick('btn10')
                    }>
                    <Image
                      source={{
                        uri: `file:///storage/emulated/0/Pictures/Signature/${signature10_path}${queryParam}`,
                      }}
                      style={{width: 100, height: 50}}
                    />
                  </TouchableOpacity>
                ) : (
                  signature10 &&
                  signature10_path && (
                    <TouchableOpacity
                      onPress={() =>
                        relation_update_status == true &&
                        handleButtonClick('btn10')
                      }>
                      <Image
                        source={{
                          uri: `data:image/png;base64,${signature10}`,
                        }}
                        style={{width: 100, height: 50}}
                      />
                    </TouchableOpacity>
                  )
                )}
              </View>
            </View>
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>
            {' '}
            I am personally aware of this affirmative statement and confirm it.
          </Text>
        </View>
      </List.Accordion>
    </>
  );
}

function mapStateToProps(state) {
  return {
    relation_update_status: state.loan.relation_update_status,

  };
}

export default reduxForm({
  form: 'Edit_Relation_Form',
  // validate,
})(connect(mapStateToProps, {  })(Edit_Relation_Member_Sign));
