import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Field, reduxForm, change} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import {
  RadioButton,
  Button,
  Modal,
  Provider,
  Portal,
  TextInput,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import DividerLine from '../../components/DividerLine';
import Icon from 'react-native-vector-icons/Feather';
import TextInputFile from '../../components/TextInputFile';
import Collapsible from 'react-native-collapsible';
import DropDownPicker from '../../components/DropDownPicker';
import {fetchNRCinfo} from '../../query/NRCinfo_query';
import Customer_Base_Info from '../CustomerManagement/Customer_Base_Info';
//   import Property_Info from './Property_Info';
import {salary_grade, city_code, Township_code, ward_code} from '../../common';
//   import Monthly_Income from './Monthly_Income';
//   import Busines_Info from './Busines_Info';
import {style} from '../../style/Customer_Mang_style';
//   import ShowNRC_Modal from './ShowNRC_Modal';
//   import validate from './Validate';
import moment from 'moment';
import {fetchEmpName} from '../../query/Employee_query';
import {setCusFormInitialValues} from '../../redux/CustomerReducer';
import {fetchAllCustomerNum} from '../../query/Customer_query';
import {emp_filter_item, village_code} from '../../common';
import {Picker} from '@react-native-picker/picker';
import {filterEmp} from '../../query/Employee_query';
import DefaultTextInput from '../../components/DefaultTextInput';
import {addEmpFilter} from '../../redux/EmployeeReducer';
import {operations} from '../../common';
import {setUpdateStatus} from '../../redux/CustomerReducer';
import CustomTextInput from '../../components/CustomTextInput';
import InputTest from '../../components/InputTest';
import Edit_Customer_BaseInfo from './Edit_Customer_BaseInfo';
import Edit_property_Info from './Edit_Property_Info';
import Edit_Business_Info from './Edit_Business_Info';
import Edit_monthly_Income from './Edit_monthly_Income';
function Customer_Management(props) {
  const dispatch = useDispatch();

  const {handleSubmit, setUpdateStatus} = props;
  const [all_emp, setAllEmp] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemValue, setSelectedItemValue] = useState('employee_name');
  const [villageselectedItemValue, setVillageSelectedValue] =
    useState('village_code');
  const [selectedValue, setSelectedValue] = useState(null);
  const [nrc_visible, setNRC_Visible] = useState(false);
  const [open_empinfo, setEmpInfo] = useState(false);
  const [show_nrc, setNRC] = useState('old');
  const [show_operation, setOperation] = useState('2');
  const [nrc_statecode, setNRCStateCode] = useState([]);
  const [nrc_prefix_code, setNRCPrefixCode] = useState([]);
  const [empname, setEmpName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
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
  const [wardselectedItemValue, setSelectedWardItemValue] =
    useState('ward_code');

  const handleItemValueChange = itemValue => {
    setSelectedItemValue(itemValue);
  };
  const onSubmit = async values => {
    let data = Object.assign(values, emp_filter_data, {
      createUserId: empname,
      residentRgstId:
        values.nrc_stateCode && values.nrc_prefix
          ? values.nrc_stateCode + values.nrc_prefix + values.nrcNo
          : '',
    });
    console.log(JSON.stringify(data));
    // await storeCustomerData(data).then(result => {
    //   if (result == 'success') {
    //     alert('Create Success');
    //     dispatch(reset('Customer_ManagementForm'));
    //     navigation.navigate('Home');
    //   }
    // });
  };
  const hideModal = () => setModalVisible(false);
  const hideVillageModal = () => setVillageCodeModalVisible(false);
  const hideTownshipModal = () => setTownshipCodeModalVisible(false);

  const hideCityModal = () => setCityCodeModalVisible(false);
  const hideWardModal = () => setWardCodeModalVisible(false);
  const filtered_cus_data = props.route.params;
  console.log('filtered_cus_data', filtered_cus_data);
  const EmpInfoFun = () => {
    setEmpInfo(!open_empinfo);
  };

  useEffect(() => {
    const test = Object.assign({}, filtered_cus_data, {
      hghschl_num: filtered_cus_data.hghschl_num.toString(),
      university_num: filtered_cus_data.university_num.toString(),
      family_num: filtered_cus_data.family_num.toString(),
      tot_prop_estmtd_val: filtered_cus_data.tot_prop_estmtd_val.toString(),
      curr_resident_perd: filtered_cus_data.curr_resident_perd.toString(),
      otr_prop_estmtd_val: filtered_cus_data.otr_prop_estmtd_val.toString(),
      workplace_period:filtered_cus_data.workplace_period.toString(),
      curr_workplace_perd:filtered_cus_data.curr_workplace_perd.toString(),
      land_scale:filtered_cus_data.land_scale.toString(),
      tot_sale_income:filtered_cus_data.tot_sale_income.toString(),
      wrkp_rent_expns:filtered_cus_data.wrkp_rent_expns && filtered_cus_data.wrkp_rent_expns.toString(),
      // rawmaterial_expans:rawmaterial_expans?filtered_cus_data.rawmaterial_expans.toString():'',
      // employee_expns:employee_expns?filtered_cus_data.employee_expns.toString():'',
      // trnsrt_expns:trnsrt_expns?filtered_cus_data.trnsrt_expns.toString():'',
      // bus_utlbil_expns:bus_utlbil_expns?filtered_cus_data.bus_utlbil_expns.toString():'',
      // tel_expns:tel_expns?filtered_cus_data.tel_expns.toString():'',
      // tax_expns:tax_expns?filtered_cus_data.tax_expns.toString():'',
      // goods_loss_expns:goods_loss_expns?filtered_cus_data.goods_loss_expns.toString():'',
      // othr_expns_1:othr_expns_1?filtered_cus_data.othr_expns_1.toString():'',
      // othr_expns_2:othr_expns_2?filtered_cus_data.othr_expns_2.toString():'',
      // fmly_tot_income:fmly_tot_income?filtered_cus_data.fmly_tot_income.toString():'',
      // fmly_tot_expense:fmly_tot_expense?filtered_cus_data.fmly_tot_expense.toString():'',
      // food_expns:food_expns?filtered_cus_data.food_expns.toString():'',
      // house_mngt_expns:house_mngt_expns?filtered_cus_data.house_mngt_expns.toString():'',
      // utlbil_expns:utlbil_expns?filtered_cus_data.utlbil_expns.toString():'',
      // edct_expns:edct_expns?filtered_cus_data.edct_expns.toString():'',
      // healthy_expns:healthy_expns?filtered_cus_data.healthy_expns.toString():'',
      // fmly_trnsrt_expns:fmly_trnsrt_expns?filtered_cus_data.fmly_trnsrt_expns.toString():'',
      // fmly_tax_expns:fmly_tax_expns?filtered_cus_data.fmly_tax_expns.toString():'',
      // finance_expns:finance_expns?filtered_cus_data.finance_expns.toString():'',
      // fmly_otr_expns:fmly_otr_expns?filtered_cus_data.fmly_otr_expns.toString():'',
    });
    props.initialize(test);
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
  const showEmplyeeSearch = () => {
    setModalVisible(true);
  };
  const showWardModal = () => {
    setWardCodeModalVisible(true);
  };

  const hideNRCModal = () => {
    setNRC_Visible(!nrc_visible), setNRC('old');
  };
  // const loadData = async () => {
  //   await fetchAllCustomerNum().then(cust_data => {
  //     dispatch(
  //       change(
  //         'Customer_ManagementForm',
  //         'CustomerNo',
  //         `TB${moment().format('YYYYMMDD')}${cust_data.length}`,
  //       ),
  //     );
  //     console.log('cust_data', cust_data.length);
  //   });
  //   await fetchNRCinfo()
  //     .then(result => {
  //       {
  //         const [nrc_state_code, nrc_prefixdata] = result;
  //         setNRCStateCode(nrc_state_code);
  //         setNRCPrefixCode(nrc_prefixdata);
  //       }
  //     })
  //     .catch(error => console.log(error));
  //   await fetchEmpName().then(emp_name => {
  //     setEmpName(emp_name[0].employee_name);
  //   });
  // };

  // useEffect(() => {
  //   loadData();
  // }, []);

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

  // useEffect(() => {
  //   const test = Object.assign({}, emp_filter_data, {
  //     // totSaleIncome: total.toString()
  //   });
  //   props.initialize(test);
  // }, [emp_filter_data]);

  const Show_NRC = newValue => {
    setNRC(newValue);
    if (newValue == 'new') {
      setNRC_Visible(true);
    }
  };

  const btnCusSearch = async values => {
    await filterEmp(selectedItemValue, values.searchtext)
      .then(data => (data.length > 0 ? setAllEmp(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const btnCitySearch = async values => {
    await filterEmp(selectedCityItemValue, values.searchtext)
      .then(data => (data.length > 0 ? setAllCity(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };
  const btnVillageSearch = async values => {
    await filterEmp(villageselectedItemValue, values.searchtext)
      .then(data => (data.length > 0 ? setAllCity(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };
  const btnTownshipSearch = async values => {
    await filterEmp(townshipselectedItemValue, values.searchtext)
      .then(data => (data.length > 0 ? setAllTownship(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const btnWardSearch = async values => {
    await filterEmp(wardselectedItemValue, values.searchtext)
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
    if (newValue == 2) {
      setUpdateStatus(false);
    } else {
      setUpdateStatus(true);
    }
  };

  console.log('filtered_cus_data', filtered_cus_data.position_title_nm);
  return (
    <>
      {/* {modalVisible ? (
          <Employee_Search visible={modalVisible} hideModal={hideModal} />
        ) : ( */}
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Text style={style.title_style}>
              Customer Information Management
            </Text>
            <DividerLine />

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
                        label={option.label}
                        value={option.value}
                        color="#000"
                        labelStyle={{marginLeft: 5}}
                      />
                    </View>
                  </RadioButton.Group>
                ))}
              </View>
              <Button
                onPress={handleSubmit(onSubmit)}
                mode="contained"
                buttonColor={'#6870C3'}
                style={style.btnStyle}>
                OK
              </Button>
            </View>
            <DividerLine />
            {/* EMployee Information */}
            <View style={style.title_emp_style}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                Employee Information
              </Text>
              <TouchableOpacity onPress={EmpInfoFun}>
                <Icon name="arrow-up" size={30} style={{marginTop: 10}} />
              </TouchableOpacity>
            </View>

            <Collapsible collapsed={open_empinfo}>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  backgroundColor: '#FAFAFA',
                }}>
                <View
                  style={{
                    padding: 5,
                    // margin: 10,
                  }}>
                  <Field
                    name={'employee_no'}
                    title={'Employee No'}
                    component={TextInputFile}
                    cus_width
                    // icon={update_status == true && 'magnify'}
                    input_mode
                    handleTextInputFocus={showEmplyeeSearch}
                    focusTextInput
                    editable
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Field
                      name={'entry_date'}
                      title={'Start Working Date at SHM'}
                      component={DefaultTextInput}
                      editable
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

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Field
                      name={'branch_code'}
                      title={'Branch'}
                      component={InputTest}
                      cus_width
                      input_mode
                      editable
                    />
                    <View style={{marginRight: 10}}>
                      <Field
                        // enabled={update_status == true ? false : true}
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
              </View>
            </Collapsible>

            <DividerLine />

            <Edit_Customer_BaseInfo
              showNrcFun={Show_NRC}
              show_nrc={show_nrc}
              nrc_statecode={nrc_statecode}
              showCitySearch={ShowCityModal}
              showVillageSearch={ShowVillageModal}
              showTownshipSearch={ShowTownshipModal}
              showWardSearch={showWardModal}
            />
            <Edit_property_Info />
            <Edit_Business_Info />
            <Edit_monthly_Income />

            <Button
              onPress={handleSubmit(onSubmit)}
              mode="contained"
              buttonColor={'#6870C3'}
              style={{
                borderRadius: 0,
                width: '90%',
                marginTop: 10,
                color: 'black',
                marginBottom: 20,
                alignSelf: 'center',
              }}>
              Submit
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      {/* )} */}

      {/* <ShowNRC_Modal
          nrc_visible={nrc_visible}
          hideNRCModal={hideNRCModal}
          nrc_statecode={nrc_statecode}
          nrc_prefix_code={nrc_prefix_code}
        /> */}
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
                  <Field
                    name={'searchtext'}
                    component={TextInputFile}
                    input_mode
                    inputmax={20}
                    icon={'magnify'}
                    handleTextInputFocus={handleSubmit(btnCusSearch)}
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
                  <Field
                    name={'searchtext'}
                    component={TextInputFile}
                    input_mode
                    inputmax={20}
                    icon={'magnify'}
                    handleTextInputFocus={handleSubmit(btnCitySearch)}
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
                  <Field
                    name={'searchtext'}
                    component={TextInputFile}
                    input_mode
                    inputmax={20}
                    icon={'magnify'}
                    handleTextInputFocus={handleSubmit(btnVillageSearch)}
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
                  <Field
                    name={'searchtext'}
                    component={TextInputFile}
                    input_mode
                    inputmax={20}
                    icon={'magnify'}
                    handleTextInputFocus={handleSubmit(btnTownshipSearch)}
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
                  <Field
                    name={'searchtext'}
                    component={TextInputFile}
                    input_mode
                    inputmax={20}
                    icon={'magnify'}
                    handleTextInputFocus={handleSubmit(btnWardSearch)}
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
    </>
  );
}

function mapStateToProps(state) {
  // console.log('>>>', state.customers.update_status);
  return {
    // update_status: state.customers.update_status,
  };
}

export default reduxForm({
  form: 'Customer_ManagementForm',
  // validate,
})(
  connect(mapStateToProps, {
    setCusFormInitialValues,
    addEmpFilter,
    setUpdateStatus,
  })(Customer_Management),
);
