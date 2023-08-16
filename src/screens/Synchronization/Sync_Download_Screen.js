import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import DividerLine from '../../components/DividerLine';
import {Button, Checkbox} from 'react-native-paper';
import {useNetInfo, NetInfo} from '@react-native-community/netinfo';
import {getEemployee_info} from '../../query/Employee_query';
import {getCustomer_info} from '../../query/Customer_query';
import {getNRC_info} from '../../query/NRCinfo_query';
import {getIndividual_loan} from '../../query/AllLoan_query';
import {getSurvey_Item} from '../../query/SurveyItem_query';
import {getLoanMax} from '../../query/LoanMax_query';
import Spinner from 'react-native-loading-spinner-overlay';
import {getCodeInfo} from '../../query/CodeInfo_quey';
import moment from 'moment';
import {get_Village} from '../../query/Village_query';
import {get_Township} from '../../query/Township_query';
import {get_Ward} from '../../query/Ward_query';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
export default function Sync_Download_Screen() {
  const [selectAll, setSelectAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const netInfo = useNetInfo();

  const download_data = [
    {
      id: 1,
      name: 'Employees',
      size: '0KB',
      last_sync_data: '',
      checked: false,
      api: getEemployee_info,
    },
    {
      id: 2,
      name: 'Survey Items',
      size: '0KB',
      last_sync_data: '',
      checked: false,
      api: getSurvey_Item,
    },
    {
      id: 3,
      name: 'Loan max limit',
      size: '0KB',
      last_sync_data: '',
      checked: false,
      api: getLoanMax,
    },
    {
      id: 4,
      name: 'Codes',
      size: '0KB',
      last_sync_data: '',
      checked: false,
      api: getCodeInfo,
    },
    {
      id: 5,
      name: 'Customer',
      size: '0KB',
      last_sync_data: '',
      checked: false,
      api: getCustomer_info,
    },
    {
      id: 6,
      name: 'NRC Info',
      size: '0KB',
      last_sync_data: '',
      checked: false,
      api: getNRC_info,
    },
    {
      id: 7,
      name: 'Village',
      size: '0KB',
      last_sync_data: '',
      checked: false,
      api: get_Village,
    },
    {
      id: 8,
      name: 'Township',
      size: '0KB',
      last_sync_data: '',
      checked: false,
      api: get_Township,
    },
    {
      id: 9,
      name: 'Ward',
      size: '0KB',
      last_sync_data: '',
      checked: false,
      api: get_Ward,
    },
  ];

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
  const item = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 10,
        }}>
        {/* <CheckBoxFile/> */}

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
          }}>
          {item.id}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.size}
        </Text>

        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {moment().format('YYYY-MM-DD')}
        </Text>
      </View>
    );
  };

  const handleSelectAllToggle = () => {
    const updatedSelectAll = !selectAll;
    setSelectAll(updatedSelectAll);
    const updatedData = download_data.map(item => ({
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
  // const handleDownload = () => {
  //   if (checkedItems.length > 0) {
  //     if (selectAll) {
  //       if (!netInfo.isConnected) {
  //         alert('Internet Connection is need');
  //       } else {
  //         setIsLoading(true);
  //         getEemployee_info()
  //           .then(result => {
  //             if (result == 'success') {
  //               getCustomer_info()
  //                 .then(result => {
  //                   if (result == 'success') {
  //                     getNRC_info()
  //                       .then(result => {
  //                         if (result == 'success') {
  //                           getSurvey_Item()
  //                             .then(result => {
  //                               if (result == 'success') {
  //                                 getLoanMax()
  //                                   .then(result => {
  //                                     if (result == 'success') {
  //                                       getCodeInfo()
  //                                         .then(result => {
  //                                           if (result == 'success') {
  //                                             setIsLoading(false);
  //                                             setSelectAll(false);
  //                                             setCheckedItems([]);
  //                                             alert('Sync success');
  //                                           }
  //                                         })
  //                                         .catch(error => {
  //                                           setIsLoading(false);
  //                                           alert(
  //                                             'Only Possible download in network',
  //                                           );
  //                                           console.log('Emp error:', error);
  //                                         });
  //                                     }
  //                                   })
  //                                   .catch(error => {
  //                                     setIsLoading(false);
  //                                     alert(
  //                                       'Only Possible download in network',
  //                                     );
  //                                     console.log('Emp error:', error);
  //                                   });
  //                               }
  //                             })
  //                             .catch(error => {
  //                               setIsLoading(false);
  //                               alert('Only Possible download in network');
  //                               console.log('Emp error:', error);
  //                             });
  //                         }
  //                       })
  //                       .catch(error => {
  //                         setIsLoading(false);
  //                         alert('Only Possible download in network');
  //                         console.log('Emp error:', error);
  //                       });
  //                   }
  //                 })
  //                 .catch(error => {
  //                   setIsLoading(false);
  //                   alert('Only Possible download in network');
  //                   console.log('Emp error:', error);
  //                 });
  //             }
  //           })
  //           .catch(error => {
  //             setIsLoading(false);
  //             alert('Only Possible download in network');
  //             console.log('Emp error:', error);
  //           });
  //       }
  //     } else {
  //       setIsLoading(true);
  //       checkedItems.forEach(item => {
  //         // if (item.checked) {
  //         item
  //           .api()
  //           .then(result => {
  //             if (result == 'success') {
  //               setIsLoading(false);
  //               setSelectAll(false);
  //               setCheckedItems([]);
  //               alert('Sync success');
  //             }
  //           })
  //           .catch(error => {
  //             setIsLoading(false);
  //             alert('Only Possible download in network');
  //           });
  //       });
  //     }
  //   } else {
  //     alert('Choose one');
  //   }
  // };
  const handleDownload = async () => {
    if (!netInfo.isConnected) {
      alert('Internet Connection is needed');
      return;
    }

    if (checkedItems.length === 0) {
      alert('Choose at least one item');
      return;
    }

    setIsLoading(true);

    try {
      for (const item of checkedItems) {
        await executeRequest(item);
      }
      setIsLoading(false);
      setSelectAll(false);
      setCheckedItems([]);
      alert('Sync success');
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
      alert('Only Possible download in network');
    }
  };

  const executeRequest = async item => {
    try {
      await item.api();
    } catch (error) {
      throw error; // If a request fails, propagate the error up the chain
    }
  };

  return (
    <>
      <View style={{marginTop: 20, marginLeft: 10, marginRight: 10, flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
            margin: 10,
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
            }}>
            #
          </Text>
          <Text
            style={{
              flex: 1,

              padding: 10,
              fontWeight: 'bold',
            }}>
            Name
          </Text>
          <Text
            style={{
              flex: 1,

              padding: 10,
              fontWeight: 'bold',
            }}>
            Size
          </Text>
          <Text
            style={{
              flex: 1,

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
      </View>

      <View style={{position: 'absolute', top: '50%', right: 0, left: 0}}>
        {isLoading ? (
          // <Spinner visible={isLoading} textContent={'Please Wait'} />
          <SkypeIndicator color="#636Dc6" size={60} />
        ) : (
          <Text></Text>
        )}
      </View>
    </>
  );
}
