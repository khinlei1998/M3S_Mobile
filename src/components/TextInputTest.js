import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
export default function TextInputTest(props) {
    const {
        focusTextInput,
        handleTextInputFocus,
        input_mode,
        icon,
        cus_width,
        defaultData,
        showValue,
        password,
        title,
        inputmax,
        input_cusstyle,
        words_count,
        input,
        meta: { touched, error },
        // ...inputProps
    } = props;
    const [text, setText] = React.useState("");
    const [wordCount, setWordCount] = React.useState(0);
    const [isPassword, setIsPassword] = useState(true);
    const [passwordIcon, setPasswordIcon] = useState('eye');



    const handleTextChange = (text) => {
        input.onChange(text);
        setWordCount(text.length);
    };

    const togglePasswordIcon = () => {
        if (passwordIcon == 'eye') {
            setPasswordIcon('eye-off-outline');
            setIsPassword(false);
        } else {
            setPasswordIcon('eye');
            setIsPassword(true);
        }
    };

    return (
        <View>


            <TextInput
                maxLength={inputmax && 20}
                theme={{
                    colors: {
                        onSurfaceVariant: input_mode ? '#818be3' : '',
                        text: 'pink',
                        underlineColor: 'pink',
                        background: 'red',
                        border: 'red',
                    },
                }}
                label={title}
                onChangeText={handleTextChange}
                onFocus={focusTextInput && handleTextInputFocus}
                mode={input_mode ? 'outlined' : ''}
                style={{
                    backgroundColor: '#fff',
                    marginTop: 20,
                    width: input_cusstyle ? '100%' : 300, marginRight: 10
                }}
                secureTextEntry={isPassword && password ? true : false} //for android
                placeholder={showValue ? defaultData : ''}
               
            />
            {words_count && <Text style={{ alignSelf: "flex-end", color: '#818be3' }}>{wordCount}/20</Text>}
            {touched && error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
    )
}