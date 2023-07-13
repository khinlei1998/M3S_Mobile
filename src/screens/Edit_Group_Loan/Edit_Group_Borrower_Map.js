import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {List} from 'react-native-paper';
import {reduxForm, Field, change, reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {style} from '../../style/Group_Loan_style';
function Edit_Group_Borrower_Map(props) {
  const {navigation, all_loandata, map, p_type} = props;

  const [borrower_map_expanded, setBorrowerMapExpanded] = useState(true);
  const handleBorrowerMapToggle = () => {
    setBorrowerMapExpanded(!borrower_map_expanded);
  };
  const btnshowMap = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    navigation.navigate('Borrower Map', {all_loandata, user_id, p_type});
  };
  return (
    <List.Accordion
      expanded={borrower_map_expanded}
      onPress={handleBorrowerMapToggle}
      style={style.list_container}
      titleStyle={style.list_title}
      title="Borrower current Home Map">
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          backgroundColor: '#FAFAFA',
          padding: 10,
        }}>
        <TouchableOpacity onPress={() => btnshowMap()}>
          {map ? (
            <Image
              source={{
                uri: `file://${map}`,
                // uri: `file:///storage/emulated/0/Pictures/RNSketchCanvas/10M00172TB202306292SG01.jpg`,
              }}
              style={{height: 400}}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require('../../../assets/images/default-sign.png')}
              style={{width: '100%', height: 200}}
            />
          )}
        </TouchableOpacity>
      </View>
    </List.Accordion>
  );
}
function mapStateToProps(state) {
  return {
    map: state.loan.borrower_map_path,
  };
}

export default reduxForm({
  form: 'Edit_Group_Form',
  // validate,
})(connect(mapStateToProps, {})(Edit_Group_Borrower_Map));
