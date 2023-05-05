import { View, Text, TextInput, Picker } from 'react-native';
import React, { useState } from 'react';
import SQLite from 'react-native-sqlite-storage';

export default function CustomerSearch() {
  const [selectedColumn, setSelectedColumn] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM my_table WHERE ${selectedColumn} LIKE '%${searchTerm}%'`,
        [],
        (txObj, { rows: { _array } }) => {
          setSearchResults(_array);
        },
        (txObj, error) => {
          console.log('Error fetching data', error);
        }
      );
    });
  };
  return (
    <View>
      <Picker
        selectedValue={selectedColumn}
        onValueChange={(itemValue, itemIndex) => setSelectedColumn(itemValue)}
      >
        <Picker.Item label="Name" value="name" />
        <Picker.Item label="Age" value="age" />
        <Picker.Item label="Gender" value="gender" />
      </Picker>
      <TextInput
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        placeholder={`Search by ${selectedColumn}`}
      />
      <Button title="Search" onPress={handleSearch} />
      <View>
        {searchResults.map((result) => (
          <Text key={result.id}>{result.name}</Text>
        ))}
      </View>
    </View>
  )
}