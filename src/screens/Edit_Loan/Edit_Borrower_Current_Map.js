import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {List} from 'react-native-paper';
import {style} from '../../style/Individual_Loan_style';
export default function Borrower_Current_Map() {
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
      <View style={style.sub_container}></View>
    </List.Accordion>
  );
}
