import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';

export default function TextInputFile() {
    const [text, setText] = React.useState("");

  return (
    <View style={{marginTop:10}}>
      <TextInput
      label="Email"
      value={text}
      onChangeText={text => setText(text)}
    />
    </View>
  )
}