import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Animated } from 'react-native';
import { Divider, Button, Provider, Modal, Portal } from 'react-native-paper';
import { getAllLoan } from '../../query/AllLoan_query';
import Tab from '../../components/Tab';
import Sync_Upload_Screen from './Sync_Upload_Screen';
import CheckBoxFile from '../../components/CheckBoxFile';
import Sync_Download_Screen from './Sync_Download_Screen';
import Sync_Setting_Screen from './Sync_Setting_Screen';
import { fetchAllCustomerNum } from '../../query/Customer_query';
import { UploadCustomerData } from '../../query/Customer_query';
import { getAllLoan_By_application_no } from '../../query/AllLoan_query';
import { fetchDataForCheckedData } from '../../query/AllLoan_query';
import Icon from 'react-native-vector-icons/Feather';
import { get_loged_branch_code } from '../../query/Employee_query';
import Spinner from 'react-native-loading-spinner-overlay';
import { getAllLoanType } from '../../query/AllLoan_query';
import { getSurveyResult } from '../../query/SurveyItem_query';
import { UploadSurveyData } from '../../query/SurveyItem_query';
import { useNetInfo, NetInfo } from '@react-native-community/netinfo';

export default function Synchronization_Screen(props) {
  const { navigation } = props;
  const [activeTab, setActiveTab] = React.useState(0);
  const [loan_data, setAllLoan] = React.useState([]);
  const [branch_code, setBranchCode] = React.useState('');
  const [customer_data, setAllCusstomer] = React.useState([]);
  const [btn_disabled, seBtnDisabled] = useState(false);
  const [btn_cus_disabled, setBtnCustomerDisabled] = useState(false);
  const [error_modal_visible, setModalVisible] = useState(false);
  const [failed_data, setFailedData] = useState([]);
  const [cus_error_modal_visible, setCusErrorModalVisible] = useState(false);
  const [cus_fail_data, setCusFailedData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [all_survey, setAllSurvey] = useState([]);
  const [show_modal, setShowModal] = useState(false)
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [fetchName, setFetchName] = useState('')
  const [progress] = useState(new Animated.Value(0)); // Initialize animated value
  const [fetchedCount, setFetchedCount] = useState(0);


  const netInfo = useNetInfo();
  const btnUploadCustomer = async () => {
    setLoading(true);
    customer_data.forEach(obj => {
      obj.tablet_sync_sts = '01';
      obj.customer_no = '';
      obj.open_branch_code = branch_code;
    });
    try {
      const uploadCustomerResult = await UploadCustomerData(customer_data);
      console.log('uploadCustomerResult', uploadCustomerResult);

      const uploadSurveyResult = await UploadSurveyData(all_survey);
      console.log('uploadSurveyResult', uploadSurveyResult);

      if (
        uploadCustomerResult === 'success' &&
        uploadSurveyResult === 'success'
      ) {
        await loadData();
        setLoading(false);

        alert('All update success');
      } else if (
        uploadCustomerResult.length > 0 ||
        uploadSurveyResult.length > 0
      ) {
        console.log('reach');
        const mergedArray = [...uploadCustomerResult, ...uploadSurveyResult];

        setLoading(false);

        setCusFailedData(uploadCustomerResult);
        setCusErrorModalVisible(true);
        await loadData();
      } else {
        await loadData();
        setLoading(false);
        alert('Only Possible download in network');
      }
      // updateTableSyncStatus('13')
    } catch (error) {
      setLoading(false);
      alert('Only Possible download in network');
    }
  };

  const hideModal = () => setModalVisible(false);
  const CushideModal = () => setCusErrorModalVisible(false);

  const btnLoanUpload = async checkedItems => {
    const filteredArray = loan_data.filter(obj1 =>
      checkedItems.some(obj2 =>
        obj2.application_no
          ? obj2.application_no === obj1.application_no
          : obj2.group_aplc_no === obj1.group_aplc_no,
      ),
    );

    try {
      // Call the API here
      if (filteredArray.length > 0) {
        setLoading(true);
        await fetchDataForCheckedData(filteredArray, branch_code).then(
          async result => {
            if (result == 'success') {
              await loadData();
              setLoading(false);
              alert('All update success');
            } else if (result.length > 0) {
              setLoading(false);
              setFailedData(result);
              setModalVisible(true);
              await loadData();
            } else {
              setLoading(false);
              alert('Axios Error ');
            }
          },
        );
      } else {
        alert('Please Select at least one');
      }
    } catch (error) {
      alert('Only Possible download in network');
    }
  };

  const handleTabPress = index => {
    setActiveTab(index);
  };

  const loadData = async () => {
    const customerData = await fetchAllCustomerNum();
    const surveyData = await getSurveyResult();
    const filteredCustomerData = customerData.filter(
      cus_item => cus_item.tablet_sync_sts == '00',
    );

    const isCustomerDataAvailable = filteredCustomerData.length > 0;
    const isSurveyDataAvailable = surveyData.length > 0;
    if (isCustomerDataAvailable || isSurveyDataAvailable) {
      seBtnDisabled(true);
    } else {
      seBtnDisabled(false);
      setBtnCustomerDisabled(true);
    }

    setAllCusstomer(filteredCustomerData);
    setAllSurvey(surveyData);

    await getAllLoanType()
      .then(setAllLoan)
      .catch(error => console.log(error));

    await get_loged_branch_code()
      .then(data => setBranchCode(data[0].branch_code))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    loadData();
  }, []);
  const hidePgModal = () => {
    setShowModal(false)
  }

  const error_log = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 10,
        }}>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.form}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.message}
        </Text>
      </View>
    );
  };

  const cus_error_log = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 10,
        }}>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          Customer residentRgstId : {item.resident_rgst_id}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.message}
        </Text>
      </View>
    );
  };
  const containerStyle = {
    backgroundColor: '#fff',
    width: '60%',
    alignSelf: 'center',

  };
  const handleDownload = async () => {

    if (!netInfo.isConnected) {
      alert('Internet Connection is needed');
      return;
    }

    if (checkedItems.length === 0) {
      alert('Choose at least one item');
      return;
    }

    // setIsLoading(true);
    try {
      const totalItems = checkedItems.length;
      setFetchedCount(0); // Reset fetched count
      // const interval = setInterval(() => {
      //   setFetchedCount(prevCount => prevCount + 1);
      // }, 300);
      for (let i = 0; i < totalItems; i++) {
        const item = checkedItems[i];
        setFetchName(item.name)
        setShowModal(true)
        await executeRequest(item);
        // Update the fetched count
        // Increment the count every 300 milliseconds


      }
      // clearInterval(interval); // Stop the interval

      // Fetching completed, set progress to 100%
      // Animated.timing(progress, {
      //   toValue: 100,
      //   duration: 300,
      //   useNativeDriver: false,
      // }).start();

      // Reset the progress after a brief delay
      // setTimeout(() => {
      //   progress.current.reset();
      // }, 500);


      // setIsLoading(false);
      setSelectAll(false);
      setShowModal(false)

      setCheckedItems([]);
      alert('Sync success');
    } catch (error) {
      console.log('error', error);
      setShowModal(false)

      // setIsLoading(false);
      alert('Only Possible download in network');
    }
  };

  const executeRequest = async item => {
    try {
      const test = await item.api();
      console.log('test', test);
    } catch (error) {
      throw error; // If a request fails, propagate the error up the chain
    }
  };
  return (
    <>
      <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 15 }}>
        Synchronization
      </Text>

      <Text style={{ fontSize: 15, padding: 5, marginLeft: 10 }}>
        Synchronization is the coordination of events to operate a system in
        union
      </Text>
      <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10 }}>
        <Tab
          label="Upload"
          isActive={activeTab === 0}
          onPress={() => handleTabPress(0)}>
          <View style={{ backgroundColor: '#fff' }}>
            <Text>Upload Applications</Text>
          </View>
        </Tab>
        <Tab
          label="Download"
          isActive={activeTab === 1}
          onPress={() => handleTabPress(1)}
        />
        <Tab
          label="Setting"
          isActive={activeTab === 2}
          onPress={() => handleTabPress(2)}
        />
      </View>

      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {activeTab === 0 && (
          <Sync_Upload_Screen
            btnUploadCustomer={btnUploadCustomer}
            loan_data={loan_data}
            btn_disabled={btn_disabled}
            customer_data={customer_data}
            btn_cus_disabled={btn_cus_disabled}
            btnLoanUpload={btnLoanUpload}
            all_survey={all_survey}
            navigation={navigation}
          />
        )}
        {activeTab === 1 && <Sync_Download_Screen checkedItems={checkedItems}
          selectAll={selectAll} setCheckedItems={setCheckedItems}
          setSelectAll={setSelectAll} setShowModal={setShowModal}
          handleDownload={handleDownload} />}
        {activeTab === 2 && <Sync_Setting_Screen />}
      </View>

      <Modal
        useNativeDriver
        hideModalContentWhileAnimating
        dismissable={false}
        visible={error_modal_visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: '#e8e8e8',
          width: '60%',
          height: '70%',
          alignSelf: 'center',
        }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: '#e01b22',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                flex: 1,
                color: '#fff',
              }}>
              Error Log
            </Text>
            <TouchableOpacity onPress={() => hideModal()}>
              <Icon name="x-circle" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 20,
              color: '#e01b22',
              padding: 10,
            }}>
            Fail :{failed_data ? failed_data.length : 0}
          </Text>

          <FlatList
            data={failed_data}
            renderItem={error_log}
            keyExtractor={(item, index) => index.toString()}
          />
          <Button
            onPress={() => hideModal()}
            mode="contained"
            buttonColor={'#e01b22'}
            style={{
              borderRadius: 0,
              padding: 5,
            }}>
            OK
          </Button>
        </View>
      </Modal>

      {/* Customer Error Log Modal */}
      <Modal
        useNativeDriver
        hideModalContentWhileAnimating
        dismissable={false}
        visible={cus_error_modal_visible}
        onDismiss={CushideModal}
        contentContainerStyle={{
          backgroundColor: '#e8e8e8',
          width: '60%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#e01b22',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              flex: 1,
              color: '#fff',
            }}>
            Error Log
          </Text>
          <TouchableOpacity onPress={() => CushideModal()}>
            <Icon name="x-circle" size={25} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={{ padding: 5, backgroundColor: '#e01b22' }}>
          <View
            style={{
              backgroundColor: '#e6ebe7',
              flexDirection: 'row',
            }}>
            <FlatList
              data={cus_fail_data}
              renderItem={cus_error_log}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </Modal>

      {/* Pg bar */}
      <Modal
        visible={show_modal}
        onDismiss={hidePgModal}
        contentContainerStyle={containerStyle}>

        <View style={{ padding: 10, height: 150 }}>
          <View style={{
            flex: 1,
            flexDirection: "column", //column direction
            justifyContent: 'center',
            alignItems: 'center',

            padding: 8,
          }}>
            <Animated.Text>{fetchedCount}</Animated.Text>
            <Text>
              {fetchName}
            </Text>
            <View style={{
              height: 30,
              width: '100%',
              backgroundColor: 'white',
              borderColor: '#000',
              borderWidth: 2,
              borderRadius: 5
            }}>
              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    backgroundColor: "#636Dc6",
                    width: progress.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),

                  },
                ]}
              />
            </View>
            <Text>ff</Text>
            <Button
              mode='outlined'
              onPress={() => hidePgModal()}
              style={{
                borderRadius: 0,
                padding: 5,
                width: '40%',
                top: 10
              }}>
              Cancel
            </Button>
          </View>

        </View>
      </Modal>

      <View style={{ position: 'absolute', top: '50%', right: 0, left: 0 }}>
        {isLoading ? (
          <Spinner visible={isLoading} textContent={'Please Wait'} />
        ) : (
          <Text></Text>
        )}
      </View>
    </>
  );
}
