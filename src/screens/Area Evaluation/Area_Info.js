import {
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Field,} from 'redux-form';
import {
  List,
} from 'react-native-paper';
import {style} from '../../style/Area_Evaluation_style';
import TextInputFile from '../../components/TextInputFile';
import DatePicker from '../../components/DatePicker';
export default function Area_Info() {
  const [area_info_expanded, setAreaInfoExpanded] = useState(true);
  const handleAreaInfoToggle = () => {
    setAreaInfoExpanded(!area_info_expanded);
  };
  const { t } = useTranslation()
  return (
    <>
      <List.Accordion
        expanded={area_info_expanded}
        onPress={handleAreaInfoToggle}
        style={style.list_container}
        titleStyle={style.list_title}
        title="Area Info">
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
              icon={'calendar'}
            />

            <Field
              name={'township_name'}
              title={'Name of Township'}
              component={TextInputFile}
              cus_width
              input_mode
            />
          </View>
          <View style={style.sub_list_container}>
            <Field
              name={'village_name'}
              title={'Name of ward/village'}
              component={TextInputFile}
              cus_width
              input_mode
            />

            <Field
              name={'auth_name'}
              title={'Name of Authority'}
              component={TextInputFile}
              cus_width
              input_mode
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

            />

            <Field
              name={'street_text'}
              title={'Number of street/Ambit'}
              component={TextInputFile}
              cus_width
              input_mode
            />
          </View>
          <View style={style.sub_list_container}>
            <Field
              name={'households_text'}
              title={'Number of Households'}
              component={TextInputFile}
              cus_width
              input_mode
            />

            <Field
              name={'population_text'}
              title={'Number of Population'}
              component={TextInputFile}
              cus_width
              input_mode
            />
          </View>
          <View style={style.sub_list_container}>
            <Field
              name={'house_text'}
              title={'Number of House'}
              component={TextInputFile}
              cus_width
              input_mode
            />

            <Field
              name={'house_own_text'}
              title={'Number of House owner'}
              component={TextInputFile}
              cus_width
              input_mode
            />
          </View>
          <View style={style.sub_list_container}>
            <Field
              name={'house_rent_text'}
              title={'Number of Rental'}
              component={TextInputFile}
              cus_width
              input_mode
            />

            <Field
              name={'property_text'}
              title={'Type of property'}
              component={TextInputFile}
              cus_width
              input_mode
            />
          </View>
          <View style={style.sub_list_container}>
            <Field
              name={'property_docm_text'}
              title={'Prpperty Document'}
              component={TextInputFile}
              cus_width
              input_mode
            />

            <Field
              name={'occupation'}
              title={t("Occupation")}
              component={TextInputFile}
              cus_width
              input_mode
            />
          </View>
        </View>
      </List.Accordion>
    </>
  );
}
