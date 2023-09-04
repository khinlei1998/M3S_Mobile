import {View, Text, FlatList, TouchableOpacity,ActivityIndicator} from 'react-native';
import React from 'react';
import { getInquiryCusData } from '../../redux/CustomerReducer';
import {connect} from 'react-redux';
import {reduxForm,} from 'redux-form';
import { useTranslation } from 'react-i18next';

 function ViewCustomer(props) {
  const { t } = useTranslation();
  const {customer_data, navigation,getInquiryCusData,setLoading,loading} = props;

  const btn_inquiry=(item)=>{
    navigation.navigate('Edit_Emp_Info', item)
    getInquiryCusData(item)
  }
  const item = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>btn_inquiry(item) }>
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
            {item.customer_no}
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
            {item.resident_rgst_id }
          </Text>

          <Text
            style={{
              padding: 10,
              flex: 1,
            }}>
            {item.tel_no == null ? 'No Data' : item.tel_no}
          </Text>


        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
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
          {t('Customer No')}
        </Text>
        <Text
          style={{
            flex: 1,

            padding: 10,
            fontWeight: 'bold',
          }}>
          {t('Customer Name')}
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

       {loading ? ( 
        <ActivityIndicator size="large" color="#636Dc6" />
      ) : ( // Show FlatList once loading is false and data is available
        <FlatList
          data={customer_data}
          renderItem={item}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </>
  );
}

export default reduxForm({
  form: 'Customer_ManagementForm',
  enableReinitialize: true,
})(
  connect(null, {
    getInquiryCusData,
  })(ViewCustomer),
);
