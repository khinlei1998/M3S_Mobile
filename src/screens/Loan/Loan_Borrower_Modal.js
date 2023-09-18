import { View, Text,FlatList } from 'react-native'
import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { filterCustomer } from '../../query/Customer_query';
import {
    RadioButton,
    Button,
    List,
    Modal,
    Provider,
    Portal,
    TextInput,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import {
    cus_filter_item,
    sav_product_type,
    interest_rate,
    loan_type,
} from '../../common';
import { reduxForm, Field, change, reset } from 'redux-form';
import {
    totalFamilyExpense,
    totalIncome,
    totalExpense,
    totalFamilyIncome,
} from '../../redux/MonthlyReducer';
import { addCustomerInfo } from '../../redux/CustomerReducer';
import { style } from '../../style/Individual_Loan_style';

function Loan_Borrower_Modal(props) {
    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState(null);
    const [emp_data, setEmpData] = React.useState('');
    const [all_cus, setAllCus] = useState([]);

    const { t } = useTranslation();
    const {
        // all_cus,
        // modalVisible,
        hideModal,
        selectedItemValue,
        handleItemValueChange,
        // setAllCus,
        // change,
        // totalIncome,
        // totalExpense,
        // totalFamilyIncome,
        // totalFamilyExpense,
        // addCustomerInfo,
        setBorrowerName,
        setSelectedCityValue,
        setSelectedTspValue,
        borrower_modal_visible
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
        setSelectedCityValue(item.city_code);
        setSelectedTspValue(item.ts_code);
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
        dispatch(change('Individual_Loan_Form', 'address_type', item.addressType));
        dispatch(
            change('Individual_Loan_Form', 'marital_status', item.maritalStatus),
        );
        dispatch(change('Individual_Loan_Form', 'city_code', item.city_code));
        dispatch(change('Individual_Loan_Form', 'city_name', item.city_name));

        if (item.village_status == 1) {
            dispatch(
                change('Individual_Loan_Form', 'village_code', item.village_code),
            );
            dispatch(
                change('Individual_Loan_Form', 'village_name', item.village_name),
            );
        } else {
            dispatch(change('Individual_Loan_Form', 'ward_code', item.ward_code));
            dispatch(change('Individual_Loan_Form', 'ward_name', item.ward_name));
        }
        dispatch(
            change('Individual_Loan_Form', 'locaiton_code', item.locaiton_code),
        );
        dispatch(
            change('Individual_Loan_Form', 'location_name', item.location_name),
        );

        dispatch(change('Individual_Loan_Form', 'ts_code', item.ts_code));
        dispatch(change('Individual_Loan_Form', 'ts_name', item.ts_name));

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
        dispatch(change('Individual_Loan_Form', 'employee_num', item.employee_num ? item.employee_num.toString() : ''));

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
        <Modal
            useNativeDriver
            hideModalContentWhileAnimating
            dismissable={false}
            visible={borrower_modal_visible}
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
                        {t('NRC')}
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
    );
}

function mapStateToProps(state) {
    return {
        borrower_modal_visible: state.loan.borrower_modal_visible
    };
}

export default reduxForm({
    form: 'Individual_Loan_Form',
})(
    connect(mapStateToProps, {

    })(Loan_Borrower_Modal),
);