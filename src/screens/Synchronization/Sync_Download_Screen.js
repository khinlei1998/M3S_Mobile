import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import DividerLine from '../../components/DividerLine';
import {Button, Checkbox} from 'react-native-paper';
import {useNetInfo} from '@react-native-community/netinfo';
import {getEemployee_info} from '../../query/Employee_query';
import {getCustomer_info} from '../../query/Customer_query';
import {getNRC_info} from '../../query/NRCinfo_query';
import {getSurvey_Item} from '../../query/SurveyItem_query';
import {getLoanMax} from '../../query/LoanMax_query';
import {getCodeInfo} from '../../query/CodeInfo_quey';
import moment from 'moment';
import {get_Village} from '../../query/Village_query';
import {get_Township} from '../../query/Township_query';
import {get_Ward} from '../../query/Ward_query';
import {useTranslation} from 'react-i18next';

export default function Sync_Download_Screen(props) {
  const {
    selectAll,
    setShowModal,
    setSelectAll,
    setCheckedItems,
    checkedItems,
    handleDownload,
    download_data
  } = props;
  const {t} = useTranslation();

  // const download_data = [
  //   {
  //     id: 1,
  //     name: 'Employees',
  //     size: '0KB',
  //     last_sync_data: moment().format('lll'),
  //     checked: false,
  //     api: getEemployee_info,
  //   },
  //   {
  //     id: 2,
  //     name: 'Survey Items',
  //     size: '0KB',
  //     last_sync_data: moment().format('lll'),
  //     checked: false,
  //     api: getSurvey_Item,
  //   },
  //   {
  //     id: 3,
  //     name: 'Loan max limit',
  //     size: '0KB',
  //     last_sync_data: moment().format('lll'),
  //     checked: false,
  //     api: getLoanMax,
  //   },
  //   {
  //     id: 4,
  //     name: 'Codes',
  //     size: '0KB',
  //     last_sync_data: moment().format('lll'),
  //     checked: false,
  //     api: getCodeInfo,
  //   },
  //   {
  //     id: 5,
  //     name: 'Customer',
  //     size: '0KB',
  //     last_sync_data: moment().format('lll'),
  //     checked: false,
  //     api: getCustomer_info,
  //   },
  //   {
  //     id: 6,
  //     name: 'NRC Info',
  //     size: '0KB',
  //     last_sync_data: moment().format('lll'),
  //     checked: false,
  //     api: getNRC_info,
  //   },
  //   {
  //     id: 7,
  //     name: 'Village',
  //     size: '0KB',
  //     last_sync_data: moment().format('lll'),
  //     checked: false,
  //     api: get_Village,
  //   },
  //   {
  //     id: 8,
  //     name: 'Township',
  //     size: '0KB',
  //     last_sync_data: moment().format('lll'),
  //     checked: false,
  //     api: get_Township,
  //   },
  //   {
  //     id: 9,
  //     name: 'Ward',
  //     size: '0KB',
  //     last_sync_data: moment().format('lll'),
  //     checked: false,
  //     api: get_Ward,
  //   },
  // ];

  const isChecked = item => {
    return checkedItems.some(checkedItem => checkedItem.id === item.id);
  };
  const handleCheckboxChange = item => {
    if (isChecked(item)) {
      setCheckedItems(
        checkedItems.filter(checkedItem => checkedItem.id !== item.id),
      );
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };
  const item = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 10,
          // margin:10
        }}>
        <Checkbox
          key={item.id}
          status={
            checkedItems.some(checkedItem => checkedItem.id === item.id)
              ? 'checked'
              : 'unchecked'
          }
          onPress={() => handleCheckboxChange(item)}
        />
        <Text
          style={{
            padding: 10,
            flex: 1,
            // backgroundColor:"yellow"
          }}>
          {/* # */}
          {item.id}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
            // backgroundColor:"green"
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
            // backgroundColor:"red"
          }}>
          {/* Size */}
          {item.size}
        </Text>

        <Text
          style={{
            padding: 10,
            flex: 1,
            // backgroundColor:"pink",
            // marginRight:7,
          }}>
          {item.last_sync_data}
          {/* Last Sync date */}
        </Text>
      </View>
    );
  };

  const handleSelectAllToggle = () => {
    const updatedSelectAll = !selectAll;
    setSelectAll(updatedSelectAll);
    const updatedData = che.map(item => ({
      ...item,
      checked: updatedSelectAll,
    }));
    // setData(updatedData);
    if (updatedSelectAll) {
      setCheckedItems(updatedData);
    } else {
      setCheckedItems([]);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <View style={{ marginTop: 20,flex: 1 }}> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          padding: 5,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 10}}>
          Download Information
        </Text>
      </View>

      <DividerLine cuswidth />
      <View
        style={{
          flexDirection: 'row',
          borderRadius: 5,
          padding: 5,
          margin: 5,
        }}>
        <Checkbox
          status={selectAll ? 'checked' : 'unchecked'}
          onPress={handleSelectAllToggle}
        />
        <Text
          style={{
            padding: 10,
            flex: 1,
            fontWeight: 'bold',
            // backgroundColor: 'yellow',
          }}>
          #
        </Text>
        <Text
          style={{
            flex: 1,
            // backgroundColor: 'green',
            padding: 10,
            fontWeight: 'bold',
          }}>
          {t('Name')}
        </Text>
        <Text
          style={{
            flex: 1,
            // backgroundColor: 'red',
            padding: 10,
            fontWeight: 'bold',
          }}>
          Size
        </Text>
        <Text
          style={{
            flex: 1,
            // backgroundColor:'pink',
            padding: 10,
            fontWeight: 'bold',
          }}>
          Last Sync date:
        </Text>
      </View>

      <FlatList
        data={download_data}
        renderItem={item}
        keyExtractor={(item, index) => index.toString()}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          marginBottom: 10,
          alignSelf: 'center',
        }}>
        <Button
          mode="outlined"
          style={{width: 200, borderRadius: 0}}
          onPress={() => handleDownload()}>
          <Text>Download</Text>
        </Button>
      </View>

      {/* </View> */}
    </View>
  );
}
