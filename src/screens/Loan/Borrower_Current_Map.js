import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {List} from 'react-native-paper';
import {style} from '../../style/Individual_Loan_style';
import {reduxForm, Field, change, reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

function Borrower_Current_Map(props) {
  const {navigation, all_loandata, map} = props;
  const [borrower_map_expanded, setBorrowerMapExpanded] = useState(true);
  const [map_show, setMapShow] = useState(false);
  // const [map, setShowMap] = useState('')
  const {t} = useTranslation();

  const p_type = 10;
  const handleBorrowerMapToggle = () => {
    setBorrowerMapExpanded(!borrower_map_expanded);
  };
  const btnshowMap = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    navigation.navigate('Borrower Map', {all_loandata, user_id,p_type});
  };
  return (
    <List.Accordion
      expanded={borrower_map_expanded}
      onPress={handleBorrowerMapToggle}
      style={style.list_container}
      titleStyle={style.list_title}
      title={t("Borrower current Home Map")}>
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
  form: 'Individual_Loan_Form',
  // validate,
})(connect(mapStateToProps, {})(Borrower_Current_Map));
