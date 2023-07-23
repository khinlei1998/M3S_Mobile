import { View, Text, ScrollView, FlatList, StyleSheet, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { getSurveyData } from '../../query/SurveyItem_query';
import { style } from '../../style/Survey_style';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { getSurveyResult } from '../../query/SurveyItem_query';
import { storeSurveyResult } from '../../query/SurveyItem_query';
import { get_loged_branch_code } from '../../query/Employee_query';
export default function Survey(props) {
  const [survey_data, setSurveyData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [user_id, setUserID] = useState('');
  const [survey_rsult_count, setSurveyResultCount] = useState('');
  const [branch_code, setBranchCode] = useState('')

  const loadData = async () => {
    await getSurveyData().then(data => {
      setSurveyData(data);
    });
    await AsyncStorage.getItem('user_id').then(val => {
      setUserID(val);
    });
    await getSurveyResult().then(data => {
      setSurveyResultCount(data.length + 1);
    });
    await get_loged_branch_code().then(data => {
      setBranchCode(data[0].branch_code);
    });
  };
  useEffect(() => {
    loadData();
  }, []);
  const onSubmit = async () => {
    console.log('survey_rsult_count', survey_rsult_count);
    let survey_rsult = selectedItems.map((v, index) => ({
      ...v, branch_code: branch_code, survey_result_no: `SV${user_id}${moment().format(
        'YYYYMMDD',
      )}${survey_rsult_count + index}`
    }))
    // console.log('survey_rsult',survey_rsult);
    await storeSurveyResult(survey_rsult).then(result => {
      if (result == 'success') {

        ToastAndroid.show('Survey Create Successfully!', ToastAndroid.SHORT);
        props.navigation.navigate('Home');
      }
    })
  };
  const renderTableRow = ({ item, index }) => {
    const isSelectedYes = selectedAnswers[index] === 'Y';
    const isSelectedNo = selectedAnswers[index] === 'N';

    const btnChangeOperation = newValue => {
      setSelectedAnswers(prevSelectedAnswers => ({
        ...prevSelectedAnswers,
        [index]: newValue,
      }));

      setSelectedItems(prevSelectedItems => {
        // Check if the item with the same serialno is already in the array
        const existingItemIndex = prevSelectedItems.findIndex(
          selectedItem => selectedItem.serial_no === item.serial_no,
        );

        if (existingItemIndex !== -1) {
          // Update the item's survey_answer_yn with the newValue
          return prevSelectedItems.map((selectedItem, index) =>
            index === existingItemIndex
              ? {
                ...selectedItem,
                survey_answer_yn: newValue,

              }
              : selectedItem,
          );
        } else {
          return [
            ...prevSelectedItems,
            {
              ...item,
              survey_answer_yn: newValue,

            },
          ];
        }
      });
    };
    return (
      <View style={style.row}>
        <Text style={style.cell}> {index + 1}</Text>
        <Text style={style.surveyCell}>{item.survey_item_content_eng}</Text>

        <RadioButton.Group
          onValueChange={btnChangeOperation}
          value={selectedAnswers[index]}>
          <View style={{ flexDirection: 'row' }}>
            <RadioButton.Item
              label="Yes"
              value="Y"
              status={isSelectedYes ? 'checked' : 'unchecked'}
            />
            <RadioButton.Item
              label="No"
              value="N"
              status={isSelectedNo ? 'checked' : 'unchecked'}
            />
          </View>
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
          onPress={() => onSubmit()}
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