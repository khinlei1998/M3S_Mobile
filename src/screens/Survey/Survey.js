import {View, Text, ScrollView, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {style} from '../../style/Survey_style';
import DividerLine from '../../components/DividerLine';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {getSurveyData} from '../../query/SurveyItem_query';
import {questions} from '../../common';
import RadioButtonFile from '../../components/RadioButtonFile';
import {Field, reduxForm, setInitialValues, initialize} from 'redux-form';
import {connect, useDispatch} from 'react-redux';

function Survey() {
  const [survey_data, setSurveyData] = useState([]);
  const loadData = async () => {
    await getSurveyData().then(data => {
      setSurveyData(data);
    });
  };
  useEffect(() => {
    loadData();
  }, []);

  const renderTableRow = ({item, index}) => {
    return (
      <View style={styles.row}>
        <Text style={styles.cell}> {index + 1}</Text>
        <Text style={styles.surveyCell}>{item.survey_item_content_eng}</Text>
        {/* <View style={styles.cell}> */}
        <Field
          data={questions}
          name={`area_security_flag${index}`}
          component={RadioButtonFile}
        />
        {/* </View> */}

        {/* <Text style={styles.cell}>yes</Text>
        <Text style={styles.cell}>no</Text> */}
      </View>
    );
  };

  const item = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          // justifyContent: 'space-around'
          // padding: 10,
        }}>
        <Text
          style={{
            flex: 1,
            padding: 10,
          }}>
          {index + 1}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {/* {foundItem[0].label} */}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.group_aplc_no}
        </Text>

        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.survey_item_content_eng}
        </Text>

        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          Yes
        </Text>

        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          No
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        {/* Table Header */}
        <View style={styles.header}>
          <Text style={styles.title}>#</Text>
          <Text style={styles.surveyTitle}>Survey</Text>
          <Text
            style={{
              padding: 10,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Yes
          </Text>
          <Text style={styles.title}>No</Text>
        </View>

        {/* Table Data */}
        <FlatList
          data={survey_data}
          renderItem={renderTableRow}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <DividerLine />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <Button
          mode="contained"
          buttonColor={'#6870C3'}
          style={{
            borderRadius: 0,
            marginTop: 10,
            color: 'black',
            borderRadius: 5,
            padding: 5,
          }}>
          <Icon name="arrow-left" size={18} color="#fff" />
          Submit
        </Button>
      </View>
    </View>
  );
}
export default reduxForm({
  form: 'Survey',
})(connect(null)(Survey));
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '90%',
    height: 800,
    backgroundColor: '#fff',
    marginTop: 50,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    padding: 5,
    margin: 10,
  },
  title: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  surveyTitle: {
    flex: 2, // Adjust the flex value to allocate more space for the "Survey" column
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  cell: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
  },
  surveyCell: {
    flex: 2, // Adjust the flex value to allocate more space for the "Survey" column
    padding: 5,
    textAlign: 'center',
  },
});
