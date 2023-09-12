import {
  View,
} from 'react-native';
import React, {useState,} from 'react';
import {reduxForm, Field,} from 'redux-form';
import {connect} from 'react-redux';
import {
  List,
} from 'react-native-paper';
import {style} from '../../style/Area_Evaluation_style';
import TextInputFile from '../../components/TextInputFile';
import DatePicker from '../../components/DatePicker';
 function Edit_Area_Info(props) {
  const {area_update_status}=props
  const [area_info_expanded, setAreaInfoExpanded] = useState(true);
  const handleAreaInfoToggle = () => {
    setAreaInfoExpanded(!area_info_expanded);
  };
  return (
    <>
      <List.Accordion
        expanded={area_info_expanded}
        onPress={handleAreaInfoToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Borrower Info">
        <View style={style.sub_container}>
          <View style={style.sub_list_container}>
            <Field
              name={'area_evaluation_no'}
              title={'Area Evaluation No'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
              require
            />
          </View>

          <View style={style.sub_list_container}>
            <Field
              name={'area_evaluation_date'}
              component={DatePicker}
              label={'Evaluation Date'}
              icon={area_update_status == true && 'calendar'}
              editable={area_update_status == true ? false : true}
            />

            <Field
              name={'township_name'}
              title={'Name of Township'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={area_update_status == true ? false : true}
            />
          </View>
          <View style={style.sub_list_container}>
            <Field
              name={'village_name'}
              title={'Name of ward/village'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={area_update_status == true ? false : true}
            />

            <Field
              name={'auth_name'}
              title={'Name of Authority'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={area_update_status == true ? false : true}
            />
          </View>
          <View style={style.sub_list_container}>
            <Field
              name={'contract_no'}
              title={'Contract Number'}
              component={TextInputFile}
              cus_width
              input_mode
              keyboardType={'numeric'}
              editable={area_update_status == true ? false : true}
            />

            <Field
              name={'street_text'}
              title={'Number of street/Ambit'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={area_update_status == true ? false : true}
            />
          </View>
          <View style={style.sub_list_container}>
            <Field
              name={'households_text'}
              title={'Number of Households'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={area_update_status == true ? false : true}
            />

            <Field
              name={'population_text'}
              title={'Number of Population'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={area_update_status == true ? false : true}
            />
          </View>
          <View style={style.sub_list_container}>
            <Field
              name={'house_text'}
              title={'Number of House'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={area_update_status == true ? false : true}
            />

            <Field
              name={'house_own_text'}
              title={'Number of House owner'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={area_update_status == true ? false : true}
            />
          </View>
          <View style={style.sub_list_container}>
            <Field
              name={'house_rent_text'}
              title={'Number of Rental'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={area_update_status == true ? false : true}
            />

            <Field
              name={'property_text'}
              title={'Type of property'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={area_update_status == true ? false : true}
            />
          </View>
          <View style={style.sub_list_container}>
            <Field
              name={'property_docm_text'}
              title={'Prpperty Document'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={area_update_status == true ? false : true}
            />

            <Field
              name={'occupation'}
              title={'Main Occupations'}
              component={TextInputFile}
              cus_width
              input_mode
              editable={area_update_status == true ? false : true}
            />
          </View>
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
})(connect(mapStateToProps, {})(Edit_Area_Info));