import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect, createRef} from 'react';
import {reduxForm, Field, change, reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import {style} from '../../style/Relation_style';
import {List} from 'react-native-paper';
export default function Relation_Contract(props) {
  const {
    coborrower_sign_path,
    show_coborrower_sign,
    show_borrower_sign,
    borrower_sign_path,
    setCanvas,
    show_canvas,
    showCanvas,
    navigation,
    filePath,
    setCoBorrowerCanvas,
    co_borrower_filePath,
    show_co_borrower_canvas,
  } = props;
  const [relation_contract_expanded, setRelationContractExpanded] =
    useState(true);
  const handleRelationContractToggle = () => {
    setRelationContractExpanded(!relation_contract_expanded);
  };
  return (
    <>
      <List.Accordion
        expanded={relation_contract_expanded}
        onPress={handleRelationContractToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Contract">
        <View style={style.sub_container}>
          <View
            style={{
              flexDirection: 'column',
              padding: 5,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold'}}>
              My Name<Text style={{color: '#A1B5DC'}}>Yati , address,</Text>
              <Text style={{color: '#A1B5DC'}}>no225{'\n'}</Text>
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              holding egistration number
              <Text style={{color: '#A1B5DC'}}>12/3{'\n'}</Text>
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              and the Co-borrower
              <Text style={{color: '#A1B5DC'}}>hfdhf,{'\n'}</Text>
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              Register Number
              <Text style={{color: '#A1B5DC'}}>hfdhf,{'\n'}</Text>
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              are promise to be directly related in the following form
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
              margin: 10,
            }}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                Guarantor Name
              </Text>
              <Text> Date 17/05/2023</Text>
            </View>
            {/* <Text>{borrower_sign_path}</Text> */}

            <View>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>Sign</Text>

                <TouchableOpacity onPress={() => setCanvas(!show_canvas)}>
                  <Image
                    source={{
                      uri: `https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png`,
                    }}
                    style={{width: 100, height: 50}}
                  />
                </TouchableOpacity>


            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
              margin: 10,
            }}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                Co Borrower Name
              </Text>
              <Text> Date 17/05/2023</Text>
            </View>

            <View>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>Sign</Text>

                <TouchableOpacity
                  onPress={() => setCoBorrowerCanvas(!show_co_borrower_canvas)}>
                  <Image
                    source={{
                      uri: `https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png`,
                    }}
                    style={{width: 100, height: 50}}
                  />
                </TouchableOpacity>


            </View>
          </View>
          <Text style={{fontWeight:'bold',fontSize:15}}>The co-borrower is responsible</Text>
          <Text style={{fontWeight:'bold',fontSize:15}}>The above mentioned and </Text>
        </View>
      </List.Accordion>
    </>
  );
}
