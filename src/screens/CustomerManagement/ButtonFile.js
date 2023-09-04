import {View, Text, Button,TouchableOpacity} from 'react-native';
import React from 'react';
import {connect,useDispatch} from 'react-redux';
import {Field, reduxForm,reset} from 'redux-form';
import { TestAction } from '../../redux/EmployeeReducer';
function ButtonFile(props) {
    const dispatch = useDispatch();

    const {handleSubmit,TestAction}=props
    const onSubmit = values => {
        alert(JSON.stringify(values))
        TestAction(values);
        dispatch(reset('yourFormName'));
    
      };

    const btnSelectEmployee = item => {
        const emp_data={
            branchName:'we',
            branchCode:'pp'
        }       
        TestAction(emp_data);
      };
  return (
    <View style={{marginTop:20}}>
      <TouchableOpacity
       
        onPress={() => btnSelectEmployee()}
      >
        <Text>Option 1</Text>
      </TouchableOpacity>
    </View>
  );
}

export default connect(null, {TestAction})(
    reduxForm({form: 'yourFormName'})(ButtonFile),
  );
