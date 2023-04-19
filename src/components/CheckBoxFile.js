import { View, Text } from 'react-native'
import React from 'react'
import { Checkbox } from 'react-native-paper';

export default function CheckBoxFile() {
    const [checked, setChecked] = React.useState(false);

    return (
        <View>
            <Checkbox
                uncheckedColor='white'
                color="white"
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                    setChecked(!checked);
                }}
            />
        </View>
    )
}