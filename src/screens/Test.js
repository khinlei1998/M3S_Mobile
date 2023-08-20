import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import axios from 'axios';

const MyComponent = () => {
  const [requestData, setRequestData] = useState(null);
  const [cancelToken, setCancelToken] = useState(null);

  const handleRequest = async () => {
    // Create a new CancelToken source
    const source = axios.CancelToken.source();
    console.log('source',source);
    setCancelToken(source);

    try {
      const response = await axios.get('https://68a8-103-231-92-121.ngrok-free.app/skylark-m3s/api/employees.m3s', {
        cancelToken: source.token, // Pass the token to the request
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  const handleCancel = () => {
    console.log('cancelToken',cancelToken);
    if (cancelToken) {
      cancelToken.cancel('Request canceled by the user.');
    }
  };

  return (
    <View>
      <Button title="Make Request" onPress={handleRequest} />
      <Button title="Cancel Request" onPress={handleCancel} />
      {requestData && <Text>{JSON.stringify(requestData)}</Text>}
    </View>
  );
};

export default MyComponent;
