import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {style} from '../../style/Area_Evaluation_style';
import {area_evaluation_score_result} from '../../common';
import {reduxForm, Field, } from 'redux-form';
import RadioButtonFile from '../../components/RadioButtonFile';
import {connect, } from 'react-redux';

import {List} from 'react-native-paper';
import TextInputFile from '../../components/TextInputFile';
function Edit_Area_Evaluation_Score(props) {
  const {total_score, area_update_status,updatetotal_sts_flag} = props;
  const [area_evaluation_score_expanded, setAreaEvaluationScoreExpanded] =
    useState(true);
  const handleAreaEvaluationScoreToggle = () => {
    setAreaEvaluationScoreExpanded(!area_evaluation_score_expanded);
  };

  return (
    <>
      <List.Accordion
        expanded={area_evaluation_score_expanded}
        onPress={handleAreaEvaluationScoreToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Evaluation">
        <View style={style.sub_container}>
          <View style={style.sub_list_container}>
            <View style={{padding: 10}}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                }}>
                Score
              </Text>
              <Text
                style={{color: '#f09d54', fontWeight: 'bold', fontSize: 18}}>
                {total_score}
              </Text>
            </View>

            <View style={{flexDirection: 'column'}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View>
                  <Text style={{flexDirection: 'column'}}>A = 4Marks</Text>
                  <Text style={{flexDirection: 'column'}}>40 ~ 35</Text>
                </View>
                <View>
                  <Text style={{flexDirection: 'column'}}>B = 3Marks</Text>
                  <Text style={{flexDirection: 'column'}}>34 ~ 25</Text>
                </View>
                <View>
                  <Text style={{flexDirection: 'column'}}>C = 2Marks</Text>
                  <Text style={{flexDirection: 'column'}}>24 ~ 15</Text>
                </View>
                <View>
                  <Text style={{flexDirection: 'column'}}>D = 1Marks</Text>
                  <Text style={{flexDirection: 'column'}}>14 ~ 1</Text>
                </View>
              </View>
              <Field
                data={area_evaluation_score_result}
                name={'update_total_sts_flag'}
                component={RadioButtonFile}
                get_value={updatetotal_sts_flag}
                disabled={true}
              />
            </View>
          </View>
          <Field
            name={'total_sts_remark'}
            title={t('Remark')}
            component={TextInputFile}
            input_mode
            input_cusstyle
            editable={area_update_status == true ? false : true}
          />
          <View style={style.sub_list_container}>
            <Field
              name={'prepare_empl_nm'}
              title={'Prepared By'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={area_update_status == true ? false : true}
            />

            <Field
              name={'check_empl_nm'}
              title={'Checked By'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={area_update_status == true ? false : true}
            />
          </View>
          <Field
            name={'summary'}
            title={'Summary'}
            component={TextInputFile}
            input_mode
            input_cusstyle
            editable={area_update_status == true ? false : true}
          />
          <Field
            name={'total_remark'}
            title={'Total Remark'}
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
    total_score: state.loan.evaluation_score,
    area_update_status: state.loan.area_update_status,
  };
}

export default reduxForm({
  form: 'Edit_Area_Evaluation_Form',
})(connect(mapStateToProps, {})(Edit_Area_Evaluation_Score));
