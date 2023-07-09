import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {List} from 'react-native-paper';
import {style} from '../../style/Area_Evaluation_style';
import RadioButtonFile from '../../components/RadioButtonFile';
import TextInputFile from '../../components/TextInputFile';
import {reduxForm, Field, change, reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import {microfinance_data, area_evaluation_result} from '../../common';
import {setEvaluation_Score} from '../../redux/LoanReducer';
function Edit_Area_Evaluation(props) {
  const {setEvaluation_Score, area_update_status} = props;
  const [area_evaluation_form_expanded, setAreaEvaluationFormExpanded] =
    useState(true);
  const [values, setValues] = useState([]);

  const handleAreaEvaluationFormToggle = () => {
    setAreaEvaluationFormExpanded(!area_evaluation_form_expanded);
  };
  const handleRadioButtonChange = (value, input, index) => {
    input.onChange(value.id);
    const number = parseFloat(value.result);

    // Update the selected values array
    const newValues = [...values];
    newValues[index] = number;
    setValues(newValues);
    const filteredValues = newValues.filter(value => typeof value === 'number');

    let multipliedValue = filteredValues.reduce((total, val) => {
      return total + val;
    }, 0);
    setEvaluation_Score(multipliedValue);
    // Perform any other desired action with the multiplied value
  };

  return (
    <>
      <List.Accordion
        expanded={area_evaluation_form_expanded}
        onPress={handleAreaEvaluationFormToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Borrower Info">
        <View style={style.sub_container}>
          <View style={style.sub_list_container}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                padding: 10,
                maxWidth: '20%',
              }}>
              Number of Microfrance
            </Text>
            <Field
              data={microfinance_data}
              name={'mf_num_flag'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleRadioButtonChange(value, input, 0)
              }
              disabled={area_update_status == true ? false : true}
            />
          </View>
          <Field
            name={'mfi_remark'}
            title={'Remark'}
            component={TextInputFile}
            input_mode
            input_cusstyle
            editable={area_update_status == true ? false : true}
          />

          <View style={style.sub_list_container}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                padding: 15,
                maxWidth: '25%',
              }}>
              Overdue State
            </Text>
            <Field
              data={area_evaluation_result}
              name={'pastdue_sts_flag'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleRadioButtonChange(value, input, 1)
              }
              disabled={area_update_status == true ? false : true}
            />
          </View>

          <Field
            name={'pastdue_sta_remark'}
            title={'Remark'}
            component={TextInputFile}
            input_mode
            input_cusstyle
            editable={area_update_status == true ? false : true}
          />

          <View style={style.sub_list_container}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                padding: 15,
                maxWidth: '25%',
              }}>
              Transportation
            </Text>
            <Field
              data={area_evaluation_result}
              name={'trnsrt_sts_flag'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleRadioButtonChange(value, input, 2)
              }
              disabled={area_update_status == true ? false : true}
            />
          </View>

          <Field
            name={'trnsrt_sts_remark'}
            title={'Remark'}
            component={TextInputFile}
            input_mode
            input_cusstyle
            editable={area_update_status == true ? false : true}
          />

          <View style={style.sub_list_container}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                padding: 15,
                maxWidth: '25%',
              }}>
              Area Security
            </Text>
            <Field
              data={area_evaluation_result}
              name={'area_security_flag'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleRadioButtonChange(value, input, 3)
              }
              disabled={area_update_status == true ? false : true}
            />
          </View>

          <Field
            name={'area_security_remark'}
            title={'Remark'}
            component={TextInputFile}
            input_mode
            input_cusstyle
            editable={area_update_status == true ? false : true}
          />
          <View style={style.sub_list_container}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                padding: 15,
                maxWidth: '25%',
              }}>
              Tele Communication
            </Text>
            <Field
              data={area_evaluation_result}
              name={'cmnc_sts_flag'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleRadioButtonChange(value, input, 4)
              }
              disabled={area_update_status == true ? false : true}
            />
          </View>

          <Field
            name={'cmnc_sts_remark'}
            title={'Remark'}
            component={TextInputFile}
            input_mode
            input_cusstyle
            editable={area_update_status == true ? false : true}
          />
          <View style={style.sub_list_container}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                padding: 15,
                maxWidth: '25%',
              }}>
              Economy Situation
            </Text>
            <Field
              data={area_evaluation_result}
              name={'economy_sts_flag'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleRadioButtonChange(value, input, 5)
              }
              disabled={area_update_status == true ? false : true}
            />
          </View>

          <Field
            name={'economy_sts_remark'}
            title={'Remark'}
            component={TextInputFile}
            input_mode
            input_cusstyle
            editable={area_update_status == true ? false : true}
          />
          <View style={style.sub_list_container}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                padding: 15,
                maxWidth: '25%',
              }}>
              Personal Income
            </Text>
            <Field
              data={area_evaluation_result}
              name={'income_sts_flag'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleRadioButtonChange(value, input, 6)
              }
              disabled={area_update_status == true ? false : true}
            />
          </View>

          <Field
            name={'income_sts_remark'}
            title={'Remark'}
            component={TextInputFile}
            input_mode
            input_cusstyle
          />

          <View style={style.sub_list_container}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                padding: 15,
                maxWidth: '25%',
              }}>
              Potential HouseHolds
            </Text>
            <Field
              data={area_evaluation_result}
              name={'households_sts_flag'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleRadioButtonChange(value, input, 7)
              }
              disabled={area_update_status == true ? false : true}
            />
          </View>

          <Field
            name={'households_sts_remark'}
            title={'Remark'}
            component={TextInputFile}
            input_mode
            input_cusstyle
            editable={area_update_status == true ? false : true}
          />

          <View style={style.sub_list_container}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                padding: 15,
                maxWidth: '25%',
              }}>
              Local Authority Support
            </Text>
            <Field
              data={area_evaluation_result}
              name={'local_auth_sprt_flag'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleRadioButtonChange(value, input, 8)
              }
              disabled={area_update_status == true ? false : true}
            />
          </View>

          <Field
            name={'local_auth_sprt_rmrk'}
            title={'Remark'}
            component={TextInputFile}
            input_mode
            input_cusstyle
            editable={area_update_status == true ? false : true}
          />
        </View>
      </List.Accordion>
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
})(connect(mapStateToProps, {setEvaluation_Score})(Edit_Area_Evaluation));
