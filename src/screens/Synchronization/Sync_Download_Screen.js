import { View, Text, FlatList } from 'react-native';
import React from 'react';
import DividerLine from '../../components/DividerLine';
import { Button, Checkbox } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { reduxForm, } from 'redux-form';
import { connect } from 'react-redux';
function Sync_Download_Screen(props) {
  const {
    selectAll,
    setSelectAll,
    setCheckedItems,
    checkedItems,
    handleDownload,
    download_data
  } = props;
  const { t } = useTranslation();

  const isChecked = item => {
    return checkedItems.some(checkedItem => checkedItem.id === item.id);
  };
  const handleCheckboxChange = item => {
    if (isChecked(item)) {
      setCheckedItems(
        checkedItems.filter(checkedItem => checkedItem.id !== item.id),
      );
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };
  const item = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          padding: 10,
        }}>
        <Checkbox
          key={item.id}
          status={
            checkedItems.some(checkedItem => checkedItem.id === item.id)
              ? 'checked'
              : 'unchecked'
          }
          onPress={() => handleCheckboxChange(item)}
        />
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.id}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.size}
        </Text>

        <Text
          style={{
            padding: 10,
            flex: 1,
          }}>
          {item.last_sync_data}
        </Text>
      </View>
    );
  };

  const handleSelectAllToggle = () => {
    const updatedSelectAll = !selectAll;
    setSelectAll(updatedSelectAll);
    const updatedData = download_data.map(item => ({
      ...item,
      checked: updatedSelectAll,
    }));
    if (updatedSelectAll) {
      setCheckedItems(updatedData);
    } else {
      setCheckedItems([]);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          padding: 5,
        }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 10 }}>
          Download Information
        </Text>
      </View>

      <DividerLine cuswidth />
      <View
        style={{
          flexDirection: 'row',
          borderRadius: 5,
          padding: 5,
          margin: 5,
        }}>
        <Checkbox
          status={selectAll ? 'checked' : 'unchecked'}
          onPress={handleSelectAllToggle}
        />
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
          Size
        </Text>
        <Text
          style={{
            flex: 1,
            padding: 10,
            fontWeight: 'bold',
          }}>
          Last Sync date:
        </Text>
      </View>

      <FlatList
        data={download_data}
        renderItem={item}
        keyExtractor={(item, index) => index.toString()}
      />
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
          mode="outlined"
          style={{ width: 200, borderRadius: 0 }}
          onPress={() => handleDownload()}>
          <Text>Download</Text>
        </Button>
      </View>
    </View>
  );
}
function mapStateToProps(state) {
  return {
    download_data: state.sync.download_data
  };
}

export default reduxForm({
  form: 'Sync_Screen',
})(connect(mapStateToProps, {})(Sync_Download_Screen));

