import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, { useState, useEffect, useRef, createRef, useMemo } from 'react';
import DividerLine from '../../components/DividerLine';
import { style } from '../../style/Individual_Loan_style';
import { getExceptionalApproval } from '../../query/Exceptional_Approval_query';
import { updateLoanData } from '../../query/AllLoan_query';
import { operations, sav_product_type } from '../../common';
import RNFS from 'react-native-fs';
import { getGuarantorData } from '../../query/Guarantor_query';
import {
  RadioButton,
  Button,
  List,
  Modal,
  Provider,
  Portal,
} from 'react-native-paper';
import { cus_filter_item } from '../../common';
import { reduxForm, Field, change, reset } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import TextInputFile from '../../components/TextInputFile';
import DropDownPicker from '../../components/DropDownPicker';
import { loan_type, } from '../../common';
import DatePicker from '../../components/DatePicker';
import { Picker } from '@react-native-picker/picker';
import { getAllLoan } from '../../query/AllLoan_query';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Borrower_Info from './Edit_Borrower_Info';
import Icon from 'react-native-vector-icons/Feather';
import { filterCustomer } from '../../query/Customer_query';
import Co_Borrower_Info from './Edit_Co_Borrower_Info';
import Loan_Business_Info from './EditLoan_Business_Info';
import Borrower_Monthly_Income from './Edit_Borrower_Monthly_Income';
import { getAllLoanMax } from '../../query/LoanMax_query';
import Borrower_Current_Map from './Edit_Borrower_Current_Map';
import Borrower_Contract from './Edit_Borrower_Contract';
import Borrower_Sign from './Edit_Borrower_Sign';
import SignatureCapture from 'react-native-signature-capture';
import validate from './Edit_loan_Validate';
import { TextInput } from 'react-native-paper';
import BottomSheet from 'react-native-simple-bottom-sheet';
import {
  resetMonthlyIncome,
  totalFamilyIncome,
  totalIncome,
  totalExpense,
  totalFamilyExpense,
  totalNetBusiness,
  totalNetFamily,
  updateTotalSum,
  totalLoanAmt,
} from '../../redux/MonthlyReducer';
import { getEvaluationData } from '../../query/AreaEvaluation_query';
import { deleteLoan_ByID } from '../../query/AllLoan_query';
import { useIsFocused } from '@react-navigation/native';
import {
  setUpdateStatus,
  setGuarantor_UpdateStatus,
} from '../../redux/LoanReducer';
import { getRelationData } from '../../query/RelationShip_query';
import { interest_rate } from '../../common';
import City_Modal from '../../components/City_Modal';
import { filterCity } from '../../query/CodeInfo_quey';
import { filterTownship } from '../../query/Township_query';
import Township_Modal from '../../components/Township_Modal';
import Village_Modal from '../../components/Village_Modal';
import Location_Modal from '../../components/Location_Modal';
import Ward_Model from '../../components/Ward_Model';
import { filterWard } from '../../query/Ward_query';
import { filterVillage } from '../../query/Village_query';
import { filterLocation } from '../../query/CodeInfo_quey';
import { useTranslation } from 'react-i18next';

const Borrower_modal = props => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(null);
  const [emp_data, setEmpData] = React.useState('');
  const { t } = useTranslation();
  const {
    all_cus,
    modalVisible,
    hideModal,
    selectedItemValue,
    handleItemValueChange,
    setAllCus,
    totalIncome,
    totalExpense,
    totalFamilyIncome,
    totalFamilyExpense,
    setBorrowerName,
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
    setSelectedValue(item.id);
    dispatch(
      change('Edit_Individual_Loan_Form', 'borrower_name', item.customer_nm),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'resident_rgst_id',
        item.resident_rgst_id,
      ),
    );
    dispatch(
      change('Edit_Individual_Loan_Form', 'customer_no', item.customer_no),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'saving_acct_num',
        item.saving_acct_num,
      ),
    );
    dispatch(change('Edit_Individual_Loan_Form', 'tel_no', item.tel_no));
    dispatch(change('Edit_Individual_Loan_Form', 'gender', item.gender));
    dispatch(
      change('Edit_Individual_Loan_Form', 'birth_date', item.birth_date),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'marital_status',
        item.marital_status,
      ),
    );
    dispatch(
      change('Edit_Individual_Loan_Form', 'address_type', item.address_type),
    );
    dispatch(change('Edit_Individual_Loan_Form', 'addr', item.addr));
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'curr_resident_date',
        item.curr_resident_date,
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'family_num',
        item.family_num ? item.family_num.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'hghschl_num',
        item.hghschl_num ? item.hghschl_num.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'university_num',
        item.university_num ? item.university_num.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'house_ocpn_type',
        item.house_ocpn_type ? item.house_ocpn_type.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'business_own_type',
        item.business_own_type,
      ),
    );
    //business info

    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'workplace_name',
        item.workplace_name,
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'workplace_type',
        item.workplace_type,
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'workplace_date',
        item.workplace_date,
      ),
    );
    dispatch(
      change('Edit_Individual_Loan_Form', 'employee_num', item.employee_num),
    );

    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'workplace_addr',
        item.workplace_addr,
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'curr_workplace_date',
        item.curr_workplace_date,
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'business_sttn_flg',
        item.business_sttn_flg,
      ),
    );
    dispatch(
      change('Edit_Individual_Loan_Form', 'land_own_type', item.land_own_type),
    );

    dispatch(
      change('Edit_Individual_Loan_Form', 'land_scale', item.land_scale),
    );
    //Monthly Income

    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'tot_sale_income',
        item.tot_sale_income ? item.tot_sale_income.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'tot_sale_expense',
        item.tot_sale_expense ? item.tot_sale_expense.toString() : '',
      ),
    );

    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'rawmaterial_expans',
        item.rawmaterial_expans ? item.rawmaterial_expans.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'wrkp_rent_expns',
        item.wrkp_rent_expns ? item.wrkp_rent_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'employee_expns',
        item.employee_expns ? item.employee_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'trnsrt_expns',
        item.trnsrt_expns ? item.trnsrt_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'bus_utlbil_expns',
        item.bus_utlbil_expns ? item.bus_utlbil_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'tel_expns',
        item.tel_expns ? item.tel_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'tax_expns',
        item.tax_expns ? item.tax_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'goods_loss_expns',
        item.goods_loss_expns ? item.goods_loss_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'othr_expns_1',
        item.othr_expns_1 ? item.othr_expns_1.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'othr_expns_2',
        item.othr_expns_2 ? item.othr_expns_2.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'fmly_tot_income',
        item.fmly_tot_income ? item.fmly_tot_income.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'fmly_tot_expense',
        item.fmly_tot_expense ? item.fmly_tot_expense.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'food_expns',
        item.food_expns ? item.food_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'house_mngt_expns',
        item.house_mngt_expns ? item.house_mngt_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'utlbil_expns',
        item.utlbil_expns.toString(),
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'edct_expns',
        item.edct_expns ? item.edct_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'healthy_expns',
        item.healthy_expns ? item.healthy_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'fmly_trnsrt_expns',
        item.fmly_trnsrt_expns ? item.fmly_trnsrt_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'fmly_tax_expns',
        item.fmly_tax_expns ? item.fmly_tax_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'finance_expns',
        item.finance_expns ? item.finance_expns.toString() : '',
      ),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'fmly_otr_expns',
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
    setBorrowerName(item.customer_nm);
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
    <Provider>
      <Portal>
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 10 }}>Search Item:</Text>

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

              <View style={{ width: '40%' }}>
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
                {t('Name')}
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
                {t("Phone Number")}
              </Text>
            </View>

            <FlatList
              data={all_cus}
              renderItem={item}
              keyExtractor={(item, index) => index.toString()}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button
                onPress={() => hideModal()}
                mode="contained"
                buttonColor={'#21316C'}
                style={{
                  borderRadius: 0,
                  width: 117,
                  marginTop: 10,
                  color: 'black',
                  marginLeft: 5,
                  height: 44
                }}>
                {t("OK")}
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

const CoBorrower_modal = props => {
  const dispatch = useDispatch();
  const [co_borrowerselectedValue, setCoborrowerSelectedValue] = useState(null);
  const [co_borrower_data, setCoBorrowerText] = useState('');
  const { t } = useTranslation();
  const {
    all_co_borrower,
    co_borrower_modalVisible,
    hideCoBorrowerModal,
    selectedItemValue,
    handleItemValueChange,
    setAllCoBorrower,
    setCoBorrowerName,
  } = props;
  const btnCusSearch = async () => {
    await filterCustomer(selectedItemValue, co_borrower_data)
      .then(data =>
        data.length > 0 ? setAllCoBorrower(data) : alert('No data'),
      )
      .catch(error => console.log('error', error));
  };

  const btnSelectEmployee = item => {
    setCoborrowerSelectedValue(item.id);
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'co_brwer_rgst_id',
        item.resident_rgst_id,
      ),
    );
    dispatch(
      change('Edit_Individual_Loan_Form', 'co_brwer_name', item.customer_nm),
    );
    dispatch(
      change('Edit_Individual_Loan_Form', 'co_customer_no', item.customer_no),
    );
    dispatch(
      change('Edit_Individual_Loan_Form', 'co_brwer_birth_dt', item.birth_date),
    );
    dispatch(
      change('Edit_Individual_Loan_Form', 'co_brwer_tel_no', item.tel_no),
    );
    dispatch(
      change('Edit_Individual_Loan_Form', 'co_occupation', item.occupation),
    );
    setCoBorrowerName(item.customer_nm);
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

        {/* <Field component={RadioButton}/> */}
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 10 }}>Search Item:</Text>

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

              <View style={{ width: '50%' }}>
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
                {t('Name')}
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
                {t("Phone Number")}
              </Text>
            </View>

            <FlatList
              data={all_co_borrower}
              renderItem={item}
              keyExtractor={(item, index) => index.toString()}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button
                onPress={() => hideCoBorrowerModal()}
                mode="contained"
                buttonColor={'#21316C'}
                style={{
                  borderRadius: 0,
                  width: 117,
                  marginTop: 10,
                  color: 'black',
                  marginLeft: 5,
                  height: 44
                }}>
                {t("OK")}
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
    _onDragEvent,
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
          onDragEvent={_onDragEvent}
          showNativeButtons={false}
          showTitleLabel={false}
          minStrokeWidth={10}
          maxStrokeWidth={10}
          viewMode={'portrait'}
        />
        <View style={{ flexDirection: 'row' }}>
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
            <Text style={{ color: '#fff' }}>Save</Text>
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
            <Text style={{ color: '#fff' }}>Reset</Text>
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
    co_borrower_resetSignn,
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
          viewMode={'portrait'}
        />
        <View style={{ flexDirection: 'row' }}>
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
            <Text style={{ color: '#fff' }}>Save</Text>
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
              co_borrower_resetSignn();
            }}>
            <Text style={{ color: '#fff' }}>Reset</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

function Edit_Individual_Loan(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [show_operation, setOperation] = useState('2');
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
  const [exceptional_data, setExceptionalData] = useState([]);
  const [guarantor_data, setGuarantorData] = useState([]);
  const [borrower_sign_path, setBorrowerSignPath] = useState('');
  const [borrower_map, setBorrowerMap] = useState('');
  const [show_borrower_sign, setShowBorrowerSign] = useState('');
  const [coborrower_sign_path, setCoBorrowerSignPath] = useState('');
  const [show_coborrower_sign, setShowCoBorrowerSign] = useState('');
  const [relation_data, setRelationData] = useState([]);
  const [evaluation_data, setEvaluationData] = useState([]);
  const [show_village, setVillage] = useState('1');
  const [loading, setLoading] = useState(false);
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
  const [borrower_name, setBorrowerName] = useState('');
  const [coborrower_name, setCoBorrowerName] = useState('');
  const [all_loandata, setAllLoanData] = useState([]);
  const [capturedFiles, setCapturedFiles] = useState([]);
  const [passport_capturedFiles, setPassportCapturedFiles] = useState(false);
  const {
    retrive_loan_data,
    handleSubmit,
    totalnet,
    navigation,
    totalFamilyIncome,
    totalIncome,
    totalExpense,
    totalFamilyExpense,
    updateTotalSum,
    totalLoanAmt,
    update_status,
    setUpdateStatus,
  } = props;
  useEffect(() => {
    const loan_data = Object.assign({}, retrive_loan_data, {
      loan_cycle: retrive_loan_data.loan_cycle
        ? retrive_loan_data.loan_cycle.toString()
        : '',
      loanterm_cnt: retrive_loan_data.loanterm_cnt
        ? retrive_loan_data.loanterm_cnt.toString()
        : '',
      application_amt: retrive_loan_data.application_amt
        ? retrive_loan_data.application_amt.toString()
        : '',
      family_num: retrive_loan_data.family_num
        ? retrive_loan_data.family_num.toString()
        : '',
      hghschl_num: retrive_loan_data.hghschl_num
        ? retrive_loan_data.hghschl_num.toString()
        : '',
      university_num: retrive_loan_data.university_num
        ? retrive_loan_data.university_num.toString()
        : '',
      employee_num: retrive_loan_data.employee_num
        ? retrive_loan_data.employee_num.toString()
        : '',
      land_scale: retrive_loan_data.land_scale
        ? retrive_loan_data.land_scale.toString()
        : '',

      tot_sale_income: retrive_loan_data.tot_sale_income
        ? retrive_loan_data.tot_sale_income.toString()
        : '',
      tot_sale_expense: retrive_loan_data.tot_sale_expense
        ? retrive_loan_data.tot_sale_expense.toString()
        : '',
      rawmaterial_expans: retrive_loan_data.rawmaterial_expans
        ? retrive_loan_data.rawmaterial_expans.toString()
        : '',
      wrkp_rent_expns: retrive_loan_data.wrkp_rent_expns
        ? retrive_loan_data.wrkp_rent_expns.toString()
        : '',
      employee_expns: retrive_loan_data.employee_expns
        ? retrive_loan_data.employee_expns.toString()
        : '',
      trnsrt_expns: retrive_loan_data.trnsrt_expns
        ? retrive_loan_data.trnsrt_expns.toString()
        : '',
      bus_utlbil_expns: retrive_loan_data.bus_utlbil_expns
        ? retrive_loan_data.bus_utlbil_expns.toString()
        : '',
      tel_expns: retrive_loan_data.tel_expns
        ? retrive_loan_data.tel_expns.toString()
        : '',
      tax_expns: retrive_loan_data.tax_expns
        ? retrive_loan_data.tax_expns.toString()
        : '',
      goods_loss_expns: retrive_loan_data.goods_loss_expns
        ? retrive_loan_data.goods_loss_expns.toString()
        : '',
      othr_expns_1: retrive_loan_data.othr_expns_1
        ? retrive_loan_data.othr_expns_1.toString()
        : '',
      othr_expns_2: retrive_loan_data.othr_expns_2
        ? retrive_loan_data.othr_expns_2.toString()
        : '',
      fmly_tot_income: retrive_loan_data.fmly_tot_income
        ? retrive_loan_data.fmly_tot_income.toString()
        : '',
      fmly_tot_expense: retrive_loan_data.fmly_tot_expense
        ? retrive_loan_data.fmly_tot_expense.toString()
        : '',
      food_expns: retrive_loan_data.food_expns
        ? retrive_loan_data.food_expns.toString()
        : '',
      house_mngt_expns: retrive_loan_data.house_mngt_expns
        ? retrive_loan_data.house_mngt_expns.toString()
        : '',
      utlbil_expns: retrive_loan_data.utlbil_expns
        ? retrive_loan_data.utlbil_expns.toString()
        : '',
      edct_expns: retrive_loan_data.edct_expns
        ? retrive_loan_data.edct_expns.toString()
        : '',
      healthy_expns: retrive_loan_data.healthy_expns
        ? retrive_loan_data.healthy_expns.toString()
        : '',
      fmly_trnsrt_expns: retrive_loan_data.fmly_trnsrt_expns
        ? retrive_loan_data.fmly_trnsrt_expns.toString()
        : '',
      fmly_tax_expns: retrive_loan_data.fmly_tax_expns
        ? retrive_loan_data.fmly_tax_expns.toString()
        : '',
      finance_expns: retrive_loan_data.finance_expns
        ? retrive_loan_data.finance_expns.toString()
        : '',
      fmly_otr_expns: retrive_loan_data.fmly_otr_expns
        ? retrive_loan_data.fmly_otr_expns.toString()
        : '',
    });
    if (
      retrive_loan_data.borrower_sign != '' &&
      retrive_loan_data.borrower_sign != 'undefined'
    ) {
      setBorrowerSignPath(retrive_loan_data.borrower_sign);
    }
    if (
      retrive_loan_data.co_borrower_sign != '' &&
      retrive_loan_data.co_borrower_sign != 'undefined'
    ) {
      setCoBorrowerSignPath(retrive_loan_data.co_borrower_sign);
    }

    props.initialize(loan_data);
    if (retrive_loan_data.product_type == '40') {
      dispatch(
        change('Edit_Individual_Loan_Form', 'product_type', `Cover Loan`),
      );
    } else if (retrive_loan_data.product_type == '30') {
      dispatch(
        change('Edit_Individual_Loan_Form', 'product_type', `Group Loan`),
      );
    } else if (retrive_loan_data.product_type == '50') {
      dispatch(change('Edit_Individual_Loan_Form', 'product_type', `ReLoan`));
    } else {
      dispatch(
        change('Edit_Individual_Loan_Form', 'product_type', `Individual Loan`),
      );
    }

    //to calculate loan limit amout
    setLoanType(retrive_loan_data.loan_type);
    setLocanCycleValue(retrive_loan_data.loan_cycle);
    setBorrowerName(retrive_loan_data.borrower_name);
    setCoBorrowerName(retrive_loan_data.co_brwer_name);
  }, []);

  useEffect(() => {
    totalIncome(
      retrive_loan_data.tot_sale_income
        ? parseFloat(retrive_loan_data.tot_sale_income)
        : 0,
    );
    totalExpense(
      retrive_loan_data.tot_sale_expense
        ? parseFloat(retrive_loan_data.tot_sale_expense)
        : 0,
    );
    totalFamilyIncome(
      retrive_loan_data.fmly_tot_income
        ? parseFloat(retrive_loan_data.fmly_tot_income)
        : 0,
    );
    totalFamilyExpense(
      retrive_loan_data.fmly_tot_expense
        ? parseFloat(retrive_loan_data.fmly_tot_expense)
        : 0,
    );
    updateTotalSum(
      retrive_loan_data.total_net ? parseFloat(retrive_loan_data.total_net) : 0,
    );
    totalLoanAmt(retrive_loan_data.loan_limit_amt);
    setSelectedCityValue(retrive_loan_data.city_code);
    setSelectedTspValue(retrive_loan_data.ts_code);
  }, []);

  const saveSignatureToInternalStorage = async (image_encode, index) => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      const granted = await AsyncStorage.getItem('writeStoragePermission');

      if (granted) {
        // Generate a unique filename for the image
        const filename = `10${user_id}${moment().format('YYYYMMDD')}${all_loandata.length + 1
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
      return null;
    }
  };

  const onSubmit = async values => {
    if (show_operation == '4') {
      await deleteLoan_ByID(values).then(response => {
        if (response == 'success') {
          alert('Individual Staff Loan Application deleted successfully.');
          props.navigation.navigate('Home');
        }
      });
    } else {
      try {
        // Save the images
        let borrowerImagePath, coBorrowerImagePath;
        if (show_borrower_sign) {
          borrowerImagePath = await saveSignatureToInternalStorage(
            show_borrower_sign,
            '01',
          );
        }

        if (show_coborrower_sign) {
          coBorrowerImagePath = await saveSignatureToInternalStorage(
            show_coborrower_sign,
            '02',
          );
          console.log(
            'Co-Borrower image saved successfully:',
            coBorrowerImagePath,
          );
        }

        const loan_data = Object.assign({}, values, {
          borrower_sign: borrowerImagePath
            ? borrowerImagePath
            : values.borrower_sign,
          co_borrower_sign: coBorrowerImagePath
            ? coBorrowerImagePath
            : values.co_borrower_sign,
          product_type: retrive_loan_data.product_type,
          land_scale: values.land_scale ? values.land_scale : 0,
          tablet_sync_sts:
            values.tablet_sync_sts == '01' ? '02' : values.tablet_sync_sts,
        });
        await updateLoanData(loan_data).then(result => {
          if (result == 'success') {
            dispatch(reset('Edit_Individual_Loan_Form'));
            ToastAndroid.show(`Individual Staff Loan Application updated successfully.`, ToastAndroid.SHORT);
            props.navigation.navigate('Home');
          }
        });
      } catch (error) {
        console.log('Error:', error);
      }
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

  const isFocused = useIsFocused();
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
          `10${user_id}TB${moment().format('YYYYMMDD')}${loan_data.length + 1}`,
        ),
      );
    });
    await getAllLoanMax().then(loan_max_data => {
      setLoanMaxData(loan_max_data);
    });
    await getExceptionalApproval(retrive_loan_data.application_no).then(
      data => {
        setExceptionalData(data);
      },
    );
    await getGuarantorData(retrive_loan_data.application_no).then(data => {
      setGuarantorData(data);
    });
    await getRelationData(retrive_loan_data.application_no).then(data => {
      setRelationData(data);
    });
    await getEvaluationData(retrive_loan_data.application_no).then(data => {
      setEvaluationData(data);
    });
    await checkFileExists()
    await PassportcheckFileExists()

    const fileExists = await RNFS.exists(
      `/storage/emulated/0/Pictures/RNSketchCanvas/${retrive_loan_data.application_no}MP01.jpg`,
    );
    if (fileExists) {
      setBorrowerMap(
        `/storage/emulated/0/Pictures/RNSketchCanvas/${retrive_loan_data.application_no}MP01.jpg`,
      );
    }
    if (retrive_loan_data.village_status == 2) {
      setVillage('2');
    }
  };

  const hideSignModal = () => {
    setCanvas(!show_canvas);
  };
  const hideCoBorrowerSignModal = () => {
    setCoBorrowerCanvas(!show_co_borrower_canvas);
  };
  const data = [
    { id: 1, name: 'NRC Card (Front)', value: '01F' },
    { id: 2, name: 'NRC Card (Back)', value: '01B' },
    { id: 3, name: 'Guarantor NRC Card (Front)', value: '02F' },
    { id: 4, name: 'Guarantor NRC Card (Back)', value: '02B' },
    { id: 5, name: 'Co-borrower NRC Card (Front)', value: '03F' },
    { id: 6, name: 'Co-borrower NRC Card (Back)', value: '03B' },
    { id: 7, name: 'Family (Front)', value: '04F' },
    { id: 8, name: 'Family (Back)', value: '04B' },
    { id: 9, name: 'House Ownership (Front)', value: '05F' },
    { id: 10, name: 'House Ownership (Back)', value: '05B' },
    { id: 11, name: 'Recommendation (Front)', value: '06F' },
    { id: 12, name: 'Recommendation (Back)', value: '06B' },
    { id: 13, name: 'Business License (Front)', value: '07F' },
    { id: 14, name: 'Business License (Back)', value: '07B' },
    { id: 15, name: 'Land OwnerShip (Front)', value: '08F' },
    { id: 16, name: 'Land OwnerShip (Back)', value: '08B' },
    { id: 17, name: 'Tax Payment (Front)', value: '09F' },
    { id: 18, name: 'Tax Payment (Back)', value: '09B' },
    { id: 19, name: 'Insurance (Front)', value: '10F' },
    { id: 20, name: 'Insurance (Back)', value: '10B' },
    { id: 21, name: 'Etc (Front)', value: '11F' },
    { id: 22, name: 'Etc (Back)', value: '11B' },

    // Add more data as needed
  ];
  const PassportcheckFileExists = async () => {
    try {
      const fileName = `${retrive_loan_data.application_no}AT12F.jpg`;
      const directory = `/storage/emulated/0/Pictures/Camera/`;
      const filePath = directory + fileName;
      const fileExists = await RNFS.exists(filePath);
      if (fileExists) {
        setPassportCapturedFiles(true);
      }
    } catch (error) {
      console.log('Error checking file existence:', error);
    }
  };

  const checkFileExists = async () => {
    try {
      for (const item of data) {
        const fileName = `${retrive_loan_data.application_no}AT${item.value}.jpg`;
        const directory = `/storage/emulated/0/Pictures/Camera/`;
        const filePath = directory + fileName;
        const fileExists = await RNFS.exists(filePath);
        if (fileExists) {
          setCapturedFiles(prevFiles => [...prevFiles, item.value]);

        }
      }
    } catch (error) {
      console.log('Error checking file existence:', error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
      setCapturedFiles([])
      setPassportCapturedFiles(false)
    });

    return () => {
      unsubscribe();
      setOperation('2');
      setUpdateStatus(false);
    };
  }, [navigation]);

  const handleCalculate = () => {
    loan_max_data.map(value => {
      if (30 == loan_type_value) {
        dispatch(
          change('Edit_Individual_Loan_Form', 'loan_limit_amt', totalnet * 2),
        );
        setAppAmount(totalnet * 2);
        totalLoanAmt(totalnet * 2);
      } else if (
        value.loan_cycle == loan_cycle_value &&
        value.loan_type == loan_type_value
      ) {
        dispatch(
          change(
            'Edit_Individual_Loan_Form',
            'loan_limit_amt',
            value.loan_limit_amount,
          ),
        );
        setAppAmount(value.loan_limit_amount);
        totalLoanAmt(value.loan_limit_amount);
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
        totalLoanAmt(value.loan_limit_amount);
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

  const _onDragEvent = () => {
    console.log('dragged');
  };

  const _onSaveEvent = async result => {
    setShowBorrowerSign(result.encoded);
    if (result.encoded) {
      setBorrowerSignPath('');
    }
    setCanvas(false);
  };
  const _onCoBorrowerSaveEvent = async result => {
    setShowCoBorrowerSign(result.encoded);
    if (result.encoded) {
      setCoBorrowerSignPath('');
    }

    setCoBorrowerCanvas(false);
  };

  const hideCityModal = () => setCityCodeModalVisible(false);
  const hideTownshipModal = () => setTownshipCodeModalVisible(false);
  const hideVillageModal = () => setVillageCodeModalVisible(false);
  const hideWardModal = () => setWardCodeModalVisible(false);
  const hideLocationModal = () => setLocationModalVisible(false);

  const handleCityItemValueChange = itemValue => {
    setSelectedCityItemValue(itemValue);
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
  const btnChangeOperation = async (newValue, loan_data) => {
    const user_id = await AsyncStorage.getItem('user_id');

    if (loan_data.create_user_id !== user_id) {
      alert(
        'You are not allowed to delete other LO’s customer information.Please contact Admin for further support',
      );
    } else {
      setOperation(newValue);
      if (newValue == 2 || newValue == 4) {
        setUpdateStatus(false);
      } else {
        setUpdateStatus(true);
      }
    }
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
  const onChangeCityText = inputText => {
    set_cityText(inputText);
  };
  const btnSelectCity = item => {
    setSelectedCityValue(item.code_value);
    setSelectedTspValue(null); //selected Township value
    setSelectedVillageValue(null);
    setAllTownship([]);
    setAllVillage([]);
    dispatch(change('Edit_Individual_Loan_Form', 'city_code', item.code_value));
    dispatch(
      change('Edit_Individual_Loan_Form', 'city_name', item.code_short_desc),
    );
    dispatch(change('Edit_Individual_Loan_Form', 'ts_code', ''));
    dispatch(change('Edit_Individual_Loan_Form', 'ts_name', ''));
    dispatch(change('Edit_Individual_Loan_Form', 'village_code', ''));
    dispatch(change('Edit_Individual_Loan_Form', 'village_name', ''));
    dispatch(change('Edit_Individual_Loan_Form', 'ward_code', ''));
    dispatch(change('Edit_Individual_Loan_Form', 'ward_name', ''));
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
  const onChangeTownshipText = textvalues => {
    setTownshipText(textvalues);
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
  const onChangeVillageText = textvalues => {
    setVillageText(textvalues);
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
  const onChangeWardText = textvalues => {
    setWardText(textvalues);
  };
  const onChangeLocationText = textvalues => {
    setLocationText(textvalues);
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
  const btnSelectTownship = item => {
    setSelectedTspValue(item.ts_code);
    setSelectedVillageValue(null);
    setAllVillage([]);
    setAllWard([]);
    dispatch(change('Edit_Individual_Loan_Form', 'ts_code', item.ts_code));
    dispatch(change('Edit_Individual_Loan_Form', 'ts_name', item.ts_name));
    dispatch(change('Edit_Individual_Loan_Form', 'village_code', ''));
    dispatch(change('Edit_Individual_Loan_Form', 'village_name', ''));
    dispatch(change('Edit_Individual_Loan_Form', 'ward_code', ''));
    dispatch(change('Edit_Individual_Loan_Form', 'ward_name', ''));
  };
  const handleTownshipItemValueChange = itemValue => {
    setSelectedTownshipItemValue(itemValue);
  };

  const RenderBottomSheet = ({ onSubmit, handleSubmit }) =>
    useMemo(() => {
      return (
        <BottomSheet isOpen={false} wrapperStyle={{ backgroundColor: '#3E3E84' }}>
          <View style={{ padding: 5, marginLeft: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="paperclip" size={25} color="#fff" />
              <Text style={{ color: '#fff', fontSize: 20, marginLeft: 10 }}>
                Document Submit
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  marginBottom: 16,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    update_status == true && guarantor_data.length == 0
                      ? props.navigation.navigate('Guarantor', {
                        retrive_loan_data,
                      })
                      : update_status == true && guarantor_data.length > 0
                        ? props.navigation.navigate('Edit Guarantor', {
                          guarantor_data,
                        })
                        : ToastAndroid.show(
                          `Only update can modify`,
                          ToastAndroid.SHORT,
                        )
                  }
                  style={{
                    width: 250,
                    height: 40,
                    backgroundColor:
                      guarantor_data.length > 0 ? '#3E3E84' : '#242157',
                    margin: 10,
                  }}>
                  {guarantor_data.length > 0 ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 5,
                      }}>
                      <View
                        style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="check" size={20} color="#ede72d" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          {t('Guarantor Form')}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 5,
                      }}>
                      <View
                        style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="paperclip" size={20} color="#fff" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          {t('Guarantor Form')}
                        </Text>
                      </View>
                      <Icon name="chevron-right" size={25} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    update_status == true && evaluation_data.length == 0
                      ? props.navigation.navigate('Area Evaluation', {
                        retrive_loan_data,
                      })
                      : update_status == true && evaluation_data.length > 0
                        ? props.navigation.navigate('Edit Area Evaluation', {
                          evaluation_data,
                        })
                        : ToastAndroid.show(
                          `Only update can modify`,
                          ToastAndroid.SHORT,
                        )
                  }
                  style={{
                    width: 250,
                    height: 40,
                    backgroundColor:
                      evaluation_data.length > 0 ? '#3E3E84' : '#242157',
                    margin: 10,
                  }}>
                  {evaluation_data.length > 0 ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 5,
                      }}>
                      <View
                        style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="check" size={20} color="#ede72d" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          {t('Area Evaluation Form')}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 5,
                      }}>
                      <View
                        style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="paperclip" size={20} color="#fff" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          {t('Area Evaluation Form')}
                        </Text>
                      </View>
                      <Icon name="chevron-right" size={25} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    update_status == true && relation_data.length == 0
                      ? props.navigation.navigate('Relation Form', {
                        retrive_loan_data,
                      })
                      : update_status == true && relation_data.length > 0
                        ? props.navigation.navigate('Edit Relation', {
                          relation_data,
                        })
                        : ToastAndroid.show(
                          `Only update can modify`,
                          ToastAndroid.SHORT,
                        )
                  }
                  style={{
                    width: 250,
                    height: 40,
                    backgroundColor:
                      relation_data.length > 0 ? '#3E3E84' : '#242157',
                    margin: 10,
                  }}>
                  {relation_data.length > 0 ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 5,
                      }}>
                      <View
                        style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="check" size={20} color="#ede72d" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          Relationship Form
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 5,
                      }}>
                      <View
                        style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="paperclip" size={20} color="#fff" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          Relationship Form
                        </Text>
                      </View>
                      <Icon name="chevron-right" size={25} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginBottom: 16,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('Evidence', {
                      retrive_loan_data,
                    })
                  }
                  style={{
                    width: 250,
                    height: 40,
                    backgroundColor: capturedFiles.length > 0 ? '#3E3E84' : '#242157',
                    margin: 10,
                  }}>
                  {capturedFiles.length > 0 ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 5,
                      }}>
                      <View
                        style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="check" size={20} color="#ede72d" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          {t('Evidence Document Form')}
                        </Text>
                      </View>
                    </View>) :
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 5,
                      }}>
                      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="paperclip" size={20} color="#fff" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          {t('Evidence Document Form')}
                        </Text>
                      </View>
                      <Icon name="chevron-right" size={25} color="#fff" />
                    </View>
                  }
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    update_status == true && exceptional_data.length == 0
                      ? props.navigation.navigate('Exceptional_Approvel_Form', {
                        retrive_loan_data,
                      })
                      : update_status == true && exceptional_data.length > 0
                        ? props.navigation.navigate(
                          'Edit_Exceptional_Approvel_Form',
                          { exceptional_data },
                        )
                        : ToastAndroid.show(
                          `Only update can modify`,
                          ToastAndroid.SHORT,
                        )
                  }
                  style={{
                    width: 250,
                    height: 40,
                    backgroundColor:
                      exceptional_data.length > 0 ? '#3E3E84' : '#242157',
                    margin: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      margin: 5,
                    }}>
                    {exceptional_data.length > 0 ? (
                      <View
                        style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="check" size={20} color="#ede72d" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          Exceptional Approval Request...
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="paperclip" size={20} color="#fff" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          Exceptional Approval Request...
                        </Text>
                        <Icon name="chevron-right" size={25} color="#fff" />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('Passport', {
                      retrive_loan_data,
                    })
                  }
                  style={{
                    width: 250,
                    height: 40,
                    backgroundColor: passport_capturedFiles ? '#3E3E84' : '#242157',
                    margin: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      margin: 5,
                    }}>
                    {passport_capturedFiles ? (
                      <View
                        style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="check" size={20} color="#ede72d" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          Passport Photo
                        </Text>
                      </View>) : (
                      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="paperclip" size={20} color="#fff" />
                        <Text style={{ color: '#fff', marginLeft: 5 }}>
                          Passport Photo
                        </Text>
                        <Icon name="chevron-right" size={25} color="#fff" />

                      </View>
                    )
                    }
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  marginBottom: 16,
                  justifyContent: 'center',
                }}>
                <Button
                  onPress={handleSubmit}
                  mode="contained"
                  buttonColor={'#0480B7'}
                  style={{
                    borderRadius: 0,
                    width: 130,
                    height: 70,
                    borderRadius: 10,
                    justifyContent: 'center',
                  }}>
                  {t("Save")}
                </Button>

                <Button
                  disabled={true}
                  mode="contained"
                  buttonColor={'#6870C3'}
                  style={{
                    borderRadius: 0,
                    width: 130,
                    height: 70,
                    borderRadius: 10,
                    justifyContent: 'center',
                    marginTop: 5,
                  }}>
                  {t("Cancel")}
                </Button>
              </View>
            </View>
          </View>
        </BottomSheet>
      );
    }, [guarantor_data, exceptional_data, relation_data, evaluation_data]);
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
  const btnSelectWard = item => {
    setSelectedWardValue(item.ward_code);
    dispatch(change('Edit_Individual_Loan_Form', 'ward_code', item.ward_code));
    dispatch(change('Edit_Individual_Loan_Form', 'ward_name', item.ward_name));
  };
  const btnSelectVillage = item => {
    setSelectedVillageValue(item.village_code);
    dispatch(
      change('Edit_Individual_Loan_Form', 'village_code', item.village_code),
    );
    dispatch(
      change('Edit_Individual_Loan_Form', 'village_name', item.village_name),
    );
  };
  const btnVillageSearch = async () => {
    setLoading(false);
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
  const btnSelectLocation = item => {
    setSelectedLocationValue(item.code_value);
    dispatch(
      change('Edit_Individual_Loan_Form', 'location_code', item.code_value),
    );
    dispatch(
      change(
        'Edit_Individual_Loan_Form',
        'location_name',
        item.code_short_desc,
      ),
    );
  };
  return (
    <>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
                    onValueChange={newValue =>
                      btnChangeOperation(newValue, retrive_loan_data)
                    }
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
                        labelStyle={{ marginLeft: 5 }}
                        disabled={option.value == '1'}
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
                {t("OK")}
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
                    editable={update_status == true ? false : true}
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
                    enabled={update_status == true ? false : true}
                  />

                  <Field
                    name={'application_date'}
                    component={DatePicker}
                    label={'Application Date'}
                    icon={'calendar'}
                    editable={update_status == true ? false : true}
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'loan_cycle'}
                    title={t('Loan Cycle')}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                    editable={update_status == true ? false : true}
                    onChange={value => setLocanCycleValue(value)}
                  />

                  <Field
                    name={'loanterm_cnt'}
                    title={t('Loan Term')}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                    editable={update_status == true ? false : true}
                  />
                </View>

                <View style={style.sub_list_container}>
                  <Field
                    name={'application_amt'}
                    title={t('Loan Apply Amount')}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    keyboardType={'numeric'}
                    editable={update_status == true ? false : true}
                  />

                  <Field
                    name={'loan_code'}
                    title={t('Loan Code')}
                    component={TextInputFile}
                    cus_width
                    input_mode
                    editable={update_status == true ? false : true}
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
                    editable={update_status == true ? false : true}
                  />

                  <Field
                    data={interest_rate}
                    name={'interest_rates'}
                    title={'Interest Rates'}
                    component={DropDownPicker}
                    pickerStyle={{
                      width: 300,
                    }}
                    enabled={update_status == true ? false : true}
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
                    enabled={update_status == true ? false : true}
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
              show_village={show_village}
              setVillage={setVillage}
            />

            <Co_Borrower_Info showCoBorrowerSearch={showCoBorrowerSearch} />
            <Loan_Business_Info />

            <Borrower_Monthly_Income
              handleCalculate={handleCalculate}
              app_amount={app_amount}
            />
            <Borrower_Current_Map
              borrower_map={borrower_map}
              navigation={navigation}
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
              coborrower_sign_path={coborrower_sign_path}
              borrower_name={borrower_name}
              coborrower_name={coborrower_name}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      <RenderBottomSheet handleSubmit={handleSubmit(onSubmit)} />

      <Borrower_modal
        handleSubmit={handleSubmit}
        setAllCus={setAllCus}
        modalVisible={modalVisible}
        hideModal={hideModal}
        handleItemValueChange={handleItemValueChange}
        selectedItemValue={selectedItemValue}
        all_cus={all_cus}
        totalFamilyExpense={totalFamilyExpense}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        totalFamilyIncome={totalFamilyIncome}
        setBorrowerName={setBorrowerName}
      />

      <CoBorrower_modal
        handleSubmit={handleSubmit}
        setAllCoBorrower={setAllCoBorrower}
        co_borrower_modalVisible={co_borrower_modalVisible}
        hideCoBorrowerModal={hideCoBorrowerModal}
        handleItemValueChange={handleItemValueChange}
        selectedItemValue={selectedItemValue}
        all_co_borrower={all_co_borrower}
        setCoBorrowerName={setCoBorrowerName}
      />

      <Borrower_Sign_Modal
        show_canvas={show_canvas}
        hideSignModal={hideSignModal}
        setCanvas={setCanvas}
        _onSaveEvent={_onSaveEvent}
        _onDragEvent={_onDragEvent}
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
    retrive_loan_data: state.loan.edit_loandata,
    update_status: state.loan.update_status,
    except_app_status: state.loan.except_app_status,
  };
}

export default reduxForm({
  form: 'Edit_Individual_Loan_Form',
  validate,
})(
  connect(mapStateToProps, {
    totalFamilyIncome,
    totalIncome,
    totalExpense,
    totalFamilyExpense,
    totalNetBusiness,
    totalNetFamily,
    updateTotalSum,
    resetMonthlyIncome,
    totalLoanAmt,
    setUpdateStatus,
    setGuarantor_UpdateStatus,
  })(Edit_Individual_Loan),
);
