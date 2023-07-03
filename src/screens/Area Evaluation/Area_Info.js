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
import {
  Button,
  RadioButton,
  List,
  Provider,
  Portal,
  Modal,
  TextInput,
} from 'react-native-paper';
import {style} from '../../style/Area_Evaluation_style';
import TextInputFile from '../../components/TextInputFile';
import DatePicker from '../../components/DatePicker';
export default function Area_Info() {
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
              name={'application_no'}
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
              name={'transaction_date'}
              component={DatePicker}
              label={'Evaluation Date'}
              editable={true}
            />

            <Field
              name={'borrower_name'}
              title={'Name of Township'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
            />
          </View>
          <View style={style.sub_list_container}>
            <Field
              name={'application_amt'}
              title={'Name of ward/village'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
            />

            <Field
              name={'borrower_nrc'}
              title={'Name of Authority'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
            />
          </View>
          <View style={style.sub_list_container}>
            <Field
              name={'application_amt'}
              title={'Contract Number'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
            />

            <Field
              name={'borrower_nrc'}
              title={'Number of street/Ambit'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
            />
          </View>
          <View style={style.sub_list_container}>
            <Field
              name={'application_amt'}
              title={'Number of Households'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
            />

            <Field
              name={'borrower_nrc'}
              title={'Number of Population'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
            />
          </View>
          <View style={style.sub_list_container}>
            <Field
              name={'application_amt'}
              title={'Number of House'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
            />

            <Field
              name={'borrower_nrc'}
              title={'Number of House owner'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
            />
          </View>
          <View style={style.sub_list_container}>
            <Field
              name={'application_amt'}
              title={'Number of Rental'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
            />

            <Field
              name={'borrower_nrc'}
              title={'Type of property'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
            />
          </View>
          <View style={style.sub_list_container}>
            <Field
              name={'application_amt'}
              title={'Prpperty Document'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
            />

            <Field
              name={'borrower_nrc'}
              title={'Main Occupations'}
              component={TextInputFile}
              cus_width
              input_mode
              editable
            />
          </View>
        </View>
      </List.Accordion>
    </>
  );
}
