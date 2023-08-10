import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect, useRef, createRef} from 'react';
import DividerLine from '../../components/DividerLine';
import {style} from '../../style/Individual_Loan_style';
import {
  operations,
} from '../../common';
import RNFS from 'react-native-fs';
import {
  RadioButton,
  Button,
  List,
  Modal,
  Provider,
  Portal,
} from 'react-native-paper';
import {reduxForm, Field, change, reset} from 'redux-form';
import {connect, useDispatch} from 'react-redux';
import TextInputFile from '../../components/TextInputFile';
import DropDownPicker from '../../components/DropDownPicker';
import DatePicker from '../../components/DatePicker';
import {Picker} from '@react-native-picker/picker';
import {getAllLoan} from '../../query/AllLoan_query';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Borrower_Info from './Borrower_Info';
import Icon from 'react-native-vector-icons/Feather';
import {filterCustomer} from '../../query/Customer_query';
import Co_Borrower_Info from './Co_Borrower_Info';
import Loan_Business_Info from './Loan_Business_Info';
import Borrower_Monthly_Income from './Borrower_Monthly_Income';
import {getAllLoanMax} from '../../query/LoanMax_query';
import Borrower_Current_Map from './Borrower_Current_Map';
import Borrower_Contract from './Borrower_Contract';
import Borrower_Sign from './Borrower_Sign';
import SignatureCapture from 'react-native-signature-capture';
import {storeLoanData} from '../../query/AllLoan_query';
import validate from './Validate';
import {TextInput} from 'react-native-paper';
import {resetMonthlyIncome} from '../../redux/MonthlyReducer';
import {
  cus_filter_item,
  sav_product_type,
  interest_rate,
  loan_type,
} from '../../common';
import {setBorrowerMap_Path} from '../../redux/LoanReducer';
import {RenderBottomSheet} from '../../components/RenderBotttomSheet';
import {addCustomerInfo} from '../../redux/CustomerReducer';
import {
  totalFamilyExpense,
  totalIncome,
  totalExpense,
  totalFamilyIncome,
} from '../../redux/MonthlyReducer';
import City_Modal from '../../components/City_Modal';
import Village_Modal from '../../components/Village_Modal';
import Ward_Model from '../../components/Ward_Model';
import Township_Modal from '../../components/Township_Modal';
import {filterCity, filterLocation} from '../../query/CodeInfo_quey';
import { filterTownship } from '../../query/Township_query';
import { filterVillage } from '../../query/Village_query';
import Location_Modal from '../../components/Location_Modal';
import { filterWard } from '../../query/Ward_query';
const Borrower_modal = props => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(null);
  const [emp_data, setEmpData] = React.useState('');

  const {
    all_cus,
    modalVisible,
    hideModal,
    selectedItemValue,
    handleItemValueChange,
    setAllCus,
    change,
    totalIncome,
    totalExpense,
    totalFamilyIncome,
    totalFamilyExpense,
    addCustomerInfo,
  } = props;

  const onChangeEmpText = inputText => {
    setEmpData(inputText);
  };

  const btnCusSearch = async () => {
    await filterCustomer(selectedItemValue, emp_data)
      .then(data => (data.length > 0 ? setAllCus(data) : alert('No data')))
      .catch(error => console.log('error', error));
  };

  const btnSelectEmployee = item => {
    addCustomerInfo(item); //to calculate income
    setSelectedValue(item.id);
    //Borrower info
    dispatch(change('Individual_Loan_Form', 'borrower_name', item.customer_nm));
    dispatch(
      change('Individual_Loan_Form', 'resident_rgst_id', item.resident_rgst_id),
    );
    dispatch(change('Individual_Loan_Form', 'customer_no', item.customer_no));
    dispatch(
      change('Individual_Loan_Form', 'saving_acct_num', item.saving_acct_num),
    );
    dispatch(change('Individual_Loan_Form', 'tel_no', item.tel_no));
    dispatch(change('Individual_Loan_Form', 'gender', item.gender));
    dispatch(change('Individual_Loan_Form', 'birth_date', item.birth_date));
    dispatch(
      change('Individual_Loan_Form', 'marital_status', item.marital_status),
    );
    dispatch(change('Individual_Loan_Form', 'address_type', item.address_type));
    dispatch(change('Individual_Loan_Form', 'addr', item.addr));
    dispatch(
      change(
        'Individual_Loan_Form',
        'curr_resident_date',
        item.curr_resident_date,
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'family_num',
        item.family_num ? item.family_num.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'hghschl_num',
        item.hghschl_num ? item.hghschl_num.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'university_num',
        item.university_num ? item.university_num.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'house_ocpn_type',
        item.house_ocpn_type ? item.house_ocpn_type.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'business_own_type',
        item.business_own_type,
      ),
    );
    //business info

    dispatch(
      change('Individual_Loan_Form', 'workplace_name', item.workplace_name),
    );
    dispatch(
      change('Individual_Loan_Form', 'workplace_type', item.workplace_type),
    );
    dispatch(
      change('Individual_Loan_Form', 'workplace_date', item.workplace_date),
    );
    dispatch(change('Individual_Loan_Form', 'employee_num', item.employee_num));

    dispatch(
      change('Individual_Loan_Form', 'workplace_addr', item.workplace_addr),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'curr_workplace_date',
        item.curr_workplace_date,
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'business_sttn_flg',
        item.business_sttn_flg,
      ),
    );
    dispatch(
      change('Individual_Loan_Form', 'land_own_type', item.land_own_type),
    );

    dispatch(change('Individual_Loan_Form', 'land_scale', item.land_scale));
    dispatch(
      change(
        'Individual_Loan_Form',
        'totSaleIncome',
        item.tot_sale_income ? item.tot_sale_income.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'totSaleExpense',
        item.tot_sale_expense ? item.tot_sale_expense.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'rawmaterialExpans',
        item.rawmaterial_expans ? item.rawmaterial_expans.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'wrkpRentExpns',
        item.wrkp_rent_expns ? item.wrkp_rent_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'employeeExpns',
        item.employee_expns ? item.employee_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'trnsrtExpns',
        item.trnsrt_expns ? item.trnsrt_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'busutlbilexpns',
        item.bus_utlbil_expns ? item.bus_utlbil_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'telExpns',
        item.tel_expns ? item.tel_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'taxExpns',
        item.tax_expns ? item.tax_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'goodsLossExpns',
        item.goods_loss_expns ? item.goods_loss_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'othrExpns1',
        item.othr_expns_1 ? item.othr_expns_1.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'othrExpns2',
        item.othr_expns_2 ? item.othr_expns_2.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'fmlyTotIncome',
        item.fmly_tot_income ? item.fmly_tot_income.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'fmlyTotExpense',
        item.fmly_tot_expense ? item.fmly_tot_expense.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'foodExpns',
        item.food_expns ? item.food_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'houseMngtExpns',
        item.house_mngt_expns ? item.house_mngt_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'utlbilExpns',
        item.utlbil_expns.toString(),
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'edctExpns',
        item.edct_expns ? item.edct_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'healthyExpns',
        item.healthy_expns ? item.healthy_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'fmlyTrnsrtExpns',
        item.fmly_trnsrt_expns ? item.fmly_trnsrt_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'fmlyTaxExpns',
        item.fmly_tax_expns ? item.fmly_tax_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'financeExpns',
        item.finance_expns ? item.finance_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Individual_Loan_Form',
        'fmlyOtrExpns',
        item.fmly_otr_expns ? item.fmly_otr_expns.toString() : '',
      ),
    );
    totalIncome(item.tot_sale_income ? parseFloat(item.tot_sale_income) : 0);
    totalExpense(item.tot_sale_expense ? parseFloat(item.tot_sale_expense) : 0);
    totalFamilyIncome(
      item.fmly_tot_income ? parseFloat(item.fmly_tot_income) : 0,
    );
    totalFamilyExpense(
      item.fmly_tot_expense ? parseFloat(item.fmly_tot_expense) : 0,
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
          {item.customer_nm}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.resident_rgst_id}
        </Text>

        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.tel_no == null ? 'No Data' : item.tel_no}
        </Text>

        <View>
          <RadioButton
            value={item.id}
            status={selectedValue === item.id ? 'checked' : 'unchecked'}
            onPress={() => btnSelectEmployee(item)}
          />
        </View>
      </View>
    );
  };

  return (
    <Modal
      useNativeDriver
      hideModalContentWhileAnimating
      dismissable={false}
      visible={modalVisible}
      onDismiss={hideModal}
      contentContainerStyle={style.modal_container}>
      <View
        style={style.modal_header}
        onStartShouldSetResponder={() => hideModal()}>
        <Icon
          name="x-circle"
          size={25}
          color="#fff"
          style={style.cancel_icon_style}
        />
      </View>
      <View style={style.modal_body_container}>
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
              style={{
                width: 200,
                backgroundColor: 'white',
                marginTop: 7,
              }}
              mode="dropdown">
              {cus_filter_item.length > 0 &&
                cus_filter_item.map(val => (
                  <Picker.Item
                    label={val.label}
                    value={val.value}
                    key={val.id}
                  />
                ))}
            </Picker>
          </View>

          <View style={{width: '40%'}}>
            <TextInput
              style={{
                backgroundColor: '#fff',
                marginTop: 10,
                width: 250,
                borderColor: '#303030',
                borderWidth: 0.5,
              }}
              value={emp_data}
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
            Name
          </Text>
          <Text
            style={{
              flex: 1,

              padding: 10,
              fontWeight: 'bold',
            }}>
            NRC
          </Text>
          <Text
            style={{
              flex: 1,

              padding: 10,
              fontWeight: 'bold',
            }}>
            Phone Number
          </Text>
        </View>

        <FlatList
          data={all_cus}
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
  );
};

const CoBorrower_modal = props => {
  const dispatch = useDispatch();
  const [co_borrowerselectedValue, setCoborrowerSelectedValue] = useState(null);
  const [co_borrower_data, setCoBorrowerText] = useState('');

  const {
    all_co_borrower,
    co_borrower_modalVisible,
    hideCoBorrowerModal,
    selectedItemValue,
    handleItemValueChange,
    setAllCoBorrower,
  } = props;
  const btnCusSearch = async () => {
    await filterCustomer(selectedItemValue, co_borrower_data)
      .then(data =>
        data.length > 0 ? setAllCoBorrower(data) : alert('No data'),
      )
      .catch(error => console.log('error', error));
  };

  const btnSelectEmployee = item => {
    console.log('co borrrower item', item);
    setCoborrowerSelectedValue(item.id);
    dispatch(
      change('Individual_Loan_Form', 'co_brwer_rgst_id', item.resident_rgst_id),
    );
    dispatch(change('Individual_Loan_Form', 'co_brwer_name', item.customer_nm));
    dispatch(
      change('Individual_Loan_Form', 'co_customer_no', item.customer_no),
    );
    dispatch(
      change('Individual_Loan_Form', 'co_brwer_birth_dt', item.birth_date),
    );
    dispatch(change('Individual_Loan_Form', 'co_brwer_tel_no', item.tel_no));
    dispatch(change('Individual_Loan_Form', 'co_occupation', item.occupation));
    // dispatch(
    //   change('Individual_Loan_Form', 'borrower_rltn', item.customer_no),
    // );
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
          {item.customer_nm}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.resident_rgst_id}
        </Text>

        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.tel_no == null ? 'No Data' : item.tel_no}
        </Text>

        <View>
          <RadioButton
            value={item.id}
            status={
              co_borrowerselectedValue === item.id ? 'checked' : 'unchecked'
            }
            onPress={() => btnSelectEmployee(item)}
          />
        </View>
      </View>
    );
  };

  const onChangeCoBorrowerText = inputvalues => {
    setCoBorrowerText(inputvalues);
  };
  return (
    <Provider>
      <Portal>
        <Modal
          useNativeDriver
          hideModalContentWhileAnimating
          dismissable={false}
          visible={co_borrower_modalVisible}
          onDismiss={hideCoBorrowerModal}
          contentContainerStyle={style.modal_container}>
          <View
            style={style.modal_header}
            onStartShouldSetResponder={() => hideCoBorrowerModal()}>
            <Icon
              name="x-circle"
              size={25}
              color="#fff"
              style={style.cancel_icon_style}
            />
          </View>
          <View style={style.modal_body_container}>
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
                  style={{
                    width: 200,
                    backgroundColor: 'white',
                    marginTop: 7,
                  }}
                  mode="dropdown">
                  {cus_filter_item.length > 0 &&
                    cus_filter_item.map(val => (
                      <Picker.Item
                        label={val.label}
                        value={val.value}
                        key={val.id}
                      />
                    ))}
                </Picker>
              </View>

              <View style={{width: '40%'}}>
                <TextInput
                  style={{
                    backgroundColor: '#fff',
                    marginTop: 10,
                    width: 250,
                    borderColor: '#303030',
                    borderWidth: 0.5,
                  }}
                  value={co_borrower_data}
                  onChangeText={onChangeCoBorrowerText}
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
                Name
              </Text>
              <Text
                style={{
                  flex: 1,

                  padding: 10,
                  fontWeight: 'bold',
                }}>
                NRC
              </Text>
              <Text
                style={{
                  flex: 1,

                  padding: 10,
                  fontWeight: 'bold',
                }}>
                Phone Number
              </Text>
            </View>

            <FlatList
              data={all_co_borrower}
              renderItem={item}
              keyExtractor={(item, index) => index.toString()}
            />

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Button
                onPress={() => hideCoBorrowerModal()}
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
  );
};

const Borrower_Sign_Modal = props => {
  const {
    show_canvas,
    hideSignModal,
    setCanvas,
    _onSaveEvent,
    saveSign,
    resetSign,
    sign,
  } = props;
  return (
    <Modal
      visible={show_canvas}
      animationType="slide"
      transparent={true}
      useNativeDriver
      hideModalContentWhileAnimating
      dismissable={false}
      onDismiss={hideSignModal}>
      <View
        style={{
          backgroundColor: '#232D57',
          padding: 25,
          width: 400,
          alignSelf: 'center',
        }}
        onStartShouldSetResponder={() => setCanvas(!show_canvas)}>
        <Icon
          name="x-circle"
          size={25}
          color="#fff"
          style={style.cancel_icon_style}
        />
      </View>
      <View
        style={{
          backgroundColor: '#F5FCFF',
          width: 400,
          height: 300,
          alignSelf: 'center',
        }}>
        <SignatureCapture
          style={{
            flex: 1,
          }}
          ref={sign}
          onSaveEvent={_onSaveEvent}
          showNativeButtons={false}
          showTitleLabel={false}
          minStrokeWidth={10}
          maxStrokeWidth={10}
          viewMode={'portrait'}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              height: 50,
              backgroundColor: '#6870C3',
              margin: 10,
            }}
            onPress={() => {
              saveSign();
            }}>
            <Text style={{color: '#fff'}}>Save</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              height: 50,
              backgroundColor: '#6870C3',
              margin: 10,
            }}
            onPress={() => {
              resetSign();
            }}>
            <Text style={{color: '#fff'}}>Reset</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const Co_Borrower_Sign_Modal = props => {
  const {
    show_co_borrower_canvas,
    hideCoBorrowerSignModal,
    setCoBorrowerCanvas,
    _onCoBorrowerSaveEvent,
    co_borrower_saveSign,
    co_borrower_resetSign,
    co_borrower_sign,
  } = props;
  return (
    <Modal
      visible={show_co_borrower_canvas}
      animationType="slide"
      transparent={true}
      useNativeDriver
      hideModalContentWhileAnimating
      dismissable={false}
      onDismiss={hideCoBorrowerSignModal}>
      <View
        style={{
          backgroundColor: '#232D57',
          padding: 25,
          width: 400,
          alignSelf: 'center',
        }}
        onStartShouldSetResponder={() =>
          setCoBorrowerCanvas(!show_co_borrower_canvas)
        }>
        <Icon
          name="x-circle"
          size={25}
          color="#fff"
          style={style.cancel_icon_style}
        />
      </View>
      <View
        style={{
          backgroundColor: '#F5FCFF',
          width: 400,
          height: 300,
          alignSelf: 'center',
        }}>
        <SignatureCapture
          style={{
            flex: 1,
          }}
          ref={co_borrower_sign}
          onSaveEvent={_onCoBorrowerSaveEvent}
          showNativeButtons={false}
          showTitleLabel={false}
          saveImageFileInExtStorage
          minStrokeWidth={10}
          maxStrokeWidth={10}
          // backgroundColor="transparent"
          viewMode={'portrait'}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              height: 50,
              backgroundColor: '#6870C3',
              margin: 10,
            }}
            onPress={() => {
              co_borrower_saveSign();
            }}>
            <Text style={{color: '#fff'}}>Save</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              height: 50,
              backgroundColor: '#6870C3',
              margin: 10,
            }}
            onPress={() => {
              co_borrower_resetSign();
            }}>
            <Text style={{color: '#fff'}}>Reset</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

function Individual_Loan(props) {
  const dispatch = useDispatch();
  const [show_operation, setOperation] = useState('1');
  const [modalVisible, setModalVisible] = useState(false);
  const [co_borrower_modalVisible, setCoBorrowerModalVisible] = useState(false);
  const [selectedItemValue, setSelectedItemValue] = useState('customer_nm');
  const [all_cus, setAllCus] = useState([]);
  const [all_co_borrower, setAllCoBorrower] = useState([]);
  const [loanexpanded, setLoanExpanded] = React.useState(true);
  const [loan_cycle_value, setLocanCycleValue] = useState('');
  const [loan_type_value, setLoanType] = useState();
  const [loan_max_data, setLoanMaxData] = useState([]);
  const [app_amount, setAppAmount] = useState(0);
  const [show_canvas, setCanvas] = useState(false);
  const [show_co_borrower_canvas, setCoBorrowerCanvas] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [co_borrower_filePath, setCoBorrowerFilePath] = useState('');
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
  const [city_text, set_cityText] = useState('');
  const [village_text, setVillageText] = useState('');
  const [ward_text, setWardText] = useState('');
  const [township_text, setTownshipText] = useState('');
  const [location_text, setLocationText] = useState('');
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

  const [borrower_sign_path, setBorrowerSignPath] = useState('');
  const [show_borrower_sign, setShowBorrowerSign] = useState('');
  const [coborrower_sign_path, setCoBorrowerSignPath] = useState('');
  const [show_coborrower_sign, setShowCoBorrowerSign] = useState('');
  const [loading, setLoading] = useState(false);
  const [all_loandata, setAllLoanData] = useState([]);

  const {
    handleSubmit,
    totalnet,
    navigation,
    resetMonthlyIncome,
    setBorrowerMap_Path,
    totalIncome,
    totalExpense,
    totalFamilyIncome,
    totalFamilyExpense,
    addCustomerInfo,
  } = props;
  const inquiry_group_data =
    props.route.params && props.route.params.inquiry_group_data;
  const p_type = props.route.params && props.route.params.p_type;

  const saveSignatureToInternalStorage = async (image_encode, index) => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      // Request write storage permission
      // const granted = await requestWriteStoragePermission();
      const granted = await AsyncStorage.getItem('writeStoragePermission');

      if (granted) {
        // Generate a unique filename for the image
        const filename = `10${user_id}${moment().format('YYYYMMDD')}${
          all_loandata.length + 1
        }SG${index}.jpg`;
        const directory = '/storage/emulated/0/Pictures/Signature/';
        const filePath = directory + filename;
        await RNFS.mkdir(directory);

        // Write the base64-encoded image data to the destination path
        await RNFS.writeFile(filePath, image_encode, 'base64');

        // Check if the file exists
        const fileExists = await RNFS.exists(filePath);
        return filePath;
      } else {
        console.log('Write storage permission denied.');
        return null;
      }
    } catch (error) {
      console.log('Error saving signature:', error);
      return null;
    }
  };

  const onSubmit = async values => {
    try {
      // Save the images
      let borrowerImagePath, coBorrowerImagePath;
      let saveImageError = false;

      if (borrower_sign_path) {
        borrowerImagePath = await saveSignatureToInternalStorage(
          show_borrower_sign,
          '01',
        );
        if (!borrowerImagePath) {
          saveImageError = true;
          ToastAndroid.show(
            'Error! Borrower Sign cannot save',
            ToastAndroid.SHORT,
          );
        } else {
          console.log('Borrower image saved successfully:', borrowerImagePath);
        }
      }

      if (coborrower_sign_path) {
        coBorrowerImagePath = await saveSignatureToInternalStorage(
          show_coborrower_sign,
          '02',
        );
        if (!coBorrowerImagePath) {
          saveImageError = true;
          ToastAndroid.show(
            'Error! Co-Borrower Sign cannot save',
            ToastAndroid.SHORT,
          );
        } else {
          console.log(
            'Co-Borrower image saved successfully:',
            coBorrowerImagePath,
          );
        }
      }

      if (!saveImageError) {
        const loan_data = Object.assign({}, values, {
          borrower_sign: borrowerImagePath,
          co_borrower_sign: coBorrowerImagePath,
          product_type: p_type ? p_type : 10,
          // borrower_map: map,
        });
        await storeLoanData(loan_data).then(result => {
          if (result == 'success') {
            dispatch(reset('Individual_Loan_Form'));
            dispatch(setBorrowerMap_Path(''));

            resetMonthlyIncome();

            ToastAndroid.show('Create Successfully!', ToastAndroid.SHORT);
            // props.navigation.navigate('Home');
            props.navigation.navigate('Home');
          }
        });
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const showCustomerSearch = () => {
    setModalVisible(true);
  };
  const showCoBorrowerSearch = () => {
    setCoBorrowerModalVisible(true);
  };
  const showWardSearch = () => {
    setWardCodeModalVisible(true);
  };
  const handleItemValueChange = itemValue => {
    setSelectedItemValue(itemValue);
  };

  const hideModal = () => setModalVisible(false);
  const hideCoBorrowerModal = () => setCoBorrowerModalVisible(false);

  const handleLoanToggle = () => {
    setLoanExpanded(!loanexpanded);
  };
  const loadData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    await getAllLoan().then(loan_data => {
      setAllLoanData(loan_data);
      dispatch(
        change(
          'Individual_Loan_Form',
          'application_no',
          `10${user_id}${moment().format('YYYYMMDD')}${loan_data.length + 1}`,
        ),
      );
      if (p_type == '40') {
        dispatch(change('Individual_Loan_Form', 'product_type', `Cover Loan`));
      } else if (p_type == '30') {
        dispatch(change('Individual_Loan_Form', 'product_type', `Group Loan`));
      } else if (p_type == '50') {
        dispatch(change('Individual_Loan_Form', 'product_type', `ReLoan`));
      } else {
        dispatch(
          change('Individual_Loan_Form', 'product_type', `Individual Loan`),
        );
      }
      if (p_type == '40' || p_type == '30' || p_type == '50') {
        dispatch(
          change('Individual_Loan_Form', 'group_aplc_no', inquiry_group_data),
        );
      }
    });
    await getAllLoanMax().then(loan_max_data => {
      setLoanMaxData(loan_max_data);
    });
  };

  const hideSignModal = () => {
    setCanvas(!show_canvas);
  };
  const hideCoBorrowerSignModal = () => {
    setCoBorrowerCanvas(!show_co_borrower_canvas);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCalculate = () => {
    loan_max_data.map(value => {
      if (30 == loan_type_value) {
        dispatch(
          change('Individual_Loan_Form', 'loan_limit_amt', totalnet * 2),
        );
        setAppAmount(totalnet * 2);
      } else if (
        value.loan_cycle == loan_cycle_value &&
        value.loan_type == loan_type_value
      ) {
        dispatch(
          change(
            'Individual_Loan_Form',
            'loan_limit_amt',
            value.loan_limit_amount,
          ),
        );
        setAppAmount(value.loan_limit_amount);
      } else if (
        loan_cycle_value >= value.loan_cycle &&
        value.loan_type == loan_type_value
      ) {
        dispatch(
          change(
            'Individual_Loan_Form',
            'loan_limit_amt',
            value.loan_limit_amount,
          ),
        );
        setAppAmount(value.loan_limit_amount);
      }
    });
  };
  const saveSign = async () => {
    await sign.current.saveImage();
  };
  const co_borrower_saveSign = async () => {
    await co_borrower_sign.current.saveImage();
  };

  const resetSign = () => {
    sign.current.resetImage();
  };
  const co_borrower_resetSign = () => {
    co_borrower_sign.current.resetImage();
  };

  const _onSaveEvent = async result => {
    setBorrowerSignPath(result.pathName);
    setShowBorrowerSign(result.encoded);

    setCanvas(false);
  };
  const _onCoBorrowerSaveEvent = async result => {
    setCoBorrowerSignPath(result.pathName);
    setShowCoBorrowerSign(result.encoded);

    setCoBorrowerCanvas(false);
  };

  const hideCityModal = () => setCityCodeModalVisible(false);
  const hideTownshipModal = () => setTownshipCodeModalVisible(false);
  const hideVillageModal = () => setVillageCodeModalVisible(false);
  const hideWardModal = () => setWardCodeModalVisible(false);
  const hideLocationModal = () => setLocationModalVisible(false);

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
    console.log('selectedLocationItemValue', selectedLocationItemValue);
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

  const handleCityItemValueChange = itemValue => {
    setSelectedCityItemValue(itemValue);
  };
  const handleTownshipItemValueChange = itemValue => {
    setSelectedTownshipItemValue(itemValue);
  };
  const handleVllageItemValueChange = itemValue => {
    setVillageSelectedItemValue(itemValue);
  };
  const handleWardItemValueChange = itemValue => {
    setWardSelectedItemValue(itemValue);
  };

  const handleLocationItemValueChange = itemValue => {
    setLocationSelectedItemValue(itemValue);
  };

  const sign = createRef();
  const co_borrower_sign = createRef();

  const showCitySearch = () => {
    setCityCodeModalVisible(true);
  };
  const showTownshipSearch = () => {
    setTownshipCodeModalVisible(true);
  };
  const showVillageSearch = () => {
    setVillageCodeModalVisible(true);
  };
  const showLocationSearch = () => {
    setLocationModalVisible(true);
  };
  const btnSelectCity = item => {
    setSelectedCityValue(item.code_value);
    setSelectedTspValue(null); //selected Township value
    setSelectedVillageValue(null);
    setAllTownship([]);
    setAllVillage([]);
    dispatch(change('Individual_Loan_Form', 'city_code', item.code_value));
    dispatch(change('Individual_Loan_Form', 'city_name', item.code_short_desc));
    dispatch(change('Individual_Loan_Form', 'ts_code', ''));
    dispatch(change('Individual_Loan_Form', 'ts_name', ''));
    dispatch(change('Individual_Loan_Form', 'village_code', ''));
    dispatch(change('Individual_Loan_Form', 'village_name', ''));
    dispatch(change('Individual_Loan_Form', 'ward_code', ''));
    dispatch(change('Individual_Loan_Form', 'ward_name', ''));
  };

  const btnSelectTownship = item => {
    setSelectedTspValue(item.ts_code);
    setSelectedVillageValue(null);
    setAllVillage([]);
    setAllWard([]);
    dispatch(change('Individual_Loan_Form', 'ts_code', item.ts_code));
    dispatch(change('Individual_Loan_Form', 'ts_name', item.ts_name));
    dispatch(change('Individual_Loan_Form', 'village_code', ''));
    dispatch(change('Individual_Loan_Form', 'village_name', ''));
    dispatch(change('Individual_Loan_Form', 'ward_code', ''));
    dispatch(change('Individual_Loan_Form', 'ward_name', ''));
  };

  const btnSelectVillage = item => {
    setSelectedVillageValue(item.village_code);
    dispatch(change('Individual_Loan_Form', 'village_code', item.village_code));
    dispatch(change('Individual_Loan_Form', 'village_name', item.village_name));
  };
  const btnSelectWard = item => {
    setSelectedWardValue(item.ward_code);
    dispatch(change('Individual_Loan_Form', 'ward_code', item.ward_code));
    dispatch(change('Individual_Loan_Form', 'ward_name', item.ward_name));
  };
  const btnSelectLocation = item => {
    setSelectedLocationValue(item.code_value);
    dispatch(change('Individual_Loan_Form', 'location_code', item.code_value));
    dispatch(
      change('Individual_Loan_Form', 'location_name', item.code_short_desc),
    );
  };
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
  const onChangeTownshipText = textvalues => {
    setTownshipText(textvalues);
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
  const onChangeVillageText = textvalues => {
    setVillageText(textvalues);
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
  const onChangeWardText = textvalues => {
    setWardText(textvalues);
  };
  const onChangeLocationText = textvalues => {
    setLocationText(textvalues);
  };

  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Text style={style.title_style}>Individual Loan Application</Text>
            <DividerLine />

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
                        disabled={option.value !== show_operation}
                        label={option.label}
                        value={option.value}
                        color="#636Dc6"
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

            <List.Accordion
              expanded={loanexpanded}
              onPress={handleLoanToggle}
              style={style.list_container}
              titleStyle={style.list_title}
              title="Loan Info">
              <View style={style.sub_container}>
                <View style={style.sub_list_container}>
                  <Field
                    name={'application_no'}
                    title={'Application No'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                  />

                  <Field
                    name={'product_type'}
                    title={'Product Type'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    data={loan_type}
                    name={'loan_type'}
                    title={'Type of Loan'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 300,
                    }}
                    onChange={value => setLoanType(value)}
                  />

                  <Field
                    name={'application_date'}
                    component={DatePicker}
                    label={'Application Date'}
                    icon={'calendar'}
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'loan_cycle'}
                    title={'Loan Cycle'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                    onChange={value => setLocanCycleValue(value)}
                    require
                  />

                  <Field
                    name={'loanterm_cnt'}
                    title={'Loan Term'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                    require
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'application_amt'}
                    title={'Loan Apply Amount'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                    require
                  />

                  <Field
                    name={'loan_code'}
                    title={'Loan Code'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'loan_charges'}
                    title={'Loan Charges'}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                  />
                  <Field
                    data={interest_rate}
                    name={'interest_rates'}
                    title={'Interest Rates'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 300,
                    }}
                  />
                </View>
                <View style={style.sub_list_container}>
                  <Field
                    data={sav_product_type}
                    name={'sv_pr_type'}
                    title={'Saving Product Type'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 300,
                    }}
                  />
                </View>
              </View>
            </List.Accordion>

            <Borrower_Info
              showCustomerSearch={showCustomerSearch}
              showCitySearch={showCitySearch}
              showTownshipSearch={showTownshipSearch}
              showVillageSearch={showVillageSearch}
              showWardSearch={showWardSearch}
              showLocationSearch={showLocationSearch}
              p_type={p_type}
            />

            <Co_Borrower_Info showCoBorrowerSearch={showCoBorrowerSearch} />
            <Loan_Business_Info />

            <Borrower_Monthly_Income
              handleCalculate={handleCalculate}
              app_amount={app_amount}
            />
            <Borrower_Current_Map
              navigation={navigation}
              all_loandata={all_loandata}
            />
            <Borrower_Contract />
            <Borrower_Sign
              setCanvas={setCanvas}
              show_canvas={show_canvas}
              showCanvas={showCanvas}
              navigation={navigation}
              filePath={filePath}
              co_borrower_filePath={co_borrower_filePath}
              setCoBorrowerCanvas={setCoBorrowerCanvas}
              show_co_borrower_canvas={show_co_borrower_canvas}
              all_loandata={all_loandata}
              borrower_sign_path={borrower_sign_path}
              show_borrower_sign={show_borrower_sign}
              show_coborrower_sign={show_coborrower_sign}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      <RenderBottomSheet />
      <Borrower_modal
        handleSubmit={handleSubmit}
        setAllCus={setAllCus}
        modalVisible={modalVisible}
        hideModal={hideModal}
        handleItemValueChange={handleItemValueChange}
        selectedItemValue={selectedItemValue}
        all_cus={all_cus}
        change={change}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        totalFamilyIncome={totalFamilyIncome}
        totalFamilyExpense={totalFamilyExpense}
        addCustomerInfo={addCustomerInfo}
      />

      <CoBorrower_modal
        handleSubmit={handleSubmit}
        setAllCoBorrower={setAllCoBorrower}
        co_borrower_modalVisible={co_borrower_modalVisible}
        hideCoBorrowerModal={hideCoBorrowerModal}
        handleItemValueChange={handleItemValueChange}
        selectedItemValue={selectedItemValue}
        all_co_borrower={all_co_borrower}
      />

      <Borrower_Sign_Modal
        show_canvas={show_canvas}
        hideSignModal={hideSignModal}
        setCanvas={setCanvas}
        _onSaveEvent={_onSaveEvent}
        saveSign={saveSign}
        resetSign={resetSign}
        sign={sign}
      />

      <Co_Borrower_Sign_Modal
        show_co_borrower_canvas={show_co_borrower_canvas}
        hideCoBorrowerSignModal={hideCoBorrowerSignModal}
        setCoBorrowerCanvas={setCoBorrowerCanvas}
        _onCoBorrowerSaveEvent={_onCoBorrowerSaveEvent}
        co_borrower_saveSign={co_borrower_saveSign}
        co_borrower_resetSign={co_borrower_resetSign}
        co_borrower_sign={co_borrower_sign}
      />
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

function mapStateToProps(state) {
  return {
    totalnet: state.monthly.totalnetincome,
    map: state.loan.borrower_map_path,
    update_status: state.loan.update_status,
  };
}

export default reduxForm({
  form: 'Individual_Loan_Form',
  validate,
})(
  connect(mapStateToProps, {
    resetMonthlyIncome,
    setBorrowerMap_Path,
    totalIncome,
    totalExpense,
    totalFamilyIncome,
    totalFamilyExpense,
    addCustomerInfo,
  })(Individual_Loan),
);
