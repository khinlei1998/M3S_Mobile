import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {RadioButton, Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
// import RadioButton from '../../components/RadioButtonFile';
import {Field} from 'redux-form';
import {addEmpFilter} from '../../redux/EmployeeReducer';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {TestAction} from '../../redux/EmployeeReducer';
import {change} from 'redux-form';
import {useTranslation} from 'react-i18next';

function ViewEmployee(props) {
  const [checked, setChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [filter_emp, setFilterEmp] = useState();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {TestAction, emp_data, addEmpFilter, hideModal} = props;

  const btnSelectEmployee = item => {
    setSelectedValue(item.employee_no);
  };

 
  const item = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 10,
        }}>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {index + 1}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.employee_no}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.employee_name}
        </Text>

        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.position_title_nm == null ? 'No Data' : item.position_title_nm}
        </Text>

        <View>
          <RadioButton
            value={item.employee_no}
            status={
              selectedValue === item.employee_no ? 'checked' : 'unchecked'
            }
            onPress={() => btnSelectEmployee(item)}
          />
        </View>
      </View>
    );
  };
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          borderRadius: 5,
          padding: 5,
          margin: 20,
        }}>
        <Text
          style={{
            padding: 10,
            flex: 1,
            fontWeight: 'bold',
          }}>
          #
        </Text>
        <Text
          style={{
            flex: 1,

            padding: 10,
            fontWeight: 'bold',
          }}>
          {t('Employee No')}
        </Text>
        <Text
          style={{
            flex: 1,

            padding: 10,
            fontWeight: 'bold',
          }}>
          Employee Name
        </Text>
        <Text
          style={{
            flex: 1,

            padding: 10,
            fontWeight: 'bold',
          }}>
          Positon Name
        </Text>
      </View>

     

      <FlatList
        data={emp_data}
        renderItem={item}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
}

export default connect(null, {addEmpFilter, TestAction})(
  reduxForm({form: 'Customer_ManagementForm'})(ViewEmployee),
);
