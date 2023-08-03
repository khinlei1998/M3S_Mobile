import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Field, reduxForm, change, reset, formValueSelector} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import {
  RadioButton,
  Button,
  Modal,
  Provider,
  Portal,
  List,
  TextInput,
} from 'react-native-paper';
import DividerLine from '../../components/DividerLine';
import Icon from 'react-native-vector-icons/Feather';
import TextInputFile from '../../components/TextInputFile';
import DropDownPicker from '../../components/DropDownPicker';
import {fetchNRCinfo} from '../../query/NRCinfo_query';
import {
  salary_grade,
  city_code,
  Township_code,
  ward_code,
  location_code,
} from '../../common';
import {style} from '../../style/Customer_Mang_style';
import {setCusFormInitialValues} from '../../redux/CustomerReducer';
import {emp_filter_item, village_code} from '../../common';
import {Picker} from '@react-native-picker/picker';
import {filterEmp} from '../../query/Employee_query';
import {addEmpFilter} from '../../redux/EmployeeReducer';
import {operations} from '../../common';
import {setUpdateStatus} from '../../redux/CustomerReducer';
import Edit_Customer_BaseInfo from './Edit_Customer_BaseInfo';
import Edit_property_Info from './Edit_Property_Info';
import Edit_Business_Info from './Edit_Business_Info';
import Edit_Monthly_Income from './Edit_Monthly_Income';
import {deleteCustomer_ByID} from '../../query/Customer_query';
import Edit_NRC_Modal from './Edit_NRC_Modal';
import {
  totalIncome,
  totalFamilyIncome,
  totalNetFamily,
  totalExpense,
  totalFamilyExpense,
  updateTotalSum,
} from '../../redux/MonthlyReducer';
import {updateCustomerData} from '../../query/Customer_query';
import {checkDataExists} from '../../query/Customer_query';
import DatePicker from '../../components/DatePicker';
import validate from './validate';
function Edit_Emp_Info(props) {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    setUpdateStatus,
    update_status,
    emp_filter_data,
    totalIncome,
    totalFamilyIncome,
    totalNetFamily,
    totalExpense,
    totalFamilyExpense,
    updateTotalSum,
    nrcNo,
    nrc_state_code,
  } = props;
  const [all_emp, setAllEmp] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [show_businessdate, setBusiness] = useState('1');
  const [show_village, setVillage] = useState('1');
  const [show_business_date, setBusinessStartDate] = useState('1');
  const [modal_location_visible, setLocationModalVisible] = useState(false);

  const [selectedItemValue, setSelectedItemValue] = useState('employee_name');
  const [villageselectedItemValue, setVillageSelectedValue] =
    useState('village_code');
  const [selectedValue, setSelectedValue] = useState(null);
  const [nrc_visible, setNRC_Visible] = useState(false);
  const [open_empinfo, setEmpInfo] = useState(true);
  const [show_nrc, setNRC] = useState('1');
  const [show_operation, setOperation] = useState('2');
  const [nrc_statecode, setNRCStateCode] = useState([]);
  const [all_location, setAllLocation] = useState([]);
  const [nrc_prefix_code, setNRCPrefixCode] = useState([]);
  const [empname, setEmpName] = useState('');
  const [modal_city_visible, setCityCodeModalVisible] = useState(false);
  // Villgae
  const [modal_village_visible, setVillageCodeModalVisible] = useState(false);
  const [all_village, setAllVillage] = useState([]);
  //township
  const [modal_township_visible, setTownshipCodeModalVisible] = useState(false);
  const [all_township, setAllTownship] = useState([]);
  const [townshipselectedItemValue, setSelectedTownshipItemValue] =
    useState('township_code');

  const [selectedCityItemValue, setSelectedCityItemValue] =
    useState('city_code');
  const [all_city, setAllCity] = useState([]);

  //Ward
  const [modal_ward_visible, setWardCodeModalVisible] = useState(false);
  const [all_ward, setAllWard] = useState([]);
  const [show_businessdate_per, setBusinessPer] = useState('1');

  const [wardselectedItemValue, setSelectedWardItemValue] =
    useState('ward_code');

  const [selectedLocationItemValue, setLocationSelectedItemValue] =
    useState('location_code');
  const handleLocationItemValueChange = itemValue => {
    setLocationSelectedItemValue(itemValue);
  };

  const [emp_text, setEmpText] = useState('');
  const [village_text, setVillageText] = useState('');
  const [ward_text, setWardText] = useState('');
  const [township_text, setTownshipText] = useState('');
  const [location_text, setLocationText] = useState('');
  const [city_text, setCityText] = useState('');
  const [prefix, setPrefix] = useState('');

  const handleItemValueChange = itemValue => {
    setSelectedItemValue(itemValue);
  };

  const handlePeroidChange = (value, input) => {
    input.onChange(value.id);
    setBusinessPer(value.id);

    //if other radio select value must null
    dispatch(change('Customer_ManagementForm', 'curr_resident_date', ''));
  };

  const hideModal = () => setModalVisible(false);
  const hideVillageModal = () => setVillageCodeModalVisible(false);
  const hideTownshipModal = () => setTownshipCodeModalVisible(false);

  const hideCityModal = () => setCityCodeModalVisible(false);
  const hideWardModal = () => setWardCodeModalVisible(false);
  const filtered_cus_data = props.route.params;

  const onChangeEmpText = textvalues => {
    setEmpText(textvalues);
  };
  const onChangeVillageText = textvalues => {
    setVillageText(textvalues);
  };
  const onChangeTownshipText = textvalues => {
    setTownshipText(textvalues);
  };
  const onChangeWardText = textvalues => {
    setWardText(textvalues);
  };
  const onChangeLocationText = textvalues => {
    setLocationText(textvalues);
  };
  const onChangeCityText = textvalues => {
    setCityText(textvalues);
  };

  useEffect(() => {
    //show default selected radio button
    if (filtered_cus_data.start_living_date_status == '2') {
      setBusiness('2');
    }

    if (filtered_cus_data.village_status == '2') {
      setVillage('2');
    } else {
      setVillage('1');
    }

    if (filtered_cus_data.business_period_status == '2') {
      setBusinessPer('2');
    }

    if (filtered_cus_data.curr_business_date_status == '2') {
      setBusinessStartDate('2');
    }

    const retrive_cusdata = Object.assign({}, filtered_cus_data, {
      hghschl_num: filtered_cus_data.hghschl_num
        ? filtered_cus_data.hghschl_num.toString()
        : '',
      university_num: filtered_cus_data.university_num
        ? filtered_cus_data.university_num.toString()
        : '',
      family_num: filtered_cus_data.family_num
        ? filtered_cus_data.family_num.toString()
        : '',
      tot_prop_estmtd_val: filtered_cus_data.tot_prop_estmtd_val
        ? filtered_cus_data.tot_prop_estmtd_val.toString()
        : '',
      otr_prop_estmtd_val: filtered_cus_data.otr_prop_estmtd_val
        ? filtered_cus_data.otr_prop_estmtd_val.toString()
        : '',
      land_scale: filtered_cus_data.land_scale
        ? filtered_cus_data.land_scale.toString()
        : '',
      tot_sale_income: filtered_cus_data.tot_sale_income
        ? filtered_cus_data.tot_sale_income.toString()
        : '',
      wrkp_rent_expns: filtered_cus_data.wrkp_rent_expns
        ? filtered_cus_data.wrkp_rent_expns.toString()
        : '',
      rawmaterial_expans: filtered_cus_data.rawmaterial_expans
        ? filtered_cus_data.rawmaterial_expans.toString()
        : '',
      employee_expns: filtered_cus_data.employee_expns
        ? filtered_cus_data.employee_expns.toString()
        : '',
      trnsrt_expns: filtered_cus_data.trnsrt_expns
        ? filtered_cus_data.trnsrt_expns.toString()
        : '',
      bus_utlbil_expns: filtered_cus_data.bus_utlbil_expns
        ? filtered_cus_data.bus_utlbil_expns.toString()
        : '',
      tel_expns: filtered_cus_data.tel_expns
        ? filtered_cus_data.tel_expns.toString()
        : '',
      tax_expns: filtered_cus_data.tax_expns
        ? filtered_cus_data.tax_expns.toString()
        : '',
      goods_loss_expns: filtered_cus_data.goods_loss_expns
        ? filtered_cus_data.goods_loss_expns.toString()
        : '',
      othr_expns_1: filtered_cus_data.othr_expns_1
        ? filtered_cus_data.othr_expns_1.toString()
        : '',
      othr_expns_2: filtered_cus_data.othr_expns_2
        ? filtered_cus_data.othr_expns_2.toString()
        : '',
      fmly_tot_income: filtered_cus_data.fmly_tot_income
        ? filtered_cus_data.fmly_tot_income.toString()
        : '',
      fmly_tot_expense: filtered_cus_data.fmly_tot_expense
        ? filtered_cus_data.fmly_tot_expense.toString()
        : '',
      food_expns: filtered_cus_data.food_expns
        ? filtered_cus_data.food_expns.toString()
        : '',
      house_mngt_expns: filtered_cus_data.house_mngt_expns
        ? filtered_cus_data.house_mngt_expns.toString()
        : '',
      utlbil_expns: filtered_cus_data.utlbil_expns
        ? filtered_cus_data.utlbil_expns.toString()
        : '',
      edct_expns: filtered_cus_data.edct_expns
        ? filtered_cus_data.edct_expns.toString()
        : '',
      healthy_expns: filtered_cus_data.healthy_expns
        ? filtered_cus_data.healthy_expns.toString()
        : '',
      fmly_trnsrt_expns: filtered_cus_data.fmly_trnsrt_expns
        ? filtered_cus_data.fmly_trnsrt_expns.toString()
        : '',
      fmly_tax_expns: filtered_cus_data.fmly_tax_expns
        ? filtered_cus_data.fmly_tax_expns.toString()
        : '',
      finance_expns: filtered_cus_data.finance_expns
        ? filtered_cus_data.finance_expns.toString()
        : '',
      fmly_otr_expns: filtered_cus_data.fmly_otr_expns
        ? filtered_cus_data.fmly_otr_expns.toString()
        : '',
      employee_num: filtered_cus_data.employee_num
        ? filtered_cus_data.employee_num.toString()
        : '',
      workplace_type: filtered_cus_data.workplace_type
        ? filtered_cus_data.workplace_type.toString()
        : '',
      tot_sale_expense: filtered_cus_data.tot_sale_expense
        ? filtered_cus_data.tot_sale_expense.toString()
        : '',
    });
    props.initialize(retrive_cusdata);
    if (retrive_cusdata.nrc_type == 2) {
      setNRC('2');
    }
  }, []);

  useEffect(() => {
    if (update_status == true) {
      setOperation('3');
    }
  }, [update_status]);

  useEffect(() => {
    totalIncome(
      filtered_cus_data.tot_sale_income
        ? parseFloat(filtered_cus_data.tot_sale_income)
        : 0,
    );
    totalExpense(
      filtered_cus_data.tot_sale_expense
        ? parseFloat(filtered_cus_data.tot_sale_expense)
        : 0,
    );
    totalFamilyIncome(
      filtered_cus_data.fmly_tot_income
        ? parseFloat(filtered_cus_data.fmly_tot_income)
        : 0,
    );
    totalFamilyExpense(
      filtered_cus_data.fmly_tot_expense
        ? parseFloat(filtered_cus_data.fmly_tot_expense)
        : 0,
    );
    updateTotalSum(
      filtered_cus_data.total_net ? parseFloat(filtered_cus_data.total_net) : 0,
    );
  }, []);

  const city_item = ({item, index}) => {
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
          {index + 1}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.city_code}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.city_name}
        </Text>

        <View>
          <RadioButton
            value={item.city_code}
            status={
              selectedCityItemValue === item.city_code ? 'checked' : 'unchecked'
            }
            // onPress={() => btnSelectEmployee(item)}
          />
        </View>
      </View>
    );
  };
  const ward_item = ({item, index}) => {
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
          {index + 1}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.ward_code}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.ward_name}
        </Text>

        <View>
          <RadioButton
            value={item.ward_code}
            status={
              wardselectedItemValue === item.ward_code ? 'checked' : 'unchecked'
            }
            // onPress={() => btnSelectEmployee(item)}
          />
        </View>
      </View>
    );
  };

  const township_item = ({item, index}) => {
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
          {index + 1}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.township_code}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.township_name}
        </Text>

        <View>
          <RadioButton
            value={item.township_code}
            status={
              townshipselectedItemValue === item.township_code
                ? 'checked'
                : 'unchecked'
            }
            // onPress={() => btnSelectEmployee(item)}
          />
        </View>
      </View>
    );
  };
  const location_item = ({item, index}) => {
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
          {index + 1}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.location_code}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.location_name}
        </Text>

        <View>
          <RadioButton
            value={item.township_code}
            // status={
            //   selectedTownshipItemValue === item.township_code
            //     ? 'checked'
            //     : 'unchecked'
            // }
            // onPress={() => btnSelectEmployee(item)}
          />
        </View>
      </View>
    );
  };
  const showEmplyeeSearch = () => {
    setModalVisible(true);
  };
  const showWardModal = () => {
    setWardCodeModalVisible(true);
  };

  const hideNRCModal = () => {
    const indexOfSlash = prefix.indexOf('/');
    const prefix_code = prefix.substring(0, indexOfSlash + 1);
    setNRC_Visible(!nrc_visible), setNRC(show_nrc);
    dispatch(
      change(
        'Customer_ManagementForm',
        'resident_rgst_id',
        prefix &&
          nrc_state_code &&
          nrcNo &&
          prefix_code + nrc_state_code + nrcNo,
      ),
    );
  };
  const loadData = async () => {
    await fetchNRCinfo()
      .then(result => {
        {
          const [nrc_state_code] = result;
          setNRCStateCode(nrc_state_code);
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartLivingStatus = (value, input) => {
    setBusiness(value.id);
    input.onChange(value.id);
    //if other radio select value must null
    dispatch(change('Customer_ManagementForm', 'curr_resident_date', ''));
  };

  const btnSelectEmployee = item => {
    setSelectedValue(item.employee_no);
    dispatch(
      change('Customer_ManagementForm', 'branch_code', item.branch_code),
    );
    dispatch(
      change('Customer_ManagementForm', 'employee_no', item.employee_no),
    );
    dispatch(change('Customer_ManagementForm', 'entry_date', item.entry_date));
    dispatch(
      change(
        'Customer_ManagementForm',
        'position_title_nm',
        item.position_title_nm,
      ),
    );

    // let emp_data = {
    //   branchCode: item.branch_code,
    //   employeeNo: item.employee_no,
    //   entryDate: item.entry_date,
    //   positionTitleNm: item.position_title_nm,
    // };
    // addEmpFilter(emp_data);
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
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {index + 1}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.employee_no}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.employee_name}
        </Text>

        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.position_title_nm == null ? 'No Data' : item.position_title_nm}
        </Text>

        <View>
          <RadioButton
            value={item.employee_no}
            status={
              selectedValue === item.employee_no ? 'checked' : 'unchecked'
            }
            onPress={() => btnSelectEmployee(item)}
          />
        </View>

        {/* <Field component={RadioButton}/> */}
      </View>
    );
  };

  const containerStyle = {
    backgroundColor: '#e8e8e8',
    width: '85%',
    alignSelf: 'center',
  };

  const ShowCityModal = () => {
    setCityCodeModalVisible(true);
  };
  const ShowVillageModal = () => {
    setVillageCodeModalVisible(true);
  };
  const ShowTownshipModal = () => {
    setTownshipCodeModalVisible(true);
  };

  const hideLocationModal = () => setLocationModalVisible(false);

  const Show_NRC = value => {
    setNRC(value);

    if (value == '2') {
      setNRC_Visible(true);
    }
  };

  const btnCusSearch = async () => {
    await filterEmp(selectedItemValue, emp_text)
      .then(data => (data.length > 0 ? setAllEmp(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const btnCitySearch = async () => {
    await filterEmp(selectedCityItemValue, city_text)
      .then(data => (data.length > 0 ? setAllCity(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };
  const btnVillageSearch = async () => {
    await filterEmp(villageselectedItemValue, village_text)
      .then(data => (data.length > 0 ? setAllCity(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };
  const btnTownshipSearch = async () => {
    await filterEmp(townshipselectedItemValue, township_text)
      .then(data => (data.length > 0 ? setAllTownship(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const btnWardSearch = async () => {
    await filterEmp(wardselectedItemValue, ward_text)
      .then(data => (data.length > 0 ? setAllWard(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const village_item = ({item, index}) => {
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
          {index + 1}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.village_code}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.village_name}
        </Text>

        <View>
          <RadioButton
            value={item.city_code}
            status={
              villageselectedItemValue === item.city_code
                ? 'checked'
                : 'unchecked'
            }
            // onPress={() => btnSelectEmployee(item)}
          />
        </View>
      </View>
    );
  };
  const filtered_operations = operations.filter(item => item.value != 1);

  const btnChangeOperation = newValue => {
    setOperation(newValue);
    if (newValue == 2 || newValue == 4) {
      setUpdateStatus(false);
    } else {
      setUpdateStatus(true);
    }
  };

  const handleRadioButtonChange = (value, input) => {
    setVillage(value.id);
    input.onChange(value.id);
    if (value == '2') {
      dispatch(change('Customer_ManagementForm', 'village_code', ''));
    }
  };
  const handleCurrBusinessChange = (value, input) => {
    setBusinessStartDate(value.id);
    input.onChange(value.id);
  };
  const showLocationSearch = () => {
    setLocationModalVisible(true);
  };

  const btnLocationSearch = async () => {
    await filterCustomer(selectedLocationItemValue, location_text)
      .then(data => (data.length > 0 ? setAllLocation(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };
  const btnCancel = () => {
    setNRC_Visible(!nrc_visible);
  };

  const onSubmit = async values => {
    try {
      if (show_operation == '4') {
        await deleteCustomer_ByID(values.id).then(response => {
          if (response == 'success') {
            alert('Delete Success');
            setUpdateStatus(false);
            props.navigation.navigate('Home');
          }
        });
      } else {
        let data = Object.assign(values, emp_filter_data, {
          createUserId: empname,
          resident_rgst_id:
            values.nrc_type == '1' ? values.nrc_no : values.resident_rgst_id,
        });
        if (filtered_cus_data.resident_rgst_id != data.resident_rgst_id) {
          //if not same old nrc and new nrc
          const check_nrc = await checkDataExists(data.resident_rgst_id);
          if (check_nrc == true) {
            alert('NRC No already exist');
          } else {
            await updateCustomerData(data).then(result => {
              if (result == 'success') {
                alert('Update Success');
                setUpdateStatus(false);

                dispatch(reset('Customer_ManagementForm'));
                // props.navigation.navigate('Customer Search');
                props.navigation.navigate('Home');
              }
            });
          }
        } else {
          await updateCustomerData(data).then(result => {
            if (result == 'success') {
              alert('Update Success');
              setUpdateStatus(false);

              dispatch(reset('Customer_ManagementForm'));
              props.navigation.navigate('Home');
            }
          });
        }
      }
    } catch (error) {
      // Handle errors here
      console.error('Error occurred during onSubmit:', error);
      // You can add additional error handling or display an error message to the user
    }
  };
  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Text style={style.title_style}>
              Customer Information Management
            </Text>
            <DividerLine border_width />

            <View style={style.continer}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {filtered_operations.map((option, index) => (
                  <RadioButton.Group
                    key={index}
                    onValueChange={newValue => btnChangeOperation(newValue)}
                    value={show_operation}>
                    <View
                      key={option.value}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <RadioButton.Item
                        uncheckedColor="#636Dc6"
                        color="#636Dc6"
                        disabled={
                          filtered_cus_data.tablet_sync_sts === '01' &&
                          option.value == 3
                        }
                        label={option.label}
                        value={option.value}
                        labelStyle={{marginLeft: 5}}
                      />
                    </View>
                  </RadioButton.Group>
                ))}
              </View>
              <Button
                disabled={
                  update_status == true && show_operation == '3'
                    ? false
                    : update_status == false && show_operation == '4'
                    ? false
                    : true
                }
                onPress={handleSubmit(onSubmit)}
                mode="contained"
                buttonColor={'#21316C'}
                style={style.btnStyle}>
                OK
              </Button>
            </View>
            <DividerLine border_width />
            {/* EMployee Information */}

            <List.Accordion
              expanded={open_empinfo}
              onPress={setEmpInfo}
              style={style.list_container}
              titleStyle={style.list_title}
              title="Employee Information">
              <View style={style.sub_container}>
                <View style={style.sub_list_container}>
                  <Field
                    name={'employee_no'}
                    title={'Employee No'}
                    component={TextInputFile}
                    cus_width
                    icon={update_status == true && 'magnify'}
                    input_mode
                    handleTextInputFocus={showEmplyeeSearch}
                    focusTextInput
                    editable
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'entryDate'}
                    component={DatePicker}
                    label={'Start Working Date at SHM'}
                    icon={update_status == true && 'calendar'}
                    editable={update_status == true ? false : true}
                  />
                  <View style={{marginRight: 10}}>
                    <Field
                      name={'position_title_nm'}
                      title={'Current Position'}
                      component={TextInputFile}
                      editable
                    />
                  </View>
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'branch_code'}
                    title={'Branch'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                  />
                  <View style={{marginRight: 10}}>
                    <Field
                      enabled={update_status == true ? false : true}
                      data={salary_grade}
                      name={'salary_rating_code'}
                      title={'Salary Grade'}
                      component={DropDownPicker}
                      pickerStyle={{
                        width: 300,
                      }}
                    />
                  </View>
                </View>
              </View>
            </List.Accordion>

            <DividerLine />

            <Edit_Customer_BaseInfo
              showNrcFun={Show_NRC}
              show_nrc={show_nrc}
              nrc_statecode={nrc_statecode}
              showCitySearch={ShowCityModal}
              showVillageSearch={ShowVillageModal}
              showTownshipSearch={ShowTownshipModal}
              showWardSearch={showWardModal}
              handleStartLivingStatus={handleStartLivingStatus}
              show_businessdate={show_businessdate}
              handleRadioButtonChange={handleRadioButtonChange}
              show_village={show_village}
              showLocationSearch={showLocationSearch}
            />
            <Edit_property_Info />
            <Edit_Business_Info
              handleCurrBusinessChange={handleCurrBusinessChange}
              show_businessdate_per={show_businessdate_per}
              handlePeroidChange={handlePeroidChange}
              show_business_date={show_business_date}
            />
            <Edit_Monthly_Income />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <Edit_NRC_Modal
        nrc_visible={nrc_visible}
        hideNRCModal={hideNRCModal}
        nrc_statecode={nrc_statecode}
        nrc_prefix_code={nrc_prefix_code}
        setPrefix={setPrefix}
        prefix={prefix}
        btnCancel={btnCancel}
      />
      <Provider>
        <Portal>
          <Modal
            dismissable={false}
            visible={modalVisible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <View
              style={{backgroundColor: '#232D57', padding: 25}}
              onStartShouldSetResponder={() => hideModal()}>
              <Icon
                name="x-circle"
                size={25}
                color="#fff"
                style={{
                  marginLeft: 20,
                  position: 'absolute',
                  top: 0,
                  right: 10,
                  top: 10,
                }}
              />
            </View>
            <View style={{padding: 10, height: 550}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{marginRight: 10}}>Search Item:</Text>

                  <Picker
                    selectedValue={selectedItemValue}
                    onValueChange={handleItemValueChange}
                    style={{width: 200, backgroundColor: 'white', marginTop: 7}}
                    mode="dropdown">
                    {emp_filter_item.length > 0 &&
                      emp_filter_item.map(val => (
                        <Picker.Item
                          label={val.label}
                          value={val.value}
                          key={val.id}
                        />
                      ))}
                  </Picker>
                </View>

                <View style={{width: '50%'}}>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      marginTop: 10,
                      width: 301,
                      borderColor: '#303030',
                      borderWidth: 0.5,
                    }}
                    value={emp_text}
                    onChangeText={onChangeEmpText}
                    right={
                      <TextInput.Icon
                        icon={'magnify'}
                        onPress={() => btnCusSearch()}
                      />
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  padding: 5,
                  margin: 20,
                }}>
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
                  Employee No
                </Text>
                <Text
                  style={{
                    flex: 1,

                    padding: 10,
                    fontWeight: 'bold',
                  }}>
                  Employee Name
                </Text>
                <Text
                  style={{
                    flex: 1,

                    padding: 10,
                    fontWeight: 'bold',
                  }}>
                  Positon Name
                </Text>
              </View>

              <FlatList
                data={all_emp}
                renderItem={item}
                keyExtractor={(item, index) => index.toString()}
              />

              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Button
                  onPress={() => hideModal()}
                  mode="contained"
                  buttonColor={'#6870C3'}
                  style={{
                    borderRadius: 0,
                    width: 100,
                    marginTop: 10,
                    color: 'black',
                    marginLeft: 5,
                  }}>
                  OK
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
      </Provider>

      {/* City Modal */}

      <Provider>
        <Portal>
          <Modal
            dismissable={false}
            visible={modal_city_visible}
            onDismiss={hideCityModal}
            contentContainerStyle={containerStyle}>
            <View
              style={{backgroundColor: '#232D57', padding: 25}}
              onStartShouldSetResponder={() => hideCityModal()}>
              <Icon
                name="x-circle"
                size={25}
                color="#fff"
                style={{
                  marginLeft: 20,
                  position: 'absolute',
                  top: 0,
                  right: 10,
                  top: 10,
                }}
              />
            </View>
            <View style={{padding: 10, height: 550}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{marginRight: 10}}>Search Item:</Text>

                  <Picker
                    selectedValue={selectedItemValue}
                    onValueChange={handleItemValueChange}
                    style={{width: 200, backgroundColor: 'white', marginTop: 7}}
                    mode="dropdown">
                    {city_code.length > 0 &&
                      city_code.map(val => (
                        <Picker.Item
                          label={val.label}
                          value={val.value}
                          key={val.id}
                        />
                      ))}
                  </Picker>
                </View>

                <View style={{width: '50%'}}>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      marginTop: 10,
                      width: 301,
                      borderColor: '#303030',
                      borderWidth: 0.5,
                    }}
                    value={city_text}
                    onChangeText={onChangeCityText}
                    right={
                      <TextInput.Icon
                        icon={'magnify'}
                        onPress={() => btnCitySearch()}
                      />
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  padding: 5,
                  margin: 20,
                }}>
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
                  City Code
                </Text>
                <Text
                  style={{
                    flex: 1,

                    padding: 10,
                    fontWeight: 'bold',
                  }}>
                  City Name
                </Text>
              </View>
              <View>
                <FlatList
                  data={all_city}
                  renderItem={city_item}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>

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
                  onPress={() => hideCityModal()}
                  mode="contained"
                  buttonColor={'#6870C3'}
                  style={{
                    borderRadius: 0,
                    width: 100,
                    marginTop: 10,
                    color: 'black',
                    marginLeft: 5,
                  }}>
                  OK
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
      </Provider>

      {/* Village  Modal */}

      <Provider>
        <Portal>
          <Modal
            dismissable={false}
            visible={modal_village_visible}
            onDismiss={hideVillageModal}
            contentContainerStyle={containerStyle}>
            <View
              style={{backgroundColor: '#232D57', padding: 25}}
              onStartShouldSetResponder={() => hideVillageModal()}>
              <Icon
                name="x-circle"
                size={25}
                color="#fff"
                style={{
                  marginLeft: 20,
                  position: 'absolute',
                  top: 0,
                  right: 10,
                  top: 10,
                }}
              />
            </View>
            <View style={{padding: 10, height: 550}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{marginRight: 10}}>Search Item:</Text>

                  <Picker
                    selectedValue={villageselectedItemValue}
                    onValueChange={handleItemValueChange}
                    style={{width: 200, backgroundColor: 'white', marginTop: 7}}
                    mode="dropdown">
                    {village_code.length > 0 &&
                      village_code.map(val => (
                        <Picker.Item
                          label={val.label}
                          value={val.value}
                          key={val.id}
                        />
                      ))}
                  </Picker>
                </View>

                <View style={{width: '50%'}}>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      marginTop: 10,
                      width: 301,
                      borderColor: '#303030',
                      borderWidth: 0.5,
                    }}
                    value={village_text}
                    onChangeText={onChangeVillageText}
                    right={
                      <TextInput.Icon
                        icon={'magnify'}
                        onPress={() => btnVillageSearch()}
                      />
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  padding: 5,
                  margin: 20,
                }}>
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
                  Village Code
                </Text>
                <Text
                  style={{
                    flex: 1,

                    padding: 10,
                    fontWeight: 'bold',
                  }}>
                  Village Name
                </Text>
              </View>
              <View>
                <FlatList
                  data={all_village}
                  renderItem={village_item}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>

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
                  onPress={() => hideVillageModal()}
                  mode="contained"
                  buttonColor={'#6870C3'}
                  style={{
                    borderRadius: 0,
                    width: 100,
                    marginTop: 10,
                    color: 'black',
                    marginLeft: 5,
                  }}>
                  OK
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
      </Provider>

      {/* Township  Modal */}

      <Provider>
        <Portal>
          <Modal
            dismissable={false}
            visible={modal_township_visible}
            onDismiss={hideTownshipModal}
            contentContainerStyle={containerStyle}>
            <View
              style={{backgroundColor: '#232D57', padding: 25}}
              onStartShouldSetResponder={() => hideTownshipModal()}>
              <Icon
                name="x-circle"
                size={25}
                color="#fff"
                style={{
                  marginLeft: 20,
                  position: 'absolute',
                  top: 0,
                  right: 10,
                  top: 10,
                }}
              />
            </View>
            <View style={{padding: 10, height: 550}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{marginRight: 10}}>Search Item:</Text>

                  <Picker
                    selectedValue={townshipselectedItemValue}
                    onValueChange={handleItemValueChange}
                    style={{width: 200, backgroundColor: 'white', marginTop: 7}}
                    mode="dropdown">
                    {Township_code.length > 0 &&
                      Township_code.map(val => (
                        <Picker.Item
                          label={val.label}
                          value={val.value}
                          key={val.id}
                        />
                      ))}
                  </Picker>
                </View>

                <View style={{width: '50%'}}>
                  {/* <Field
                    name={'searchtext'}
                    component={TextInputFile}
                    input_mode
                    inputmax={20}
                    icon={'magnify'}
                    handleTextInputFocus={handleSubmit(btnTownshipSearch)}
                  /> */}

                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      marginTop: 10,
                      width: 301,
                      borderColor: '#303030',
                      borderWidth: 0.5,
                    }}
                    value={township_text}
                    onChangeText={onChangeTownshipText}
                    right={
                      <TextInput.Icon
                        icon={'magnify'}
                        onPress={() => btnTownshipSearch()}
                      />
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  padding: 5,
                  margin: 20,
                }}>
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
                  Township Code
                </Text>
                <Text
                  style={{
                    flex: 1,

                    padding: 10,
                    fontWeight: 'bold',
                  }}>
                  Township Name
                </Text>
              </View>
              <View>
                <FlatList
                  data={all_township}
                  renderItem={township_item}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>

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
                  onPress={() => hideTownshipModal()}
                  mode="contained"
                  buttonColor={'#6870C3'}
                  style={{
                    borderRadius: 0,
                    width: 100,
                    marginTop: 10,
                    color: 'black',
                    marginLeft: 5,
                  }}>
                  OK
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
      </Provider>

      {/* Ward  Modal */}

      <Provider>
        <Portal>
          <Modal
            dismissable={false}
            visible={modal_ward_visible}
            onDismiss={hideWardModal}
            contentContainerStyle={containerStyle}>
            <View
              style={{backgroundColor: '#232D57', padding: 25}}
              onStartShouldSetResponder={() => hideWardModal()}>
              <Icon
                name="x-circle"
                size={25}
                color="#fff"
                style={{
                  marginLeft: 20,
                  position: 'absolute',
                  top: 0,
                  right: 10,
                  top: 10,
                }}
              />
            </View>
            <View style={{padding: 10, height: 550}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{marginRight: 10}}>Search Item:</Text>

                  <Picker
                    selectedValue={wardselectedItemValue}
                    onValueChange={handleItemValueChange}
                    style={{width: 200, backgroundColor: 'white', marginTop: 7}}
                    mode="dropdown">
                    {ward_code.length > 0 &&
                      ward_code.map(val => (
                        <Picker.Item
                          label={val.label}
                          value={val.value}
                          key={val.id}
                        />
                      ))}
                  </Picker>
                </View>

                <View style={{width: '50%'}}>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      marginTop: 10,
                      width: 301,
                      borderColor: '#303030',
                      borderWidth: 0.5,
                    }}
                    value={ward_text}
                    onChangeText={onChangeWardText}
                    right={
                      <TextInput.Icon
                        icon={'magnify'}
                        onPress={() => btnWardSearch()}
                      />
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  padding: 5,
                  margin: 20,
                }}>
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
                  Ward Code
                </Text>
                <Text
                  style={{
                    flex: 1,

                    padding: 10,
                    fontWeight: 'bold',
                  }}>
                  Ward Name
                </Text>
              </View>
              <View>
                <FlatList
                  data={all_ward}
                  renderItem={ward_item}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>

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
                  onPress={() => hideWardModal()}
                  mode="contained"
                  buttonColor={'#6870C3'}
                  style={{
                    borderRadius: 0,
                    width: 100,
                    marginTop: 10,
                    color: 'black',
                    marginLeft: 5,
                  }}>
                  OK
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
      </Provider>

      {/* location */}

      <Provider>
        <Portal>
          <Modal
            dismissable={false}
            visible={modal_location_visible}
            onDismiss={hideLocationModal}
            contentContainerStyle={containerStyle}>
            <View
              style={{backgroundColor: '#232D57', padding: 25}}
              onStartShouldSetResponder={() => hideLocationModal()}>
              <Icon
                name="x-circle"
                size={25}
                color="#fff"
                style={{
                  marginLeft: 20,
                  position: 'absolute',
                  top: 0,
                  right: 10,
                  top: 10,
                }}
              />
            </View>
            <View style={{padding: 10, height: 550}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{marginRight: 10}}>Search Item:</Text>

                  <Picker
                    selectedValue={selectedLocationItemValue}
                    onValueChange={handleLocationItemValueChange}
                    style={{width: 200, backgroundColor: 'white', marginTop: 7}}
                    mode="dropdown">
                    {location_code.length > 0 &&
                      location_code.map(val => (
                        <Picker.Item
                          label={val.label}
                          value={val.value}
                          key={val.id}
                        />
                      ))}
                  </Picker>
                </View>

                <View style={{width: '50%'}}>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      marginTop: 10,
                      width: 301,
                      borderColor: '#303030',
                      borderWidth: 0.5,
                    }}
                    value={location_text}
                    onChangeText={onChangeLocationText}
                    right={
                      <TextInput.Icon
                        icon={'magnify'}
                        onPress={() => btnLocationSearch()}
                      />
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  padding: 5,
                  margin: 20,
                }}>
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
                  Location Code
                </Text>
                <Text
                  style={{
                    flex: 1,

                    padding: 10,
                    fontWeight: 'bold',
                  }}>
                  Location Name
                </Text>
              </View>
              <View>
                <FlatList
                  data={all_location}
                  renderItem={location_item}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>

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
                  onPress={() => hideLocationModal()}
                  mode="contained"
                  buttonColor={'#6870C3'}
                  style={{
                    borderRadius: 0,
                    width: 100,
                    marginTop: 10,
                    color: 'black',
                    marginLeft: 5,
                  }}>
                  OK
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
      </Provider>
    </>
  );
}
const selector = formValueSelector('Customer_ManagementForm');

function mapStateToProps(state) {
  const nrcNo = selector(state, 'nrc_no');
  const nrc_state_code = selector(state, 'nrc_state_code');
  return {
    update_status: state.customers.update_status,
    nrcNo,
    nrc_state_code,
  };
}

export default reduxForm({
  form: 'Customer_ManagementForm',
  validate,
})(
  connect(mapStateToProps, {
    setCusFormInitialValues,
    addEmpFilter,
    setUpdateStatus,
    totalIncome,
    totalFamilyIncome,
    totalNetFamily,
    totalExpense,
    totalFamilyExpense,
    updateTotalSum,
  })(Edit_Emp_Info),
);
