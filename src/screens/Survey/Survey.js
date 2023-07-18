import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import DividerLine from '../../components/DividerLine';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { getSurveyData } from '../../query/SurveyItem_query';
import { questions } from '../../common';
import RadioButtonFile from '../../components/RadioButtonFile';
import { Field, reduxForm, setInitialValues, initialize } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import { style } from '../../style/Survey_style';
import TextInputFile from '../../components/TextInputFile';
import RadioButton from 'react-native-paper';
function Survey(props) {
  const { handleSubmit } = props
  const [survey_data, setSurveyData] = useState([]);
  const [survey_no, setShowSurveyNo] = useState(false)
  const [survey_gp_no, setShowSurveyGpNo] = useState(false)
  const [operations, setOperation] = useState('')

  const loadData = async () => {
    await getSurveyData().then(data => {
      setSurveyData(data);
    });
  };
  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = (values) => {
    console.log('valyes', values);
  }

  const renderTableRow = ({ item, index }) => {
    return (
      <View style={style.row}>
        <Text style={style.cell}> {index + 1}</Text>
        <Text style={style.surveyCell}>{item.survey_item_content_eng}</Text>
        {survey_gp_no &&

          <Field
            name={`survey_group_no${index}`}
            component={TextInputFile}
            value={item.survey_group_no}
          />
        }

        {/* <Field
          data={questions}
          name={`survey_answer_yn${index}`}
          component={RadioButtonFile}
          onChange={(item)=>console.log('select item',item)}

        /> */}
        <RadioButton.Group onValueChange={(newValue) => setOperation(newValue)} value={operations}>
          <RadioButton.Item label="First Option" value="first" />
          <RadioButton.Item label="Second Option" value="second" />
          <RadioButton.Item label="Third Option" value="third" />
        </RadioButton.Group>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={style.container}>
        {/* Table Header */}
        <View style={style.header}>
          <Text style={style.title}>#</Text>
          <Text style={style.surveyTitle}>Survey</Text>
          <Text
            style={{
              flex: 1,
              padding: 10,
              fontWeight: 'bold',
              textAlign: 'center',

            }}>
            Yes
          </Text>
          <Text style={style.title}>No</Text>
        </View>

        {/* Table Data */}
        <FlatList
          data={survey_data}
          renderItem={renderTableRow}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <Button
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
          Submit
        </Button>
      </View>
    </View>
  );
}
export default reduxForm({
  form: 'Survey',
})(connect(null)(Survey));
