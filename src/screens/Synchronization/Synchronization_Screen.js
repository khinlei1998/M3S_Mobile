import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {DataTable} from 'react-native-paper';
import DividerLine from '../../components/DividerLine';
import {Divider, Button} from 'react-native-paper';
import {getAllLoan} from '../../query/AllLoan_query';
import Tab from '../../components/Tab';
import Sync_Upload_Screen from './Sync_Upload_Screen';
import CheckBoxFile from '../../components/CheckBoxFile';
import Sync_Download_Screen from './Sync_Download_Screen';
import Sync_Setting_Screen from './Sync_Setting_Screen';
const UploadComponent = () => {
  return <Text>uuu</Text>;
};

export default function Synchronization_Screen() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [loan_data, setAllLoan] = React.useState([]);

  const handleTabPress = index => {
    setActiveTab(index);
  };

  const loadData = async () => {
    await getAllLoan()
      .then(setAllLoan)
      .catch(error => console.log(error));
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <Text style={{fontWeight: 'bold', fontSize: 20, padding: 15}}>
        Synchronization
      </Text>
      <Text style={{fontSize: 15, padding: 5, marginLeft: 10}}>
        Synchronization is the coordination of events to operate a system in
        union
      </Text>
      <View style={{flexDirection: 'row', marginLeft: 10, marginRight: 10}}>
        <Tab
          label="Upload"
          isActive={activeTab === 0}
          onPress={() => handleTabPress(0)}>
          <View style={{backgroundColor: '#fff'}}>
            <Text>Upload Applications</Text>
          </View>
        </Tab>
        <Tab
          label="Download"
          isActive={activeTab === 1}
          onPress={() => handleTabPress(1)}
        />
        <Tab
          label="Setting"
          isActive={activeTab === 2}
          onPress={() => handleTabPress(2)}
        />
      </View>

      <View style={{flex: 1, backgroundColor: '#fff'}}>
        {activeTab === 0 && <Sync_Upload_Screen loan_data={loan_data} />}
        {activeTab === 1 && <Sync_Download_Screen />}
        {activeTab === 2 && <Sync_Setting_Screen />}
      </View>
    </>
  );
}
