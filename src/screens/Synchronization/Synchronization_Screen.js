import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Button, Modal, ActivityIndicator } from 'react-native-paper';
import Tab from '../../components/Tab';
import Sync_Upload_Screen from './Sync_Upload_Screen';
import Sync_Download_Screen from './Sync_Download_Screen';
import Sync_Setting_Screen from './Sync_Setting_Screen';
import { fetchAllCustomerNum } from '../../query/Customer_query';
import { UploadCustomerData } from '../../query/Customer_query';
import { fetchDataForCheckedData } from '../../query/AllLoan_query';
import Icon from 'react-native-vector-icons/Feather';
import { get_loged_branch_code } from '../../query/Employee_query';
import Spinner from 'react-native-loading-spinner-overlay';
import { getAllLoanType } from '../../query/AllLoan_query';
import { getSurveyResult } from '../../query/SurveyItem_query';
import { UploadSurveyData } from '../../query/SurveyItem_query';
import { useNetInfo } from '@react-native-community/netinfo';
import { cancelRequest } from '../../components/CancelUtils';
import { createCancelTokenSource } from '../../components/CancelUtils';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { reduxForm, } from 'redux-form';
import { connect } from 'react-redux';
import { changeSyncTime } from '../../redux/SynchronizationReducer';
let token;

function Synchronization_Screen(props) {
  const { t } = useTranslation();
  const { navigation, download_data, changeSyncTime } = props;
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
  const [show_modal, setShowModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [fetchName, setFetchName] = useState('');

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
      const uploadSurveyResult = await UploadSurveyData(all_survey);

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
      setLoading(false);
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
    setShowModal(false);
  };

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
    try {
      const totalItems = checkedItems.length;
      let count = 0;
      const updatedDownloadDataArray = [];

      for (let i = 0; i < totalItems; i++) {
        const checkitem = checkedItems[i];
        setFetchName(checkitem.name);
        setShowModal(true);
        token = await createCancelTokenSource(); // Create a new cancel token source

        const { response, sizeInBytes } = await executeRequest(checkitem);
        // Calculate size in kilobytes for the current item
        const sizeInKilobytes = bytesToKilobytes(sizeInBytes).toFixed(2);
        count++;
        for (let i = 0; i < download_data.length; i++) {
          if (download_data[i].id == checkitem.id) {
            download_data[i]['size'] = sizeInKilobytes + 'KB';
            download_data[i]['last_sync_data'] = moment().format('lll');
          }
        }
      }
      changeSyncTime(download_data)
      // setDownloaddata(download_data)
      function bytesToKilobytes(bytes) {
        return bytes / 1024;
      }
      setSelectAll(false);
      setShowModal(false);
      setCheckedItems([]);

      alert('Sync success');
    } catch (error) {
      if (error === 'Request canceled by user') {
        setShowModal(false);
        setCheckedItems([]);
        alert('Request canceled by user');
      } else {
        setShowModal(false);
        setCheckedItems([]);
        alert('Only Possible download in network');
      }
    }
  };

  const executeRequest = async item => {
    try {
      const { response, sizeInBytes } = await item.api(token);
      return { response, sizeInBytes };
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
        {activeTab === 1 && (
          <Sync_Download_Screen
            checkedItems={checkedItems}
            selectAll={selectAll}
            setCheckedItems={setCheckedItems}
            setSelectAll={setSelectAll}
            setShowModal={setShowModal}
            handleDownload={handleDownload}
          />
        )}
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
            {t('OK')}
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
        contentContainerStyle={containerStyle}>
        <View style={{ padding: 10, height: 150 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column', //column direction
              justifyContent: 'center',
              alignItems: 'center',

              padding: 8,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <ActivityIndicator size="15" color="#636Dc6" />
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>
                {fetchName} is downloading..
              </Text>
            </View>
            <Button
              mode="outlined"
              onPress={() => {
                hidePgModal(), cancelRequest(token);
              }}
              style={{
                borderRadius: 0,
                padding: 5,
                width: '40%',
                top: 10,
              }}>
              {t('Cancel')}
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
function mapStateToProps(state) {
  return {
    download_data: state.sync.download_data
  };
}

export default reduxForm({
  form: 'Sync_Screen',
})(connect(mapStateToProps, { changeSyncTime })(Synchronization_Screen));
