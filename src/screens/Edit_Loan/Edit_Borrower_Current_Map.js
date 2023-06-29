import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {List} from 'react-native-paper';
import {style} from '../../style/Individual_Loan_style';
import {reduxForm, Field, change, reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
function Borrower_Current_Map(props) {
  const {navigation, map, borrower_map,has_borrower_map} = props;
  const [borrower_map_expanded, setBorrowerMapExpanded] = useState(true);
  const handleBorrowerMapToggle = () => {
    setBorrowerMapExpanded(!borrower_map_expanded);
  };
  return (
    <List.Accordion
      expanded={borrower_map_expanded}
      onPress={handleBorrowerMapToggle}
      style={style.list_container}
      titleStyle={style.list_title}
      title="Borrower current Home Map">
      <View style={style.sub_container}>
        <TouchableOpacity onPress={() =>  navigation.navigate('Edit Borrower Map',{has_borrower_map})}>
          {map ? (
            <Image
              source={{
                uri: `file://${map}`,
              }}
              style={{width: '100%', height: 200}}
              resizeMode="contain"
            />
          ) : borrower_map ? (
            <Image
              source={{
                uri: `file://${borrower_map}`,
              }}
              style={{width: '100%', height: 200}}
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
  form: 'Edit_Individual_Loan_Form',
  // validate,
})(connect(mapStateToProps, {})(Borrower_Current_Map));
