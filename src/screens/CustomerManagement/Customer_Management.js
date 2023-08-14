import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
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
  TextInput,
  List,
} from 'react-native-paper';
import DividerLine from '../../components/DividerLine';
import Icon from 'react-native-vector-icons/Feather';
import TextInputFile from '../../components/TextInputFile';
import DropDownPicker from '../../components/DropDownPicker';
import {fetchNRCinfo} from '../../query/NRCinfo_query';
import Customer_Base_Info from './Customer_Base_Info';
import Property_Info from './Property_Info';
import {salary_grade} from '../../common';
import Monthly_Income from './Monthly_Income';
import Busines_Info from './Busines_Info';
import {style} from '../../style/Customer_Mang_style';
import ShowNRC_Modal from './ShowNRC_Modal';
import validate from './Validate';
import moment from 'moment';
import {setCusFormInitialValues} from '../../redux/CustomerReducer';
import {emp_filter_item, village_code} from '../../common';
import {Picker} from '@react-native-picker/picker';
import {filterEmp, fetchEmpName} from '../../query/Employee_query';
import {addEmpFilter} from '../../redux/EmployeeReducer';
import {
  storeCustomerData,
  fetchAllCustomerNum,
} from '../../query/Customer_query';
import {resetMonthlyIncome} from '../../redux/MonthlyReducer';
import DatePicker from '../../components/DatePicker';
import Create_Operation from '../../components/Create_Operation';
import {filterTownship} from '../../query/Township_query';
import City_Modal from '../../components/City_Modal';
import Township_Modal from '../../components/Township_Modal';
import Village_Modal from '../../components/Village_Modal';
import {filterVillage} from '../../query/Village_query';
import Ward_Model from '../../components/Ward_Model';
import {filterWard} from '../../query/Ward_query';
import Location_Modal from '../../components/Location_Modal';
import {filterLocation, filterCity} from '../../query/CodeInfo_quey';
function Customer_Management(props) {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    emp_filter_data,
    resetMonthlyIncome,
    nrcNo,
    nrc_prefix_code,
  } = props;
  const [all_emp, setAllEmp] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemValue, setSelectedItemValue] = useState('employee_name');
  const [selectedValue, setSelectedValue] = useState(null);
  const [nrc_visible, setNRC_Visible] = useState(false);
  const [open_empinfo, setEmpInfo] = useState(true);
  const [show_nrc, setNRC] = useState('1');
  const [show_businessdate, setBusiness] = useState('1');
  const [nrc_statecode, setNRCStateCode] = useState([]);
  const [empname, setEmpName] = useState('');
  // Villgae
  const [modal_village_visible, setVillageCodeModalVisible] = useState(false);
  const [all_village, setAllVillage] = useState([]);
  const [selected_villagevalue, setSelectedVillageValue] = useState(null);
  const [villageselectedItemValue, setVillageSelectedValue] =
    useState('village_code');
  //township
  const [modal_township_visible, setTownshipCodeModalVisible] = useState(false);
  const [all_township, setAllTownship] = useState([]);
  const [townshipselectedItemValue, setSelectedTownshipItemValue] =
    useState('ts_code');
  const [selected_tspvalue, setSelectedTspValue] = useState(null);
  //city
  const [selected_cityvalue, setSelectedCityValue] = useState(null);
  const [modal_city_visible, setCityCodeModalVisible] = useState(false);
  const [selectedCityItemValue, setSelectedCityItemValue] =
    useState('code_value');
  const [all_city, setAllCity] = useState([]);

  //Ward
  const [modal_ward_visible, setWardCodeModalVisible] = useState(false);
  const [all_ward, setAllWard] = useState([]);
  const [wardselectedItemValue, setSelectedWardItemValue] =
    useState('ward_code');
  const [selected_wardvalue, setSelectedWardValue] = useState(null);

  //location
  const [modal_location_visible, setLocationModalVisible] = useState(false);
  const [selectedLocationItemValue, setLocationSelectedItemValue] =
    useState('code_value');
  const [selected_locationvalue, setSelectedLocationValue] = useState(null);
  const [all_location, setAllLocation] = useState([]);

  const [loading, setLoading] = useState(false);
  const [emp_text, setEmpText] = useState('');
  const [village_text, setVillageText] = useState('');
  const [ward_text, setWardText] = useState('');
  const [township_text, setTownshipText] = useState('');
  const [location_text, setLocationText] = useState('');
  const [prefix, setPrefix] = useState('');
  const [btn_loading, setbtnloading] = useState(false);

  const handleLocationItemValueChange = itemValue => {
    setLocationSelectedItemValue(itemValue);
  };
  const handleItemValueChange = itemValue => {
    setSelectedItemValue(itemValue);
  };
  const handleTownshipItemValueChange = itemValue => {
    setSelectedTownshipItemValue(itemValue);
  };
  const handleCityItemValueChange = itemValue => {
    setSelectedCityItemValue(itemValue);
  };
  const onSubmit = async values => {
    setbtnloading(!btn_loading);
    let data = Object.assign(values, emp_filter_data, {
      createUserId: empname,
      nrc_state_code: values.nrc_type == '2' ? prefix : '',
      // resident_rgst_id:
      //   values.nrc_type == '1' ? values.nrcNo : values.resident_rgst_id,
      start_living_date_status: show_businessdate,
    });
    console.log('customer data', data);
    await storeCustomerData(data).then(result => {
      if (result == 'success') {
        setbtnloading(!btn_loading);

        dispatch(reset('Customer_ManagementForm'));
        resetMonthlyIncome();

        ToastAndroid.show(`Create Successfully!`, ToastAndroid.SHORT);
        props.navigation.navigate('Home');
        // props.navigation.navigate('Customer Search');
      } else {
        setbtnloading(!btn_loading);
      }
    });
  };
  const hideModal = () => setModalVisible(false);
  const hideVillageModal = () => setVillageCodeModalVisible(false);
  const hideTownshipModal = () => setTownshipCodeModalVisible(false);
  const hideLocationModal = () => setLocationModalVisible(false);

  const hideCityModal = () => setCityCodeModalVisible(false);
  const hideWardModal = () => setWardCodeModalVisible(false);
  const [city_text, set_cityText] = useState('');

  const onChangeCityText = inputText => {
    set_cityText(inputText);
  };

  const city_item = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 15,
        }}>
        <Text
          style={{
            padding: 10,
            flex: 0.5,
          }}>
          {index + 1}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
            marginLeft: 10,
          }}>
          {item.code_value}
        </Text>
        <Text
          style={{
            padding: 8,
            flex: 1,
            marginLeft: 10,
          }}>
          {item.code_short_desc}
        </Text>

        <View>
          <RadioButton
            value={item.city_code}
            status={
              selected_cityvalue === item.code_value ? 'checked' : 'unchecked'
            }
            onPress={() => btnSelectCity(item)}
          />
        </View>
      </View>
    );
  };
  const village_item = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 15,
        }}>
        <Text
          style={{
            padding: 10,
            flex: 0.5,
          }}>
          {index + 1}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
            marginLeft: 10,
          }}>
          {item.village_code}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
            marginLeft: 10,
          }}>
          {item.village_name}
        </Text>

        <View>
          <RadioButton
            value={item.village_code}
            status={
              selected_villagevalue === item.village_code
                ? 'checked'
                : 'unchecked'
            }
            onPress={() => btnSelectVillage(item)}
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
          padding: 15,
        }}>
        <Text
          style={{
            padding: 10,
            flex: 0.5,
          }}>
          {index + 1}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
            marginLeft: 10,
          }}>
          {item.ward_code}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
            marginLeft: 10,
          }}>
          {item.ward_name}
        </Text>

        <View>
          <RadioButton
            value={item.ward_code}
            status={
              selected_wardvalue === item.ward_code ? 'checked' : 'unchecked'
            }
            onPress={() => btnSelectWard(item)}
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
          padding: 15,
        }}>
        <Text
          style={{
            padding: 10,
            flex: 0.5,
          }}>
          {index + 1}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
            marginLeft: 10,
          }}>
          {item.ts_code}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
            marginLeft: 10,
          }}>
          {item.ts_name}
        </Text>

        <View>
          <RadioButton
            value={item.ts_code}
            status={
              selected_tspvalue === item.ts_code ? 'checked' : 'unchecked'
            }
            onPress={() => btnSelectTownship(item)}
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
          {item.code_value}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.code_short_desc}
        </Text>

        <View>
          <RadioButton
            value={item.code_value}
            status={
              selected_locationvalue === item.code_value
                ? 'checked'
                : 'unchecked'
            }
            onPress={() => btnSelectLocation(item)}
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
    const state_code = prefix.substring(0, indexOfSlash + 1);
    setNRC_Visible(!nrc_visible), setNRC(show_nrc);
    dispatch(
      change(
        'Customer_ManagementForm',
        'resident_rgst_id',
        prefix &&
          nrc_prefix_code &&
          nrcNo &&
          state_code + nrc_prefix_code + nrcNo,
      ),
    );
  };

  const btnCancel = () => {
    setNRC_Visible(!nrc_visible);
  };
  const loadData = async () => {
    await fetchAllCustomerNum().then(cust_data => {
      dispatch(
        change(
          'Customer_ManagementForm',
          'CustomerNo',
          `TB${moment().format('YYYYMMDD')}${cust_data.length + 1}`,
        ),
      );
    });
    await fetchNRCinfo()
      .then(result => {
        {
          const [nrc_state_code] = result;
          setNRCStateCode(nrc_state_code);
        }
      })
      .catch(error => console.log(error));
    await fetchEmpName().then(emp_name => {
      setEmpName(emp_name[0].employee_name);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const btnSelectEmployee = item => {
    setSelectedValue(item.employee_no);
    dispatch(change('Customer_ManagementForm', 'branchCode', item.branch_code));
    dispatch(change('Customer_ManagementForm', 'employeeNo', item.employee_no));
    dispatch(change('Customer_ManagementForm', 'entryDate', item.entry_date));
    dispatch(
      change(
        'Customer_ManagementForm',
        'positionTitleNm',
        item.position_title_nm,
      ),
    );
    dispatch(
      change('Customer_ManagementForm', 'employeeName', item.employee_name),
    );
  };

  const btnSelectCity = item => {
    setSelectedCityValue(item.code_value);
    setSelectedTspValue(null); //selected Township value
    setSelectedVillageValue(null);
    setAllTownship([]);
    setAllVillage([]);
    dispatch(change('Customer_ManagementForm', 'city_code', item.code_value));
    dispatch(
      change('Customer_ManagementForm', 'city_name', item.code_short_desc),
    );
    dispatch(change('Customer_ManagementForm', 'ts_code', ''));
    dispatch(change('Customer_ManagementForm', 'ts_name', ''));
    dispatch(change('Customer_ManagementForm', 'village_code', ''));
    dispatch(change('Customer_ManagementForm', 'village_name', ''));
    dispatch(change('Customer_ManagementForm', 'ward_code', ''));
    dispatch(change('Customer_ManagementForm', 'ward_name', ''));
  };

  const btnSelectTownship = item => {
    setSelectedTspValue(item.ts_code);
    setSelectedVillageValue(null);
    setAllVillage([]);
    setAllWard([]);
    dispatch(change('Customer_ManagementForm', 'ts_code', item.ts_code));
    dispatch(change('Customer_ManagementForm', 'ts_name', item.ts_name));
    dispatch(change('Customer_ManagementForm', 'village_code', ''));
    dispatch(change('Customer_ManagementForm', 'village_name', ''));
    dispatch(change('Customer_ManagementForm', 'ward_code', ''));
    dispatch(change('Customer_ManagementForm', 'ward_name', ''));
  };

  const btnSelectVillage = item => {
    setSelectedVillageValue(item.village_code);
    dispatch(
      change('Customer_ManagementForm', 'village_code', item.village_code),
    );
    dispatch(
      change('Customer_ManagementForm', 'village_name', item.village_name),
    );
  };
  const btnSelectWard = item => {
    setSelectedWardValue(item.ward_code);
    dispatch(change('Customer_ManagementForm', 'ward_code', item.ward_code));
    dispatch(change('Customer_ManagementForm', 'ward_name', item.ward_name));
  };
  const btnSelectLocation = item => {
    setSelectedLocationValue(item.code_value);
    dispatch(
      change('Customer_ManagementForm', 'location_code', item.code_value),
    );
    dispatch(
      change('Customer_ManagementForm', 'location_name', item.code_short_desc),
    );
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
  const showLocationSearch = () => {
    setLocationModalVisible(true);
  };

  const Show_NRC = newValue => {
    setNRC(newValue);
    if (newValue == '2') {
      setNRC_Visible(true);
    }
  };

  const btnCusSearch = async () => {
    setLoading(!loading);
    await filterEmp(selectedItemValue, emp_text)
      .then(data => {
        if (data.length > 0) {
          setAllEmp(data);
        } else {
          setAllEmp(data);
          alert('No data');
        }
        setLoading(false);
      })
      .catch(error => {
        alert('Something Wrong');
        setAllEmp([]);
        setLoading(false);
      });
  };

  const btnCitySearch = async () => {
    setLoading(!loading);
    await filterCity(selectedCityItemValue, city_text)
      .then(data => {
        if (data.length > 0) {
          setAllCity(data);
        } else {
          setAllCity(data);
          alert('No data');
        }
        setLoading(false);
      })
      .catch(error => {
        alert('Something Wrong');
        setAllCity([]);
        setLoading(false);
      });
  };
  const btnLocationSearch = async () => {
    await filterLocation(selectedLocationItemValue, location_text)
      .then(data => {
        if (data.length > 0) {
          setAllLocation(data);
        } else {
          setAllLocation(data);
          alert('No data');
        }
        setLoading(false);
      })
      .catch(error => {
        alert('Something Wrong');
        setAllLocation([]);
        setLoading(false);
      });
  };
  const btnVillageSearch = async () => {
    await filterVillage(
      villageselectedItemValue,
      village_text,
      selected_tspvalue,
    )
      .then(data => {
        if (data.length > 0) {
          setAllVillage(data);
        } else {
          setAllVillage(data);
          alert('No data');
        }
        setLoading(false);
      })
      .catch(error => {
        alert('Something Wrong');
        setAllVillage([]);
        setLoading(false);
      });
  };
  const btnTownshipSearch = async () => {
    setLoading(!loading);
    await filterTownship(
      townshipselectedItemValue,
      township_text,
      selected_cityvalue,
    )
      .then(data => {
        if (data.length > 0) {
          setAllTownship(data);
        } else {
          setAllTownship(data);
          alert('No data');
        }
        setLoading(false);
      })
      .catch(error => {
        alert('Something Wrong');
        setAllTownship([]);
        setLoading(false);
      });
  };

  const btnWardSearch = async () => {
    await filterWard(wardselectedItemValue, ward_text, selected_tspvalue)
      .then(data => {
        if (data.length > 0) {
          setAllWard(data);
        } else {
          setAllWard(data);
          alert('No data');
        }
        setLoading(false);
      })
      .catch(error => {
        alert('Something Wrong');
        setAllWard([]);
        setLoading(false);
      });
  };

  const handleStartLivingStatus = (value, input) => {
    setBusiness(value.id);
    input.onChange(value.id);
  };

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
  const handleEmpToggle = () => {
    setEmpInfo(!open_empinfo);
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
            <Create_Operation
              handleSubmit={handleSubmit(onSubmit)}
              btn_loading={btn_loading}
            />

            <DividerLine border_width />
            {/* EMployee Information */}

            <List.Accordion
              expanded={open_empinfo}
              onPress={handleEmpToggle}
              style={style.list_container}
              titleStyle={style.list_title}
              title=" Employee Information">
              <View style={style.sub_container}>
                <View style={style.sub_list_container}>
                  <Field
                    name={'employeeNo'}
                    title={'Employee No'}
                    component={TextInputFile}
                    cus_width
                    icon={'magnify'}
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
                    icon={'calendar'}
                  />

                  <View style={{marginRight: 10}}>
                    <Field
                      name={'positionTitleNm'}
                      title={'Current Position'}
                      component={TextInputFile}
                      editable
                    />
                  </View>
                </View>
                <View style={style.sub_list_container}>
                  <Field
                    name={'branchCode'}
                    title={'Branch'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                  />
                  <View style={{marginRight: 10}}>
                    <Field
                      data={salary_grade}
                      name={'salaryRatingCode'}
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

            <Customer_Base_Info
              showNrcFun={Show_NRC}
              show_nrc={show_nrc}
              nrc_statecode={nrc_statecode}
              showCitySearch={ShowCityModal}
              showVillageSearch={ShowVillageModal}
              showTownshipSearch={ShowTownshipModal}
              showWardSearch={showWardModal}
              handleStartLivingStatus={handleStartLivingStatus}
              show_businessdate={show_businessdate}
              showLocationSearch={showLocationSearch}
            />
            <Property_Info />
            <Busines_Info />
            <Monthly_Income />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      <ShowNRC_Modal
        nrc_visible={nrc_visible}
        hideNRCModal={hideNRCModal}
        nrc_statecode={nrc_statecode}
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
                  <Text style={{marginRight: 10, fontWeight: 'bold'}}>
                    Search Item:
                  </Text>

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
              {loading ? ( // Show ActivityIndicator while loading is true
                <ActivityIndicator size="large" color="#636Dc6" />
              ) : (
                <>
                  <FlatList
                    data={all_emp}
                    renderItem={item}
                    keyExtractor={(item, index) => index.toString()}
                  />

                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
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
                </>
              )}
            </View>
          </Modal>
        </Portal>
      </Provider>

      {/* City Modal */}
      <City_Modal
        modal_city_visible={modal_city_visible}
        hideCityModal={hideCityModal}
        selectedItemValue={selectedItemValue}
        handleCityItemValueChange={handleCityItemValueChange}
        selected_cityvalue={selected_cityvalue}
        btnCitySearch={btnCitySearch}
        city_text={city_text}
        onChangeCityText={onChangeCityText}
        loading={loading}
        all_city={all_city}
        city_items={city_item}
        selectedCityItemValue={selectedCityItemValue}
      />

      <Township_Modal
        all_township={all_township}
        loading={loading}
        btnTownshipSearch={btnTownshipSearch}
        onChangeTownshipText={onChangeTownshipText}
        township_text={township_text}
        hideTownshipModal={hideTownshipModal}
        modal_township_visible={modal_township_visible}
        townshipselectedItemValue={townshipselectedItemValue}
        township_item={township_item}
        handleTownshipItemValueChange={handleTownshipItemValueChange}
      />

      <Village_Modal
        village_item={village_item}
        btnVillageSearch={btnVillageSearch}
        onChangeVillageText={onChangeVillageText}
        village_text={village_text}
        modal_village_visible={modal_village_visible}
        hideVillageModal={hideVillageModal}
        villageselectedItemValue={villageselectedItemValue}
        all_village={all_village}
        setVillageSelectedValue={setVillageSelectedValue}
      />

      <Ward_Model
        all_ward={all_ward}
        ward_item={ward_item}
        btnWardSearch={btnWardSearch}
        ward_text={ward_text}
        onChangeWardText={onChangeWardText}
        modal_ward_visible={modal_ward_visible}
        hideWardModal={hideWardModal}
        wardselectedItemValue={wardselectedItemValue}
        handleItemValueChange={handleItemValueChange}
        setSelectedWardItemValue={setSelectedWardItemValue}
        loading={loading}
      />
      <Location_Modal
        location_item={location_item}
        btnLocationSearch={btnLocationSearch}
        location_text={location_text}
        modal_location_visible={modal_location_visible}
        hideLocationModal={hideLocationModal}
        selectedLocationItemValue={selectedLocationItemValue}
        handleLocationItemValueChange={handleLocationItemValueChange}
        onChangeLocationText={onChangeLocationText}
        all_location={all_location}
        setLocationSelectedItemValue={setLocationSelectedItemValue}
      />
    </>
  );
}
const selector = formValueSelector('Customer_ManagementForm');

function mapStateToProps(state) {
  const nrcNo = selector(state, 'nrcNo');
  const nrc_prefix_code = selector(state, 'nrc_prefix_code');
  return {
    nrcNo,
    nrc_prefix_code,
  };
}

export default reduxForm({
  form: 'Customer_ManagementForm',
  validate,
})(
  connect(mapStateToProps, {
    setCusFormInitialValues,
    addEmpFilter,
    resetMonthlyIncome,
  })(Customer_Management),
);
