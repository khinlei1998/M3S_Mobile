import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { style } from '../../style/Area_Evaluation_style';
import RadioButtonFile from '../../components/RadioButtonFile';
import TextInputFile from '../../components/TextInputFile';
import { reduxForm, Field, change, reset } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import { microfinance_data, area_evaluation_result } from '../../common';
import { setEvaluation_Score } from '../../redux/LoanReducer';
import {useTranslation} from 'react-i18next';

function Area_Evaluation(props) {
  const { setEvaluation_Score,setTotal_sts_flag } = props
  const [area_evaluation_form_expanded, setAreaEvaluationFormExpanded] =
    useState(true);
  const [values, setValues] = useState([]);
  const {t} = useTranslation();
  const handleAreaEvaluationFormToggle = () => {
    setAreaEvaluationFormExpanded(!area_evaluation_form_expanded);
  };
  const handleRadioButtonChange = (value, input, index) => {
    input.onChange(value.id);
    const number = parseFloat(value.id);
    // Update the selected values array
    const newValues = [...values];
    newValues[index] = number;
    setValues(newValues);
    const filteredValues = newValues.filter(
      value => typeof value === 'number',
    );

    let multipliedValue = filteredValues.reduce((total, val) => {
      return total + val;
    }, 0);
    setEvaluation_Score(multipliedValue)
    if (multipliedValue >= 35 && multipliedValue <= 40) {
      setTotal_sts_flag('1');
    } else if (multipliedValue >= 25 && multipliedValue <= 34) {
      setTotal_sts_flag('2');
    } else if (multipliedValue >= 15 && multipliedValue <= 24) {
      setTotal_sts_flag('3');
    } else if (multipliedValue >= 1 && multipliedValue <= 14) {
      setTotal_sts_flag('4');
    }
    // Perform any other desired action with the multiplied value
  };

  return (
    <>
      <List.Accordion
        expanded={area_evaluation_form_expanded}
        onPress={handleAreaEvaluationFormToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Evaluation">
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
            />
          </View>
          <Field
            name={'mfi_remark'}
            title={t('Remark')}
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
              Overdue State
            </Text>
            <Field
              data={area_evaluation_result}
              name={'pastdue_sts_flag'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleRadioButtonChange(value, input, 1)
              }
            />
          </View>

          <Field
            name={'pastdue_sta_remark'}
            title={t('Remark')}
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
              {t('Transportation')}
            </Text>
            <Field
              data={area_evaluation_result}
              name={'trnsrt_sts_flag'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleRadioButtonChange(value, input, 2)
              }
            />
          </View>

          <Field
            name={'trnsrt_sts_remark'}
            title={t('Remark')}
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
              Area Security
            </Text>
            <Field
              data={area_evaluation_result}
              name={'area_security_flag'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleRadioButtonChange(value, input, 3)
              }
            />
          </View>

          <Field
            name={'area_security_remark'}
            title={t('Remark')}
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
              Tele Communication
            </Text>
            <Field
              data={area_evaluation_result}
              name={'cmnc_sts_flag'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleRadioButtonChange(value, input, 4)
              }
            />
          </View>

          <Field
            name={'cmnc_sts_remark'}
            title={t('Remark')}
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
              Economy Situation
            </Text>
            <Field
              data={area_evaluation_result}
              name={'economy_sts_flag'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleRadioButtonChange(value, input, 5)
              }
            />
          </View>

          <Field
            name={'economy_sts_remark'}
            title={t('Remark')}
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
              Personal Income
            </Text>
            <Field
              data={area_evaluation_result}
              name={'income_sts_flag'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleRadioButtonChange(value, input, 6)
              }
            />
          </View>

          <Field
            name={'income_sts_remark'}
            title={t('Remark')}
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
            />
          </View>

          <Field
            name={'households_sts_remark'}
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
              Local Authority Support
            </Text>
            <Field
              data={area_evaluation_result}
              name={'local_auth_sprt_flag'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleRadioButtonChange(value, input, 8)
              }
            />
          </View>

          <Field
            name={'local_auth_sprt_rmrk'}
            title={t('Remark')}
            component={TextInputFile}
            input_mode
            input_cusstyle
          />
        </View>
      </List.Accordion>
    </>
  );
}
function mapStateToProps(state) {
  return {};
}

export default reduxForm({
  form: 'Area_Evaluation_Form',
})(connect(mapStateToProps, { setEvaluation_Score })(Area_Evaluation));
