import { View, Text } from 'react-native';
import React, { useState, } from 'react';
import { reduxForm, Field,} from 'redux-form';
import { connect,  } from 'react-redux';
import { style } from '../../style/Relation_style';
import TextInputFile from '../../components/TextInputFile';
import { List } from 'react-native-paper';
import { relation_data } from '../../common';
import RadioButtonFile from '../../components/RadioButtonFile';
import DatePicker from '../../components/DatePicker';
function Edit_Relation_Info(props) {
  const { relation_update_status, setRelationName } = props;
  const [relation_info_expanded, setRelationInfoExpanded] = useState(true);
  const handleRelationInfoToggle = () => {
    setRelationInfoExpanded(!relation_info_expanded);
  };
  const handleRadioButtonChange = (value, input) => {
    input.onChange(value.id);
    if (value.id == '1') {
      setRelationName('GrandParent');
    }
    if (value.id == '2') {
      setRelationName('Parent');
    }
    if (value.id == '3') {
      setRelationName('Brother & Sister');
    }
    if (value.id == '4') {
      setRelationName('Husband & Wife');
    }
    if (value.id == '5') {
      setRelationName('Son & Daughter');
    }
  };

  return (
    <>
      <List.Accordion
        expanded={relation_info_expanded}
        onPress={handleRelationInfoToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Relationship Info">
        <View style={style.sub_container}>
          <View style={style.sub_list_container}>
            <Field
              name={'relation_no'}
              title={'Relationship No'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
              require
            />

            <Field
              name={'transaction_date'}
              component={DatePicker}
              label={'Transaction Date'}
              icon={relation_update_status && 'calendar'}
              editable={relation_update_status == true ? false : true}
            />
          </View>
          <View
            style={{
              padding: 5,
              justifyContent: 'space-between',
              marginBottom: 15,
            }}>
            <Field
              data={relation_data}
              name={'relation_name'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleRadioButtonChange(value, input)
              }
              disabled={relation_update_status == true ? false : true}

              customstyle
            />
          </View>
        </View>
      </List.Accordion>
    </>
  );
}
function mapStateToProps(state) {
  return {
    relation_update_status: state.loan.relation_update_status,
  };
}

export default reduxForm({
  form: 'Edit_Relation_Form',
  // validate,
})(connect(mapStateToProps, {})(Edit_Relation_Info));
