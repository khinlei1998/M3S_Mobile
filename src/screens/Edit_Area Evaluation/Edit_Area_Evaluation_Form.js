import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect, createRef} from 'react';
import DividerLine from '../../components/DividerLine';
import {reduxForm, Field, change, reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {
  Button,
  RadioButton,
  List,
} from 'react-native-paper';
import {operations} from '../../common';
import {style} from '../../style/Area_Evaluation_style';
import TextInputFile from '../../components/TextInputFile';
import DatePicker from '../../components/DatePicker';
import Edit_Area_Info from './Edit_Area_Info';
import Edit_Area_Evaluation from './Edit_Area_Evaluation';
import Edit_Area_Evaluation_Score from './Edit_Area_Evaluation_Score';
import {useNavigation} from '@react-navigation/native';
import {setAREA_UpdateStatus} from '../../redux/LoanReducer';
import {deleteAreaEvaluation_ByID} from '../../query/AreaEvaluation_query';
import {setEvaluation_Score} from '../../redux/LoanReducer';
import { updateAreaEvaluation } from '../../query/AreaEvaluation_query';
import { useTranslation } from 'react-i18next';

function Edit_Area_Evaluation_Form(props) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const {
    handleSubmit,
    area_update_status,
    setAREA_UpdateStatus,
    setEvaluation_Score,
    total_score
  } = props;
  const [show_operation, setOperation] = useState('2');
  const [area_evaluation_expanded, setAreaEvaluationExpanded] = useState(true);
  const [updatetotal_sts_flag, setTotal_sts_flag] = useState('');

  const retrive_area_evaluation = props.route.params.evaluation_data[0];
  const loadData = async () => {
    props.initialize(retrive_area_evaluation);
    setEvaluation_Score(retrive_area_evaluation.total_score);
    setTotal_sts_flag(retrive_area_evaluation.total_sts_flag);
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
    if (show_operation == '4') {
      await deleteAreaEvaluation_ByID(values.area_evaluation_no).then(
        response => {
          if (response === 'success') {
            alert('Delete Success');
            navigation.goBack();
          }
        },
      );
    } else {
      const area_data = Object.assign({}, values, {
        total_sts_flag: updatetotal_sts_flag,
        total_score:total_score,
        tablet_sync_sts:
        values.tablet_sync_sts == '01' ? '02' : values.tablet_sync_sts,
      });
      await updateAreaEvaluation(area_data).then(result => {
        if (result == 'success') {
          ToastAndroid.show(`Update Success`, ToastAndroid.SHORT);
          navigation.goBack();
        }
      });
    }
  };
  const btnChangeOperation = newValue => {
    setOperation(newValue);
    if (newValue == 2 || newValue == 4) {
      setAREA_UpdateStatus(false);
    } else {
      setAREA_UpdateStatus(true);
    }
  };

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
              {t('Area Evaluation Form')}
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
                {operations.map((option, index) => (
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
                        disabled={option.value == '1'}
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
                    name={'brwerRgstId'}
                    title={'Borrower NRC'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                  />

                  <Field
                    name={'borrowerName'}
                    title={t('Borrower Name')}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                  />
                </View>
                <View style={style.sub_list_container}>
                  <Field
                    name={'applicationAmt'}
                    title={t('Loan Apply Amount')}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                  />

                  <Field
                    name={'applicationDate'}
                    component={DatePicker}
                    label={'Application Date'}
                    editable={true}
                  />
                </View>
              </View>
            </List.Accordion>
            <Edit_Area_Info />
            <Edit_Area_Evaluation
              retrive_area_evaluation={retrive_area_evaluation}
              setTotal_sts_flag={setTotal_sts_flag}
            />
            <Edit_Area_Evaluation_Score
              updatetotal_sts_flag={updatetotal_sts_flag}
            />
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
    total_score: state.loan.evaluation_score,
  };
}

export default reduxForm({
  form: 'Edit_Area_Evaluation_Form',
})(
  connect(mapStateToProps, {setAREA_UpdateStatus, setEvaluation_Score})(
    Edit_Area_Evaluation_Form,
  ),
);
