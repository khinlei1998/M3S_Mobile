import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Field, reduxForm, change, reset, formValueSelector } from 'redux-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect, useDispatch } from 'react-redux';
import {
  RadioButton,
  List,
} from 'react-native-paper';
import DividerLine from '../../components/DividerLine';
import TextInputFile from '../../components/TextInputFile';
import DropDownPicker from '../../components/DropDownPicker';
import { fetchNRCinfo } from '../../query/NRCinfo_query';
import { salary_grade } from '../../common';
import { style } from '../../style/Customer_Mang_style';
import { setCusFormInitialValues } from '../../redux/CustomerReducer';
import { filterEmp } from '../../query/Employee_query';
import { addEmpFilter } from '../../redux/EmployeeReducer';
import { operations } from '../../common';
import { setUpdateStatus } from '../../redux/CustomerReducer';
import Edit_Customer_BaseInfo from './Edit_Customer_BaseInfo';
import Edit_property_Info from './Edit_Property_Info';
import Edit_Business_Info from './Edit_Business_Info';
import Edit_Monthly_Income from './Edit_Monthly_Income';
import { deleteCustomer_ByID } from '../../query/Customer_query';
import Edit_NRC_Modal from './Edit_NRC_Modal';
import City_Modal from '../../components/City_Modal';
import { filterCity } from '../../query/CodeInfo_quey';
import {
  totalIncome,
  totalFamilyIncome,
  totalNetFamily,
  totalExpense,
  totalFamilyExpense,
  updateTotalSum,
} from '../../redux/MonthlyReducer';
import { updateCustomerData } from '../../query/Customer_query';
import { checkDataExists } from '../../query/Customer_query';
import DatePicker from '../../components/DatePicker';
import Village_Modal from '../../components/Village_Modal';
import Township_Modal from '../../components/Township_Modal';
import Ward_Model from '../../components/Ward_Model';
import validate from './validate';
import Location_Modal from '../../components/Location_Modal';
import { filterTownship } from '../../query/Township_query';
import { filterLocation } from '../../query/CodeInfo_quey';
import { filterWard } from '../../query/Ward_query';
import { filterVillage } from '../../query/Village_query';
import { fetchCityName } from '../../query/CodeInfo_quey';
import { fetchTownshipName } from '../../query/Township_query';
import { fetchVillageName } from '../../query/Village_query';
import { fetchWardName } from '../../query/Ward_query';
import { fetchLocationName } from '../../query/CodeInfo_quey';
import { useTranslation } from 'react-i18next';
import Employee_Modal from '../../components/Employee_Modal';
import Update_Operation from '../../components/Update_Operation';
function Edit_Emp_Info(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    handleSubmit,
    setUpdateStatus,
    update_status,
    emp_filter_data,
    totalIncome,
    totalFamilyIncome,
    totalExpense,
    totalFamilyExpense,
    updateTotalSum,
    nrcNo,
    nrc_prefix_code,
  } = props;
  const [all_emp, setAllEmp] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [show_businessdate, setBusiness] = useState('1');
  const [show_village, setVillage] = useState('1');
  const [show_business_date, setBusinessStartDate] = useState('1');
  const [selectedValue, setSelectedValue] = useState(null);
  const [nrc_visible, setNRC_Visible] = useState(false);
  const [open_empinfo, setEmpInfo] = useState(true);
  const [show_nrc, setNRC] = useState('1');
  const [show_operation, setOperation] = useState('2');
  const [nrc_statecode, setNRCStateCode] = useState([]);
  const [empname, setEmpName] = useState('');
  const [show_businessdate_per, setBusinessPer] = useState('1');
  const [selectedItemValue, setSelectedItemValue] = useState('employee_name');

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
  const handleCityItemValueChange = itemValue => {
    setSelectedCityItemValue(itemValue);
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
    setSelectedCityValue(filtered_cus_data.city_code);
    setSelectedTspValue(filtered_cus_data.ts_code);
  }, []);

  useEffect(() => {
    loadData();
    return () => {
      setOperation('2');
      setUpdateStatus(false);
    };
  }, []);


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

  const city_item = ({ item, index }) => {
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
  const ward_item = ({ item, index }) => {
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

  const township_item = ({ item, index }) => {
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
  const location_item = ({ item, index }) => {
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
  const loadData = async () => {
    await fetchNRCinfo()
      .then(result => {
        {
          const [nrc_state_code] = result;
          setNRCStateCode(nrc_state_code);
        }
      })
      .catch(error => console.log(error));

    if (filtered_cus_data.city_code) {
      await fetchCityName(filtered_cus_data.city_code)
        .then(result => {
          {
            if (result.length > 0) {
              dispatch(
                change(
                  'Customer_ManagementForm',
                  'city_name',
                  result[0].code_short_desc,
                ),
              );
            }
          }
        })
        .catch(error => console.log(error));
    }
    if (filtered_cus_data.ts_code) {
      await fetchTownshipName(filtered_cus_data.ts_code)
        .then(result => {
          {
            if (result.length > 0) {
              dispatch(
                change('Customer_ManagementForm', 'ts_name', result[0].ts_name),
              );
            }
          }
        })
        .catch(error => console.log(error));
    }
    if (filtered_cus_data.village_code) {
      await fetchVillageName(filtered_cus_data.village_code)
        .then(result => {
          {
            if (result.length > 0) {
              dispatch(
                change(
                  'Customer_ManagementForm',
                  'village_name',
                  result[0].village_name,
                ),
              );
            }
          }
        })
        .catch(error => console.log(error));
    }
    if (filtered_cus_data.ward_code) {
      await fetchWardName(filtered_cus_data.ward_code)
        .then(result => {
          {
            if (result.length > 0) {
              dispatch(
                change(
                  'Customer_ManagementForm',
                  'ward_name',
                  result[0].ward_name,
                ),
              );
            }
          }
        })
        .catch(error => console.log(error));
    }
    if (filtered_cus_data.location_code) {
      await fetchLocationName(filtered_cus_data.location_code)
        .then(result => {
          {
            if (result.length > 0) {
              dispatch(
                change(
                  'Customer_ManagementForm',
                  'location_name',
                  result[0].code_short_desc,
                ),
              );
            }
          }
        })
        .catch(error => console.log(error));
    }
  };


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
  };

  const item = ({ item, index }) => {
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
  const btnVillageSearch = async () => {
    setLoading(!loading);
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
  const handleTownshipItemValueChange = itemValue => {
    setSelectedTownshipItemValue(itemValue);
  };

  const village_item = ({ item, index }) => {
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
  const btnChangeOperation = async (newValue, cus_data) => {
    const user_id = await AsyncStorage.getItem('user_id');

    if (cus_data.create_user_id !== user_id) {
      alert('You are not allowed to delete other LO’s customer information.Please contact Admin for further support');
    } else {
      setOperation(newValue);
      if (newValue == 2 || newValue == 4) {
        setUpdateStatus(false);
      } else {
        setUpdateStatus(true);
      }
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
    setLoading(false);

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
  const btnCancel = () => {
    setNRC_Visible(!nrc_visible);
    setNRC('1'); //if not choose new nrc
  };
  const handleLocationItemValueChange = itemValue => {
    setLocationSelectedItemValue(itemValue);
  };

  const onSubmit = async values => {
    try {
      if (show_operation == '4') {
        await deleteCustomer_ByID(values.id).then(response => {
          if (response == 'success') {
            alert('Customer deleted successfully.');
            setUpdateStatus(false);
            props.navigation.navigate('Home');
          }
        });
      } else {
        let data = Object.assign(values, emp_filter_data, {
          createUserId: empname,
          nrc_state_code: values.nrc_type == '2' ? prefix : '',
        });
        if (filtered_cus_data.resident_rgst_id != data.resident_rgst_id) {
          //if not same old nrc and new nrc
          const check_nrc = await checkDataExists(data.resident_rgst_id);
          if (check_nrc == true) {
            alert('NRC No already exist');
          } else {
            await updateCustomerData(data).then(result => {
              if (result == 'success') {
                alert('Customer updated successfully.');
                setUpdateStatus(false);
                dispatch(reset('Customer_ManagementForm'));
                props.navigation.navigate('Home');
              }
            });
          }
        } else {
          await updateCustomerData(data).then(result => {
            if (result == 'success') {
              alert('Customer updated successfully.');
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
  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Text style={style.title_style}>
              {t('Customer Information Management')}
            </Text>
            <DividerLine border_width />
            <Update_Operation btnChangeOperation={btnChangeOperation}
              show_operation={show_operation} filtered_cus_data={filtered_cus_data}
              update_status={update_status} handleSubmit={handleSubmit(onSubmit)} />

            <DividerLine border_width />
            {/* EMployee Information */}

            <List.Accordion
              expanded={open_empinfo}
              onPress={setEmpInfo}
              style={style.list_container}
              titleStyle={style.list_title}
              title={t("Employee Information")}>
              <View style={style.sub_container}>
                <View style={style.sub_list_container}>
                  <Field
                    name={'employee_no'}
                    title={t('Employee No')}
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
                    label={t('Start Working Date at SHM')}
                    icon={update_status == true && 'calendar'}
                    editable={update_status == true ? false : true}
                  />
                  <View style={{ marginRight: 10 }}>
                    <Field
                      name={'position_title_nm'}
                      title={t('Current Position')}
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
                  <View style={{ marginRight: 10 }}>
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

      <Employee_Modal all_emp={all_emp} loading={loading}
        btnCusSearch={btnCusSearch} modalVisible={modalVisible}
        hideModal={hideModal} selectedItemValue={selectedItemValue}
        handleItemValueChange={handleItemValueChange}
        emp_text={emp_text} onChangeEmpText={onChangeEmpText} item={item} />

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

      {/* Village  Modal */}

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
      {/* Township  Modal */}

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
  const nrcNo = selector(state, 'nrc_no');
  const nrc_prefix_code = selector(state, 'nrc_prefix_code');
  return {
    update_status: state.customers.update_status,
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
    setUpdateStatus,
    totalIncome,
    totalFamilyIncome,
    totalNetFamily,
    totalExpense,
    totalFamilyExpense,
    updateTotalSum,
  })(Edit_Emp_Info),
);
