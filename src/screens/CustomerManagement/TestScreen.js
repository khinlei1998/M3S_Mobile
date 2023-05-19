import {View, Text, Button} from 'react-native';
import React, {useEffect} from 'react';
import {Field, reduxForm, reset,initialize} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import TextInputFile from '../../components/TextInputFile';
import ButtonFile from './ButtonFile';
import {TestAction} from '../../redux/EmployeeReducer';
import InputFile from '../../components/InputTest';
import { setCusFormInitialValues } from '../../redux/CustomerReducer';

const TestScreen = props => {
  const {handleSubmit, createData, TestAction, edit_data,test, fieldValue, initializeForm,setCusFormInitialValues} = props;
  const dispatch = useDispatch();
  console.log('fieldValue>>>>',fieldValue);

  const onSubmit = values => {
    alert(JSON.stringify(values));
    TestAction(values);
    props.navigation.navigate('Home')
    dispatch(reset('yourFormName'));
  };

useEffect(() => {

  // initializeForm({branchName:'hello'})
  // fieldValue && props.initialize(fieldValue)
  // setCusFormInitialValues({branchName:'testing'})

  // return () => {
  //   alert('out')
  // }
}, [])
// 


  return (
    <View>
      <Field name="branchName" label="Full Name" component={TextInputFile} />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const mapDispatchToProps = (dispatch) => ({
  initializeForm: (initialValues) => dispatch(initialize('yourFormName', initialValues)),
});

function mapStateToProps(state, ownprops) {
  console.log('state',state);
  return {
    edit_data: state.employees.all_address,
    fieldValue: state.customers.cus_initialValues,
    // test:state.state..cus_initialValues
  };
}

export default connect(mapStateToProps,{TestAction} )(
  reduxForm({form: 'yourFormName'})(TestScreen),
);
