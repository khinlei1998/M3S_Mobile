import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import TextInputFile from '../../components/TextInputFile'
import { Field, reduxForm, change } from 'redux-form';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { addLastSyncDate } from '../../redux/SynchronizationReducer';
import moment from 'moment';
import { connect } from 'react-redux';
function Sync_Setting_Screen(props) {
  const { t } = useTranslation();
  const [showDefault, setShowDefault] = useState(false);
  const [ip, setIP] = useState();
  const [port, setPort] = useState();

  const { dispatch, handleSubmit, addLastSyncDate,last_sync_date } = props
  const btndefault = () => {
    setShowDefault(true);
    dispatch(
      change(
        'Sync_Setting_ScreenForm',
        'ip',
        ip,
      ),
    );
    dispatch(change('Sync_Setting_ScreenForm', 'port', port));
  };

  const onSubmit = async values => {
    try {
      await AsyncStorage.setItem('ip', values.ip);
      await AsyncStorage.setItem('port', values.port);
      addLastSyncDate(moment().format('lll'))
      alert(`Connect to ${await AsyncStorage.getItem('ip')} `);
    } catch (e) {
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const ip = await AsyncStorage.getItem('ip');
        if (ip !== null) {
          setIP(ip)
        }

        const port = await AsyncStorage.getItem('port');
        if (port !== null) {
          setPort(port)
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <>
      <View style={{ backgroundColor: '#f0f0f0', width: '90%', alignSelf: 'center', marginTop: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, margin: 10 }}>
          < View style={{ flexDirection: 'column', padding: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>IP Address</Text>
            <Text>ex)192.160.0.148, imbs.iptime.org</Text>
          </View>
          <Field
            component={TextInputFile}
            name="ip"
            showValue={showDefault}
            defaultData={ip}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, margin: 10 }}>
          < View style={{ flexDirection: 'column', padding: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>Port</Text>
            <Text>Please Enter the Port Number</Text>

          </View>
          <Field
            component={TextInputFile}
            name="port"
            showValue={showDefault}
            defaultData={port}
          />
        </View>
      </View>
      <Text style={{ alignSelf: 'flex-end', marginRight: 40, marginTop: 10 }}>Last Sync Date : {last_sync_date}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',

          marginTop: 30,
          alignSelf: 'center',
        }}>
        <Button
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          buttonColor={'#21316C'}
          style={{
            borderRadius: 0,
            width: 136,
            marginTop: 10,
            color: 'black',
            marginLeft: 5,
            height: 44
          }}>
          {t("Save")}
        </Button>

        <Button
          style={{
            borderRadius: 0,
            width: 136,
            marginTop: 10,
            color: 'black',
            marginLeft: 5,
            height: 44
          }}
          mode="outlined"
          onPress={() => btndefault()}>
          Default
        </Button>
      </View>
    </>
  )
}

// export default reduxForm({ form: 'Sync_Setting_ScreenForm' })(Sync_Setting_Screen);

function mapStateToProps(state) {
  console.log('state',state.sync.last_sync_date);
  return {
    last_sync_date:state.sync.last_sync_date
  };
}

export default reduxForm({
  form: 'Sync_Setting_ScreenForm',
})(connect(mapStateToProps, { addLastSyncDate })(Sync_Setting_Screen));
