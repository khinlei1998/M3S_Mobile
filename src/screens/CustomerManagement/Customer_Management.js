import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
  ToastAndroid,
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
import Collapsible from 'react-native-collapsible';
import DropDownPicker from '../../components/DropDownPicker';
import {fetchNRCinfo} from '../../query/NRCinfo_query';
import Customer_Base_Info from './Customer_Base_Info';
import Property_Info from './Property_Info';
import {
  salary_grade,
  city_code,
  Township_code,
  ward_code,
  location_code,
  operations,
} from '../../common';
import Monthly_Income from './Monthly_Income';
import Busines_Info from './Busines_Info';
import {style} from '../../style/Customer_Mang_style';
import ShowNRC_Modal from './ShowNRC_Modal';
import validate from './Validate';
import moment from 'moment';
import {fetchEmpName} from '../../query/Employee_query';
import {setCusFormInitialValues} from '../../redux/CustomerReducer';
import {fetchAllCustomerNum} from '../../query/Customer_query';
import {emp_filter_item, village_code} from '../../common';
import {Picker} from '@react-native-picker/picker';
import {filterEmp} from '../../query/Employee_query';
import {addEmpFilter} from '../../redux/EmployeeReducer';
import {storeCustomerData} from '../../query/Customer_query';
import {resetMonthlyIncome} from '../../redux/MonthlyReducer';
import DatePicker from '../../components/DatePicker';
function Customer_Management(props) {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    emp_filter_data,
    resetMonthlyIncome,
    nrcNo,
    nrc_state_code,
  } = props;
  const [all_emp, setAllEmp] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemValue, setSelectedItemValue] = useState('employee_name');

  const [villageselectedItemValue, setVillageSelectedValue] =
    useState('village_code');
  const [selectedValue, setSelectedValue] = useState(null);
  const [nrc_visible, setNRC_Visible] = useState(false);
  const [open_empinfo, setEmpInfo] = useState(true);
  const [show_nrc, setNRC] = useState('1');
  const [show_operation, setOperation] = useState('1');
  const [show_businessdate, setBusiness] = useState('1');
  const [nrc_statecode, setNRCStateCode] = useState([]);
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
  const [all_location, setAllLocation] = useState([]);

  //Ward
  const [modal_ward_visible, setWardCodeModalVisible] = useState(false);
  const [all_ward, setAllWard] = useState([]);
  const [wardselectedItemValue, setSelectedWardItemValue] =
    useState('ward_code');

  //location
  const [modal_location_visible, setLocationModalVisible] = useState(false);
  const [selectedLocationItemValue, setLocationSelectedItemValue] =
    useState('location_code');
  const [emp_text, setEmpText] = useState('');
  const [village_text, setVillageText] = useState('');
  const [ward_text, setWardText] = useState('');
  const [township_text, setTownshipText] = useState('');
  const [location_text, setLocationText] = useState('');
  const [prefix, setPrefix] = useState('');

  const handleLocationItemValueChange = itemValue => {
    setLocationSelectedItemValue(itemValue);
  };
  const handleItemValueChange = itemValue => {
    setSelectedItemValue(itemValue);
  };
  const handleTownshipItemValueChange = itemValue => {
    setSelectedItemValue(itemValue);
  };
  const onSubmit = async values => {
    let data = Object.assign(values, emp_filter_data, {
      createUserId: empname,
      nrc_prefix_code: values.nrc_type == '2' ? prefix : '',
      resident_rgst_id:
        values.nrc_type == '1' ? values.nrcNo : values.resident_rgst_id,
      start_living_date_status: show_businessdate,
    });
    await storeCustomerData(data).then(result => {
      if (result == 'success') {
        // dispatch(reset('Customer_ManagementForm'));
        resetMonthlyIncome();

        ToastAndroid.show(`Create Successfully!`, ToastAndroid.SHORT);
        props.navigation.navigate('Home');
        // props.navigation.navigate('Customer Search');
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
    console.log('prefix', prefix);
    setNRC_Visible(!nrc_visible), setNRC(show_nrc);
    dispatch(
      change(
        'Customer_ManagementForm',
        'resident_rgst_id',
        prefix &&
          nrc_state_code &&
          nrcNo &&
          prefix_code + nrc_state_code + nrcNo,
        // prefix
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
    await filterEmp(selectedItemValue, emp_text)
      .then(data => (data.length > 0 ? setAllEmp(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const btnCitySearch = async () => {
    await filterEmp(selectedCityItemValue, city_text)
      .then(data => (data.length > 0 ? setAllCity(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };
  const btnLocationSearch = async () => {
    await filterEmp(selectedLocationItemValue, location_text)
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

            <View style={style.continer}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {operations.map((option, index) => (
                  <RadioButton.Group
                    key={index}
                    onValueChange={newValue => setOperation(newValue)}
                    value={show_operation}>
                    <View
                      key={option.value}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <RadioButton.Item
                        uncheckedColor="#636Dc6"
                        disabled={option.value !== show_operation}
                        label={option.label}
                        value={option.value}
                        color="#636Dc6"
                        labelStyle={{marginLeft: 5}}
                        // uncheckedColor="red" // Color for the disabled radio button
                      />
                    </View>
                  </RadioButton.Group>
                ))}
              </View>
              <Button
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
        nrc_prefix_code={nrc_prefix_code}
        setNRCPrefixCode={setNRCPrefixCode}
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
              {/* <ViewEmployee emp_data={all_emp} hideModal={hideModal} /> */}
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
                  // scrollEnabled={false}

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
  const nrcNo = selector(state, 'nrcNo');
  const nrc_state_code = selector(state, 'nrc_state_code');
  return {
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
    resetMonthlyIncome,
  })(Customer_Management),
);
