import {TextInput, DefaultTheme} from 'react-native-paper';
import React from 'react';
import {Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export default function DefaultTextInput(props) {
  const [wordCount, setWordCount] = React.useState(0);
  const {
    title,
    editable,
    inputmax,
    input: {onChange, ...restProps},
    ...restInput
  } = props;

  const handleInputChange = text => {
    setWordCount(text.length);
    onChange(text);
  };

  return (
    <>
      <TextInput
        theme={{
          colors: {
            ...DefaultTheme.colors,
            placeholder: 'red',
            primary: '#878787',
          },
        }}
        maxLength={inputmax}
        editable={editable ? false : true}
        mode={'flat'}
        onChangeText={handleInputChange}
        label={title}
        style={{
          backgroundColor: '#fff',
          marginTop: 10,
          width: 301,
          borderColor: '#303030',
          borderWidth: 0.5,
        }}
        underlineColor="#FFF"
        {...restInput}
        {...restProps}
      />
    </>
  );
}
