import {View, Text, ScrollView, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import {getSurveyData} from '../../query/SurveyItem_query';
import {style} from '../../style/Survey_style';
import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {fetchAllSurvey} from '../../query/SurveyItem_query';
export default function Survey(props) {
  const [survey_data, setSurveyData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [user_id, setUserID] = useState('');
  const [surveycount, setSurveyCount] = useState('');

  const loadData = async () => {
    await getSurveyData().then(data => {
      setSurveyData(data);
    });
    await AsyncStorage.getItem('user_id').then(val => {
      setUserID(val);
    });
    await fetchAllSurvey().then(data => {
      // setSurveyCount(data.length+1);
      let initialCount = data.length > 0 ? data.length : 1;
      setSurveyCount(initialCount);
    });
  };
  useEffect(() => {
    loadData();
  }, []);
  console.log('surveycount', surveycount);
  const onSubmit = values => {
    console.log('finale value', selectedItems);
  };
  const renderTableRow = ({item, index}) => {
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
          console.log('old select');
          // Update the item's survey_answer_yn with the newValue
          return prevSelectedItems.map((selectedItem, index) =>
            index === existingItemIndex
              ? {
                  ...selectedItem,
                  survey_answer_yn: newValue,
                  survey_result_no: `SV${user_id}${moment().format(
                    'YYYYMMDD',
                  )}${surveycount}`,
                }
              : selectedItem,
          );
        } else {
          console.log('new select');
          setSurveyCount(prevCount => prevCount + 1);

          // Add the item to the selectedItems array with the new survey_answer_yn value
          return [
            ...prevSelectedItems,
            {
              ...item,
              survey_answer_yn: newValue,
              survey_result_no: `SV${user_id}${moment().format(
                'YYYYMMDD',
              )}${surveycount}`,
            },
          ];
        }
      });
    };
    console.log();
    return (
      <View style={style.row}>
        <Text style={style.cell}> {index + 1}</Text>
        <Text style={style.surveyCell}>{item.survey_item_content_eng}</Text>

        <RadioButton.Group
          onValueChange={btnChangeOperation}
          value={selectedAnswers[index]}>
          <View style={{flexDirection: 'row'}}>
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
    <View style={{flex: 1}}>
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
