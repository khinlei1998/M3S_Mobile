import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DividerLine from '../../components/DividerLine';
import { Button, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import CheckBoxFile from '../../components/CheckBoxFile';
import { UploadCustomerData } from '../../query/Customer_query';
export default function Sync_Upload_Screen(props) {
  const { customer_data, loan_data, btn_disabled } = props;
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);


  const isChecked = item => {
    return checkedItems.some(checkedItem => checkedItem.id === item.id);
  };

  const handleSelectAllToggle = () => {
    const updatedSelectAll = !selectAll;
    setSelectAll(updatedSelectAll);
    const updatedData = loan_data.map((item) => ({
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

  const handleCheckboxToggle = item => {
    if (isChecked(item)) {
      setCheckedItems(
        checkedItems.filter(checkedItem => checkedItem.id !== item.id),
      );
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };

  const item = ({ item }) => {
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
          onPress={() => handleCheckboxToggle(item)}
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
          {item.loan_type}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.application_no}
        </Text>

        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.borrower_name}
        </Text>

        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.past_loan_amount}
        </Text>
        <View
          style={{
            padding: 10,
            flex: 1,
            flexDirection: 'row',
          }}>
          <Text>{item.sync_sts}</Text>
          <TouchableOpacity onPress={() => alert('pp')}>
            <Icon
              name="chevron-right"
              size={30}
              color="#000"
              style={{ marginLeft: 15 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const btnUploadCustomer = async () => {

    // statusCode: 01,
    // createUserId: create_user_id ? create_user_id : null,
    // customerNm: customer_nm ? customer_nm : null,
    // employeeNo: employee_no ? employee_no : null,
    // residentRgstId: resident_rgst_id ? resident_rgst_id : null,
    // gender: gender ? gender : null,
    // birthDate: birth_date ? birth_date : null,
    // maritalStatus: marital_status ? marital_status : null,
    // telNo: tel_no ? tel_no : null,
    // familyNum: family_num ? family_num : null,
    // hghschlNum: hghschl_num ? hghschl_num : null,
    // universityNum: university_num ? university_num : null,
    // propApartmentYn: prop_apartment_yn ? prop_apartment_yn : null,
    // propHouseYn: prop_house_yn ? prop_house_yn : null,
    // propCarYn: prop_car_yn ? prop_car_yn : null,
    // propMotorcycleYn: prop_motorcycle_yn ? prop_motorcycle_yn : null,
    // propMachinesYn: prop_machines_yn ? prop_machines_yn : null,
    // propFarmlandYn: prop_farmland_yn ? prop_farmland_yn : null,
    // totPropEstmtdVal: tot_prop_estmtd_val ? tot_prop_estmtd_val : null,
    // otrPropEstmtdVal: otr_prop_estmtd_val ? otr_prop_estmtd_val : null,
    // employeeNum: employee_num ? employee_num : null,
    // landScale: land_scale ? land_scale : null,
    // totSaleIncome: tot_sale_income ? tot_sale_income : null,
    // totSaleExpense: tot_sale_expense ? tot_sale_expense : null,
    // rawmaterialExpans: rawmaterial_expans ? rawmaterial_expans : null,
    // wrkpRentExpns: wrkp_rent_expns ? wrkp_rent_expns : null,
    // employeeExpns: employee_expns ? employee_expns : null,
    // trnsrtExpns: trnsrt_expns ? trnsrt_expns : null,
    // goodsLossExpns: goods_loss_expns ? goods_loss_expns : null,
    // othrExpns1: othr_expns_1 ? othr_expns_1 : null,
    // othrExpns2: othr_expns_2 ? othr_expns_2 : null,
    // totBusNetIncome: tot_bus_net_income ? tot_bus_net_income : null,
    // fmlyTotIncome: fmly_tot_income ? fmly_tot_income : null,
    // fmlyTotExpense: fmly_tot_expense ? fmly_tot_expense : null,
    // foodExpns: food_expns ? food_expns : null,
    // houseMngtExpns: house_mngt_expns ? house_mngt_expns : null,
    // utlbilExpns: utlbil_expns ? utlbil_expns : null,
    // edctExpns: edct_expns ? edct_expns : null,
    // healthyExpns: healthy_expns ? healthy_expns : null,
    // financeExpns: finance_expns ? finance_expns : null,
    // fmlyOtrExpns: fmly_otr_expns ? fmly_otr_expns : null,
    // fmlyTotNetIncome: fmly_tot_net_income ? fmly_tot_net_income : null,
    // tabletSyncSts: tablet_sync_sts ? tablet_sync_sts : null,
    // syncSts: sync_sts ? sync_sts : null,
    // nrcStateCode: nrc_state_code ? nrc_state_code : null,
    // nrcPrefixCode: nrc_prefix_code ? nrc_prefix_code : null,
    // nrcNo: nrc_no ? nrc_no : null,
    // // serialNo: serial_no,
    // customerNo: customer_no
    // }))

    const updatedArray = customer_data.map(({ customer_no, nrc_no, nrc_prefix_code, nrc_state_code, sync_sts, tablet_sync_sts, fmly_tot_net_income, fmly_otr_expns, finance_expns, healthy_expns, edct_expns, utlbil_expns, house_mngt_expns, food_expns, fmly_tot_expense, fmly_tot_income, tot_bus_net_income, othr_expns_2, othr_expns_1, goods_loss_expns, trnsrt_expns, employee_expns, wrkp_rent_expns, rawmaterial_expans, tot_sale_expense, tot_sale_income, land_scale, employee_num, resident_rgst_id, status_code, create_user_id, customer_nm, employee_no, gender, birth_date, marital_status, tel_no, family_num, hghschl_num, university_num, prop_apartment_yn, prop_house_yn, prop_car_yn, prop_motorcycle_yn, prop_machines_yn, prop_farmland_yn, tot_prop_estmtd_val, otr_prop_estmtd_val }) => ({
      statusCode: status_code ? status_code : null,
      createUserId: create_user_id ? create_user_id : null,
      customerNm: customer_nm ? customer_nm : null,
      employeeNo: employee_no ? employee_no : null,
      residentRgstId: resident_rgst_id ? resident_rgst_id : null,
      gender: gender ? gender : null,
      birthDate: birth_date ? birth_date : null,
      maritalStatus: marital_status ? marital_status : null,
      telNo: tel_no ? tel_no : null,
      familyNum: family_num ? family_num : null,
      hghschlNum: hghschl_num ? hghschl_num : null,
      universityNum: university_num ? university_num : null,
      propApartmentYn: prop_apartment_yn ? prop_apartment_yn : null,
      propHouseYn: prop_house_yn ? prop_house_yn : null,
      propCarYn: prop_car_yn ? prop_car_yn : null,
      propMotorcycleYn: prop_motorcycle_yn ? prop_motorcycle_yn : null,
      propMachinesYn: prop_machines_yn ? prop_machines_yn : null,
      propFarmlandYn: prop_farmland_yn ? prop_farmland_yn : null,
      totPropEstmtdVal: tot_prop_estmtd_val ? tot_prop_estmtd_val : null,
      otrPropEstmtdVal: otr_prop_estmtd_val ? otr_prop_estmtd_val : null,
      employeeNum: employee_num ? employee_num : null,
      landScale: land_scale ? land_scale : null,
      totSaleIncome: tot_sale_income ? tot_sale_income : null,
      totSaleExpense: tot_sale_expense ? tot_sale_expense : null,
      rawmaterialExpans: rawmaterial_expans ? rawmaterial_expans : null,
      wrkpRentExpns: wrkp_rent_expns ? wrkp_rent_expns : null,
      employeeExpns: employee_expns ? employee_expns : null,
      trnsrtExpns: trnsrt_expns ? trnsrt_expns : null,
      goodsLossExpns: goods_loss_expns ? goods_loss_expns : null,
      othrExpns1: othr_expns_1 ? othr_expns_1 : null,
      othrExpns2: othr_expns_2 ? othr_expns_2 : null,
      totBusNetIncome: tot_bus_net_income ? tot_bus_net_income : null,
      fmlyTotIncome: fmly_tot_income ? fmly_tot_income : null,
      fmlyTotExpense: fmly_tot_expense ? fmly_tot_expense : null,
      foodExpns: food_expns ? food_expns : null,
      houseMngtExpns: house_mngt_expns ? house_mngt_expns : null,
      utlbilExpns: utlbil_expns ? utlbil_expns : null,
      edctExpns: edct_expns ? edct_expns : null,
      healthyExpns: healthy_expns ? healthy_expns : null,
      financeExpns: finance_expns ? finance_expns : null,
      fmlyOtrExpns: fmly_otr_expns ? fmly_otr_expns : null,
      fmlyTotNetIncome: fmly_tot_net_income ? fmly_tot_net_income : null,
      tabletSyncSts: tablet_sync_sts ? tablet_sync_sts : null,
      syncSts: sync_sts ? sync_sts : null,
      nrcStateCode: nrc_state_code ? nrc_state_code : null,
      nrcPrefixCode: nrc_prefix_code ? nrc_prefix_code : null,
      nrcNo: nrc_no ? nrc_no : null,
      // serialNo: serial_no,
      customerNo: customer_no
    }))
    await UploadCustomerData(updatedArray)
  }

  return (
    <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10, flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 10 }}>
          Upload Application
        </Text>

        <View>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'right',
              color: 'red',
            }}>
            {loan_data.length}
            <Text style={{ color: '#c7c7c7', fontSize: 15 }}> PCS</Text>
          </Text>
        </View>
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
          Loan Type
        </Text>
        <Text
          style={{
            flex: 1,

            padding: 10,
            fontWeight: 'bold',
          }}>
          Application No
        </Text>
        <Text
          style={{
            flex: 1,

            padding: 10,
            fontWeight: 'bold',
          }}>
          Borrower Name
        </Text>

        <Text
          style={{
            flex: 1,

            padding: 10,
            fontWeight: 'bold',
          }}>
          Application amount
        </Text>

        <Text
          style={{
            flex: 1,

            padding: 10,
            fontWeight: 'bold',
          }}>
          Sync
        </Text>
      </View>

      <FlatList
        data={loan_data}
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
          onPress={() => btnUploadCustomer()}
          mode="contained"
          buttonColor={'#6870C3'}
          style={{
            borderRadius: 0,
            width: 120,
            marginTop: 10,
            color: 'black',
            marginLeft: 5,
            padding: 5,
          }}>
          Customer
        </Button>

        <Button
          disabled={btn_disabled}
          style={{
            borderRadius: 0,
            width: 120,
            marginTop: 10,
            color: 'black',
            marginLeft: 5,
            padding: 5,
          }}
          mode="outlined"
          onPress={() => console.log('Button Pressed')}>
          Upload
        </Button>
      </View>
    </View>
  );
}
