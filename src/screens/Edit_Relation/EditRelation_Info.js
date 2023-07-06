import {View, Text} from 'react-native';
import React, {useState, useEffect, createRef} from 'react';
import {reduxForm, Field, change, reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import {style} from '../../style/Relation_style';
import TextInputFile from '../../components/TextInputFile';
import {List} from 'react-native-paper';
import SingleCheckBox from '../../components/SingleCheckBox';
import {relation_data} from '../../common';
import RadioButtonFile from '../../components/RadioButtonFile';
 function Edit_Relation_Info(props) {
  const {relation_update_status,setRelationName}=props
  const [relation_info_expanded, setRelationInfoExpanded] = useState(true);
  const handleRelationInfoToggle = () => {
    setRelationInfoExpanded(!relation_info_expanded);
  };
  const handleRadioButtonChange = (value, input) => {
    console.log('value', value);
    console.log('input', input);
    input.onChange(value.id);
    if (value.id == '1') {
      setRelationName('Parent')

    }
    if (value.id == '2') {
      setRelationName('Brother & Sister')

    }

  }

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
              title={'Transaction Date'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
              require
            />
          </View>
          <View
            style={{
              padding: 5,
              justifyContent: 'space-between',
              marginBottom: 15,
            }}>
            {/* <View>
              {relation_data.map((checkbox, index) => (
                <Field
                  key={index}
                  label={checkbox.label}
                  name={checkbox.name}
                  component={SingleCheckBox}
                  defaultValue={checkbox.defaultValue}
                  checkedValue={checkbox.checkedValue}
                  uncheckedValue={checkbox.uncheckedValue}
                  onChange={(value,label)=>console.log('input',value,label)}
                  disabled={relation_update_status == true ? false : true}
                />
              ))}
            </View> */}
            <Field
              data={relation_data}
              name={'relationName'}
              component={RadioButtonFile}
              ShowRadioBtnChange={(value, input) =>
                handleRadioButtonChange(value, input)
              }
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
})(connect(mapStateToProps, {  })(Edit_Relation_Info));
