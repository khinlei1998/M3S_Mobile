import { View, Text } from 'react-native'
import React from 'react'
import { Checkbox } from 'react-native-paper';

export default function CheckBoxFile(props) {
    const { testcheck, input } = props

    return (
        <View>
            <Checkbox
                uncheckedColor='white'
                color="white"
                // status={checked ? 'checked' : 'unchecked'}
                status={input.value ? 'checked' : 'unchecked'}
                onPress={() => {
                    testcheck()
                    input.onChange(!input.value)
                }}
            />
        </View>
    )
}