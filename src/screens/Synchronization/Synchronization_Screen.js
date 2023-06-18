import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {DataTable} from 'react-native-paper';
import DividerLine from '../../components/DividerLine';
import {Divider, Button} from 'react-native-paper';
import {getAllLoan} from '../../query/AllLoan_query';
import Tab from '../../components/Tab';
import Sync_Upload_Screen from './Sync_Upload_Screen';
import CheckBoxFile from '../../components/CheckBoxFile';
import Sync_Download_Screen from './Sync_Download_Screen';
import Sync_Setting_Screen from './Sync_Setting_Screen';
import {fetchAllCustomerNum} from '../../query/Customer_query';
import {UploadCustomerData} from '../../query/Customer_query';
import {UploadLoanData} from '../../query/AllLoan_query';
import {getAllLoan_By_application_no} from '../../query/AllLoan_query';
import {fetchDataForCheckedData} from '../../query/AllLoan_query';
export default function Synchronization_Screen() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [loan_data, setAllLoan] = React.useState([]);
  const [customer_data, setAllCusstomer] = React.useState([]);
  const [btn_disabled, seBtnDisabled] = useState(false);
  const [btn_cus_disabled, setBtnCustomerDisabled] = useState(false);

  const btnUploadCustomer = async () => {
    customer_data.forEach(obj => {
      obj.tablet_sync_sts = '01';
      obj.customer_no = '';
    });
    console.log('Finale Cus data', customer_data);

    try {
      // Call the API here
      await UploadCustomerData(customer_data).then(async result => {
        if (result == 'success') {
          await loadData();
        } else {
          await loadData();
        }
      });
      // updateTableSyncStatus('13')
    } catch (error) {
      // If API call fails, revert the value of 'tablet_sync_sts' back to the original value
      // customer_data.forEach(obj => {
      //   obj.tablet_sync_sts = obj.tablet_sync_sts == '01' ? '01' : obj.tablet_sync_sts;
      // });
      console.error('API call failed. Value not changed.');
    }
  };

  const btnLoanUpload = async checkedItems => {

    let data = new FormData();
    data.append(
      'individualApplication',
      '[{"statusCode": "01","createUserId": "M00110","updateUserId": "M00110","productType": "","channelDeviceType": "","openBranchCode": "","openUserId": "","mngtBranchCode": "","mngtUserId": "","applicationNo": "16","groupAplcNo": "","tabletAplcNo": "","referAplcNo": "","loanType": "","cstNewExistFlg": "Y","loanCycle": 6.0,"applicationAmt": 1000000.0,"applicationDate": "2023-05-07","loantermCnt": 12.0,"borrowerName": "","customerNo": "","loanCode": "","savingAcctNum": "","gender": "M","birthDate": "","maritalStatus": "","residentRgstId": "","telNo": "","mobileTelNo": "","positionTitleNm": "","addr": "","businessOwnType": "","coCustomerNo": "","coBrwerName": "","workplaceName": "","workplaceType": "","workplaceAddr": "","landOwnType": "","totSaleIncome": 0.0,"totSaleExpense": 0.0,"rawmaterialExpans": 0.0,"wrkpRentExpns": 0.0,"employeeExpns": 0.0,"trnsrtExpns": 0.0,"goodsLossExpns": 0.0,"othrExpns1": 0.0,"othrExpns2": 0.0,"totBusNetIncome": 0.0,"fmlyTotIncome": 0.0,"fmlyTotExpense": 0.0,"foodExpns": 0.0,"houseMngtExpns": 0.0,"utlbilExpns": 0.0,"edctExpns": 0.0,"healthyExpns": 0.0,"financeExpns": 0.0,"fmlyOtrExpns": 0.0,"fmlyTotNetIncome": 0.0,"totNetIncome": 0.0,"remark": "","tabletSyncSts": "00","syncSts": "00","pastLoanAmount": 0.0,"pastLoanRating": "","pastCreditEmplNm": "","oldApplicationNo": "","loanLimitAmt": 0.0,"sysOrganizationCode": "1000","organizationCode": "1000","restFlag": "Y","transactionDate": "2023-05-07","serialNo": 2594\n\n}]',
    );
    data.append('guarantee', '[]');
    data.append('areaEvaluation', '[]');
    data.append('exceptionAprv', '[]');
    data.append('relationInfo', '[]');
    try {
      // Call the API here
      await fetchDataForCheckedData(checkedItems).then(async result => {
        if (result == 'success') {
        } else {
        }
      });
      // updateTableSyncStatus('13')
    } catch (error) {
      // If API call fails, revert the value of 'tablet_sync_sts' back to the original value
      // customer_data.forEach(obj => {
      //   obj.tablet_sync_sts = obj.tablet_sync_sts == '01' ? '01' : obj.tablet_sync_sts;
      // });
      console.error('API call failed. Value not changed.');
    }
  };

  const handleTabPress = index => {
    setActiveTab(index);
  };

  const loadData = async () => {
    await getAllLoan_By_application_no()
      .then(setAllLoan)
      .catch(error => console.log(error));

    await fetchAllCustomerNum()
      .then(data => {
        const result = data.filter(
          cus_item => cus_item.tablet_sync_sts == '00',
        );
        console.log('Sync customer', result);
        if (result.length > 0) {
          setAllCusstomer(result);
          seBtnDisabled(true);
        } else {
          setAllCusstomer(result);
          setBtnCustomerDisabled(true);
          seBtnDisabled(false);
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <Text style={{fontWeight: 'bold', fontSize: 20, padding: 15}}>
        Synchronization
      </Text>
      <Text style={{fontSize: 15, padding: 5, marginLeft: 10}}>
        Synchronization is the coordination of events to operate a system in
        union
      </Text>
      <View style={{flexDirection: 'row', marginLeft: 10, marginRight: 10}}>
        <Tab
          label="Upload"
          isActive={activeTab === 0}
          onPress={() => handleTabPress(0)}>
          <View style={{backgroundColor: '#fff'}}>
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

      <View style={{flex: 1, backgroundColor: '#fff'}}>
        {activeTab === 0 && (
          <Sync_Upload_Screen
            btnUploadCustomer={btnUploadCustomer}
            loan_data={loan_data}
            btn_disabled={btn_disabled}
            customer_data={customer_data}
            btn_cus_disabled={btn_cus_disabled}
            btnLoanUpload={btnLoanUpload}
          />
        )}
        {activeTab === 1 && <Sync_Download_Screen />}
        {activeTab === 2 && <Sync_Setting_Screen />}
      </View>
    </>
  );
}
