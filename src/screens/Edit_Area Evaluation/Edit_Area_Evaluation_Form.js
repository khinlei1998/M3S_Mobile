import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableHighlight,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, createRef} from 'react';
import DividerLine from '../../components/DividerLine';
import {reduxForm, Field, change, reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {storeAreaEvaluation} from '../../query/AreaEvaluation_query';
import {
  Button,
  RadioButton,
  List,
  Provider,
  Portal,
  Modal,
  TextInput,
} from 'react-native-paper';
import {operations} from '../../common';
import {style} from '../../style/Area_Evaluation_style';
import TextInputFile from '../../components/TextInputFile';
import DatePicker from '../../components/DatePicker';
import Edit_Area_Info from './Edit_Area_Info';
import Edit_Area_Evaluation from './Edit_Area_Evaluation';
import {area_evaluation_result} from '../../common';
import Edit_Area_Evaluation_Score from './Edit_Area_Evaluation_Score';
import {getAllLoan_By_application_no} from '../../query/AllLoan_query';
import {useNavigation} from '@react-navigation/native';
import {setAREA_UpdateStatus} from '../../redux/LoanReducer';
function Edit_Area_Evaluation_Form(props) {
  const navigation = useNavigation();
  const filtered_operations = operations.filter(item => item.value != 1);

  const {handleSubmit, area_update_status,setAREA_UpdateStatus} = props;
  const [show_operation, setOperation] = useState('2');
  const [area_evaluation_expanded, setAreaEvaluationExpanded] = useState(true);
  const retrive_area_evaluation = props.route.params.evaluation_data[0];
  const loadData = async () => {
    props.initialize(retrive_area_evaluation);
  };
  useEffect(() => {
    if (area_update_status == true) {
      setOperation('3');
    }
  }, [area_update_status]);
  useEffect(() => {
    loadData();
  }, []);

  const handleAreaEvaluationToggle = () => {
    setAreaEvaluationExpanded(!area_evaluation_expanded);
  };
  const onSubmit = async values => {
    await storeAreaEvaluation(values).then(result => {
      if (result == 'success') {
        ToastAndroid.show(`Insert Success`, ToastAndroid.SHORT);
        navigation.goBack();
      }
    });
  };
  const btnChangeOperation = newValue => {
    setOperation(newValue);
    if (newValue == 2 || newValue == 4) {
      setAREA_UpdateStatus(false);
    } else {
      setAREA_UpdateStatus(true);
    }
  };
  console.log('area_update_status',area_update_status);

  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                marginTop: 20,
                color: '#273050',
                fontWeight: 'bold',
              }}>
              Area Evaluation Form
            </Text>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              (Attached To Application)
            </Text>
            <DividerLine />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {filtered_operations.map((option, index) => (
                  <RadioButton.Group
                    key={index}
                    onValueChange={newValue => btnChangeOperation(newValue)}
                    value={show_operation}>
                    <View
                      key={option.value}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <RadioButton.Item
                        label={option.label}
                        value={option.value}
                        color="#000"
                        labelStyle={{marginLeft: 5}}
                        // disabled={
                        //   option.value === '3'
                        // }
                        //&& filtered_cus_data.sync_status === '02'
                      />
                    </View>
                  </RadioButton.Group>
                ))}
              </View>
            </View>
            <DividerLine />
            <List.Accordion
              expanded={area_evaluation_expanded}
              onPress={handleAreaEvaluationToggle}
              style={style.list_container}
              titleStyle={style.list_title}
              title="Borrower Info">
              <View style={style.sub_container}>
                <View style={style.sub_list_container}>
                  <Field
                    name={'application_no'}
                    title={'Application No'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                    require
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'resident_rgst_id'}
                    title={'Borrower NRC'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                  />

                  <Field
                    name={'borrower_name'}
                    title={'Borrower Name'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                  />
                </View>
                <View style={style.sub_list_container}>
                  <Field
                    name={'application_amt'}
                    title={'Loan Apply Amount'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                  />

                  <Field
                    name={'application_date'}
                    component={DatePicker}
                    label={'Application Date'}
                    editable={true}
                  />
                </View>
              </View>
            </List.Accordion>
            <Edit_Area_Info />
            <Edit_Area_Evaluation />
            <Edit_Area_Evaluation_Score />
            <DividerLine />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              <Button
                disabled={
                  area_update_status == true && show_operation == '3'
                    ? false
                    : area_update_status == false && show_operation == '4'
                    ? false
                    : true
                }
                onPress={handleSubmit(onSubmit)}
                mode="contained"
                buttonColor={'#6870C3'}
                style={{
                  borderRadius: 0,
                  marginTop: 10,
                  color: 'black',
                  borderRadius: 5,
                  padding: 5,
                }}>
                <Icon name="paperclip" size={18} color="#fff" />
                Document Submit
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  );
}
function mapStateToProps(state) {
  return {
    area_update_status: state.loan.area_update_status,
  };
}

export default reduxForm({
  form: 'Edit_Area_Evaluation_Form',
})(connect(mapStateToProps, {setAREA_UpdateStatus})(Edit_Area_Evaluation_Form));
